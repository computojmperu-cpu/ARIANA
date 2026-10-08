import React from 'react';
import { Category, Publication, User, ActiveView } from '../types';
import { PublicationCard } from './PublicationCard';
import { heroImage } from '../data/initialData';
import { ImageBackground } from './ImageBackground';
import { ArrowRight, Sparkles, Palette, Cake, Scissors, Camera, LayoutGrid, Brush } from 'lucide-react';

interface HomeViewProps {
  categories: Category[];
  publications: Publication[];
  users: User[];
  onSelectCategory: (categoryId: string) => void;
  onSelectPublication: (pubId: string) => void;
  onNavigate: (view: ActiveView) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  categories,
  publications,
  users,
  onSelectCategory,
  onSelectPublication,
  onNavigate
}) => {
  const featuredPublications = publications.filter(
    (p) => p.featured && p.status === 'activo'
  );

  const getCategoryIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'arte':
        return <Brush className="h-4 w-4" />;
      case 'decoración':
        return <Sparkles className="h-4 w-4" />;
      case 'manualidades':
        return <Scissors className="h-4 w-4" />;
      case 'diseño digital':
        return <LayoutGrid className="h-4 w-4" />;
      case 'repostería':
        return <Cake className="h-4 w-4" />;
      case 'fotografía':
        return <Camera className="h-4 w-4" />;
      default:
        return <Palette className="h-4 w-4" />;
    }
  };

  const getCategoryCount = (catId: string) => {
    return publications.filter(
      (p) => p.categoryId === catId && p.status === 'activo'
    ).length;
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner: SIN ETIQUETAS IMG - using background-image container with measured contrast scrim */}
      <section className="relative overflow-hidden rounded-2xl border border-stone-200/90 shadow-sm">
        <ImageBackground
          src={heroImage}
          alt="Taller de artesanos y creadores estudiantiles"
          className="min-h-[420px] sm:min-h-[460px] flex items-center"
        >
          {/* Measured contrast scrim gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/75 to-stone-900/35" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-2xl px-6 py-12 sm:px-10 sm:py-16 text-white">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-3">
              <span>Mercado Creativo Estudiantil</span>
              <span aria-hidden="true">·</span>
              <span>Comunidad .edu.pe</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance leading-tight">
              Talento, arte y emprendimiento hecho a mano y a tu medida
            </h1>

            <p className="mt-4 text-sm sm:text-base text-stone-200/95 leading-relaxed max-w-xl">
              Conecta directamente con estudiantes creadores: encarga retratos, postres artesanales,
              manualidades para fechas especiales y servicios de diseño para tus proyectos.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('explore')}
                className="flex items-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-300 active:scale-[0.99] shadow-sm"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('explore')}
                className="rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-xs sm:text-sm font-medium text-white backdrop-blur-xs transition-colors hover:bg-white/20"
              >
                Ver Creaciones Destacadas
              </button>
            </div>
          </div>
        </ImageBackground>
      </section>

      {/* Categorías Principales */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs uppercase font-medium text-stone-400 tracking-wider">
              Categorías
            </div>
            <h2 className="font-display text-2xl font-bold text-stone-900">
              Explora por Especialidad Creativa
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1 group"
          >
            <span>Ver todas</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className="group flex flex-col text-left p-4 rounded-xl border border-stone-200 bg-white transition-all duration-150 hover:-translate-y-0.5 hover:border-stone-400 hover:shadow-sm"
              >
                <div className="h-9 w-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 mb-3 group-hover:bg-stone-900 group-hover:text-amber-300 transition-colors">
                  {getCategoryIcon(cat.name)}
                </div>
                <h3 className="font-display font-semibold text-sm text-stone-900 group-hover:text-stone-950">
                  {cat.name}
                </h3>
                <p className="mt-1 text-[11px] text-stone-500 line-clamp-2 leading-snug">
                  {cat.description}
                </p>
                <div className="mt-3 text-[11px] font-mono text-stone-400">
                  {count} {count === 1 ? 'publicación' : 'publicaciones'}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Publicaciones Destacadas */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs uppercase font-medium text-stone-400 tracking-wider">
              Selección Curada
            </div>
            <h2 className="font-display text-2xl font-bold text-stone-900">
              Publicaciones Destacadas
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1 group"
          >
            <span>Explorar catálogo completo</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPublications.map((pub) => {
            const author = users.find((u) => u.id === pub.userId);
            const category = categories.find((c) => c.id === pub.categoryId);
            return (
              <PublicationCard
                key={pub.id}
                publication={pub}
                author={author}
                category={category}
                onSelect={onSelectPublication}
              />
            );
          })}
        </div>
      </section>

      {/* Proof / Value Proposition */}
      <section className="rounded-2xl border border-stone-200 bg-stone-100/70 p-8 sm:p-10">
        <div className="max-w-2xl mb-8">
          <div className="text-xs uppercase font-medium text-stone-500 tracking-wider">
            Comunidad Universitaria
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 mt-1">
            ¿Por qué comprar en CreaMarket?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Cada pedido apoya directamente a un compañero que financia sus estudios y desarrolla sus talentos artísticos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-white border border-stone-200">
            <div className="font-mono text-xs font-semibold text-stone-400 mb-2">01</div>
            <h3 className="font-display font-semibold text-stone-900 text-sm">
              Trato Directo y Personalizado
            </h3>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">
              Solicita variaciones específicas de tamaño, técnica, colores o sabores en notas directas a cada creador.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-stone-200">
            <div className="font-mono text-xs font-semibold text-stone-400 mb-2">02</div>
            <h3 className="font-display font-semibold text-stone-900 text-sm">
              Transparencia y Entregas Claras
            </h3>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">
              Conoce con exactitud si el producto está disponible de inmediato o requiere días de elaboración artesanal.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-stone-200">
            <div className="font-mono text-xs font-semibold text-stone-400 mb-2">03</div>
            <h3 className="font-display font-semibold text-stone-900 text-sm">
              Gestión Segura con Roles
            </h3>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">
              Seguimiento del estado de tu pedido desde "Pendiente", "En preparación", hasta "Listo" y "Entregado".
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
