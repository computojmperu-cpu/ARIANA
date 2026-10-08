/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ActiveView,
  User,
  UserRole,
  Publication,
  Category,
  Order,
  Report,
  OrderStatus,
  PublicationType,
  PublicationAvailability
} from './types';
import {
  initStorage,
  getStoredCategories,
  saveStoredCategories,
  getStoredUsers,
  saveStoredUsers,
  getStoredPublications,
  saveStoredPublications,
  getStoredOrders,
  saveStoredOrders,
  getStoredReports,
  saveStoredReports,
  getStoredCurrentUserId,
  saveStoredCurrentUserId,
  resetStorageToDefaults
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ExploreView } from './components/ExploreView';
import { DetailView } from './components/DetailView';
import { ClientView } from './components/ClientView';
import { EntrepreneurView } from './components/EntrepreneurView';
import { AdminView } from './components/AdminView';
import { OrderModal } from './components/OrderModal';
import { ReportModal } from './components/ReportModal';
import { NewPublicationModal } from './components/NewPublicationModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // 1. Initial Storage bootstrap
  useEffect(() => {
    initStorage();
  }, []);

  const [categories, setCategories] = useState<Category[]>(() => getStoredCategories());
  const [users, setUsers] = useState<User[]>(() => getStoredUsers());
  const [publications, setPublications] = useState<Publication[]>(() => getStoredPublications());
  const [orders, setOrders] = useState<Order[]>(() => getStoredOrders());
  const [reports, setReports] = useState<Report[]>(() => getStoredReports());

  const [currentUserId, setCurrentUserId] = useState<string>(() => getStoredCurrentUserId());
  const currentUser: User =
    users.find((u) => u.id === currentUserId) || users[0] || {
      id: 'u1',
      name: 'Visita Libre',
      email: 'invitado@edu.pe',
      role: 'guest',
      status: 'activo'
    };

  // 2. Navigation State
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [selectedPublicationId, setSelectedPublicationId] = useState<string | null>('p1');
  const [exploreInitialCategory, setExploreInitialCategory] = useState<string>('all');

  // 3. Modals State
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderModalPub, setOrderModalPub] = useState<Publication | null>(null);

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportModalPub, setReportModalPub] = useState<Publication | null>(null);

  const [newPubModalOpen, setNewPubModalOpen] = useState(false);

  // 4. Notification Toast (replaces window.alert for clean UX)
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync state helpers
  const updateUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    saveStoredUsers(newUsers);
  };

  const updatePublications = (newPubs: Publication[]) => {
    setPublications(newPubs);
    saveStoredPublications(newPubs);
  };

  const updateOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    saveStoredOrders(newOrders);
  };

  const updateReports = (newReports: Report[]) => {
    setReports(newReports);
    saveStoredReports(newReports);
  };

  const updateCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    saveStoredCategories(newCategories);
  };

  // Navigation router
  const navigateTo = (view: ActiveView, param?: string) => {
    setCurrentView(view);
    if (param && view === 'detail') {
      setSelectedPublicationId(param);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Role Switcher
  const changeSimulatedRole = (roleKey: UserRole) => {
    const target = users.find((u) => u.role === roleKey);
    if (target) {
      setCurrentUserId(target.id);
      saveStoredCurrentUserId(target.id);
      showToast(`Rol simulado cambiado a: ${target.name} (${roleKey.toUpperCase()})`, 'info');
      navigateTo('home');
    }
  };

  // Reset to initial mock data
  const handleResetData = () => {
    resetStorageToDefaults();
    setCategories(getStoredCategories());
    setUsers(getStoredUsers());
    setPublications(getStoredPublications());
    setOrders(getStoredOrders());
    setReports(getStoredReports());
    setCurrentUserId('u1');
    showToast('Datos mock restablecidos a la configuración inicial.', 'info');
    navigateTo('home');
  };

  // Category filter from home
  const handleCategorySelectFromHome = (catId: string) => {
    setExploreInitialCategory(catId);
    navigateTo('explore');
  };

  // Publication detail opener
  const handleSelectPublication = (pubId: string) => {
    setSelectedPublicationId(pubId);
    navigateTo('detail', pubId);
  };

  // Order modal triggers
  const handleOpenOrderModal = (pubId: string) => {
    const pub = publications.find((p) => p.id === pubId);
    if (pub) {
      setOrderModalPub(pub);
      setOrderModalOpen(true);
    }
  };

  const handleSubmitOrder = (pubId: string, quantity: number, notes: string) => {
    const pub = publications.find((p) => p.id === pubId);
    if (!pub) return;

    const newOrder: Order = {
      id: 'o' + (orders.length + 1),
      clientId: currentUser.id,
      entrepreneurId: pub.userId,
      publicationId: pubId,
      quantity,
      notes,
      status: 'Pendiente',
      date: new Date().toISOString().split('T')[0]
    };

    const newOrders = [newOrder, ...orders];
    updateOrders(newOrders);
    setOrderModalOpen(false);
    showToast('¡Solicitud de pedido enviada con éxito!');
    navigateTo('client');
  };

  // Report modal triggers
  const handleOpenReportModal = (pubId: string) => {
    const pub = publications.find((p) => p.id === pubId);
    if (pub) {
      setReportModalPub(pub);
      setReportModalOpen(true);
    }
  };

  const handleSubmitReport = (pubId: string, reason: string, description: string) => {
    const newReport: Report = {
      id: 'r' + (reports.length + 1),
      reporterId: currentUser.id,
      publicationId: pubId,
      reason,
      description,
      status: 'Pendiente',
      date: new Date().toISOString().split('T')[0]
    };

    const newReports = [newReport, ...reports];
    updateReports(newReports);
    setReportModalOpen(false);
    showToast('Reporte enviado a la administración para revisión.');
  };

  // Client actions
  const handleCancelOrder = (orderId: string) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status: 'Cancelado' as OrderStatus } : o
    );
    updateOrders(updated);
    showToast('El pedido ha sido cancelado.');
  };

  // Entrepreneur actions
  const handleSaveEntrepreneurProfile = (profileData: {
    name: string;
    description: string;
    skills: string;
    contact: string;
  }) => {
    const updatedUsers = users.map((u) => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          entrepreneurProfile: profileData
        };
      }
      return u;
    });
    updateUsers(updatedUsers);
  };

  const handleTogglePublicationStatus = (pubId: string) => {
    const updated = publications.map((p) => {
      if (p.id === pubId) {
        return {
          ...p,
          status: (p.status === 'activo' ? 'inactivo' : 'activo') as 'activo' | 'inactivo'
        };
      }
      return p;
    });
    updatePublications(updated);
    showToast('Estado de la publicación actualizado.');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    updateOrders(updated);
    showToast(`Estado del pedido actualizado a "${newStatus}".`);
  };

  const handleCreatePublication = (pubData: {
    title: string;
    type: PublicationType;
    categoryId: string;
    price: number;
    time: string;
    availability: PublicationAvailability;
    image: string;
    description: string;
    featured: boolean;
  }) => {
    const newPub: Publication = {
      id: 'p' + (publications.length + 1),
      userId: currentUser.id,
      ...pubData,
      status: 'activo'
    };
    const updated = [newPub, ...publications];
    updatePublications(updated);
    showToast('¡Publicación creada y visible en el catálogo!');
  };

  // Admin actions
  const handleToggleUserStatus = (userId: string) => {
    const updated = users.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          status: (u.status === 'activo' ? 'suspendido' : 'activo') as 'activo' | 'suspendido'
        };
      }
      return u;
    });
    updateUsers(updated);
    showToast('Estado de usuario modificado.');
  };

  const handleToggleFeatured = (pubId: string) => {
    const updated = publications.map((p) => {
      if (p.id === pubId) {
        return {
          ...p,
          featured: !p.featured
        };
      }
      return p;
    });
    updatePublications(updated);
    showToast('Estado destacado modificado.');
  };

  const handleResolveReport = (reportId: string) => {
    const updated = reports.map((r) => {
      if (r.id === reportId) {
        return {
          ...r,
          status: 'Resuelto' as const
        };
      }
      return r;
    });
    updateReports(updated);
    showToast('Reporte marcado como resuelto.');
  };

  const handleAddCategory = (name: string, description: string) => {
    const newCat: Category = {
      id: String(categories.length + 1),
      name,
      description
    };
    const updated = [...categories, newCat];
    updateCategories(updated);
    showToast(`Categoría "${name}" creada exitosamente.`);
  };

  const activePublication =
    publications.find((p) => p.id === selectedPublicationId) || publications[0];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-800 flex flex-col font-sans">
      {/* Toast feedback banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl border border-stone-800 bg-stone-900 px-4 py-3 text-xs font-medium text-white shadow-xl animate-in slide-in-from-bottom-5">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={navigateTo}
        currentUser={currentUser}
        allUsers={users}
        onChangeRole={changeSimulatedRole}
        onResetData={handleResetData}
      />

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* SPA View Switcher */}
        {currentView === 'home' && (
          <div id="view-home" className="view-section active">
            <HomeView
              categories={categories}
              publications={publications}
              users={users}
              onSelectCategory={handleCategorySelectFromHome}
              onSelectPublication={handleSelectPublication}
              onNavigate={navigateTo}
            />
          </div>
        )}

        {currentView === 'explore' && (
          <div id="view-explore" className="view-section active">
            <ExploreView
              categories={categories}
              publications={publications}
              users={users}
              initialCategory={exploreInitialCategory}
              onSelectPublication={handleSelectPublication}
            />
          </div>
        )}

        {currentView === 'detail' && activePublication && (
          <div id="view-detail" className="view-section active">
            <DetailView
              publication={activePublication}
              category={categories.find((c) => c.id === activePublication.categoryId)}
              author={users.find((u) => u.id === activePublication.userId)}
              onBack={() => navigateTo('explore')}
              onOpenOrderModal={handleOpenOrderModal}
              onOpenReportModal={handleOpenReportModal}
            />
          </div>
        )}

        {currentView === 'client' && (
          <div id="view-client" className="view-section active">
            <ClientView
              currentUser={currentUser}
              orders={orders}
              publications={publications}
              users={users}
              onCancelOrder={handleCancelOrder}
              onExplore={() => navigateTo('explore')}
            />
          </div>
        )}

        {currentView === 'entrepreneur' && (
          <div id="view-entrepreneur" className="view-section active">
            <EntrepreneurView
              currentUser={currentUser}
              publications={publications}
              orders={orders}
              users={users}
              categories={categories}
              onSaveProfile={handleSaveEntrepreneurProfile}
              onTogglePublicationStatus={handleTogglePublicationStatus}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onOpenCreatePublication={() => setNewPubModalOpen(true)}
            />
          </div>
        )}

        {currentView === 'admin' && (
          <div id="view-admin" className="view-section active">
            <AdminView
              users={users}
              publications={publications}
              orders={orders}
              reports={reports}
              categories={categories}
              onToggleUserStatus={handleToggleUserStatus}
              onToggleFeatured={handleToggleFeatured}
              onTogglePublicationStatus={handleTogglePublicationStatus}
              onResolveReport={handleResolveReport}
              onAddCategory={handleAddCategory}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      <OrderModal
        isOpen={orderModalOpen}
        publication={orderModalPub}
        currentUser={currentUser}
        onClose={() => setOrderModalOpen(false)}
        onSubmitOrder={handleSubmitOrder}
        onSwitchToClient={() => changeSimulatedRole('client')}
      />

      <ReportModal
        isOpen={reportModalOpen}
        publication={reportModalPub}
        currentUser={currentUser}
        onClose={() => setReportModalOpen(false)}
        onSubmitReport={handleSubmitReport}
        onSwitchToClient={() => changeSimulatedRole('client')}
      />

      <NewPublicationModal
        isOpen={newPubModalOpen}
        categories={categories}
        onClose={() => setNewPubModalOpen(false)}
        onSubmit={handleCreatePublication}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200/80 bg-white py-8 text-xs text-stone-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-stone-800">CreaMarket</span>
            <span>·</span>
            <span>Mercado Estudiantil de Emprendimiento & Talentos</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Red Universitaria .edu.pe</span>
            <span>·</span>
            <span>Datos en tiempo real (localStorage)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
