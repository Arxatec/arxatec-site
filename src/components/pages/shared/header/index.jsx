import { useState, useRef, useEffect } from "react";
import logo from "../../../../assets/logo.png";
import {
  ChatBubbleBottomCenterIcon,
  DocumentTextIcon,
  CalendarDateRangeIcon,
  UsersIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openProducts, setOpenProducts] = useState(true);

  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  const updateHeight = () => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  };

  useEffect(() => {
    updateHeight();

    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const toggleOpenProducts = (value) => {
    if (value === undefined) {
      setOpenProducts(!openProducts);
      return;
    }
    setOpenProducts(value);
  };

  const navLinks = [
    {
      name: "Producto",
      href: "#",
      action: (val) => toggleOpenProducts(val),
    },
    { name: "Comunidad", href: "#" },
    { name: "Planes", href: "#" },
    { name: "Blog", href: "#" },
  ];
  return (
    <header className="fixed top-0 w-full z-50">
      <div className="flex items-center justify-between bg-blue-600 px-6 py-1.5">
        <p className="text-xs text-white text-left max-w-7xl mx-auto block w-full line-clamp-2">
          <a
            href="#"
            aria-label="Regístrate para obtener acceso gratuito"
            className="line-clamp-2"
          >
            Arxatec está en desarrollo y esta es tu oportunidad de ser parte de
            la revolución legal desde el inicio. Regístrate ahora con tu correo
            electrónico y accede antes que nadie a una plataforma innovadora
            diseñada para optimizar el trabajo de abogados y profesionales del
            derecho. Obtén acceso gratuito de por vida y descubre el futuro del
            mundo legal.
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

      <nav
        className="w-full bg-white/50 backdrop-blur-xl"
        aria-label="Menú principal"
        onMouseLeave={() => toggleOpenProducts(false)}
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
              <>
                {link.action == undefined ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-semibold text-gray-900 isolate z-50 block"
                  >
                    {link.name}
                  </a>
                ) : (
                  <button
                    key={link.name}
                    className="text-sm font-semibold text-gray-900 flex items-center gap-2"
                    onMouseEnter={() => link.action(true)}
                    onClick={() => link.action()}
                  >
                    {link.name}
                    <ChevronDownIcon
                      className="size-4 text-gray-900"
                      strokeWidth={2.5}
                    />
                  </button>
                )}
              </>
            ))}
          </div>
          <div className="hidden lg:flex gap-4">
            <button className=" rounded-md px-4 py-2 text-sm font-semibold shadow-xs hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-60 border border-blue-600 bg-transparent text-blue-600">
              Registrarse
            </button>

            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Iniciar sesión
            </button>
          </div>
        </div>

        <div
          className="transition-all overflow-hidden"
          ref={ref}
          style={{
            visibility: openProducts ? "visible" : "hidden",
            height: openProducts ? `${height}px` : "0px",
          }}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-2 px-6 py-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0 sm:py-10 lg:grid-cols-4 lg:gap-4 lg:px-8 xl:gap-8">
            <div className="group relative -mx-3 flex rounded-lg text-sm/6 hover:bg-gray-50/20 sm:flex-col p-3 sm:p-6 transition-all justify-start items-start">
              <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50/20 transition-all">
                <ChatBubbleBottomCenterIcon className="size-6 text-gray-600" />
              </div>
              <div className="mt-4">
                <a href="#" className="font-semibold text-gray-900">
                  Mensajes
                  <span className="absolute inset-0"></span>
                </a>
                <p className="mt-1 text-gray-600">
                  Comunicación directa e instantánea con los expertos que
                  necesitas.
                </p>
              </div>
            </div>
            <div className="group relative -mx-3 flex rounded-lg text-sm/6 hover:bg-gray-50/20 sm:flex-col transition-all justify-start items-start  p-3 sm:p-6 ">
              <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50/20 transition-all">
                <DocumentTextIcon className="size-6 text-gray-600" />
              </div>
              <div className="mt-4">
                <a href="#" className="font-semibold text-gray-900">
                  Gestión de casos
                  <span className="absolute inset-0"></span>
                </a>
                <p className="mt-1 text-gray-600">
                  Tus abogados en tiempo real para una comunicación más rápida y
                  efectiva.
                </p>
              </div>
            </div>
            <div className="group relative -mx-3 flex  rounded-lg p-3 text-sm/6 hover:bg-gray-50/20 sm:flex-col sm:p-6 transitione-all jusitify-start items-start">
              <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50/20 transition-all">
                <CalendarDateRangeIcon className="size-6 text-gray-600" />
              </div>
              <div className="mt-4">
                <a href="#" className="font-semibold text-gray-900">
                  Calendario
                  <span className="absolute inset-0"></span>
                </a>
                <p className="mt-1 text-gray-600">
                  Gestiona reuniones y audiencias virtuales sin complicaciones.
                </p>
              </div>
            </div>
            <div className="group relative -mx-3 flex rounded-lg p-3 text-sm/6 hover:bg-gray-50/20 transition-all sm:flex-col sm:p-6 justify-start items-start">
              <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50/20 transition-all">
                <UsersIcon className="size-6 text-gray-600" />
              </div>
              <div className="mt-4">
                <a href="#" className="font-semibold text-gray-900">
                  Comunidad
                  <span className="absolute inset-0"></span>
                </a>
                <p className="mt-1 text-gray-600">
                  Comparte con otros profesionales y clientes sobre el mundo
                  legal.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50/20">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-3">
                <a
                  href="#"
                  className="flex items-center gap-x-2.5 p-3 px-6 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100/30 transition-all sm:justify-center sm:px-0"
                >
                  <svg
                    className="size-5 flex-none text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Watch demo
                </a>
                <a
                  href="#"
                  className="flex items-center gap-x-2.5 p-3 px-6 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100 sm:justify-center sm:px-0 hover:bg-gray-100/30 transition-all "
                >
                  <svg
                    className="size-5 flex-none text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Contact sales
                </a>
                <a
                  href="#"
                  className="flex items-center gap-x-2.5 p-3 px-6 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100 sm:justify-center sm:px-0 hover:bg-gray-100/30 transition-all "
                >
                  <svg
                    className="size-5 flex-none text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v4A1.5 1.5 0 0 0 2.5 10h6A1.5 1.5 0 0 0 10 8.5v-4A1.5 1.5 0 0 0 8.5 3h-6Zm11 2A1.5 1.5 0 0 0 12 6.5v7a1.5 1.5 0 0 0 1.5 1.5h4a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 17.5 5h-4Zm-10 7A1.5 1.5 0 0 0 2 13.5v2A1.5 1.5 0 0 0 3.5 17h6a1.5 1.5 0 0 0 1.5-1.5v-2A1.5 1.5 0 0 0 9.5 12h-6Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  View all products
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

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
