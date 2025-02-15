import { useState, useRef, useEffect } from "react";
import logo from "../../../../assets/logo.png";
import {
  ChatBubbleBottomCenterIcon,
  DocumentTextIcon,
  CalendarDateRangeIcon,
  UsersIcon,
  ChevronDownIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import {
  ArrowDownOnSquareIcon,
  Squares2X2Icon,
} from "@heroicons/react/16/solid";

const products = [
  {
    name: "Mensajes",
    description:
      "Comunicación directa e instantánea con los expertos que necesitas.",
    icon: ChatBubbleBottomCenterIcon,
    route: "",
  },
  {
    name: " Gestión de casos",
    description:
      "Tus abogados en tiempo real para una comunicación más rápida y efectiva.",
    icon: DocumentTextIcon,
    route: "",
  },
  {
    name: "Calendario",
    description:
      "Gestiona reuniones y audiencias virtuales sin complicaciones.",
    icon: CalendarDateRangeIcon,
    route: "",
  },
  {
    name: "Comunidad",
    description:
      "Comparte con otros profesionales y clientes sobre el mundo legal.",
    icon: UsersIcon,
    route: "",
  },
];

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openProducts, setOpenProducts] = useState(true);
  const [navLinks, setNavLinks] = useState([]);

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

  useEffect(() => {
    setNavLinks([
      {
        name: "Producto",
        href: "#",
        action: (val) => toggleOpenProducts(val),
        active: openProducts,
      },
      { name: "Planes", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Soporte", href: "#" },
    ]);
  }, [openProducts]);
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
          <XMarkIcon className="size-5 text-white" />
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
              <Bars3Icon className="size-6" />
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
                      className="size-3.5 text-gray-900 transition-all"
                      style={{
                        transform: link.active
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
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
            {products.map((product) => (
              <div className="group relative -mx-3 flex rounded-lg p-3 text-sm/6 hover:bg-gray-50/20 transition-all sm:flex-col sm:p-6 justify-start items-start">
                <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50/20 transition-all">
                  <product.icon className="size-6 text-gray-600" />
                </div>
                <div className="mt-4">
                  <a href="#" className="font-semibold text-gray-900">
                    {product.name}
                    <span className="absolute inset-0"></span>
                  </a>
                  <p className="mt-1 text-gray-600">{product.description}</p>
                </div>
              </div>
            ))}
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
                  Mirar demostración
                </a>
                <a
                  href="#"
                  className="flex items-center gap-x-2.5 p-3 px-6 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100 sm:justify-center sm:px-0 hover:bg-gray-100/30 transition-all "
                >
                  <Squares2X2Icon className="size-5 flex-none text-gray-400" />
                  Ver productos
                </a>
                <a
                  href="#"
                  className="flex items-center gap-x-2.5 p-3 px-6 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100 sm:justify-center sm:px-0 hover:bg-gray-100/30 transition-all "
                >
                  <ArrowDownOnSquareIcon className="size-5 flex-none text-gray-400" />
                  Descargar aplicaciones
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/50 backdrop-blur-xl px-6 py-6 w-screen flex items-stretch justify-between flex-col">
          <div>
            <div className="flex items-center justify-between">
              <a href="#" aria-label="Ir al inicio">
                <img src={logo.src} alt="Arxatec logo" className="w-32" />
              </a>
              <div className="">
                <button
                  type="button"
                  className="p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Abrir menú"
                >
                  <XMarkIcon className="size-6" />
                </button>
              </div>
            </div>
            <div className="space-y-1 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-sm font-semibold text-gray-900 hover:text-gray-950"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="py-4 flex gap-4 flex-col">
            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 w-full">
              Iniciar sesión
            </button>

            <button className=" rounded-md px-4 py-2 text-sm font-semibold shadow-xs hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-60 border border-blue-600 bg-transparent text-blue-600 w-full">
              Registrarse
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
