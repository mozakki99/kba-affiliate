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

export const initialAffiliates: AffiliateUser[] = [
  initialUser,
  {
    id: 'KBA-011',
    name: 'Ustadz Faisal',
    email: 'faisal@gmail.com',
    phone: '081399887766',
    instagram: '@faisal_kba',
    tiktok: '@faisal_kba',
    waGroup: 'Grup Sahabat KBA #1',
    joinedDate: '2025-10-01',
    lynkIdUsername: 'faisal',
    streakDays: 14,
    diligencePoints: 680,
    viewerPoints: 850,
    totalPoints: 1530,
    statusAccount: 'Aktif',
  },
  {
    id: 'KBA-012',
    name: 'Siti Maryam',
    email: 'siti.maryam@gmail.com',
    phone: '085711223344',
    instagram: '@siti_kba',
    tiktok: '',
    waGroup: 'Grup Sahabat KBA #2',
    joinedDate: '2025-10-15',
    lynkIdUsername: 'sitimaryam',
    streakDays: 8,
    diligencePoints: 510,
    viewerPoints: 450,
    totalPoints: 960,
    statusAccount: 'Aktif',
  },
];

export const initialRegistrations = [
  {
    id: 'REG-9012',
    registeredAt: '09 Sep 2026, 14:30 WIB',
    name: 'Nur Hidayah',
    phone: '081298765432',
    email: 'hidayah.nur@gmail.com',
    address: 'Kec. Sukasari, Bandung, Jawa Barat',
    age: '26',
    dailyActivity: 'Pengajar TPA & Ibu Rumah Tangga',
    hasLynkId: true,
    lynkIdUsername: 'nurhidayah',
    instagram: '@nurhidayah_id',
    instagramFollowers: '3.400',
    telegramUsername: '@nurhidayah',
    telegramFollowers: '500',
    waAverageViewers: '250 viewers',
    otherSocialMedia: '-',
    agreedToRules: true,
    status: 'Pending' as const,
  },
  {
    id: 'REG-9013',
    registeredAt: '09 Sep 2026, 11:15 WIB',
    name: 'Budi Kurniawan',
    phone: '085211998877',
    email: 'budi.kurniawan@gmail.com',
    address: 'Kebayoran Baru, Jakarta Selatan',
    age: '31',
    dailyActivity: 'Karyawan Swasta',
    hasLynkId: true,
    lynkIdUsername: 'budikurni',
    instagram: '@budi_kurnia',
    instagramFollowers: '1.200',
    telegramUsername: '-',
    telegramFollowers: '-',
    waAverageViewers: '120 viewers',
    otherSocialMedia: '-',
    agreedToRules: true,
    status: 'Pending' as const,
  },
];


export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    title: 'Ebook Percakapan Praktis untuk Umrah Mandiri',
    slug: 'ebook-umrah',
    category: 'Ebook & Kamus',
    priceSample: 'Rp 99.000',
    commissionSample: 'Rp 35.000 / penjualan',
    commissionTenSales: 'Rp 350.000',
    priceNumber: 99000,
    commissionNumber: 35000,
    targetAudience: 'Calon jamaah umrah mandiri dan pembelajar bahasa Arab yang ingin lancar berkomunikasi harian di Tanah Suci.',
    benefits: [
      'Panduan 100+ kosakata penting di bandara, hotel, dan area pertokoan.',
      'Dialog interaktif Arab-Indonesia yang dilengkapi transliterasi.',
      'Bonus rekaman pengucapan audio langsung dari penutur asli (native speaker).',
    ],
    contents: [
      'Bab 1: Prosedur Imigrasi & Bandara Jeddah/Madinah',
      'Bab 2: Komunikasi di Hotel & Layanan Pemesanan',
      'Bab 3: Interaksi di Pertokoan & Tawar Menawar',
      'Bab 4: Panduan Darurat & Petunjuk Arah Lengkap',
    ],
    faq: [
      {
        question: 'Apakah ebook ini dapat diakses dalam format PDF?',
        answer: 'Ya, PDF interaktif yang praktis dibaca di smartphone, tablet, maupun dicetak.',
      },
    ],
    availabilityStatus: 'Tersedia',
    lastUpdated: '01 September 2026',
    telegramChannelUrl: 'https://t.me/materi_kba_umrah_private',
    generalCopywriting: [
      {
        id: 'copy-1',
        title: 'Narasi Promosi 1: Persiapan Bekal Umrah Mandiri',
        content: `Persiapkan bekal percakapan bahasa Arab harian Anda untuk kelancaran ibadah Umrah di Tanah Suci. 🕋🇸🇦

Dapatkan Ebook Percakapan Praktis Umrah Mandiri persembahan Kampus Bahasa Arab:
• 100+ Dialog Harian Praktis
• Dilengkapi Audio Pengucapan Asli
• Praktis Diperoleh & Dibaca di Smartphone

Dapatkan materi lengkapnya melalui tautan resmi berikut:`,
      },
    ],
  },
  {
    id: 'prod-2',
    title: 'Paket Bundling 3 Kamus Percakapan Logat Saudi',
    slug: 'bundling-saudi',
    category: 'Ebook & Kamus',
    priceSample: 'Rp 199.000',
    commissionSample: 'Rp 70.000 / penjualan',
    commissionTenSales: 'Rp 700.000',
    priceNumber: 199000,
    commissionNumber: 70000,
    targetAudience: 'Penuntut ilmu, profesional di Arab Saudi, serta jamaah umrah dan haji.',
    benefits: [
      'Mencakup 3 jilid kamus percakapan bahasa Ammiyah Saudi populer.',
      'Lebih dari 3.000 ungkapan sehari-hari wilayah Riyadh & Hijaz.',
      'Disusun oleh tim pengajar alumni Universitas Islam Madinah.',
    ],
    contents: [
      'Jilid 1: Dasar Ammiyah & Kata Kerja Komunikasi Harian',
      'Jilid 2: Percakapan Tempat Kerja & Profesional',
      'Jilid 3: Dialek Lokal & Istilah Populer Kontemporer',
    ],
    faq: [
      {
        question: 'Apakah produk ini berupa buku fisik atau digital?',
        answer: 'Paket ini berbentuk format digital e-book beserta akses pembaruan.',
      },
    ],
    availabilityStatus: 'Stok Terbatas',
    lastUpdated: '28 Agustus 2026',
    telegramChannelUrl: 'https://t.me/materi_kba_saudi_private',
    generalCopywriting: [
      {
        id: 'copy-2',
        title: 'Narasi Promosi 1: Kuasai Dialek Saudi Ammiyah',
        content: `Ingin lancar berkomunikasi dengan warga lokal Saudi saat Umrah, Haji, atau Bekerja? 🇸🇦

Kuasai dialek Ammiyah Saudi melalui Paket Bundling 3 Kamus Percakapan KBA:
• 3.000+ Ungkapan Populer Wilayah Riyadh & Hijaz
• Disusun oleh Alumni Universitas Islam Madinah
• Praktis & Mudah Dipelajari Kapan Saja

Pesan sekarang melalui tautan resmi berikut:`,
      },
    ],
  },
  {
    id: 'prod-3',
    title: 'Kamus Percakapan Ammiyah Jilid 1 dengan Audio',
    slug: 'kamus-ammiyah-1',
    category: 'Ebook & Kamus',
    priceSample: 'Rp 79.000',
    commissionSample: 'Rp 25.000 / penjualan',
    commissionTenSales: 'Rp 250.000',
    priceNumber: 79000,
    commissionNumber: 25000,
    targetAudience: 'Pembelajar pemula yang ingin menguasai dialek Ammiyah Arab secara bertahap.',
    benefits: [
      'Dilengkapi audio penggalan kata langsung dari penutur asli.',
      'Metode belajar yang ringkas dan efektif 10 menit setiap hari.',
    ],
    contents: ['Ungkapan Sapaan', 'Angka & Transaksi', 'Makan & Minum', 'Transportasi Harian'],
    faq: [{ question: 'Apakah kompatibel di perangkat iOS?', answer: 'Ya, format audio MP3 kompatibel di seluruh perangkat.' }],
    availabilityStatus: 'Tersedia',
    lastUpdated: '15 Agustus 2026',
    telegramChannelUrl: 'https://t.me/materi_kba_ammiyah1_private',
    generalCopywriting: [
      {
        id: 'copy-3',
        title: 'Narasi Promosi 1: Belajar Ammiyah Pemula 10 Menit Sehari',
        content: `Langkah awal praktis kuasai percakapan Arab harian hanya dalam 10 menit sehari! 📚✨

Dapatkan Kamus Percakapan Ammiyah Jilid 1 lengkap dengan Audio Native Speaker:
• Ungkapan Sapaan & Transaksi Harian
• Audio Pengucapan Jelas & Mudah Dikuti
• Cocok untuk Pemula & Pembelajar Mandiri

Amankan aksesnya melalui tautan berikut:`,
      },
    ],
  },
];

export const initialCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    title: 'Pekan Bekal Umrah (Diskon Spesial 30%)',
    status: 'Aktif',
    startDate: '2026-09-08',
    endDate: '2026-09-15',
    productName: 'Ebook Percakapan Praktis untuk Umrah Mandiri',
    productId: 'prod-1',
    offer: 'Diskon Spesial 30% + Bonus 50 Audio Percakapan Harian',
    platforms: ['Instagram Story', 'WhatsApp Status', 'Grup WhatsApp'],
    rules: 'Sistem Kejujuran & Amanah: Poin keaktifan dan poin viewers otomatis terakumulasi setelah Anda mengonfirmasi absensi postingan.',
    bonus: 'Program Apresiasi Rp 150.000 untuk 10 Afiliator Paling Rajin Pekan Ini (Masing-masing Rp 15.000).',
    tasksSequence: [
      {
        day: 1,
        title: 'Posting materi promosi diskon 30% Ebook Umrah Mandiri',
        description: 'Publikasikan materi promo diskon spesial di platform pilihan Anda.',
        points: 50,
      },
    ],
  },
];

export const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Posting Materi Promo Diskon 30% Ebook Umrah Mandiri',
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
      'Unduh materi visual dari Channel Telegram Resmi KBA.',
      'Salin teks naskah promo dan tautan Lynk.id pribadi Anda.',
      'Unggah ke platform pilihan Anda dan beri tanda centang absensi.',
    ],
    caption: `Persiapkan bekal percakapan bahasa Arab harian Anda untuk kelancaran ibadah Umrah di Tanah Suci. 🕋🇸🇦

Dapatkan Ebook Percakapan Praktis Umrah Mandiri persembahan Kampus Bahasa Arab:
• 100+ Dialog Harian Praktis
• Dilengkapi Audio Pengucapan Asli
• Promo Diskon Spesial 30% Pekan Ini

Amankan promonya melalui tautan resmi berikut: 👇`,
  },
  {
    id: 'task-7',
    title: 'Edu-Post: 5 Frasa Penting Percakapan Bahasa Arab di Tanah Suci',
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
      'Salin teks materi edukasi percakapan bahasa Arab.',
      'Publikasikan di Feed/Story Instagram, Thread, atau WA Status.',
    ],
    caption: `Pelajari 5 frasa penting dalam bahasa Arab untuk kemudahan bertransaksi saat berada di Jeddah maupun Madinah: 🇸🇦

1. Kam hatha? (Berapa harganya ini?)
2. Ghali jiddan (Harga ini terlalu tinggi)
3. Rakkhis shwayya (Bolehkah diberikan potongan?)
4. A'tini khashm (Berikan harga terbaik ya)
5. Shukran jazeelan (Terima kasih banyak)

Pelajari panduan dialog selengkapnya dalam Ebook Percakapan KBA melalui tautan berikut: 👇`,
  },
  {
    id: 'task-2',
    title: 'Testimoni Alumni & Jamaah Umrah Pengguna Ebook KBA',
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
      'Salin naskah testimoni alumni.',
      'Unggah ke WhatsApp Status & Grup WhatsApp.',
    ],
    caption: `MasyaAllah, simak kebahagiaan para jamaah umrah yang merasakan kemudahan berinteraksi setelah mempelajari Ebook Percakapan KBA:

"Alhamdulillah, saat bertransaksi dan berkegiatan di Tanah Suci menjadi jauh lebih percaya diri." (Pak Rahmat)

Siapkan bekal bahasa Arab Anda sekarang melalui tautan resmi berikut: 👇`,
  },
  {
    id: 'task-3',
    title: 'Posting Promo Bundling 3 Kamus Logat Saudi (Tugas Lampau)',
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
    title: 'Edu-Post: 5 Kosakata Ammiyah Harian (Tugas Lampau)',
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
    title: 'Posting Promo Flash Sale Akhir Pekan (Mendatang)',
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
    title: 'Posting Materi Kosakata Harian (Bulan Lalu)',
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
