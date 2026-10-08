import { Category, User, Publication, Order, Report } from '../types';

export const initialCategories: Category[] = [
  { id: '1', name: 'Arte', description: 'Dibujos, pinturas e ilustraciones' },
  { id: '2', name: 'Decoración', description: 'Decoraciones para eventos y espacios' },
  { id: '3', name: 'Manualidades', description: 'Pulseras, tarjetas y adornos hechos a mano' },
  { id: '4', name: 'Diseño digital', description: 'Logos, papelería e invitaciones digitales' },
  { id: '5', name: 'Repostería', description: 'Tortas, cupcakes y postres artesanales' },
  { id: '6', name: 'Fotografía', description: 'Sesiones de fotos y edición profesional' }
];

export const initialUsers: User[] = [
  {
    id: 'u1',
    name: 'Visita Libre',
    email: 'invitado@edu.pe',
    role: 'guest',
    status: 'activo'
  },
  {
    id: 'u2',
    name: 'Juan Pérez',
    email: 'juan.perez@edu.pe',
    role: 'client',
    status: 'activo'
  },
  {
    id: 'u3',
    name: 'María Arte',
    email: 'maria.arte@edu.pe',
    role: 'entrepreneur',
    status: 'activo',
    entrepreneurProfile: {
      name: 'Arte & Detalle María',
      description: 'Retratos hechos a mano y pintura personalizada con técnicas mixtas y acuarela.',
      skills: 'Dibujo, Acuarela, Lettering, Retrato al grafito',
      contact: 'maria.contacto@edu.pe'
    }
  },
  {
    id: 'u4',
    name: 'Administrador General',
    email: 'admin@edu.pe',
    role: 'admin',
    status: 'activo'
  }
];

export const initialPublications: Publication[] = [
  {
    id: 'p1',
    userId: 'u3',
    title: 'Retratos Personalizados a Lápiz',
    type: 'servicio',
    categoryId: '1',
    price: 25.00,
    time: '3 días',
    availability: 'bajo_pedido',
    image: '/src/assets/images/pub_pencil_portrait_1791498304680.jpg',
    description: 'Realizo retratos realistas en formato A4 o A3 a partir de una fotografía de alta resolución. Uso papel Canson texturado de 240g y grafito profesional graduado.',
    featured: true,
    status: 'activo'
  },
  {
    id: 'p2',
    userId: 'u3',
    title: 'Cupcakes Decorados por Docena',
    type: 'producto',
    categoryId: '5',
    price: 30.00,
    time: '1 día',
    availability: 'disponible',
    image: '/src/assets/images/pub_fondant_cupcakes_1791498314667.jpg',
    description: 'Deliciosos cupcakes esponjosos de vainilla de Madagascar o chocolate belga con buttercream suizo y decoración artesanal en fondant floral.',
    featured: true,
    status: 'activo'
  },
  {
    id: 'p3',
    userId: 'u3',
    title: 'Diseño de Identidad & Papelería Estudiantil',
    type: 'servicio',
    categoryId: '4',
    price: 45.00,
    time: '4 días',
    availability: 'bajo_pedido',
    image: '/src/assets/images/pub_digital_branding_1791498324196.jpg',
    description: 'Pack de identidad visual para proyectos, marcas estudiantiles o eventos universitarios: logo vectorial en alta definición, paleta de color, tipografías y plantilla para redes sociales.',
    featured: true,
    status: 'activo'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'o1',
    clientId: 'u2',
    entrepreneurId: 'u3',
    publicationId: 'p1',
    quantity: 1,
    notes: 'Retrato de mi mascota (un perrito golden retriever con bandana azul).',
    status: 'Pendiente',
    date: '2026-10-01'
  }
];

export const initialReports: Report[] = [];

export const heroImage = '/src/assets/images/hero_creamarket_crafts_1791498293223.jpg';
