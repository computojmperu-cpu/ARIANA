import React, { useState } from 'react';
import { Publication, User } from '../types';
import { ShoppingBag, X, AlertCircle } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  publication: Publication | null;
  currentUser: User;
  onClose: () => void;
  onSubmitOrder: (pubId: string, quantity: number, notes: string) => void;
  onSwitchToClient: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  publication,
  currentUser,
  onClose,
  onSubmitOrder,
  onSwitchToClient
}) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  if (!isOpen || !publication) return null;

  const isGuest = currentUser.role === 'guest';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGuest) return;
    onSubmitOrder(publication.id, quantity, notes);
    setQuantity(1);
    setNotes('');
  };

  const totalPrice = publication.price * quantity;

  return (
    <div id="modal-order" className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-xl animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-amber-300">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-stone-900">
                Solicitud de Pedido
              </h3>
              <p className="text-[11px] text-stone-400">Encargo directo al estudiante creador</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isGuest ? (
          <div className="my-5 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900 space-y-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Modo Visita Libre:</strong> Debes cambiar al modo <strong>Cliente</strong> o <strong>Emprendedor</strong> para solicitar un pedido y dar seguimiento en la plataforma.
              </div>
            </div>
            <div className="pt-1 flex gap-2">
              <button
                type="button"
                onClick={onSwitchToClient}
                className="rounded-lg bg-amber-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-900 transition-colors"
              >
                Cambiar a Juan Pérez (Cliente)
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-50"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Hidden inputs matching specification */}
            <input type="hidden" id="order-pub-id" value={publication.id} />
            <input type="hidden" id="order-pub-title" value={publication.title} />

            {/* Product summary */}
            <div className="rounded-xl bg-stone-50 p-3 border border-stone-200/80 flex items-center justify-between text-xs">
              <div>
                <div className="text-[11px] text-stone-400">Publicación:</div>
                <div className="font-semibold text-stone-900 max-w-[240px] truncate">
                  {publication.title}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-stone-400">Precio Unitario:</div>
                <div className="font-mono font-bold text-stone-900 tabular-nums">
                  ${publication.price.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="order-quantity" className="block text-xs font-semibold text-stone-700 mb-1">
                Cantidad solicitada
              </label>
              <input
                id="order-quantity"
                type="number"
                min={1}
                max={50}
                required
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs sm:text-sm font-mono text-stone-900 focus:border-stone-400 focus:outline-none"
              />
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="order-notes" className="block text-xs font-semibold text-stone-700 mb-1">
                Notas y especificaciones del encargo
              </label>
              <textarea
                id="order-notes"
                rows={3}
                required
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Detalla tu pedido: fotos de referencia, fecha límite, dedicatoria o variaciones deseadas..."
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none"
              />
            </div>

            {/* Total estimate */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
              <span className="text-stone-500">Estimado total a coordinar:</span>
              <span className="font-mono text-base font-bold text-stone-900 tabular-nums">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-stone-200 px-3.5 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800 transition-colors"
              >
                Confirmar Solicitud de Pedido
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
