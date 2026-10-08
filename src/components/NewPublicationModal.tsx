import React, { useState } from 'react';
import { Category, PublicationType, PublicationAvailability } from '../types';
import { Plus, X, Sparkles, Image as ImageIcon } from 'lucide-react';

interface NewPublicationModalProps {
  isOpen: boolean;
  categories: Category[];
  onClose: () => void;
  onSubmit: (publicationData: {
    title: string;
    type: PublicationType;
    categoryId: string;
    price: number;
    time: string;
    availability: PublicationAvailability;
    image: string;
    description: string;
    featured: boolean;
  }) => void;
}

const PRESET_IMAGES = [
  { label: 'Retrato / Arte', url: '/src/assets/images/pub_pencil_portrait_1791498304680.jpg' },
  { label: 'Cupcakes / Postres', url: '/src/assets/images/pub_fondant_cupcakes_1791498314667.jpg' },
  { label: 'Diseño / Marca', url: '/src/assets/images/pub_digital_branding_1791498324196.jpg' },
  { label: 'Taller / Cerámica', url: '/src/assets/images/hero_creamarket_crafts_1791498293223.jpg' }
];

export const NewPublicationModal: React.FC<NewPublicationModalProps> = ({
  isOpen,
  categories,
  onClose,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<PublicationType>('producto');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '1');
  const [price, setPrice] = useState('20.00');
  const [time, setTime] = useState('2 días');
  const [availability, setAvailability] = useState<PublicationAvailability>('bajo_pedido');
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      type,
      categoryId,
      price: parseFloat(price) || 10,
      time: time.trim() || '1 día',
      availability,
      image,
      description: description.trim(),
      featured
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-xl my-8 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="font-display font-bold text-lg text-stone-900">
              Crear Nueva Publicación
            </h3>
            <p className="text-[11px] text-stone-400">Publica un producto físico o servicio creativo</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Título de la publicación
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Pulseras tejidas personalizadas con iniciales"
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-stone-900 focus:border-stone-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Tipo
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as PublicationType)}
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-stone-900 focus:border-stone-400 focus:outline-none"
              >
                <option value="producto">Producto físico</option>
                <option value="servicio">Servicio creativo</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Categoría
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-stone-900 focus:border-stone-400 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Precio ($)
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 font-mono text-stone-900 focus:border-stone-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Tiempo entrega
              </label>
              <input
                type="text"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Ej. 2 días"
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-stone-900 focus:border-stone-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Disponibilidad
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as PublicationAvailability)}
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-stone-900 focus:border-stone-400 focus:outline-none"
              >
                <option value="bajo_pedido">Bajo pedido</option>
                <option value="disponible">Inmediata</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Imagen de muestra
            </label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.url}
                  type="button"
                  onClick={() => setImage(preset.url)}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-colors ${
                    image === preset.url
                      ? 'border-stone-900 bg-stone-50 font-semibold text-stone-900'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <div
                    className="h-8 w-8 rounded shrink-0 bg-stone-200"
                    style={{
                      backgroundImage: `url("${preset.url}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <span className="truncate text-[11px]">{preset.label}</span>
                </button>
              ))}
            </div>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="O pega una URL de imagen..."
              className="w-full rounded-lg border border-stone-200 px-3 py-1.5 text-[11px] text-stone-900 focus:border-stone-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Descripción detallada
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe los materiales, dimensiones, opciones de personalización..."
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-stone-900 focus:border-stone-400 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-100">
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
              Publicar en Catálogo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
