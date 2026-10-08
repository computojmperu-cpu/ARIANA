import React from 'react';
import { Order, Publication, User, OrderStatus } from '../types';
import { Package, XCircle, ArrowRight } from 'lucide-react';

interface ClientViewProps {
  currentUser: User;
  orders: Order[];
  publications: Publication[];
  users: User[];
  onCancelOrder: (orderId: string) => void;
  onExplore: () => void;
}

export const ClientView: React.FC<ClientViewProps> = ({
  currentUser,
  orders,
  publications,
  users,
  onCancelOrder,
  onExplore
}) => {
  const clientOrders = orders.filter((o) => o.clientId === currentUser.id);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pendiente':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'Aceptado':
        return 'text-blue-800 bg-blue-50 border-blue-200';
      case 'En preparación':
        return 'text-indigo-800 bg-indigo-50 border-indigo-200';
      case 'Listo':
        return 'text-emerald-800 bg-emerald-50 border-emerald-200';
      case 'Entregado':
        return 'text-teal-800 bg-teal-50 border-teal-200';
      case 'Rechazado':
      case 'Cancelado':
        return 'text-rose-800 bg-rose-50 border-rose-200';
      default:
        return 'text-stone-800 bg-stone-50 border-stone-200';
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <div className="text-xs uppercase font-medium text-stone-400 tracking-wider">
          Panel de Cliente
        </div>
        <h1 className="font-display text-3xl font-bold text-stone-900 mt-1">
          Mis Pedidos Solicitados
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Revisa el estado de tus encargos y solicita cancelaciones si el pedido aún está en espera.
        </p>
      </div>

      {clientOrders.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-stone-200 bg-stone-50 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">ID Pedido</th>
                  <th className="px-4 py-3.5">Emprendimiento</th>
                  <th className="px-4 py-3.5">Publicación / Ítem</th>
                  <th className="px-4 py-3.5 text-center">Cantidad</th>
                  <th className="px-4 py-3.5">Fecha</th>
                  <th className="px-4 py-3.5">Notas de encargo</th>
                  <th className="px-4 py-3.5">Estado</th>
                  <th className="px-4 py-3.5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody id="client-orders-list" className="divide-y divide-stone-100 text-stone-700">
                {clientOrders.map((o) => {
                  const pub = publications.find((p) => p.id === o.publicationId);
                  const ent = users.find((u) => u.id === o.entrepreneurId);
                  const entName = ent?.entrepreneurProfile?.name || ent?.name || 'Emprendedor';

                  return (
                    <tr key={o.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="px-4 py-3 font-mono font-medium text-stone-900">
                        #{o.id}
                      </td>
                      <td className="px-4 py-3 font-medium text-stone-900">
                        {entName}
                      </td>
                      <td className="px-4 py-3 text-stone-800">
                        {pub?.title || 'Publicación no disponible'}
                      </td>
                      <td className="px-4 py-3 text-center font-mono tabular-nums">
                        {o.quantity}
                      </td>
                      <td className="px-4 py-3 text-stone-500 tabular-nums">
                        {o.date}
                      </td>
                      <td className="px-4 py-3 text-stone-500 max-w-[180px] truncate" title={o.notes}>
                        {o.notes || '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${getStatusBadge(o.status)}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {o.status === 'Pendiente' ? (
                          <button
                            type="button"
                            onClick={() => onCancelOrder(o.id)}
                            className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-medium text-rose-700 hover:bg-rose-100 transition-colors"
                          >
                            <XCircle className="h-3 w-3" />
                            <span>Cancelar</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-stone-400">—</span>
                        )}
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
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-400 mb-3">
            <Package className="h-5 w-5" />
          </div>
          <h3 className="font-display font-semibold text-stone-900 text-base">
            No tienes pedidos solicitados aún
          </h3>
          <p className="mt-1 text-xs text-stone-500 max-w-sm mx-auto">
            Explora las creaciones de los estudiantes y solicita tu primer pedido personalizado.
          </p>
          <button
            type="button"
            onClick={onExplore}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800 transition-colors"
          >
            <span>Ir al Catálogo</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
