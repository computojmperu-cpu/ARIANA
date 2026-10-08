export type UserRole = 'guest' | 'client' | 'entrepreneur' | 'admin';
export type UserStatus = 'activo' | 'suspendido';

export interface EntrepreneurProfile {
  name: string;
  description: string;
  skills: string;
  contact: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  entrepreneurProfile?: EntrepreneurProfile;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export type PublicationType = 'servicio' | 'producto';
export type PublicationAvailability = 'disponible' | 'bajo_pedido';
export type PublicationStatus = 'activo' | 'inactivo';

export interface Publication {
  id: string;
  userId: string;
  title: string;
  type: PublicationType;
  categoryId: string;
  price: number;
  time: string;
  availability: PublicationAvailability;
  image: string;
  description: string;
  featured: boolean;
  status: PublicationStatus;
}

export type OrderStatus =
  | 'Pendiente'
  | 'Aceptado'
  | 'En preparación'
  | 'Listo'
  | 'Entregado'
  | 'Rechazado'
  | 'Cancelado';

export interface Order {
  id: string;
  clientId: string;
  entrepreneurId: string;
  publicationId: string;
  quantity: number;
  notes: string;
  status: OrderStatus;
  date: string;
}

export type ReportStatus = 'Pendiente' | 'Resuelto';

export interface Report {
  id: string;
  reporterId: string;
  publicationId: string;
  reason: string;
  description: string;
  status: ReportStatus;
  date?: string;
}

export type ActiveView = 'home' | 'explore' | 'detail' | 'client' | 'entrepreneur' | 'admin';
