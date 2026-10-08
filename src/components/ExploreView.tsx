import React, { useState, useMemo } from 'react';
import { Category, Publication, User, PublicationType, PublicationAvailability } from '../types';
import { PublicationCard } from './PublicationCard';
import { Search, RotateCcw, Filter, SlidersHorizontal } from 'lucide-react';

interface ExploreViewProps {
  categories: Category[];
  publications: Publication[];
  users: User[];
  initialCategory?: string;
  onSelectPublication: (pubId: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  categories,
  publications,
  users,
  initialCategory = 'all',
  onSelectPublication
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');

  const filteredPublications = useMemo(() => {
    return publications.filter((p) => {
      if (p.status !== 'activo') return false;

      const matchesSearch =
        searchTerm.trim() === '' ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || p.categoryId === selectedCategory;

      const matchesType =
        selectedType === 'all' || p.type === selectedType;

      const matchesAvailability =
        selectedAvailability === 'all' || p.availability === selectedAvailability;

      return matchesSearch && matchesCategory && matchesType && matchesAvailability;
    });
  }, [publications, searchTerm, selectedCategory, selectedType, selectedAvailability]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedAvailability('all');
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategory !== 'all' ||
    selectedType !== 'all' ||
    selectedAvailability !== 'all';

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="text-xs uppercase font-medium text-stone-400 tracking-wider">
          Mercado Creativo
        </div>
        <h1 className="font-display text-3xl font-bold text-stone-900 mt-1">
          Explorar Catálogo Estudiantil
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Encuentra productos físicos hechos a mano o encarga servicios creativos a medida.
        </p>
      </div>

      {/* Filter Box */}
      <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs space-y-4">
        {/* Search row */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            id="filter-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por título, técnica, producto (ej. retrato, cupcakes, logo)..."
            className="w-full rounded-lg border border-stone-200 bg-stone-50/50 pl-10 pr-4 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-stone-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Dropdowns row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-1">
          {/* Categoría */}
          <div>
            <label
              htmlFor="filter-category"
              className="block text-[11px] font-medium text-stone-500 mb-1"
            >
              Categoría
            </label>
            <select
              id="filter-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-800 focus:border-stone-400 focus:outline-none"
            >
              <option value="all">Todas las categorías</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tipo */}
          <div>
            <label
              htmlFor="filter-type"
              className="block text-[11px] font-medium text-stone-500 mb-1"
            >
              Tipo de Publicación
            </label>
            <select
              id="filter-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-800 focus:border-stone-400 focus:outline-none"
            >
              <option value="all">Todos los tipos</option>
              <option value="producto">Producto físico</option>
              <option value="servicio">Servicio a medida</option>
            </select>
          </div>

          {/* Disponibilidad */}
          <div>
            <label
              htmlFor="filter-availability"
              className="block text-[11px] font-medium text-stone-500 mb-1"
            >
              Disponibilidad
            </label>
            <select
              id="filter-availability"
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-800 focus:border-stone-400 focus:outline-none"
            >
              <option value="all">Cualquier disponibilidad</option>
              <option value="disponible">Entrega inmediata / disponible</option>
              <option value="bajo_pedido">Bajo pedido / elaboración</option>
            </select>
          </div>

          {/* Reset Filters button */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleReset}
              disabled={!hasActiveFilters}
              className={`w-full flex items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                hasActiveFilters
                  ? 'border-stone-300 bg-stone-100 text-stone-800 hover:bg-stone-200'
                  : 'border-stone-200 bg-stone-50 text-stone-400 cursor-not-allowed'
              }`}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Limpiar Filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Meta */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <div>
          Mostrando <strong className="font-semibold text-stone-800">{filteredPublications.length}</strong> publicaciones activas
        </div>
      </div>

      {/* Grid */}
      {filteredPublications.length > 0 ? (
        <div id="explore-cards-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPublications.map((pub) => {
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
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-400 mb-3">
            <Filter className="h-5 w-5" />
          </div>
          <h3 className="font-display font-semibold text-stone-900 text-base">
            No se encontraron publicaciones
          </h3>
          <p className="mt-1 text-xs text-stone-500 max-w-sm mx-auto">
            Prueba ajustando los términos de búsqueda o limpiando los filtros seleccionados.
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800"
            >
              Restablecer todos los filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
};
