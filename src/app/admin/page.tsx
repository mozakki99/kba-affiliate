'use client';

import React, { useState } from 'react';
import { useKBAStore } from '@/data/store';
import { ToastContainer, ToastMessage } from '@/components/ui/Toast';
import { ProductDetailModal } from '@/components/produk/ProductDetailModal';
import {
  ShieldCheck,
  UserCheck,
  UserX,
  Users,
  CheckCircle2,
  XCircle,
  PlusCircle,
  MessageSquare,
  Link as LinkIcon,
  Search,
  ExternalLink,
  Award,
  Layers,
  Sparkles,
  Calendar,
  Send,
  Lock,
  RefreshCw,
  Eye,
  FileText,
  Clock,
  Package,
  ChevronLeft,
  ChevronRight,
  Filter,
  Edit3,
  Check,
  AlertCircle,
  BookOpen,
  HelpCircle,
  Calculator,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { Product, ProductCategory } from '@/types';

export default function AdminPage() {
  const {
    registrations,
    affiliates,
    tasks,
    campaigns,
    products,
    user,
    approveRegistration,
    rejectRegistration,
    addNewTask,
    addNewCampaign,
    addNewProduct,
    updateProduct,
    resetDemoState,
  } = useKBAStore();

  const [activeTab, setActiveTab] = useState<'pendaftaran' | 'afiliator' | 'tugas' | 'produk' | 'kampanye'>('pendaftaran');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [regFilter, setRegFilter] = useState<'Semua' | 'Pending' | 'Disetujui' | 'Ditolak'>('Pending');

  // Approval Modal State
  const [selectedRegId, setSelectedRegId] = useState<string | null>(null);
  const [customAffId, setCustomAffId] = useState('');
  const [customPassword, setCustomPassword] = useState('');

  // --- KELOLA TUGAS STATES (DATE FILTER & PAGINATION) ---
  const [taskDateFilter, setTaskDateFilter] = useState<string>('Semua Tanggal');
  const [taskPage, setTaskPage] = useState<number>(1);
  const tasksPerPage = 5;

  // New Task Form Modal
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    productId: products[0]?.id || 'prod-1',
    productName: products[0]?.title || 'Ebook Percakapan Umrah',
    channel: 'WhatsApp Status' as any,
    type: 'Rutin' as any,
    publishDate: '2026-09-10', // Terbit tanggal
    points: 40,
    telegramMaterialUrl: '',
    caption: '',
    instructionsText: '1. Salin naskah promosi.\n2. Unggah ke WhatsApp Status.\n3. Centang absensi di portal.',
  });

  // --- KELOLA PRODUK & MATERI STATES (FULL DATA EDITING & PREVIEW) ---
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  // Product Form Input States (for Add & Edit)
  const [prodForm, setProdForm] = useState<{
    id?: string;
    title: string;
    slug: string;
    category: ProductCategory;
    priceSample: string;
    commissionSample: string;
    commissionTenSales: string;
    priceNumber: number;
    commissionNumber: number;
    targetAudience: string;
    benefitsText: string;
    contentsText: string;
    faqList: { question: string; answer: string }[];
    availabilityStatus: 'Tersedia' | 'Stok Terbatas' | 'Pendaftaran Dibuka';
    telegramChannelUrl: string;
    copywritingTitle: string;
    copywritingContent: string;
  }>({
    title: '',
    slug: '',
    category: 'Ebook & Kamus',
    priceSample: 'Rp 99.000',
    commissionSample: 'Rp 35.000 / penjualan',
    commissionTenSales: 'Rp 350.000',
    priceNumber: 99000,
    commissionNumber: 35000,
    targetAudience: 'Penuntut ilmu & pembelajar bahasa Arab harian.',
    benefitsText: 'Panduan 100+ kosakata penting di bandara, hotel, dan area pertokoan.\nDialog interaktif Arab-Indonesia yang dilengkapi transliterasi.\nBonus rekaman pengucapan audio langsung dari penutur asli (native speaker).',
    contentsText: 'Bab 1: Prosedur Imigrasi & Bandara Jeddah/Madinah\nBab 2: Komunikasi di Hotel & Layanan Pemesanan\nBab 3: Interaksi di Pertokoan & Tawar Menawar\nBab 4: Panduan Darurat & Petunjuk Arah Lengkap',
    faqList: [{ question: 'Apakah ebook ini dapat diakses dalam format PDF?', answer: 'Ya, PDF interaktif yang praktis dibaca di smartphone.' }],
    availabilityStatus: 'Tersedia',
    telegramChannelUrl: 'https://t.me/materi_kba_official',
    copywritingTitle: 'Narasi Promo Perdana',
    copywritingContent: 'Dapatkan materi eksklusif persembahan Kampus Bahasa Arab...',
  });

  // --- KELOLA KAMPANYE STATES ---
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    productId: products[0]?.id || 'prod-1',
    productName: products[0]?.title || 'Ebook Percakapan Umrah',
    offer: 'Diskon Spesial 30%',
    startDate: '2026-09-10',
    endDate: '2026-09-17',
    rules: 'Aturan umum promo kampanye KBA',
    bonus: 'Bonus 150rb untuk 10 terajin',
    status: 'Aktif' as const,
  });

  const addToast = (text: string, type: 'success' | 'error' | 'info') => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Approval Handlers
  const handleOpenApproveModal = (reg: any) => {
    setSelectedRegId(reg.id);
    setCustomAffId(`KBA-2026-${Math.floor(10 + Math.random() * 90)}`);
    setCustomPassword(`kba${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const handleConfirmApprove = () => {
    if (!selectedRegId) return;
    const res = approveRegistration(selectedRegId, customAffId.trim(), customPassword.trim());
    if (res) {
      addToast(`Akun ${res.affiliate.name} berhasil di-generate! (ID: ${res.affiliate.id})`, 'success');
    }
    setSelectedRegId(null);
  };

  const handleReject = (id: string, name: string) => {
    if (confirm(`Yakin ingin menolak pendaftaran dari ${name}?`)) {
      rejectRegistration(id);
      addToast(`Pendaftaran ${name} telah ditolak.`, 'info');
    }
  };

  // WA Credentials Link Generator
  const getWACredentialsLink = (reg: any) => {
    const phone = reg.phone.replace(/[^0-9]/g, '');
    const formattedPhone = phone.startsWith('0') ? `62${phone.slice(1)}` : phone;

    const message = `Ahlan wa Sahlan, ${reg.name}! 🎉
Pendaftaran Afiliator Kampus Bahasa Arab Anda telah *DISETUJUI*.

Berikut adalah data akses login Portal Afiliasi Anda:
🆔 *ID Afiliator:* ${reg.approvedAffiliateId}
🔑 *Password:* ${reg.generatedPassword}
🌐 *Link Login Portal:* https://aff-kba.pages.dev/auth

Silakan masuk ke portal untuk mulai menjalankan tugas promosi, mengklaim poin keaktifan, dan komisi Anda. Jazakumullahu khairan!`;

    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  };

  // Create New Task Submit (with publishDate)
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return addToast('Isikan judul tugas.', 'error');

    const selectedProd = products.find((p) => p.id === newTask.productId);
    const pubDateObj = new Date(newTask.publishDate || Date.now());
    const formattedPubDate = pubDateObj.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const deadlineText = `Terbit ${formattedPubDate} s/d 23:59 WIB`;

    addNewTask({
      title: newTask.title.trim(),
      productId: newTask.productId,
      productName: selectedProd?.title || newTask.productName,
      channel: newTask.channel,
      type: newTask.type,
      publishDate: newTask.publishDate,
      deadline: deadlineText,
      points: Number(newTask.points) || 40,
      telegramMaterialUrl: newTask.telegramMaterialUrl.trim() || 'https://t.me/materi_kba_official',
      caption: newTask.caption.trim(),
      instructions: newTask.instructionsText.split('\n').filter((l) => l.trim().length > 0),
    });

    addToast(`Tugas baru berhasil diterbitkan untuk tanggal ${formattedPubDate}!`, 'success');
    setShowNewTaskModal(false);
  };

  // Open Edit Product Modal with Full Data Pre-populated
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProdForm({
      id: prod.id,
      title: prod.title,
      slug: prod.slug,
      category: prod.category,
      priceSample: prod.priceSample,
      commissionSample: prod.commissionSample,
      commissionTenSales: prod.commissionTenSales || 'Rp 350.000',
      priceNumber: prod.priceNumber || 99000,
      commissionNumber: prod.commissionNumber || 35000,
      targetAudience: prod.targetAudience,
      benefitsText: prod.benefits.join('\n'),
      contentsText: prod.contents.join('\n'),
      faqList: prod.faq && prod.faq.length > 0 ? prod.faq : [{ question: 'Apakah berbentuk PDF?', answer: 'Ya, PDF interaktif.' }],
      availabilityStatus: prod.availabilityStatus,
      telegramChannelUrl: prod.telegramChannelUrl || '',
      copywritingTitle: prod.generalCopywriting?.[0]?.title || 'Narasi Promo Perdana',
      copywritingContent: prod.generalCopywriting?.[0]?.content || prod.title,
    });
  };

  // Save Full Product Changes (Create or Edit)
  const handleSaveFullProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.title.trim()) return addToast('Mohon isikan nama produk.', 'error');

    const benefitsArray = prodForm.benefitsText.split('\n').filter((b) => b.trim().length > 0);
    const contentsArray = prodForm.contentsText.split('\n').filter((c) => c.trim().length > 0);

    const copywritingData = [
      {
        id: `copy-${Date.now()}`,
        title: prodForm.copywritingTitle || 'Narasi Promosi Utama',
        content: prodForm.copywritingContent || prodForm.title,
      },
    ];

    if (editingProduct) {
      // UPDATE EXISTING PRODUCT
      updateProduct(editingProduct.id, {
        title: prodForm.title.trim(),
        slug: prodForm.slug.trim() || prodForm.title.toLowerCase().replace(/\s+/g, '-'),
        category: prodForm.category,
        priceSample: prodForm.priceSample,
        commissionSample: prodForm.commissionSample,
        commissionTenSales: prodForm.commissionTenSales,
        priceNumber: Number(prodForm.priceNumber) || 99000,
        commissionNumber: Number(prodForm.commissionNumber) || 35000,
        targetAudience: prodForm.targetAudience.trim(),
        benefits: benefitsArray,
        contents: contentsArray,
        faq: prodForm.faqList,
        availabilityStatus: prodForm.availabilityStatus,
        telegramChannelUrl: prodForm.telegramChannelUrl.trim(),
        generalCopywriting: copywritingData,
        lastUpdated: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      });
      addToast(`Produk "${prodForm.title}" berhasil diperbarui selengkapnya!`, 'success');
      setEditingProduct(null);
    } else {
      // ADD NEW PRODUCT
      const created = addNewProduct({
        title: prodForm.title.trim(),
        slug: prodForm.slug.trim() || prodForm.title.toLowerCase().replace(/\s+/g, '-'),
        category: prodForm.category,
        priceSample: prodForm.priceSample,
        commissionSample: prodForm.commissionSample,
        commissionTenSales: prodForm.commissionTenSales,
        priceNumber: Number(prodForm.priceNumber) || 99000,
        commissionNumber: Number(prodForm.commissionNumber) || 35000,
        targetAudience: prodForm.targetAudience.trim(),
        benefits: benefitsArray,
        contents: contentsArray,
        faq: prodForm.faqList,
        availabilityStatus: prodForm.availabilityStatus,
        telegramChannelUrl: prodForm.telegramChannelUrl.trim(),
        generalCopywriting: copywritingData,
        lastUpdated: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      });
      addToast(`Produk baru "${created.title}" berhasil diterbitkan!`, 'success');
      setShowNewProductModal(false);
    }
  };

  // Add FAQ Item in Form
  const handleAddFaqItem = () => {
    setProdForm((prev) => ({
      ...prev,
      faqList: [...prev.faqList, { question: '', answer: '' }],
    }));
  };

  // Remove FAQ Item in Form
  const handleRemoveFaqItem = (index: number) => {
    setProdForm((prev) => ({
      ...prev,
      faqList: prev.faqList.filter((_, i) => i !== index),
    }));
  };

  // Add Campaign Submit
  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaign.title.trim()) return addToast('Isikan nama kampanye.', 'error');

    const selectedProd = products.find((p) => p.id === newCampaign.productId);

    addNewCampaign({
      title: newCampaign.title.trim(),
      productId: newCampaign.productId,
      productName: selectedProd?.title || newCampaign.productName,
      offer: newCampaign.offer.trim(),
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate,
      rules: newCampaign.rules,
      bonus: newCampaign.bonus,
      status: newCampaign.status,
      platforms: ['Instagram Story', 'WhatsApp Status', 'Grup WhatsApp'],
      tasksSequence: [
        {
          day: 1,
          title: `Promosi Perdana ${newCampaign.title}`,
          description: newCampaign.offer,
          points: 50,
        },
      ],
    });

    addToast('Kampanye baru berhasil dibuat!', 'success');
    setShowNewCampaignModal(false);
  };

  // --- FILTER & PAGINATION FOR TUGAS ---
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.channel.toLowerCase().includes(searchTerm.toLowerCase());

    if (taskDateFilter === 'Semua Tanggal') return matchesSearch;
    if (taskDateFilter === 'Hari Ini') return matchesSearch && (t.deadline.includes('Hari ini') || (t.publishDate && t.publishDate.includes('2026-09-09')));
    return matchesSearch && t.publishDate === taskDateFilter;
  });

  const totalTaskPages = Math.ceil(filteredTasks.length / tasksPerPage) || 1;
  const paginatedTasks = filteredTasks.slice((taskPage - 1) * tasksPerPage, taskPage * tasksPerPage);

  // Filtered Registrations
  const filteredRegs = registrations.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm) ||
      r.lynkIdUsername.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = regFilter === 'Semua' || r.status === regFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = registrations.filter((r) => r.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-16">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Admin Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center font-black text-amber-400 shadow">
              KBA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-sm sm:text-lg tracking-tight text-white">
                  Dashboard Administrator
                </h1>
                <span className="px-2 py-0.5 bg-blue-900/80 text-amber-400 border border-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Admin Portal
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Pusat Kendali Afiliasi Kampus Bahasa Arab
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span>Portal Afiliator</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={resetDemoState}
              title="Reset Data Demo"
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('pendaftaran')}
            className={`flex-1 min-w-[130px] py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'pendaftaran'
                ? 'bg-blue-800 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Pendaftaran</span>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 bg-amber-400 text-slate-950 rounded-full text-xs font-extrabold animate-pulse">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('afiliator')}
            className={`flex-1 min-w-[130px] py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'afiliator'
                ? 'bg-blue-800 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Afiliator ({affiliates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tugas')}
            className={`flex-1 min-w-[130px] py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'tugas'
                ? 'bg-blue-800 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Kelola Tugas ({tasks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('produk')}
            className={`flex-1 min-w-[130px] py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'produk'
                ? 'bg-blue-800 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Produk & Materi ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('kampanye')}
            className={`flex-1 min-w-[130px] py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'kampanye'
                ? 'bg-blue-800 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Kampanye</span>
            <span className="px-1.5 py-0.5 bg-amber-400 text-slate-950 rounded text-[10px] font-black uppercase">
              Mendatang
            </span>
          </button>
        </div>

        {/* TAB 1: PENDAFTARAN BARU & APPROVAL */}
        {activeTab === 'pendaftaran' && (
          <div className="space-y-4">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Menunggu Review</p>
                  <p className="text-2xl font-black text-amber-600">{pendingCount} Pendaftar</p>
                </div>
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Telah Disetujui</p>
                  <p className="text-2xl font-black text-emerald-600">
                    {registrations.filter((r) => r.status === 'Disetujui').length} Afiliator
                  </p>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Pendaftaran</p>
                  <p className="text-2xl font-black text-blue-900">{registrations.length} Pengajuan</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-800">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Cari nama, WA, atau Lynk.id..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                {(['Pending', 'Disetujui', 'Ditolak', 'Semua'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setRegFilter(filter)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                      regFilter === filter
                        ? 'bg-blue-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Applicants List */}
            {filteredRegs.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-slate-600 text-sm font-medium">Tidak ada data pendaftaran yang cocok.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRegs.map((reg) => (
                  <div
                    key={reg.id}
                    className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all shadow-sm space-y-4 ${
                      reg.status === 'Pending'
                        ? 'border-amber-300 ring-1 ring-amber-200/50'
                        : reg.status === 'Disetujui'
                        ? 'border-emerald-200'
                        : 'border-slate-200 opacity-75'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-slate-900">{reg.name}</h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                              reg.status === 'Pending'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : reg.status === 'Disetujui'
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {reg.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          ID Pendaftaran: <span className="font-mono">{reg.id}</span> • Daftar: {reg.registeredAt}
                        </p>
                      </div>

                      {reg.status === 'Disetujui' && (
                        <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex items-center gap-3">
                          <div>
                            <span className="text-emerald-800 font-semibold block text-[10px]">Akses Terbit:</span>
                            <span className="font-mono font-extrabold text-emerald-950">ID: {reg.approvedAffiliateId}</span>
                            <span className="font-mono text-slate-600 ml-2">Pass: {reg.generatedPassword}</span>
                          </div>

                          <a
                            href={getWACredentialsLink(reg)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Kirim Akses WA</span>
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="font-bold text-slate-700 block uppercase text-[10px]">Identitas & Kontak</span>
                        <p className="text-slate-800">📱 WA: <span className="font-mono font-bold text-blue-900">{reg.phone}</span></p>
                        <p className="text-slate-800">🎂 Usia: {reg.age} Tahun</p>
                        <p className="text-slate-800">💼 Aktivitas: {reg.dailyActivity}</p>
                        <p className="text-slate-700 text-[11px] line-clamp-2">📍 {reg.address}</p>
                      </div>

                      <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="font-bold text-slate-700 block uppercase text-[10px]">Status Lynk.id (Komisi)</span>
                        <p className="text-slate-800">
                          Status: {reg.hasLynkId ? <span className="text-emerald-700 font-bold">Sudah Punya</span> : <span className="text-amber-700 font-bold">Belum Punya</span>}
                        </p>
                        {reg.lynkIdUsername && (
                          <div className="pt-1">
                            <span className="text-[10px] text-slate-500 block">Link Komisi Afiliator:</span>
                            <a
                              href={`https://lynk.id/${reg.lynkIdUsername}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono font-bold text-blue-800 hover:underline inline-flex items-center gap-1 text-xs"
                            >
                              lynk.id/{reg.lynkIdUsername}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="font-bold text-slate-700 block uppercase text-[10px]">Medsos & WA Viewers</span>
                        <p className="text-slate-800">📸 Instagram: <span className="font-semibold">{reg.instagram || '-'}</span> ({reg.instagramFollowers || '0'} followers)</p>
                        <p className="text-slate-800">✈️ Telegram: <span className="font-semibold">{reg.telegramUsername || '-'}</span> ({reg.telegramFollowers || '0'})</p>
                        <p className="text-slate-800">💬 WA Viewers: <span className="font-bold text-emerald-800">{reg.waAverageViewers || '-'}</span></p>
                      </div>
                    </div>

                    {reg.status === 'Pending' && (
                      <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                        <button
                          onClick={() => handleReject(reg.id, reg.name)}
                          className="px-4 py-2 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                        >
                          <UserX className="w-4 h-4" />
                          <span>Tolak</span>
                        </button>

                        <button
                          onClick={() => handleOpenApproveModal(reg)}
                          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-md flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve & Generate Akun</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: KELOLA AFILIATOR */}
        {activeTab === 'afiliator' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
              <div>
                <h2 className="font-bold text-base text-slate-900">Daftar Afiliator Resmi KBA</h2>
                <p className="text-xs text-slate-500">
                  Total {affiliates.length} Afiliator aktif yang dapat mengakses portal & mengumpulkan poin.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Cari ID atau nama afiliator..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3.5 px-4">ID Afiliator</th>
                      <th className="py-3.5 px-4">Nama & WA</th>
                      <th className="py-3.5 px-4">Username Lynk.id</th>
                      <th className="py-3.5 px-4">Total Poin</th>
                      <th className="py-3.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {affiliates
                      .filter(
                        (a) =>
                          a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.phone.includes(searchTerm)
                      )
                      .map((aff) => (
                        <tr key={aff.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-extrabold text-blue-900">{aff.id}</td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 block">{aff.name}</span>
                            <span className="text-[11px] text-slate-500">{aff.phone}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-mono text-blue-800 font-bold bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 inline-block">
                              lynk.id/{aff.lynkIdUsername || 'afiliator'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-emerald-800">
                            ⭐ {aff.totalPoints || 0} Poin
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-[10px] font-bold">
                              {aff.statusAccount || 'Aktif'}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KELOLA TUGAS */}
        {activeTab === 'tugas' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="font-bold text-base text-slate-900">Kelola & Penjadwalan Tugas</h2>
                <p className="text-xs text-slate-500">
                  Atur tanggal terbit tugas. Di portal afiliator, tugas terbit mulai tanggal tersebut s/d 23:59 WIB.
                </p>
              </div>

              <button
                onClick={() => setShowNewTaskModal(true)}
                className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Buat Tugas Baru</span>
              </button>
            </div>

            {/* Date Filter & Search Control */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center text-xs">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Cari judul tugas / produk..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setTaskPage(1);
                  }}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                  <Filter className="w-4 h-4 text-blue-700" />
                  <span>Terbit Tanggal:</span>
                </div>
                <select
                  value={taskDateFilter}
                  onChange={(e) => {
                    setTaskDateFilter(e.target.value);
                    setTaskPage(1);
                  }}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-blue-900 outline-none"
                >
                  <option value="Semua Tanggal">Semua Tanggal</option>
                  <option value="Hari Ini">Hari Ini (09 Sep 2026)</option>
                  <option value="2026-09-10">10 Sep 2026 (Besok)</option>
                  <option value="2026-09-11">11 Sep 2026</option>
                  <option value="2026-09-12">12 Sep 2026</option>
                </select>
              </div>
            </div>

            {/* Paginated Tasks Grid */}
            {paginatedTasks.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-2">
                <Layers className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-slate-600 text-sm font-medium">Tidak ada tugas ditemukan untuk filter ini.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedTasks.map((task) => (
                  <div key={task.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-full text-[10px] font-bold">
                        {task.type} • {task.channel}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        +{task.points} Poin
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900">{task.title}</h3>
                    <p className="text-xs text-slate-500">Produk: {task.productName}</p>

                    <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs flex items-center justify-between text-amber-950">
                      <span className="font-semibold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        Jadwal Terbit:
                      </span>
                      <span className="font-bold font-mono text-amber-900">{task.deadline}</span>
                    </div>

                    {task.caption && (
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-700 font-mono line-clamp-3">
                        {task.caption}
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                      <span className="font-mono text-[11px]">ID: {task.id}</span>
                      {task.telegramMaterialUrl && (
                        <a
                          href={task.telegramMaterialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 font-bold hover:underline flex items-center gap-1"
                        >
                          Material Telegram <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalTaskPages > 1 && (
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">
                  Menampilkan Halaman <strong className="text-slate-900">{taskPage}</strong> dari <strong className="text-slate-900">{totalTaskPages}</strong> ({filteredTasks.length} tugas)
                </span>

                <div className="flex items-center gap-2">
                  <button
                    disabled={taskPage === 1}
                    onClick={() => setTaskPage((p) => Math.max(p - 1, 1))}
                    className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={taskPage === totalTaskPages}
                    onClick={() => setTaskPage((p) => Math.min(p + 1, totalTaskPages))}
                    className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: KELOLA PRODUK & MATERI (100% SINKRON DENGAN DATA PORTAL AFILIATOR) */}
        {activeTab === 'produk' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="font-bold text-base text-slate-900">Kelola Produk & Materi Promosi (Lengkap)</h2>
                <p className="text-xs text-slate-500">
                  Kelola seluruh elemen data produk (Knowledge, Manfaat, Silabus, FAQ, Narasi Iklan, dan Telegram).
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProdForm({
                    title: '',
                    slug: '',
                    category: 'Ebook & Kamus',
                    priceSample: 'Rp 99.000',
                    commissionSample: 'Rp 35.000 / penjualan',
                    commissionTenSales: 'Rp 350.000',
                    priceNumber: 99000,
                    commissionNumber: 35000,
                    targetAudience: 'Penuntut ilmu & pembelajar bahasa Arab harian.',
                    benefitsText: 'Panduan 100+ kosakata penting di bandara, hotel, dan area pertokoan.\nDialog interaktif Arab-Indonesia yang dilengkapi transliterasi.\nBonus rekaman pengucapan audio langsung dari penutur asli (native speaker).',
                    contentsText: 'Bab 1: Prosedur Imigrasi & Bandara Jeddah/Madinah\nBab 2: Komunikasi di Hotel & Layanan Pemesanan\nBab 3: Interaksi di Pertokoan & Tawar Menawar\nBab 4: Panduan Darurat & Petunjuk Arah Lengkap',
                    faqList: [{ question: 'Apakah ebook ini dapat diakses dalam format PDF?', answer: 'Ya, PDF interaktif yang praktis dibaca di smartphone.' }],
                    availabilityStatus: 'Tersedia',
                    telegramChannelUrl: 'https://t.me/materi_kba_official',
                    copywritingTitle: 'Narasi Promo Perdana',
                    copywritingContent: 'Dapatkan materi eksklusif persembahan Kampus Bahasa Arab...',
                  });
                  setShowNewProductModal(true);
                }}
                className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Tambah Produk Baru</span>
              </button>
            </div>

            {/* Rich Product Cards */}
            <div className="space-y-6">
              {products.map((prod) => (
                <div key={prod.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-5">
                  {/* Top Bar Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-full text-[10px] font-bold">
                          {prod.category}
                        </span>
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-[10px] font-extrabold uppercase">
                          {prod.availabilityStatus}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-lg text-slate-900">{prod.title}</h3>
                      <p className="text-xs font-mono text-slate-500">ID: {prod.id} • Slug: {prod.slug}</p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        onClick={() => setPreviewProduct(prod)}
                        className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Preview Modal Afiliator</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditProduct(prod)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit Produk Lengkap</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Details Overview Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Price & Commission Details */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                      <span className="font-bold text-slate-700 block uppercase text-[10px] border-b border-slate-200 pb-1">
                        💰 Harga & Komisi Sales
                      </span>
                      <p className="text-slate-800">Harga Resmi: <span className="font-bold text-slate-900">{prod.priceSample}</span></p>
                      <p className="text-emerald-800">Komisi 1 Sales: <span className="font-extrabold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">{prod.commissionSample}</span></p>
                      <p className="text-blue-900 font-bold pt-1 border-t border-slate-200">Estimasi 10 Sales: <span className="text-blue-950 font-extrabold">🎁 {prod.commissionTenSales || 'Rp 350.000'}</span></p>
                    </div>

                    {/* Target Audience & Telegram */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                      <span className="font-bold text-slate-700 block uppercase text-[10px] border-b border-slate-200 pb-1">
                        🎯 Target Pembeli & Material Telegram
                      </span>
                      <p className="text-slate-800 line-clamp-3"><strong className="text-slate-900">Target Market:</strong> {prod.targetAudience}</p>
                      {prod.telegramChannelUrl && (
                        <a
                          href={prod.telegramChannelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-sky-700 hover:underline flex items-center gap-1 text-xs pt-1 border-t border-slate-200"
                        >
                          <Send className="w-3.5 h-3.5 text-sky-600" />
                          <span>Channel Telegram Material ↗</span>
                        </a>
                      )}
                    </div>

                    {/* Copywriting Preview */}
                    <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-2">
                      <span className="font-bold text-blue-950 block uppercase text-[10px] border-b border-blue-200 pb-1">
                        📝 Narasi Iklan Evergreen ({prod.generalCopywriting?.length || 0})
                      </span>
                      {prod.generalCopywriting && prod.generalCopywriting.length > 0 ? (
                        <div>
                          <p className="font-bold text-blue-900 text-xs">{prod.generalCopywriting[0].title}</p>
                          <p className="text-slate-700 font-mono text-[11px] line-clamp-3 mt-1 bg-white p-2 rounded border border-blue-100">
                            {prod.generalCopywriting[0].content}
                          </p>
                        </div>
                      ) : (
                        <p className="text-slate-500 italic">Belum ada narasi khusus diset.</p>
                      )}
                    </div>
                  </div>

                  {/* Expandable Benefits & Syllabus Accordion */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <span className="font-bold text-slate-800 block text-[11px] uppercase">
                        ✅ Keunggulan Utama ({prod.benefits.length} Poin)
                      </span>
                      <ul className="space-y-1 text-slate-700 pl-1">
                        {prod.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <span className="font-bold text-slate-800 block text-[11px] uppercase">
                        📚 Silabus / Daftar Isi ({prod.contents.length} Bab)
                      </span>
                      <div className="font-mono text-slate-700 space-y-1">
                        {prod.contents.map((c, idx) => (
                          <p key={idx}>• {c}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: KELOLA KAMPANYE */}
        {activeTab === 'kampanye' && (
          <div className="space-y-4">
            {/* Fitur Mendatang Notice Banner */}
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-3 text-xs text-amber-950">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-amber-900">📌 Fitur Kampanye Diskon (Fitur Mendatang)</h3>
                  <span className="px-2 py-0.5 bg-amber-200 text-amber-950 rounded text-[10px] font-black uppercase">
                    Dalam Pengembangan Konsep
                  </span>
                </div>
                <p className="leading-relaxed">
                  Fitur ini disiapkan untuk merilis event promosi berseri terbatas (seperti <em>Flash Sale Pekan Umrah</em>) dengan tantangan berseri, poin ganda, dan bonus uang tunai untuk 10 afiliator terajin. Anda tetap dapat mencoba membuat draf simulasi kampanye di bawah ini untuk melihat gambaran alurnya.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="font-bold text-base text-slate-900">Simulasi Kelola Kampanye Komisi</h2>
                <p className="text-xs text-slate-500">
                  Draf kampanye promo yang siap dirilis saat fitur ini aktif penuh.
                </p>
              </div>

              <button
                onClick={() => setShowNewCampaignModal(true)}
                className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Buat Draf Kampanye Baru</span>
              </button>
            </div>

            <div className="space-y-4">
              {campaigns.map((camp) => (
                <div key={camp.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">{camp.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Produk: {camp.productName}</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-xs font-extrabold uppercase">
                      {camp.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-xl">
                      <span className="font-bold text-blue-950 block">Penawaran Promo:</span>
                      <p className="text-slate-800 font-semibold">{camp.offer}</p>
                    </div>
                    <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl">
                      <span className="font-bold text-amber-950 block">Bonus Keaktifan:</span>
                      <p className="text-slate-800 font-semibold">{camp.bonus}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* PREVIEW PRODUCT MODAL FOR ADMIN */}
      {previewProduct && (
        <ProductDetailModal
          product={previewProduct}
          userLynkId={user.lynkIdUsername || 'ahmad'}
          onClose={() => setPreviewProduct(null)}
          onShowToast={addToast}
        />
      )}

      {/* APPROVAL & CREDENTIALS MODAL */}
      {selectedRegId && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Approve & Terbitkan Akun</span>
              </h3>
              <button
                onClick={() => setSelectedRegId(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Sistem akan memverifikasi pendaftaran dan menerbitkan data login resmi berikut:
            </p>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">ID Afiliator Resmi *</label>
                <input
                  type="text"
                  value={customAffId}
                  onChange={(e) => setCustomAffId(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-blue-900 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Password Awal *</label>
                <input
                  type="text"
                  value={customPassword}
                  onChange={(e) => setCustomPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedRegId(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmApprove}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Terbitkan Akun Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW TASK MODAL (WITH RELEASE DATE) */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateTask}
            className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">Buat & Jadwalkan Tugas Baru</h3>
              <button type="button" onClick={() => setShowNewTaskModal(false)} className="text-slate-400">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-slate-700">Judul Tugas *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Posting Materi Edukasi Kosakata Umrah"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Terbit Tanggal (Release Date) *</label>
                <input
                  type="date"
                  required
                  value={newTask.publishDate}
                  onChange={(e) => setNewTask({ ...newTask, publishDate: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-blue-300 rounded-xl outline-none font-bold text-blue-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Channel Post</label>
                <select
                  value={newTask.channel}
                  onChange={(e) => setNewTask({ ...newTask, channel: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                >
                  <option value="WhatsApp Status">WhatsApp Status</option>
                  <option value="Instagram Story">Instagram Story</option>
                  <option value="Grup WhatsApp">Grup WhatsApp</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Produk Terkait</label>
                <select
                  value={newTask.productId}
                  onChange={(e) => setNewTask({ ...newTask, productId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Poin Rajin (Dasar)</label>
                <input
                  type="number"
                  value={newTask.points}
                  onChange={(e) => setNewTask({ ...newTask, points: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-emerald-800"
                />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-slate-700">Link Telegram Materi</label>
              <input
                type="text"
                placeholder="https://t.me/materi_kba_official/12"
                value={newTask.telegramMaterialUrl}
                onChange={(e) => setNewTask({ ...newTask, telegramMaterialUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-slate-700">Draft Caption Promosi</label>
              <textarea
                rows={3}
                placeholder="Naskah promosi yang tinggal disalin afiliator..."
                value={newTask.caption}
                onChange={(e) => setNewTask({ ...newTask, caption: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono text-xs"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setShowNewTaskModal(false)}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Terbitkan Tugas</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FULL PRODUCT EDIT / ADD MODAL */}
      {(showNewProductModal || editingProduct) && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveFullProduct}
            className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-800" />
                <span>{editingProduct ? `Edit Produk Lengkap: ${editingProduct.title}` : 'Tambah Produk Digital Baru'}</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowNewProductModal(false);
                  setEditingProduct(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* 1. Basic Info & Category */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
                1. Informasi Dasar Produk
              </h4>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-700">Nama Produk *</label>
                <input
                  type="text"
                  required
                  placeholder="Ebook Percakapan Umrah Mandiri"
                  value={prodForm.title}
                  onChange={(e) => setProdForm({ ...prodForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Slug URL (lynk.id/.../slug)</label>
                  <input
                    type="text"
                    placeholder="ebook-umrah"
                    value={prodForm.slug}
                    onChange={(e) => setProdForm({ ...prodForm, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-blue-900 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Kategori</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="Ebook & Kamus">Ebook & Kamus</option>
                    <option value="Kelas">Kelas Digital</option>
                    <option value="Produk digital lainnya">Produk Digital Lainnya</option>
                    <option value="Materi gratis">Materi Gratis</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Status Ketersediaan</label>
                  <select
                    value={prodForm.availabilityStatus}
                    onChange={(e) => setProdForm({ ...prodForm, availabilityStatus: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                  >
                    <option value="Tersedia">Tersedia</option>
                    <option value="Stok Terbatas">Stok Terbatas</option>
                    <option value="Pendaftaran Dibuka">Pendaftaran Dibuka</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Pricing & Commissions */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
                2. Harga & Nilai Komisi
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Harga Resmi (Teks)</label>
                  <input
                    type="text"
                    value={prodForm.priceSample}
                    onChange={(e) => setProdForm({ ...prodForm, priceSample: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Komisi 1 Sales (Teks)</label>
                  <input
                    type="text"
                    value={prodForm.commissionSample}
                    onChange={(e) => setProdForm({ ...prodForm, commissionSample: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-800 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Bonus 10 Sales (Teks)</label>
                  <input
                    type="text"
                    value={prodForm.commissionTenSales}
                    onChange={(e) => setProdForm({ ...prodForm, commissionTenSales: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-blue-900 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Product Knowledge (Target Market, Benefits, Contents, FAQ) */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
                3. Product Knowledge (Manfaat & Silabus)
              </h4>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-700">Target Pembeli Ideal (Market Fit) *</label>
                <input
                  type="text"
                  required
                  value={prodForm.targetAudience}
                  onChange={(e) => setProdForm({ ...prodForm, targetAudience: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Keunggulan & Manfaat (1 per baris)</label>
                  <textarea
                    rows={4}
                    value={prodForm.benefitsText}
                    onChange={(e) => setProdForm({ ...prodForm, benefitsText: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Daftar Isi / Silabus (1 per baris)</label>
                  <textarea
                    rows={4}
                    value={prodForm.contentsText}
                    onChange={(e) => setProdForm({ ...prodForm, contentsText: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono text-xs"
                  />
                </div>
              </div>

              {/* FAQ Section */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700 text-xs">FAQ Pertanyaan Pembeli ({prodForm.faqList.length})</label>
                  <button
                    type="button"
                    onClick={handleAddFaqItem}
                    className="text-xs text-blue-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Tambah Q&A</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {prodForm.faqList.map((faq, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          placeholder="Pertanyaan (Q:...)"
                          value={faq.question}
                          onChange={(e) => {
                            const updatedFaq = [...prodForm.faqList];
                            updatedFaq[idx].question = e.target.value;
                            setProdForm({ ...prodForm, faqList: updatedFaq });
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFaqItem(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Jawaban (A:...)"
                        value={faq.answer}
                        onChange={(e) => {
                          const updatedFaq = [...prodForm.faqList];
                          updatedFaq[idx].answer = e.target.value;
                          setProdForm({ ...prodForm, faqList: updatedFaq });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Telegram & Copywriting Script */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
                4. Material Telegram & Narasi Iklan Evergreen
              </h4>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-700">Link Telegram Channel Material Promo</label>
                <input
                  type="text"
                  placeholder="https://t.me/materi_kba_official"
                  value={prodForm.telegramChannelUrl}
                  onChange={(e) => setProdForm({ ...prodForm, telegramChannelUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="space-y-2 text-xs">
                <label className="font-bold text-slate-700">Judul Narasi Iklan</label>
                <input
                  type="text"
                  value={prodForm.copywritingTitle}
                  onChange={(e) => setProdForm({ ...prodForm, copywritingTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                />

                <label className="font-bold text-slate-700 block">Teks Narasi Iklan (Evergreen)</label>
                <textarea
                  rows={4}
                  value={prodForm.copywritingContent}
                  onChange={(e) => setProdForm({ ...prodForm, copywritingContent: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono text-xs"
                />
              </div>
            </div>

            {/* Submit Action Bar */}
            <div className="pt-3 border-t border-slate-200 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowNewProductModal(false);
                  setEditingProduct(null);
                }}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simpan Seluruh Data Produk</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* NEW CAMPAIGN MODAL */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateCampaign}
            className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">Buat Kampanye Komisi Baru</h3>
              <button type="button" onClick={() => setShowNewCampaignModal(false)} className="text-slate-400">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-slate-700">Nama Kampanye *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Pekan Promo Bundling Saudi"
                value={newCampaign.title}
                onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-slate-700">Penawaran Promo *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Diskon 30% + Bonus Audio"
                value={newCampaign.offer}
                onChange={(e) => setNewCampaign({ ...newCampaign, offer: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-slate-700">Bonus Keaktifan</label>
              <input
                type="text"
                placeholder="Contoh: Total 150rb untuk 10 terajin"
                value={newCampaign.bonus}
                onChange={(e) => setNewCampaign({ ...newCampaign, bonus: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setShowNewCampaignModal(false)}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Terbitkan Kampanye
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
