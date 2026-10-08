import React, { useState } from 'react';
import { User, Publication, Order, Report, Category } from '../types';
import { Users, BookOpen, ShoppingBag, AlertTriangle, Shield, Plus, CheckCircle, Star } from 'lucide-react';

interface AdminViewProps {
  users: User[];
  publications: Publication[];
  orders: Order[];
  reports: Report[];
  categories: Category[];
  onToggleUserStatus: (userId: string) => void;
  onToggleFeatured: (pubId: string) => void;
  onTogglePublicationStatus: (pubId: string) => void;
  onResolveReport: (reportId: string) => void;
  onAddCategory: (name: string, description: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  users,
  publications,
  orders,
  reports,
  categories,
  onToggleUserStatus,
  onToggleFeatured,
  onTogglePublicationStatus,
  onResolveReport,
  onAddCategory
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'publications' | 'categories' | 'reports'>('users');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDescription, setNewCatDescription] = useState('');

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    onAddCategory(newCatName.trim(), newCatDescription.trim());
    setNewCatName('');
    setNewCatDescription('');
    setShowAddCategoryModal(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="text-xs uppercase font-medium text-purple-700 tracking-wider flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5" />
          <span>Supervisión Institucional</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-stone-900 mt-1">
          Panel de Administración General
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Supervisa las métricas del mercado, modera usuarios, destaca productos y atiende reportes de la comunidad.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Users */}
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-medium text-stone-500">Usuarios Registrados</span>
            <Users className="h-4 w-4" />
          </div>
          <div id="metric-users" className="mt-2 font-mono text-3xl font-bold text-stone-900 tabular-nums">
            {users.length}
          </div>
          <div className="mt-1 text-[11px] text-stone-400">Comunidad estudiantil y clientes</div>
        </div>

        {/* Metric 2: Pubs */}
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-medium text-stone-500">Publicaciones Totales</span>
            <BookOpen className="h-4 w-4" />
          </div>
          <div id="metric-pubs" className="mt-2 font-mono text-3xl font-bold text-stone-900 tabular-nums">
            {publications.length}
          </div>
          <div className="mt-1 text-[11px] text-stone-400">
            {publications.filter((p) => p.status === 'activo').length} activas en catálogo
          </div>
        </div>

        {/* Metric 3: Orders */}
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-medium text-stone-500">Pedidos Procesados</span>
            <ShoppingBag className="h-4 w-4" />
          </div>
          <div id="metric-orders" className="mt-2 font-mono text-3xl font-bold text-stone-900 tabular-nums">
            {orders.length}
          </div>
          <div className="mt-1 text-[11px] text-stone-400">
            {orders.filter((o) => o.status === 'Pendiente').length} pedidos pendientes
          </div>
        </div>

        {/* Metric 4: Reports */}
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-medium text-stone-500">Reportes Recibidos</span>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <div id="metric-reports" className="mt-2 font-mono text-3xl font-bold text-stone-900 tabular-nums">
            {reports.length}
          </div>
          <div className="mt-1 text-[11px] text-stone-400">
            {reports.filter((r) => r.status === 'Pendiente').length} por resolver
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center justify-between border-b border-stone-200">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`tab-btn pb-3 px-1 text-xs font-semibold transition-colors border-b-2 ${
              activeTab === 'users'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Usuarios ({users.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('publications')}
            className={`tab-btn pb-3 px-1 text-xs font-semibold transition-colors border-b-2 ${
              activeTab === 'publications'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Publicaciones ({publications.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`tab-btn pb-3 px-1 text-xs font-semibold transition-colors border-b-2 ${
              activeTab === 'categories'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Categorías ({categories.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reports')}
            className={`tab-btn pb-3 px-1 text-xs font-semibold transition-colors border-b-2 ${
              activeTab === 'reports'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Reportes ({reports.length})
          </button>
        </div>

        {activeTab === 'categories' && (
          <button
            type="button"
            onClick={() => setShowAddCategoryModal(true)}
            className="mb-2 inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Nueva Categoría</span>
          </button>
        )}
      </div>

      {/* Tab: Users */}
      {activeTab === 'users' && (
        <div id="tab-admin-users" className="tab-content active overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-stone-200 bg-stone-50 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">ID</th>
                  <th className="px-4 py-3.5">Nombre</th>
                  <th className="px-4 py-3.5">Correo</th>
                  <th className="px-4 py-3.5">Rol</th>
                  <th className="px-4 py-3.5">Estado</th>
                  <th className="px-4 py-3.5 text-right">Moderación</th>
                </tr>
              </thead>
              <tbody id="admin-users-list" className="divide-y divide-stone-100 text-stone-700">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="px-4 py-3 font-mono font-medium text-stone-900">
                      {u.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-stone-900">
                      {u.name}
                    </td>
                    <td className="px-4 py-3 text-stone-500 font-mono">
                      {u.email}
                    </td>
                    <td className="px-4 py-3">
                      <span className="capitalize font-mono px-2 py-0.5 rounded text-[11px] bg-stone-100 border border-stone-200">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
                          u.status === 'activo'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {u.role !== 'admin' ? (
                        <button
                          type="button"
                          onClick={() => onToggleUserStatus(u.id)}
                          className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                            u.status === 'activo'
                              ? 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                              : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          }`}
                        >
                          {u.status === 'activo' ? 'Suspender' : 'Activar'}
                        </button>
                      ) : (
                        <span className="text-stone-400 text-[11px]">Inmutable</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Publications */}
      {activeTab === 'publications' && (
        <div id="tab-admin-pubs" className="tab-content active overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-stone-200 bg-stone-50 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">ID</th>
                  <th className="px-4 py-3.5">Título</th>
                  <th className="px-4 py-3.5">Usuario Creador</th>
                  <th className="px-4 py-3.5 text-center">Destacado</th>
                  <th className="px-4 py-3.5">Estado</th>
                  <th className="px-4 py-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody id="admin-publications-list" className="divide-y divide-stone-100 text-stone-700">
                {publications.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="px-4 py-3 font-mono font-medium text-stone-900">
                      {p.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-stone-900 max-w-[220px]">
                      {p.title}
                    </td>
                    <td className="px-4 py-3 font-mono text-stone-500">
                      {p.userId}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
                        p.featured ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-stone-50 text-stone-500 border-stone-200'
                      }`}>
                        {p.featured ? 'Sí' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
                        p.status === 'activo' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-stone-100 text-stone-600 border-stone-200'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => onToggleFeatured(p.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-[11px] font-medium text-stone-700 hover:bg-stone-100 transition-colors"
                      >
                        <Star className={`h-3 w-3 ${p.featured ? 'text-amber-500 fill-amber-500' : 'text-stone-400'}`} />
                        <span>{p.featured ? 'Quitar Destacado' : 'Destacar'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onTogglePublicationStatus(p.id)}
                        className="inline-flex items-center rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-[11px] font-medium text-stone-700 hover:bg-stone-100 transition-colors"
                      >
                        {p.status === 'activo' ? 'Ocultar' : 'Activar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Categories */}
      {activeTab === 'categories' && (
        <div id="tab-admin-categories" className="tab-content active overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-stone-200 bg-stone-50 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">ID</th>
                  <th className="px-4 py-3.5">Nombre</th>
                  <th className="px-4 py-3.5">Descripción</th>
                  <th className="px-4 py-3.5">Estado</th>
                  <th className="px-4 py-3.5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody id="admin-categories-list" className="divide-y divide-stone-100 text-stone-700">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="px-4 py-3 font-mono font-medium text-stone-900">
                      {c.id}
                    </td>
                    <td className="px-4 py-3 font-semibold text-stone-900">
                      {c.name}
                    </td>
                    <td className="px-4 py-3 text-stone-500">
                      {c.description}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Activo
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-stone-400">
                      N/A
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Reports */}
      {activeTab === 'reports' && (
        <div id="tab-admin-reports" className="tab-content active overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs">
          {reports.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-stone-200 bg-stone-50 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3.5">ID Reporte</th>
                    <th className="px-4 py-3.5">Reportante</th>
                    <th className="px-4 py-3.5">Publicación</th>
                    <th className="px-4 py-3.5">Motivo</th>
                    <th className="px-4 py-3.5">Detalles</th>
                    <th className="px-4 py-3.5">Estado</th>
                    <th className="px-4 py-3.5 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody id="admin-reports-list" className="divide-y divide-stone-100 text-stone-700">
                  {reports.map((r) => (
                    <tr key={r.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="px-4 py-3 font-mono font-medium text-stone-900">
                        #{r.id}
                      </td>
                      <td className="px-4 py-3 font-mono text-stone-600">
                        {r.reporterId}
                      </td>
                      <td className="px-4 py-3 font-mono text-stone-600">
                        {r.publicationId}
                      </td>
                      <td className="px-4 py-3 font-medium text-stone-900">
                        {r.reason}
                      </td>
                      <td className="px-4 py-3 text-stone-500 max-w-[200px] truncate" title={r.description}>
                        {r.description || 'Sin descripción'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
                          r.status === 'Pendiente'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {r.status === 'Pendiente' ? (
                          <button
                            type="button"
                            onClick={() => onResolveReport(r.id)}
                            className="inline-flex items-center gap-1 rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-[11px] font-medium text-stone-800 hover:bg-stone-100 transition-colors"
                          >
                            <CheckCircle className="h-3 w-3 text-emerald-600" />
                            <span>Marcar Resuelto</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-stone-400">Atendido</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-stone-500">
              No hay reportes de moderación pendientes en la plataforma.
            </div>
          )}
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-xl animate-in fade-in zoom-in-95">
            <h3 className="font-display font-bold text-lg text-stone-900">
              Agregar Nueva Categoría
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              Crea una nueva clasificación para organizar los productos y servicios estudiantiles.
            </p>

            <form onSubmit={handleCreateCategory} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nombre de la Categoría
                </label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Ej. Joyería artesanal"
                  className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs sm:text-sm text-stone-900 focus:border-stone-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Descripción
                </label>
                <textarea
                  rows={2}
                  value={newCatDescription}
                  onChange={(e) => setNewCatDescription(e.target.value)}
                  placeholder="Breve detalle de los ítems que abarca..."
                  className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs sm:text-sm text-stone-900 focus:border-stone-400 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  Guardar Categoría
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
