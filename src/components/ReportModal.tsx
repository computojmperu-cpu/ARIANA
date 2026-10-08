import React, { useState } from 'react';
import { Publication, User } from '../types';
import { AlertTriangle, X, AlertCircle } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  publication: Publication | null;
  currentUser: User;
  onClose: () => void;
  onSubmitReport: (pubId: string, reason: string, description: string) => void;
  onSwitchToClient: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  publication,
  currentUser,
  onClose,
  onSubmitReport,
  onSwitchToClient
}) => {
  const [reason, setReason] = useState('Contenido inapropiado o no permitido');
  const [description, setDescription] = useState('');

  if (!isOpen || !publication) return null;

  const isGuest = currentUser.role === 'guest';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGuest) return;
    onSubmitReport(publication.id, reason, description);
    setDescription('');
  };

  return (
    <div id="modal-report" className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-xl animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-stone-900">
                Reportar Publicación
              </h3>
              <p className="text-[11px] text-stone-400">Moderación y seguridad de CreaMarket</p>
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
                <strong className="font-semibold">Inicio de sesión requerido:</strong> Debes contar con una cuenta activa (Cliente o Emprendedor) para enviar un reporte a la administración.
              </div>
            </div>
            <div className="pt-1 flex gap-2">
              <button
                type="button"
                onClick={onSwitchToClient}
                className="rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800 transition-colors"
              >
                Cambiar a Juan Pérez (Cliente)
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Hidden field matching spec */}
            <input type="hidden" id="report-pub-id" value={publication.id} />

            <div className="text-xs text-stone-500">
              Reportando: <strong className="text-stone-900">{publication.title}</strong>
            </div>

            <div>
              <label htmlFor="report-reason" className="block text-xs font-semibold text-stone-700 mb-1">
                Motivo del reporte
              </label>
              <select
                id="report-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs text-stone-900 focus:border-stone-400 focus:outline-none"
              >
                <option value="Contenido inapropiado o no permitido">Contenido inapropiado o no permitido</option>
                <option value="Precio engañoso o no real">Precio engañoso o no real</option>
                <option value="Plagio de autoría o fotos ajenas">Plagio de autoría o fotos ajenas</option>
                <option value="Incumplimiento de términos universitarios">Incumplimiento de términos universitarios</option>
                <option value="Spam o publicación duplicada">Spam o publicación duplicada</option>
                <option value="Otro motivo">Otro motivo</option>
              </select>
            </div>

            <div>
              <label htmlFor="report-description" className="block text-xs font-semibold text-stone-700 mb-1">
                Detalle del reporte
              </label>
              <textarea
                id="report-description"
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Por favor explica brevemente lo que observaste para el equipo administrador..."
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs text-stone-900 focus:border-stone-400 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-stone-200 px-3.5 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-rose-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 transition-colors"
              >
                Enviar Reporte
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
