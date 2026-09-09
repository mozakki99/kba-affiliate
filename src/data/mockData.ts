import { AffiliateUser, Product, Campaign, Task, LeaderboardEntry } from '@/types';

export const initialUser: AffiliateUser = {
  id: 'KBA-014',
  name: 'Ahmad',
  email: 'ahmad.affiliate@kampusbahasaarab.com',
  phone: '0812-3456-7890',
  instagram: '@ahmad_kba',
  tiktok: '@ahmad_kba',
  waGroup: 'Grup Sahabat KBA #4',
  joinedDate: '2025-11-15',
  lynkIdUsername: 'ahmad',
  streakDays: 3,
  diligencePoints: 420,
  viewerPoints: 350,
  totalPoints: 770,
};

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    title: 'Ebook Percakapan Praktis untuk Umrah Mandiri',
    slug: 'ebook-umrah',
    category: 'Ebook & Kamus',
    priceSample: 'Rp 99.000 (Data contoh)',
    commissionSample: 'Rp 35.000 / penjualan (Data contoh)',
    targetAudience: 'Calon jamaah umrah mandiri/backpacker yang ingin mahir komunikasi harian di Tanah Suci.',
    benefits: [
      'Panduan 100+ kosakata penting saat di bandara, hotel, dan pasar.',
      'Dialog interaktif Arab-Indonesia dilengkapi transliterasi.',
      'Bonus rekaman pengucapan audio native speaker.',
    ],
    contents: [
      'Bab 1: Kedatangan & Imigrasi Airport Jeddah/Madinah',
      'Bab 2: Transaksi di Hotel & Restoran',
      'Bab 3: Belanja di Pasar & Tawar Menawar',
      'Bab 4: Keadaan Darurat & Tanya Arah',
    ],
    faq: [
      {
        question: 'Apakah ebook ini dalam format PDF?',
        answer: 'Ya, PDF interaktif yang bisa dibuka di HP, Tablet, atau dicetak.',
      },
    ],
    availabilityStatus: 'Tersedia',
    lastUpdated: '01 September 2026',
    telegramChannelUrl: 'https://t.me/materi_kba_umrah_private',
    generalCopywriting: [
      {
        id: 'copy-1',
        title: 'Narasi Umum 1: Persiapan Umrah Mandiri',
        content: `Punya rencana Umrah tapi khawatir bingung nawar di pasar atau tanya hotel dalam bahasa Arab? 🕋🇸🇦

Tenang! Pelajari Ebook Percakapan Praktis Umrah Mandiri dari Kampus Bahasa Arab:
• 100+ Dialog Harian Praktis
• Audio pengucapan langsung
• Bisa dibaca kapan saja di HP

Cek selengkapnya di link berikut:`,
      },
    ],
  },
  {
    id: 'prod-2',
    title: 'Paket Bundling 3 Kamus Percakapan Logat Saudi',
    slug: 'bundling-saudi',
    category: 'Ebook & Kamus',
    priceSample: 'Rp 199.000 (Data contoh)',
    commissionSample: 'Rp 70.000 / penjualan (Data contoh)',
    targetAudience: 'Penuntut ilmu, pekerja professional di Saudi, serta jamaah umrah/haji.',
    benefits: [
      'Mencakup 3 jilid kamus bahasa Ammiyah Saudi populer.',
      'Lebih dari 3.000 entry ungkapan sehari-hari masyarakat Riyadh & Hijaz.',
      'Disusun oleh pengajar lulusan Universitas Islam Madinah.',
    ],
    contents: [
      'Jilid 1: Dasar Ammiyah & Kata Kerja Harian',
      'Jilid 2: Percakapan Tempat Kerja & Bisnis',
      'Jilid 3: Dialek Lokal & Istilah Populer Medsos',
    ],
    faq: [
      {
        question: 'Apakah bentuknya buku fisik atau digital?',
        answer: 'Paket ini berupa digital e-book + akses update seumur hidup.',
      },
    ],
    availabilityStatus: 'Stok Terbatas',
    lastUpdated: '28 Agustus 2026',
    telegramChannelUrl: 'https://t.me/materi_kba_saudi_private',
    generalCopywriting: [],
  },
  {
    id: 'prod-3',
    title: 'Kamus Percakapan Ammiyah Jilid 1 dengan Audio',
    slug: 'kamus-ammiyah-1',
    category: 'Ebook & Kamus',
    priceSample: 'Rp 79.000 (Data contoh)',
    commissionSample: 'Rp 25.000 / penjualan (Data contoh)',
    targetAudience: 'Pemula yang baru belajar dialek Ammiyah Arab.',
    benefits: [
      'Audio penggalan kata langsung dari native speaker.',
      'Sangat ringan dipelajari 10 menit per hari.',
    ],
    contents: ['Ungkapan Sapaan', 'Angka & Uang', 'Makan & Minum', 'Kendaraan & Transportasi'],
    faq: [{ question: 'Bisa diputar di iPhone?', answer: 'Bisa, format MP3 kompatibel di semua HP.' }],
    availabilityStatus: 'Tersedia',
    lastUpdated: '15 Agustus 2026',
    telegramChannelUrl: 'https://t.me/materi_kba_ammiyah1_private',
    generalCopywriting: [],
  },
];

export const initialCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    title: 'Pekan Bekal Umrah (Diskon 30%)',
    status: 'Aktif',
    startDate: '2026-09-08',
    endDate: '2026-09-15',
    productName: 'Ebook Percakapan Praktis untuk Umrah Mandiri',
    productId: 'prod-1',
    offer: 'Diskon Spesial 30% + Bonus 50 Audio Percakapan',
    platforms: ['Instagram Story', 'WhatsApp Status', 'Grup WhatsApp'],
    rules: 'Sistem Kejujuran! Begitu Anda centang pengerjaan, poin keaktifan langsung masuk.',
    bonus: 'Apresiasi Rp 150.000 untuk 10 Afiliator Paling Rajin Pekan Ini (Masing-masing Rp 15.000).',
    tasksSequence: [
      {
        day: 1,
        title: 'Posting 3 story tentang bekal bahasa sebelum umrah',
        description: 'Fokus tawarkan promo diskon 30% terbatas.',
        points: 50,
      },
    ],
  },
];

export const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Posting materi diskon Ebook Umrah Mandiri',
    productName: 'Ebook Percakapan Praktis untuk Umrah Mandiri',
    productId: 'prod-1',
    channel: 'Instagram Story',
    type: 'Kampanye',
    campaignId: 'camp-1',
    deadline: 'Hari ini, 23:59 WIB',
    points: 50,
    status: 'Belum dikerjakan',
    taskMonth: 'September 2026',
    telegramMaterialUrl: 'https://t.me/materi_kba_umrah_private/102',
    instructions: [
      'Ambil gambar di Channel Telegram Private KBA.',
      'Salin caption + link Lynk.id Anda.',
      'Pilih platform tempat Anda posting & centang absensi.',
    ],
    caption: `Mau Umrah tapi bingung mau ngomong apa saat nawar di pasar atau tanya arah ke hotel? 🇸🇦🕋

Jangan sampai kaku saat di Tanah Suci! Dapatkan Ebook Percakapan Praktis untuk Umrah Mandiri dari Kampus Bahasa Arab:
• 100+ Dialog Praktis
• Dilengkapi Audio Pengucapan
• Promo Diskon 30% Pekan Ini!

Klik link di bawah ini untuk amankan promonya sekarang! 👇`,
  },
  {
    id: 'task-7',
    title: 'Edu-post 5 tips tawar menawar di pasar Jeddah/Madinah',
    productName: 'Ebook Percakapan Praktis untuk Umrah Mandiri',
    productId: 'prod-1',
    channel: 'WhatsApp Status',
    type: 'Rutin',
    deadline: 'Hari ini, 23:59 WIB',
    points: 30,
    status: 'Belum dikerjakan',
    taskMonth: 'September 2026',
    telegramMaterialUrl: 'https://t.me/materi_kba_umrah_private/108',
    instructions: [
      'Salin teks tips percakapan bahasa Arab.',
      'Post ke Feed/Story IG, Thread, atau WA Status.',
    ],
    caption: `Ternyata tawar menawar oleh-oleh di pasar Jeddah gampang banget kalau tahu 5 frasa ini! 🇸🇦

1. Kam hatha? (Berapa harganya ini?)
2. Ghali jiddan! (Mahal banget!)
3. Rakkhis shwayya (Kurangi dikit dong)
4. A'tini khashm (Kasi diskon ya)
5. Shukran jazeelan (Terima kasih banyak)

Pelajari dialog lengkapnya di Ebook Percakapan KBA! 👇`,
  },
  {
    id: 'task-2',
    title: 'Share testimoni alumni jamaah umrah terbantu ebook KBA',
    productName: 'Ebook Percakapan Praktis untuk Umrah Mandiri',
    productId: 'prod-1',
    channel: 'WhatsApp Status',
    type: 'Kampanye',
    campaignId: 'camp-1',
    deadline: 'Hari ini, 23:59 WIB',
    points: 40,
    status: 'Selesai',
    taskMonth: 'September 2026',
    submittedAt: '09 Sep 2026, 10:15 WIB',
    isCompletedChecked: true,
    platformsPosted: ['Story WA', 'Grup WA'],
    viewerCountNumber: 150,
    bonusViewerPoints: 150,
    submissionViewerCount: '150 viewers',
    telegramMaterialUrl: 'https://t.me/materi_kba_umrah_private/105',
    instructions: [
      'Salin teks testimoni.',
      'Post ke WhatsApp Status & Grup WhatsApp.',
    ],
    caption: `MasyaAllah, baca testimoni jamaah umrah yang terbantu dengan Ebook Percakapan KBA! 

"Alhamdulillah pas beli oleh-oleh di Jeddah gak bingung lagi nawar." (Pak Rahmat)

Yuk siapin bekal umrahmu sekarang! 👇`,
  },
  {
    id: 'task-3',
    title: 'Posting info promo bundling 3 kamus logat Saudi (Tugas Lampau)',
    productName: 'Paket Bundling 3 Kamus Percakapan Logat Saudi',
    productId: 'prod-2',
    channel: 'Instagram Story',
    type: 'Rutin',
    deadline: '07 Sep 2026',
    points: 35,
    status: 'Terlewat',
    taskMonth: 'September 2026',
    instructions: [],
    caption: '',
  },
  {
    id: 'task-4',
    title: 'Edu-post 5 kosakata Ammiyah harian (Tugas Lampau)',
    productName: 'Kamus Percakapan Ammiyah Jilid 1 dengan Audio',
    productId: 'prod-3',
    channel: 'Instagram Story',
    type: 'Rutin',
    deadline: '06 Sep 2026',
    points: 30,
    status: 'Terlewat',
    taskMonth: 'September 2026',
    instructions: [],
    caption: '',
  },
  {
    id: 'task-5',
    title: 'Posting promo Flash Sale Akhir Pekan (Mendatang)',
    productName: 'Ebook Percakapan Praktis untuk Umrah Mandiri',
    productId: 'prod-1',
    channel: 'WhatsApp Status',
    type: 'Kampanye',
    campaignId: 'camp-1',
    deadline: '12 Sep 2026, 23:59 WIB',
    points: 60,
    status: 'Terkunci',
    unlockDate: '12 Sep 2026',
    taskMonth: 'September 2026',
    instructions: [],
    caption: '',
  },
  {
    id: 'task-6',
    title: 'Posting materi Gratis Vocab Harian (Bulan Lalu)',
    productName: 'Kamus Percakapan Ammiyah Jilid 1 dengan Audio',
    productId: 'prod-3',
    channel: 'Grup WhatsApp',
    type: 'Rutin',
    deadline: '28 Agt 2026',
    points: 25,
    status: 'Selesai',
    taskMonth: 'Agustus 2026',
    submittedAt: '28 Agt 2026, 14:00 WIB',
    instructions: [],
    caption: '',
  },
];

export const initialLeaderboardActivity: LeaderboardEntry[] = [
  { rank: 1, displayName: 'Ustadz Faisal', score: 680, isDiligentWinner: true, rewardAmount: 'Rp 15.000' },
  { rank: 2, displayName: 'Siti Maryam', score: 510, isDiligentWinner: true, rewardAmount: 'Rp 15.000' },
  { rank: 3, displayName: 'Ahmad (Anda)', score: 420, isCurrentUser: true, isDiligentWinner: true, rewardAmount: 'Rp 15.000' },
  { rank: 4, displayName: 'Haji Hendra', score: 390, isDiligentWinner: true, rewardAmount: 'Rp 15.000' },
  { rank: 5, displayName: 'Rina Nurbaeti', score: 340, isDiligentWinner: true, rewardAmount: 'Rp 15.000' },
  { rank: 6, displayName: 'Muhammad Rizky', score: 290, isDiligentWinner: true, rewardAmount: 'Rp 15.000' },
  { rank: 7, displayName: 'Dewi Anggraini', score: 250, isDiligentWinner: true, rewardAmount: 'Rp 15.000' },
  { rank: 8, displayName: 'Budi Santoso', score: 210, isDiligentWinner: true, rewardAmount: 'Rp 15.000' },
  { rank: 9, displayName: 'Ustadzah Halimah', score: 190, isDiligentWinner: true, rewardAmount: 'Rp 15.000' },
  { rank: 10, displayName: 'Arif Rahman', score: 175, isDiligentWinner: true, rewardAmount: 'Rp 15.000' },
];

export const initialLeaderboardSales: LeaderboardEntry[] = [
  { rank: 1, displayName: 'Ustadz Faisal', score: 24, totalAmount: 'Rp 4.250.000' },
  { rank: 2, displayName: 'Haji Hendra', score: 18, totalAmount: 'Rp 3.100.000' },
  { rank: 3, displayName: 'Siti Maryam', score: 14, totalAmount: 'Rp 2.450.000' },
  { rank: 4, displayName: 'Ahmad (Anda)', score: 8, totalAmount: 'Rp 1.450.000', isCurrentUser: true },
];
