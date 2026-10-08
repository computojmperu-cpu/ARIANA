import React, { useState } from 'react';
import { User, Publication, Order, Category, OrderStatus } from '../types';
import { ImageBackground } from './ImageBackground';
import { Plus, Check, Eye, EyeOff, Save, Store, Package, Layers } from 'lucide-react';

interface EntrepreneurViewProps {
  currentUser: User;
  publications: Publication[];
  orders: Order[];
  users: User[];
  categories: Category[];
  onSaveProfile: (profile: { name: string; description: string; skills: string; contact: string }) => void;
  onTogglePublicationStatus: (pubId: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onOpenCreatePublication: () => void;
}

export const EntrepreneurView: React.FC<EntrepreneurViewProps> = ({
  currentUser,
  publications,
  orders,
  users,
  categories,
  onSaveProfile,
  onTogglePublicationStatus,
  onUpdateOrderStatus,
  onOpenCreatePublication
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'publications' | 'orders'>('publications');

  // Profile Form state
  const currentProfile = currentUser.entrepreneurProfile || {
    name: '',
    description: '',
    skills: '',
    contact: ''
  };

  const [name, setName] = useState(currentProfile.name);
  const [description, setDescription] = useState(currentProfile.description);
  const [skills, setSkills] = useState(currentProfile.skills);
  const [contact, setContact] = useState(currentProfile.contact);
  const [profileSavedToast, setProfileSavedToast] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({ name, description, skills, contact });
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 3000);
  };

  const myPublications = publications.filter((p) => p.userId === currentUser.id);
  const myOrders = orders.filter((o) => o.entrepreneurId === currentUser.id);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-xs uppercase font-medium text-stone-400 tracking-wider">
            Gestión de Negocio Estudiantil
          </div>
          <h1 className="font-display text-3xl font-bold text-stone-900 mt-1">
            {currentProfile.name || 'Mi Emprendimiento'}
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Administra tu perfil público, catálogo de creaciones y pedidos recibidos.
          </p>
        </div>

        {activeTab === 'publications' && (
          <button
            type="button"
            onClick={onOpenCreatePublication}
            className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 transition-colors self-start sm:self-auto"
          >
            <Plus className="h-4 w-4 text-amber-300" />
            <span>Nueva Publicación</span>
          </button>
        )}
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-stone-200">
        <button
          type="button"
          onClick={() => setActiveTab('publications')}
          className={`flex items-center gap-2 pb-3 px-1 text-xs font-semibold transition-colors border-b-2 ${
            activeTab === 'publications'
              ? 'border-stone-900 text-stone-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Mis Publicaciones ({myPublications.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 pb-3 px-1 text-xs font-semibold transition-colors border-b-2 ${
            activeTab === 'orders'
              ? 'border-stone-900 text-stone-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Package className="h-4 w-4" />
          <span>Pedidos Recibidos ({myOrders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 pb-3 px-1 text-xs font-semibold transition-colors border-b-2 ${
            activeTab === 'profile'
              ? 'border-stone-900 text-stone-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Store className="h-4 w-4" />
          <span>Perfil del Emprendimiento</span>
        </button>
      </div>

      {/* Tab 1: Mis Publicaciones */}
      {activeTab === 'publications' && (
        <div>
          {myPublications.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-stone-200 bg-stone-50 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3.5">Miniatura</th>
                      <th className="px-4 py-3.5">Título</th>
                      <th className="px-4 py-3.5">Tipo</th>
                      <th className="px-4 py-3.5">Precio</th>
                      <th className="px-4 py-3.5">Tiempo</th>
                      <th className="px-4 py-3.5">Disponibilidad</th>
                      <th className="px-4 py-3.5">Estado</th>
                      <th className="px-4 py-3.5 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody id="entrepreneur-publications-list" className="divide-y divide-stone-100 text-stone-700">
                    {myPublications.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="px-4 py-3">
                          {/* CORRECCIÓN: Reemplazo de <img> por un <div> miniatura con background-image en las celdas de la tabla */}
                          <div
                            className="h-12 w-12 rounded-lg border border-stone-200 bg-stone-100 overflow-hidden"
                            style={{
                              backgroundImage: `url("${p.image}")`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          />
                        </td>
                        <td className="px-4 py-3 font-medium text-stone-900 max-w-[200px]">
                          {p.title}
                        </td>
                        <td className="px-4 py-3 capitalize text-stone-600">
                          {p.type}
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-stone-900 tabular-nums">
                          ${p.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-stone-500">
                          {p.time}
                        </td>
                        <td className="px-4 py-3 text-stone-500">
                          {p.availability === 'disponible' ? 'Inmediata' : 'Bajo pedido'}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
                              p.status === 'activo'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-stone-100 text-stone-600 border-stone-200'
                            }`}
                          >
                            {p.status === 'activo' ? 'Activo' : 'Oculto'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => onTogglePublicationStatus(p.id)}
                            className="inline-flex items-center gap-1 rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-[11px] font-medium text-stone-700 hover:bg-stone-100 transition-colors"
                          >
                            {p.status === 'activo' ? (
                              <>
                                <EyeOff className="h-3 w-3 text-stone-400" />
                                <span>Ocultar</span>
                              </>
                            ) : (
                              <>
                                <Eye className="h-3 w-3 text-stone-600" />
                                <span>Mostrar</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-12 text-center">
              <h3 className="font-display font-semibold text-stone-900 text-base">
                Aún no has publicado productos o servicios
              </h3>
              <p className="mt-1 text-xs text-stone-500 max-w-sm mx-auto">
                Comienza a recibir encargos creando tu primera publicación para la comunidad universitaria.
              </p>
              <button
                type="button"
                onClick={onOpenCreatePublication}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800"
              >
                <Plus className="h-4 w-4" />
                <span>Crear Primera Publicación</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Pedidos Recibidos */}
      {activeTab === 'orders' && (
        <div>
          {myOrders.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-stone-200 bg-stone-50 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3.5">ID Pedido</th>
                      <th className="px-4 py-3.5">Cliente</th>
                      <th className="px-4 py-3.5">Publicación</th>
                      <th className="px-4 py-3.5 text-center">Cantidad</th>
                      <th className="px-4 py-3.5">Fecha</th>
                      <th className="px-4 py-3.5">Notas del Cliente</th>
                      <th className="px-4 py-3.5">Estado Actual</th>
                      <th className="px-4 py-3.5">Cambiar Estado</th>
                    </tr>
                  </thead>
                  <tbody id="entrepreneur-orders-list" className="divide-y divide-stone-100 text-stone-700">
                    {myOrders.map((o) => {
                      const pub = publications.find((p) => p.id === o.publicationId);
                      const client = users.find((u) => u.id === o.clientId);

                      return (
                        <tr key={o.id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="px-4 py-3 font-mono font-medium text-stone-900">
                            #{o.id}
                          </td>
                          <td className="px-4 py-3 font-medium text-stone-900">
                            <div>{client?.name || 'Cliente'}</div>
                            <div className="text-[11px] text-stone-400 font-normal">{client?.email}</div>
                          </td>
                          <td className="px-4 py-3 text-stone-800">
                            {pub?.title || 'Ítem'}
                          </td>
                          <td className="px-4 py-3 text-center font-mono tabular-nums">
                            {o.quantity}
                          </td>
                          <td className="px-4 py-3 text-stone-500 tabular-nums">
                            {o.date}
                          </td>
                          <td className="px-4 py-3 text-stone-600 max-w-[200px]" title={o.notes}>
                            {o.notes || 'Sin especificaciones'}
                          </td>
                          <td className="px-4 py-3 font-semibold text-stone-900">
                            {o.status}
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={o.status}
                              onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as OrderStatus)}
                              className="rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-medium text-stone-800 focus:border-stone-400 focus:outline-none"
                            >
                              <option value="Pendiente">Pendiente</option>
                              <option value="Aceptado">Aceptado</option>
                              <option value="En preparación">En preparación</option>
                              <option value="Listo">Listo</option>
                              <option value="Entregado">Entregado</option>
                              <option value="Rechazado">Rechazado</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-12 text-center">
              <h3 className="font-display font-semibold text-stone-900 text-base">
                No tienes pedidos pendientes de atención
              </h3>
              <p className="mt-1 text-xs text-stone-500 max-w-sm mx-auto">
                Los nuevos pedidos solicitados por clientes aparecerán aquí para que puedas gestionarlos y actualizar su estado.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Perfil del Emprendimiento */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label htmlFor="ent-name" className="block text-xs font-semibold text-stone-700 mb-1">
                Nombre del Emprendimiento / Marca
              </label>
              <input
                id="ent-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Arte & Detalle María"
                required
                className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-stone-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="ent-description" className="block text-xs font-semibold text-stone-700 mb-1">
                Descripción y Propuesta Creativa
              </label>
              <textarea
                id="ent-description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explica qué ofreces, tu estilo de trabajo y valor artesanal..."
                className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-stone-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="ent-skills" className="block text-xs font-semibold text-stone-700 mb-1">
                Habilidades y Técnicas Especiales
              </label>
              <input
                id="ent-skills"
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Ej. Dibujo, Acuarela, Lettering, Fondant"
                className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-stone-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="ent-contact" className="block text-xs font-semibold text-stone-700 mb-1">
                Contacto Institucional / Correo Estudiantil
              </label>
              <input
                id="ent-contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Ej. maria.contacto@edu.pe"
                className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-stone-400 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800 transition-colors"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Guardar Perfil de Emprendedor</span>
              </button>

              {profileSavedToast && (
                <div className="flex items-center gap-1 text-xs font-medium text-emerald-700">
                  <Check className="h-4 w-4" />
                  <span>¡Perfil actualizado con éxito!</span>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
