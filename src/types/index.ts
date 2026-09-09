export interface AffiliateUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram: string;
  tiktok: string;
  waGroup: string;
  joinedDate: string;
  lynkIdUsername: string; // e.g. "ahmad"
  streakDays: number; // e.g. 3
  diligencePoints?: number; // Poin Rajin
  viewerPoints?: number; // Poin Viewers
  totalPoints?: number; // Total Poin Terakumulasi
}

export type TaskStatus = 'Belum dikerjakan' | 'Selesai' | 'Terlewat' | 'Terkunci';

export type TaskChannel = 'Instagram Story' | 'WhatsApp Status' | 'Grup WhatsApp';

export type TaskType = 'Kampanye' | 'Rutin';

export interface Task {
  id: string;
  title: string;
  productName: string;
  productId: string;
  channel: TaskChannel;
  type: TaskType;
  campaignId?: string;
  deadline: string;
  points: number; // Poin Rajin Dasar (e.g. +10, +40)
  status: TaskStatus;
  instructions: string[];
  caption: string;
  telegramMaterialUrl?: string;
  unlockDate?: string; // e.g. "12 Sep 2026"
  taskMonth?: string; // e.g. "September 2026"
  submittedAt?: string;
  isCompletedChecked?: boolean;
  platformsPosted?: string[]; // e.g. ['Feed IG', 'Story IG', 'Story WA', 'Grup WA', 'Thread', 'Channel Telegram', 'Lainnya']
  platformViewers?: Record<string, number>; // e.g. { 'Story IG': 100, 'Thread': 50 }
  viewerCountNumber?: number; // Numeric only total viewer count (e.g. 150)
  bonusViewerPoints?: number; // e.g. +150 Poin Viewers
  submissionViewerCount?: string;
  submissionUrl?: string;
  submissionNote?: string;
}

export type ProductCategory = 'Kelas' | 'Ebook & Kamus' | 'Produk digital lainnya' | 'Materi gratis';

export interface ProductCopywriting {
  id: string;
  title: string;
  content: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: ProductCategory;
  priceSample: string;
  commissionSample: string;
  targetAudience: string;
  benefits: string[];
  contents: string[];
  faq: { question: string; answer: string }[];
  availabilityStatus: 'Tersedia' | 'Stok Terbatas' | 'Pendaftaran Dibuka';
  lastUpdated: string;
  telegramChannelUrl?: string;
  generalCopywriting?: ProductCopywriting[];
}

export interface Campaign {
  id: string;
  title: string;
  status: 'Aktif' | 'Mendatang' | 'Selesai';
  startDate: string;
  endDate: string;
  productName: string;
  productId: string;
  offer: string;
  platforms: string[];
  rules: string;
  bonus: string;
  tasksSequence: {
    day: number;
    title: string;
    description: string;
    points: number;
  }[];
}

export interface LeaderboardEntry {
  rank: number;
  displayName: string;
  score: number;
  totalAmount?: string;
  isCurrentUser?: boolean;
  isDiligentWinner?: boolean;
  rewardAmount?: string;
}
