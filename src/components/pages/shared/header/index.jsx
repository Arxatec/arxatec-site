import { useState } from "react";
import logo from "../../../../assets/logo.png";

const navLinks = [
  { name: "Producto", href: "#" },
  { name: "Comunidad", href: "#" },
  { name: "Planes", href: "#" },
  { name: "Blog", href: "#" },
];

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Banner de aviso */}
      <div className="flex items-center justify-between bg-blue-600 px-6 py-2.5">
        <p className="text-xs text-white text-left max-w-7xl mx-auto">
          <a href="#" aria-label="Regístrate para obtener acceso gratuito">
            Arxatec aún está en desarrollo, pero tú puedes ser de los primeros
            en probarlo. Regístrate ahora con tu correo electrónico y obtén
            acceso gratuito de por vida.
          </a>
        </p>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="p-3"
          aria-label="Cerrar aviso"
        >
          <svg
            className="size-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      </div>

      {/* Barra de navegación */}
      <nav
        className="w-full bg-white/50 backdrop-blur-xl"
        aria-label="Menú principal"
      >
        <div className="flex items-center justify-between px-6 py-4 lg:px-8 max-w-7xl mx-auto">
          <a href="#" aria-label="Ir al inicio">
            <img src={logo.src} alt="Arxatec logo" className="w-32" />
          </a>
          <div className="lg:hidden">
            <button
              type="button"
              className="p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir menú"
            >
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-gray-900"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex gap-4">
            <button class=" rounded-md px-4 py-2 text-sm font-semibold shadow-xs hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-60 border border-blue-600 bg-transparent text-blue-600">
              Registrarse
            </button>

            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Iniciar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/50 backdrop-blur-xl px-6 py-6 sm:max-w-sm">
          <div className="space-y-2 py-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-950"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="py-6">
            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Iniciar sesión
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
