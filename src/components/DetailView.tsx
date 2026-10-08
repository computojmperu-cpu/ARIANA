import React from 'react';
import { Publication, Category, User } from '../types';
import { ImageBackground } from './ImageBackground';
import { ArrowLeft, Clock, ShieldCheck, Mail, Sparkles, AlertCircle, ShoppingBag } from 'lucide-react';

interface DetailViewProps {
  publication: Publication;
  category?: Category;
  author?: User;
  onBack: () => void;
  onOpenOrderModal: (pubId: string, pubTitle: string) => void;
  onOpenReportModal: (pubId: string) => void;
}

export const DetailView: React.FC<DetailViewProps> = ({
  publication,
  category,
  author,
  onBack,
  onOpenOrderModal,
  onOpenReportModal
}) => {
  const profile = author?.entrepreneurProfile || {
    name: author?.name || 'Estudiante Creador',
    description: 'Emprendimiento creativo universitario.',
    skills: 'Creación artesanal, Diseño',
    contact: author?.email || 'contacto@edu.pe'
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al Catálogo</span>
        </button>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Container (SIN ETIQUETAS IMG - using div container with background-image) */}
        <div className="lg:col-span-7">
          <div className="sticky top-20 rounded-2xl border border-stone-200/90 bg-white p-3 shadow-xs">
            <div className="overflow-hidden rounded-xl bg-stone-100">
              <ImageBackground
                src={publication.image}
                alt={publication.title}
                className="w-full aspect-[4/3] min-h-[350px] sm:min-h-[420px]"
              />
            </div>
            <div className="mt-3 px-2 py-1 flex items-center justify-between text-[11px] text-stone-400">
              <span>Publicado por estudiante verificado (.edu.pe)</span>
              <span>ID: #{publication.id}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase & Details Module */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
            {/* Unboxed metadata line */}
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
              <span className="capitalize font-semibold text-stone-800">
                {publication.type}
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{category?.name || 'General'}</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className={publication.availability === 'disponible' ? 'text-emerald-700 font-medium' : 'text-amber-800 font-medium'}>
                {publication.availability === 'disponible' ? 'Entrega inmediata' : 'Bajo pedido'}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              {publication.title}
            </h1>

            {/* Price */}
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-mono text-3xl font-bold text-stone-900 tabular-nums">
                ${publication.price.toFixed(2)}
              </span>
              <span className="text-xs text-stone-400">USD o equivalente moneda local</span>
            </div>

            {/* Specs row */}
            <div className="mt-5 grid grid-cols-2 gap-3 py-3 border-y border-stone-100 text-xs">
              <div>
                <span className="block text-[11px] text-stone-400">Tiempo de elaboración</span>
                <span className="font-medium text-stone-800 flex items-center gap-1 mt-0.5">
                  <Clock className="h-3.5 w-3.5 text-stone-400" />
                  {publication.time}
                </span>
              </div>
              <div>
                <span className="block text-[11px] text-stone-400">Disponibilidad</span>
                <span className="font-medium text-stone-800 mt-0.5 block">
                  {publication.availability === 'disponible' ? 'En stock / Inmediata' : 'Elaboración por encargo'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-5">
              <h3 className="text-xs uppercase font-medium text-stone-400 tracking-wider mb-2">
                Descripción del producto o servicio
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                {publication.description}
              </p>
            </div>

            {/* Entrepreneur profile card */}
            <div className="mt-6 rounded-xl border border-stone-200/80 bg-stone-50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase font-semibold text-stone-500 tracking-wider">
                  Emprendimiento Creador
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-stone-500">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Verificado .edu
                </span>
              </div>

              <h4 className="font-display font-bold text-sm text-stone-900">
                {profile.name || author?.name}
              </h4>
              <p className="mt-1 text-xs text-stone-600 leading-snug">
                {profile.description || 'Estudiante creador en CreaMarket.'}
              </p>

              {profile.skills && (
                <div className="mt-2.5 pt-2 border-t border-stone-200/60 text-xs">
                  <span className="text-stone-400 font-medium">Habilidades: </span>
                  <span className="text-stone-700 font-medium">{profile.skills}</span>
                </div>
              )}

              {profile.contact && (
                <div className="mt-1.5 text-xs text-stone-500 flex items-center gap-1">
                  <Mail className="h-3 w-3 text-stone-400" />
                  <span>{profile.contact}</span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => onOpenOrderModal(publication.id, publication.title)}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-stone-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-stone-800 active:scale-[0.99] shadow-sm"
              >
                <ShoppingBag className="h-4 w-4 text-amber-300" />
                <span>Solicitar Pedido</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenReportModal(publication.id)}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-xs font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                title="Reportar esta publicación a administración"
              >
                <AlertCircle className="h-3.5 w-3.5 text-stone-400" />
                <span>Reportar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
