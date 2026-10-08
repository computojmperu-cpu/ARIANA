import {
  initialCategories,
  initialUsers,
  initialPublications,
  initialOrders,
  initialReports
} from '../data/initialData';
import { Category, User, Publication, Order, Report } from '../types';

const KEYS = {
  CATEGORIES: 'cm_categories',
  USERS: 'cm_users',
  PUBLICATIONS: 'cm_publications',
  ORDERS: 'cm_orders',
  REPORTS: 'cm_reports',
  CURRENT_USER_ID: 'cm_current_user_id'
};

export function initStorage(): void {
  try {
    if (!localStorage.getItem(KEYS.CATEGORIES)) {
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(initialCategories));
    }
    if (!localStorage.getItem(KEYS.USERS)) {
      localStorage.setItem(KEYS.USERS, JSON.stringify(initialUsers));
    }
    if (!localStorage.getItem(KEYS.PUBLICATIONS)) {
      localStorage.setItem(KEYS.PUBLICATIONS, JSON.stringify(initialPublications));
    }
    if (!localStorage.getItem(KEYS.ORDERS)) {
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(initialOrders));
    }
    if (!localStorage.getItem(KEYS.REPORTS)) {
      localStorage.setItem(KEYS.REPORTS, JSON.stringify(initialReports));
    }
    if (!localStorage.getItem(KEYS.CURRENT_USER_ID)) {
      localStorage.setItem(KEYS.CURRENT_USER_ID, 'u1'); // guest by default
    }
  } catch (err) {
    console.error('Error initializing storage:', err);
  }
}

export function getStoredCategories(): Category[] {
  try {
    const raw = localStorage.getItem(KEYS.CATEGORIES);
    return raw ? JSON.parse(raw) : initialCategories;
  } catch {
    return initialCategories;
  }
}

export function saveStoredCategories(categories: Category[]): void {
  localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
}

export function getStoredUsers(): User[] {
  try {
    const raw = localStorage.getItem(KEYS.USERS);
    return raw ? JSON.parse(raw) : initialUsers;
  } catch {
    return initialUsers;
  }
}

export function saveStoredUsers(users: User[]): void {
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
}

export function getStoredPublications(): Publication[] {
  try {
    const raw = localStorage.getItem(KEYS.PUBLICATIONS);
    return raw ? JSON.parse(raw) : initialPublications;
  } catch {
    return initialPublications;
  }
}

export function saveStoredPublications(pubs: Publication[]): void {
  localStorage.setItem(KEYS.PUBLICATIONS, JSON.stringify(pubs));
}

export function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(KEYS.ORDERS);
    return raw ? JSON.parse(raw) : initialOrders;
  } catch {
    return initialOrders;
  }
}

export function saveStoredOrders(orders: Order[]): void {
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
}

export function getStoredReports(): Report[] {
  try {
    const raw = localStorage.getItem(KEYS.REPORTS);
    return raw ? JSON.parse(raw) : initialReports;
  } catch {
    return initialReports;
  }
}

export function saveStoredReports(reports: Report[]): void {
  localStorage.setItem(KEYS.REPORTS, JSON.stringify(reports));
}

export function getStoredCurrentUserId(): string {
  return localStorage.getItem(KEYS.CURRENT_USER_ID) || 'u1';
}

export function saveStoredCurrentUserId(id: string): void {
  localStorage.setItem(KEYS.CURRENT_USER_ID, id);
}

export function resetStorageToDefaults(): void {
  localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(initialCategories));
  localStorage.setItem(KEYS.USERS, JSON.stringify(initialUsers));
  localStorage.setItem(KEYS.PUBLICATIONS, JSON.stringify(initialPublications));
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(initialOrders));
  localStorage.setItem(KEYS.REPORTS, JSON.stringify(initialReports));
  localStorage.setItem(KEYS.CURRENT_USER_ID, 'u1');
}
