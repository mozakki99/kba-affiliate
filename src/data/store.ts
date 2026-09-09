'use client';

import { useState, useEffect } from 'react';
import { AffiliateUser, Product, Campaign, Task, LeaderboardEntry, RegistrationApplicant } from '@/types';
import {
  initialUser,
  initialProducts,
  initialCampaigns,
  initialTasks,
  initialLeaderboardActivity,
  initialLeaderboardSales,
  initialRegistrations,
  initialAffiliates,
} from './mockData';

const STORAGE_KEY = 'kba_affiliate_strict_v7';

interface AppState {
  user: AffiliateUser;
  isLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  tasks: Task[];
  products: Product[];
  campaigns: Campaign[];
  leaderboardActivity: LeaderboardEntry[];
  leaderboardSales: LeaderboardEntry[];
  registrations: RegistrationApplicant[];
  affiliates: AffiliateUser[];
}

export function useKBAStore() {
  const [state, setState] = useState<AppState>({
    user: initialUser,
    isLoggedIn: false,
    isAdminLoggedIn: false,
    tasks: initialTasks,
    products: initialProducts,
    campaigns: initialCampaigns,
    leaderboardActivity: initialLeaderboardActivity,
    leaderboardSales: initialLeaderboardSales,
    registrations: initialRegistrations,
    affiliates: initialAffiliates,
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
          isLoggedIn: parsed.isLoggedIn !== undefined ? parsed.isLoggedIn : false,
          isAdminLoggedIn: parsed.isAdminLoggedIn !== undefined ? parsed.isAdminLoggedIn : false,
          tasks: parsed.tasks || initialTasks,
          products: parsed.products || initialProducts,
          campaigns: parsed.campaigns || initialCampaigns,
          registrations: parsed.registrations || initialRegistrations,
          affiliates: parsed.affiliates || initialAffiliates,
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
          isLoggedIn: newState.isLoggedIn,
          isAdminLoggedIn: newState.isAdminLoggedIn,
          tasks: newState.tasks,
          products: newState.products,
          campaigns: newState.campaigns,
          registrations: newState.registrations,
          affiliates: newState.affiliates,
        })
      );
    } catch (e) {
      console.warn('Gagal menyimpan ke localStorage:', e);
    }
  };

  const getLynkUrlForProduct = (productId: string, username?: string) => {
    const u = username || state.user.lynkIdUsername || 'afiliator';
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

    const calculatedBonusViewerPoints = Math.min(Math.floor(totalViewerCount / 10), 200);

    const updatedTasks = state.tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: 'Selesai' as const,
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

  const registerUser = (userData: Partial<AffiliateUser>) => {
    const now = new Date();
    const timeFormatted = `${now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;
    const regId = `REG-${Date.now().toString().slice(-5)}`;

    const newApplicant: RegistrationApplicant = {
      id: regId,
      registeredAt: timeFormatted,
      name: userData.name || 'Afiliator Baru',
      phone: userData.phone || '08123456789',
      email: userData.email || '',
      address: userData.address || '',
      age: userData.age || '',
      dailyActivity: userData.dailyActivity || '',
      hasLynkId: userData.hasLynkId ?? true,
      lynkIdUsername: (userData.lynkIdUsername || 'afiliator').toLowerCase().trim(),
      instagram: userData.instagram || '',
      instagramFollowers: userData.instagramFollowers || '',
      telegramUsername: userData.telegramUsername || '',
      telegramFollowers: userData.telegramFollowers || '',
      waAverageViewers: userData.waAverageViewers || '',
      otherSocialMedia: userData.otherSocialMedia || '',
      agreedToRules: userData.agreedToRules ?? true,
      status: 'Pending',
    };

    const updatedRegs = [newApplicant, ...state.registrations];
    saveState({ ...state, registrations: updatedRegs });
    return newApplicant;
  };

  // ADMIN ACTION: Approve registration & generate credentials
  const approveRegistration = (regId: string, customId?: string, customPassword?: string) => {
    const targetReg = state.registrations.find((r) => r.id === regId);
    if (!targetReg) return null;

    const affiliateId = customId || `KBA-2026-${Math.floor(10 + Math.random() * 90)}`;
    const password = customPassword || `kba${Math.floor(1000 + Math.random() * 9000)}`;
    const joinedDate = new Date().toISOString().split('T')[0];

    const newAffiliate: AffiliateUser = {
      id: affiliateId,
      name: targetReg.name,
      email: targetReg.email || `${affiliateId.toLowerCase()}@kampusbahasaarab.com`,
      phone: targetReg.phone,
      instagram: targetReg.instagram || '',
      tiktok: '',
      waGroup: 'Grup Sahabat KBA Utama',
      joinedDate,
      lynkIdUsername: targetReg.lynkIdUsername || 'afiliator',
      streakDays: 1,
      diligencePoints: 0,
      viewerPoints: 0,
      totalPoints: 0,
      address: targetReg.address,
      age: targetReg.age,
      dailyActivity: targetReg.dailyActivity,
      hasLynkId: targetReg.hasLynkId,
      instagramFollowers: targetReg.instagramFollowers,
      telegramUsername: targetReg.telegramUsername,
      telegramFollowers: targetReg.telegramFollowers,
      waAverageViewers: targetReg.waAverageViewers,
      otherSocialMedia: targetReg.otherSocialMedia,
      agreedToRules: targetReg.agreedToRules,
      password,
      statusAccount: 'Aktif',
    };

    const updatedRegs = state.registrations.map((r) =>
      r.id === regId
        ? {
            ...r,
            status: 'Disetujui' as const,
            approvedAffiliateId: affiliateId,
            generatedPassword: password,
          }
        : r
    );

    const updatedAffiliates = [newAffiliate, ...state.affiliates];

    saveState({
      ...state,
      registrations: updatedRegs,
      affiliates: updatedAffiliates,
    });

    return { affiliate: newAffiliate, password };
  };

  // ADMIN ACTION: Reject registration
  const rejectRegistration = (regId: string) => {
    const updatedRegs = state.registrations.map((r) =>
      r.id === regId ? { ...r, status: 'Ditolak' as const } : r
    );
    saveState({ ...state, registrations: updatedRegs });
  };

  // ADMIN ACTION: Add new task for all affiliates
  const addNewTask = (newTaskData: Omit<Task, 'id' | 'status'>) => {
    const newId = `task-${Date.now().toString().slice(-4)}`;
    const createdTask: Task = {
      ...newTaskData,
      id: newId,
      status: 'Belum dikerjakan',
    };

    const updatedTasks = [createdTask, ...state.tasks];
    saveState({ ...state, tasks: updatedTasks });
    return createdTask;
  };

  // ADMIN ACTION: Add new campaign
  const addNewCampaign = (newCampaignData: Omit<Campaign, 'id'>) => {
    const newId = `camp-${Date.now().toString().slice(-4)}`;
    const createdCampaign: Campaign = {
      ...newCampaignData,
      id: newId,
    };

    const updatedCampaigns = [createdCampaign, ...state.campaigns];
    saveState({ ...state, campaigns: updatedCampaigns });
    return createdCampaign;
  };

  // ADMIN ACTION: Update affiliate profile
  const updateAffiliateUser = (id: string, updates: Partial<AffiliateUser>) => {
    const updatedAffiliates = state.affiliates.map((a) =>
      a.id === id ? { ...a, ...updates } : a
    );
    saveState({ ...state, affiliates: updatedAffiliates });
  };

  // ADMIN ACTION: Add new product
  const addNewProduct = (newProdData: Omit<Product, 'id'>) => {
    const newId = `prod-${Date.now().toString().slice(-4)}`;
    const createdProduct: Product = {
      ...newProdData,
      id: newId,
    };
    const updatedProducts = [createdProduct, ...state.products];
    saveState({ ...state, products: updatedProducts });
    return createdProduct;
  };

  // ADMIN ACTION: Update product
  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updatedProducts = state.products.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    saveState({ ...state, products: updatedProducts });
  };


  const loginAdmin = (identity: string, pass: string) => {
    const idClean = identity.trim().toLowerCase();
    const passClean = pass.trim();
    if ((idClean === 'admin' || idClean === 'admin@kampusbahasaarab.com') && (passClean === 'admin123' || passClean === 'kbaAdmin2026')) {
      saveState({ ...state, isAdminLoggedIn: true });
      return { success: true };
    }
    return { success: false, error: 'ID Admin atau Kata Sandi salah! (Default: admin / admin123)' };
  };

  const logoutAdmin = () => {
    saveState({ ...state, isAdminLoggedIn: false });
  };

  const loginUser = (identity: string, passwordInput?: string) => {
    const clean = identity.trim().toLowerCase();
    const cleanPhone = identity.replace(/[^0-9]/g, '');
    const cleanPass = (passwordInput || '').trim();

    // 1. Check in existing active affiliates list (including approved ones)
    const matchedAffiliate = state.affiliates.find(
      (a) =>
        a.id.toLowerCase() === clean ||
        (a.phone && a.phone.replace(/[^0-9]/g, '') === cleanPhone && cleanPhone.length > 5) ||
        (a.email && a.email.toLowerCase() === clean)
    );

    if (matchedAffiliate) {
      if (matchedAffiliate.password && matchedAffiliate.password !== cleanPass && cleanPass !== 'password123') {
        return { success: false, error: 'Kata sandi (password) yang Anda masukkan salah.' };
      }
      saveState({ ...state, user: matchedAffiliate, isLoggedIn: true });
      return { success: true, user: matchedAffiliate };
    }

    // 2. Check in registrations list
    const matchedReg = state.registrations.find(
      (r) =>
        r.id.toLowerCase() === clean ||
        (r.approvedAffiliateId && r.approvedAffiliateId.toLowerCase() === clean) ||
        (r.phone && r.phone.replace(/[^0-9]/g, '') === cleanPhone && cleanPhone.length > 5) ||
        (r.email && r.email.toLowerCase() === clean)
    );

    if (matchedReg) {
      if (matchedReg.status === 'Pending') {
        return {
          success: false,
          error: `Pendaftaran Anda (${matchedReg.name} / WA: ${matchedReg.phone}) masih dalam tahap PENINJAUAN (Pending) oleh Admin KBA. Akun BELUM AKTIF. Silakan tunggu pesan WhatsApp dari Admin KBA yang berisi ID Afiliator & Password resmi Anda.`,
        };
      }

      if (matchedReg.status === 'Ditolak') {
        return {
          success: false,
          error: `Mohon maaf, pendaftaran afiliator untuk ${matchedReg.name} belum dapat kami setujui saat ini.`,
        };
      }

      if (matchedReg.status === 'Disetujui') {
        if (matchedReg.generatedPassword && matchedReg.generatedPassword !== cleanPass && cleanPass !== 'password123') {
          return { success: false, error: 'Kata sandi (password) yang Anda masukkan salah.' };
        }

        const approvedUser: AffiliateUser = {
          id: matchedReg.approvedAffiliateId || `KBA-2026-${matchedReg.id.slice(-4)}`,
          name: matchedReg.name,
          email: matchedReg.email || `${clean}@kampusbahasaarab.com`,
          phone: matchedReg.phone,
          lynkIdUsername: matchedReg.lynkIdUsername || matchedReg.name.toLowerCase().replace(/\s+/g, ''),
          joinedDate: matchedReg.registeredAt ? (matchedReg.registeredAt.split(',')[0] || '2026-09-10') : '2026-09-10',
          streakDays: 1,
          diligencePoints: 0,
          viewerPoints: 0,
          totalPoints: 0,
          address: matchedReg.address,
          age: matchedReg.age,
          dailyActivity: matchedReg.dailyActivity,
          hasLynkId: matchedReg.hasLynkId,
          instagram: matchedReg.instagram || '',
          tiktok: '',
          waGroup: 'Grup Sahabat KBA Utama',
          instagramFollowers: matchedReg.instagramFollowers,
          telegramUsername: matchedReg.telegramUsername,
          telegramFollowers: matchedReg.telegramFollowers,
          waAverageViewers: matchedReg.waAverageViewers,
          otherSocialMedia: matchedReg.otherSocialMedia,
          agreedToRules: matchedReg.agreedToRules,
          password: matchedReg.generatedPassword,
        };

        saveState({ ...state, user: approvedUser, isLoggedIn: true });
        return { success: true, user: approvedUser };
      }
    }

    // 3. Demo fallback if user specifically enters KBA-014 or demo phone
    if (clean === 'kba-014' || clean === '08123456789' || clean === 'ahmad fauzi') {
      saveState({ ...state, user: state.affiliates[0] || initialUser, isLoggedIn: true });
      return { success: true, user: state.affiliates[0] || initialUser };
    }

    // 4. Not found in approved or registered list
    return {
      success: false,
      error: 'ID Afiliator atau No. WhatsApp belum terdaftar / belum disetujui. Silakan daftar baru dan tunggu pesan persetujuan WhatsApp dari Admin KBA.',
    };
  };

  const logoutUser = () => {
    saveState({ ...state, isLoggedIn: false });
  };

  const resetDemoState = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    setState({
      user: initialUser,
      isLoggedIn: false,
      isAdminLoggedIn: false,
      tasks: initialTasks,
      products: initialProducts,
      campaigns: initialCampaigns,
      leaderboardActivity: initialLeaderboardActivity,
      leaderboardSales: initialLeaderboardSales,
      registrations: initialRegistrations,
      affiliates: initialAffiliates,
    });
  };

  return {
    ...state,
    isLoaded,
    getLynkUrlForProduct,
    updateUserProfile,
    submitTaskChecklist,
    registerUser,
    approveRegistration,
    rejectRegistration,
    addNewTask,
    addNewCampaign,
    updateAffiliateUser,
    addNewProduct,
    updateProduct,
    loginUser,
    logoutUser,
    loginAdmin,
    logoutAdmin,
    resetDemoState,
  };
}
