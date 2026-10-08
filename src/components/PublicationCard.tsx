import React from 'react';
import { Publication, User, Category } from '../types';
import { ImageBackground } from './ImageBackground';
import { ArrowUpRight, Clock } from 'lucide-react';

interface PublicationCardProps {
  publication: Publication;
  author?: User;
  category?: Category;
  onSelect: (id: string) => void;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({
  publication,
  author,
  category,
  onSelect
}) => {
  const authorName =
    author?.entrepreneurProfile?.name || author?.name || 'Estudiante Creador';

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-stone-200/90 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-stone-300">
      {/* Visual Container: SIN ETIQUETAS IMG - using div container with background-image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <ImageBackground
          src={publication.image}
          alt={publication.title}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
        />
        {/* Unboxed subtle indicator on top right */}
        {publication.featured && (
          <div className="absolute top-2.5 right-2.5 rounded bg-stone-900/80 backdrop-blur-xs px-2 py-0.5 text-[11px] font-medium text-amber-300">
            Destacado
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Unboxed metadata line with typographic bullet separators */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
          <span className="capitalize font-medium text-stone-700">
            {publication.type}
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>{category?.name || 'General'}</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>{publication.availability === 'disponible' ? 'Inmediato' : 'A pedido'}</span>
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-base text-stone-900 line-clamp-1 group-hover:text-stone-700 transition-colors">
          {publication.title}
        </h3>

        {/* Short description */}
        <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed flex-1">
          {publication.description}
        </p>

        {/* Footer info: Price & Author */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-stone-400">Precio</div>
            <div className="font-mono text-base font-bold text-stone-900 tabular-nums">
              ${publication.price.toFixed(2)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-stone-400">Creador</div>
            <div className="text-xs font-medium text-stone-700 max-w-[130px] truncate">
              {authorName}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => onSelect(publication.id)}
          className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-stone-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-stone-800 active:scale-[0.99]"
        >
          <span>Ver Detalle</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
