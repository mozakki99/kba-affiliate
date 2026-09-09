'use client';

import { useState, useEffect } from 'react';
import { AffiliateUser, Product, Campaign, Task, LeaderboardEntry } from '@/types';
import {
  initialUser,
  initialProducts,
  initialCampaigns,
  initialTasks,
  initialLeaderboardActivity,
  initialLeaderboardSales,
} from './mockData';

const STORAGE_KEY = 'kba_affiliate_demo_state_v4';

interface AppState {
  user: AffiliateUser;
  tasks: Task[];
  products: Product[];
  campaigns: Campaign[];
  leaderboardActivity: LeaderboardEntry[];
  leaderboardSales: LeaderboardEntry[];
}

export function useKBAStore() {
  const [state, setState] = useState<AppState>({
    user: initialUser,
    tasks: initialTasks,
    products: initialProducts,
    campaigns: initialCampaigns,
    leaderboardActivity: initialLeaderboardActivity,
    leaderboardSales: initialLeaderboardSales,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState((prev) => ({
          ...prev,
          user: parsed.user || initialUser,
          tasks: parsed.tasks || initialTasks,
        }));
      }
    } catch (e) {
      console.warn('Gagal membaca data dari localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveState = (newState: AppState) => {
    setState(newState);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          user: newState.user,
          tasks: newState.tasks,
        })
      );
    } catch (e) {
      console.warn('Gagal menyimpan ke localStorage:', e);
    }
  };

  const getLynkUrlForProduct = (productId: string, username?: string) => {
    const u = username || state.user.lynkIdUsername || 'ahmad';
    const product = state.products.find((p) => p.id === productId);
    const slug = product?.slug || productId;
    return `https://lynk.id/${u}/${slug}`;
  };

  const updateUserProfile = (
    name: string,
    lynkIdUsername: string,
    phone: string,
    instagram: string,
    tiktok: string,
    waGroup: string
  ) => {
    const updatedUser: AffiliateUser = {
      ...state.user,
      name,
      lynkIdUsername: lynkIdUsername.toLowerCase().trim(),
      phone,
      instagram,
      tiktok,
      waGroup,
    };
    saveState({ ...state, user: updatedUser });
  };

  // Submit Task Checklist (Trust System: Immediately sets status to Selesai!)
  const submitTaskChecklist = (
    taskId: string,
    isCompletedChecked: boolean,
    platformsPosted?: string[],
    platformViewers?: Record<string, number>,
    submissionUrl?: string,
    submissionNote?: string
  ) => {
    const now = new Date();
    const timeFormatted = `${now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    let totalViewerCount = 0;
    if (platformViewers) {
      Object.values(platformViewers).forEach((v) => {
        if (!isNaN(v) && v > 0) totalViewerCount += v;
      });
    }

    // Scaled viewer points: 10 viewers = 1 point, capped at max 200 points per task
    const calculatedBonusViewerPoints = Math.min(Math.floor(totalViewerCount / 10), 200);

    const updatedTasks = state.tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: 'Selesai' as const, // TRUST SYSTEM: INSTANTLY FINISHED!
          submittedAt: timeFormatted,
          isCompletedChecked,
          platformsPosted: platformsPosted && platformsPosted.length > 0 ? platformsPosted : task.platformsPosted || [],
          platformViewers: platformViewers || task.platformViewers || {},
          viewerCountNumber: totalViewerCount,
          bonusViewerPoints: calculatedBonusViewerPoints,
          submissionViewerCount: totalViewerCount > 0 ? `${totalViewerCount} viewers (${calculatedBonusViewerPoints} Poin)` : task.submissionViewerCount,
          submissionUrl,
          submissionNote,
        };
      }
      return task;
    });

    // Dual Point Accumulation Calculation
    const diligencePoints = updatedTasks
      .filter((t) => t.status === 'Selesai')
      .reduce((sum, t) => sum + (t.points || 0), 300);

    const viewerPoints = updatedTasks
      .filter((t) => t.status === 'Selesai')
      .reduce((sum, t) => sum + (t.bonusViewerPoints || 0), 200);

    const updatedUser: AffiliateUser = {
      ...state.user,
      diligencePoints,
      viewerPoints,
      totalPoints: diligencePoints + viewerPoints,
    };

    saveState({ ...state, user: updatedUser, tasks: updatedTasks });
  };

  const resetDemoState = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    setState({
      user: initialUser,
      tasks: initialTasks,
      products: initialProducts,
      campaigns: initialCampaigns,
      leaderboardActivity: initialLeaderboardActivity,
      leaderboardSales: initialLeaderboardSales,
    });
  };

  return {
    ...state,
    isLoaded,
    getLynkUrlForProduct,
    updateUserProfile,
    submitTaskChecklist,
    resetDemoState,
  };
}
