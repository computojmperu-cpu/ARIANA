import React from 'react';
import { ActiveView, User, UserRole } from '../types';
import { ShoppingBag, Sparkles, ChevronDown, RefreshCw } from 'lucide-react';

interface NavbarProps {
  currentView: ActiveView;
  onNavigate: (view: ActiveView, param?: string) => void;
  currentUser: User;
  allUsers: User[];
  onChangeRole: (role: UserRole) => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currentUser,
  allUsers,
  onChangeRole,
  onResetData
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = React.useState(false);

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'guest':
        return 'Visita Libre (Invitado)';
      case 'client':
        return 'Juan Pérez (Cliente)';
      case 'entrepreneur':
        return 'María Arte (Emprendedora)';
      case 'admin':
        return 'Administrador General';
    }
  };

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case 'guest':
        return 'text-stone-600 bg-stone-100 border-stone-200';
      case 'client':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'entrepreneur':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'admin':
        return 'text-purple-800 bg-purple-50 border-purple-200';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-left focus:outline-none group"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-900 text-amber-300 font-display font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              C
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-stone-900">
              CreaMarket
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Text with clean hover underlines, no capsules) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors pb-0.5 border-b-2 ${
              currentView === 'home'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => onNavigate('explore')}
            className={`transition-colors pb-0.5 border-b-2 ${
              currentView === 'explore'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Explorar
          </button>

          {(currentUser.role === 'client' || currentUser.role === 'entrepreneur') && (
            <button
              onClick={() => onNavigate('client')}
              className={`transition-colors pb-0.5 border-b-2 ${
                currentView === 'client'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              Mis Pedidos
            </button>
          )}

          {currentUser.role === 'entrepreneur' && (
            <button
              onClick={() => onNavigate('entrepreneur')}
              className={`transition-colors pb-0.5 border-b-2 ${
                currentView === 'entrepreneur'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              Mi Emprendimiento
            </button>
          )}

          {currentUser.role === 'admin' && (
            <button
              onClick={() => onNavigate('admin')}
              className={`transition-colors pb-0.5 border-b-2 ${
                currentView === 'admin'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              Panel Admin
            </button>
          )}
        </nav>

        {/* Zone 3: Interactive Role Simulation Controls */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:border-stone-300 transition-colors"
              title="Simular rol de usuario en la aplicación"
            >
              <span className="text-stone-500 font-normal">Rol:</span>
              <span className="font-semibold text-stone-900 max-w-[120px] sm:max-w-none truncate">
                {currentUser.name}
              </span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase ${getRoleBadgeStyle(currentUser.role)}`}>
                {currentUser.role}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-stone-400" />
            </button>

            {roleDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-xl border border-stone-200 bg-white py-2 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setRoleDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 border-b border-stone-100 text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                  Cambiar Rol Simulado
                </div>
                {(['guest', 'client', 'entrepreneur', 'admin'] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      onChangeRole(role);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-stone-50 transition-colors ${
                      currentUser.role === role ? 'font-semibold text-stone-900 bg-stone-50/70' : 'text-stone-600'
                    }`}
                  >
                    <span>{getRoleLabel(role)}</span>
                    {currentUser.role === role && (
                      <span className="h-1.5 w-1.5 rounded-full bg-stone-900" />
                    )}
                  </button>
                ))}
                <div className="border-t border-stone-100 mt-1 pt-1 px-3 py-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      onResetData();
                      setRoleDropdownOpen(false);
                    }}
                    className="flex items-center gap-1.5 text-[11px] text-stone-500 hover:text-stone-800 transition-colors"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Restablecer datos mock iniciales
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav bar row for small screens */}
      <div className="flex md:hidden overflow-x-auto border-t border-stone-100 px-4 py-2 gap-4 text-xs font-medium text-stone-600">
        <button
          onClick={() => onNavigate('home')}
          className={`${currentView === 'home' ? 'text-stone-900 font-semibold' : ''}`}
        >
          Inicio
        </button>
        <button
          onClick={() => onNavigate('explore')}
          className={`${currentView === 'explore' ? 'text-stone-900 font-semibold' : ''}`}
        >
          Explorar
        </button>
        {(currentUser.role === 'client' || currentUser.role === 'entrepreneur') && (
          <button
            onClick={() => onNavigate('client')}
            className={`${currentView === 'client' ? 'text-stone-900 font-semibold' : ''}`}
          >
            Mis Pedidos
          </button>
        )}
        {currentUser.role === 'entrepreneur' && (
          <button
            onClick={() => onNavigate('entrepreneur')}
            className={`${currentView === 'entrepreneur' ? 'text-stone-900 font-semibold' : ''}`}
          >
            Mi Emprendimiento
          </button>
        )}
        {currentUser.role === 'admin' && (
          <button
            onClick={() => onNavigate('admin')}
            className={`${currentView === 'admin' ? 'text-stone-900 font-semibold' : ''}`}
          >
            Panel Admin
          </button>
        )}
      </div>
    </header>
  );
};
