import { useState, useRef, useEffect } from "react";
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
  PlayCircleIcon,
  Squares2X2Icon,
} from "@heroicons/react/16/solid";
import { assets } from "../../../../utils";

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

const Header = ({ headerProps }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [navLinks, setNavLinks] = useState([]);
  const [showBanner, setShowBanner] = useState(true);

  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  const toggleBanner = () => setShowBanner(!showBanner);

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
        name: headerProps.nav.product,
        href: headerProps.nav.productUrl,
      },
      { name: headerProps.nav.plan, href: headerProps.nav.planUrl },
      { name: headerProps.nav.blog, href: headerProps.nav.blogUrl },
      { name: headerProps.nav.support, href: headerProps.nav.supportUrl },
    ]);
  }, []);
  return (
    <>
      <header className="fixed top-0 w-full z-50">
        {showBanner && (
          <div className="flex items-center justify-between bg-blue-600 px-6 py-1.5">
            <p className="text-xs text-white text-left max-w-7xl mx-auto block w-full line-clamp-2">
              <a
                href={navLinks[0]?.href}
                aria-label="Regístrate para obtener acceso gratuito"
                className="line-clamp-2"
              >
                {headerProps.banner}
              </a>
            </p>
            <button
              type="button"
              onClick={() => toggleBanner()}
              className="p-3"
              aria-label="Cerrar aviso"
            >
              <XMarkIcon className="size-5 text-white" />
            </button>
          </div>
        )}

        <nav
          className="w-full bg-white/50 backdrop-blur-xl"
          aria-label="Menú principal"
          onMouseLeave={() => toggleOpenProducts(false)}
        >
          <div className="flex items-center justify-between px-6 py-4 lg:px-8 max-w-7xl mx-auto">
            <a href={navLinks[0]?.href} aria-label="Ir al inicio">
              <img src={assets.logo} alt="Arxatec logo" className="w-32" />
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
              {navLinks.map((link, idx) => (
                <span key={idx}>
                  {link.action == undefined ? (
                    <a
                      href={link.href}
                      className="text-sm font-semibold text-gray-900 isolate z-50 block"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <button
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
                </span>
              ))}
            </div>
            <div className="hidden lg:flex gap-4">
              <button className="modal-suscribe-button rounded-md px-4 py-2 text-sm font-semibold shadow-xs hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-60 border border-blue-600 bg-transparent text-blue-600">
                {headerProps.actions.register}
              </button>

              <button className="modal-suscribe-button rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                {headerProps.actions.login}
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
                <div className="group relative -mx-3 flex rounded-lg p-3 text-sm/6 hover:bg-gray-50/20 transition-all sm:flex-col sm:p-6 justify-start items-start"
                key={product.name} 
                >
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
                    <PlayCircleIcon className="size-5 flex-none text-gray-400"/>
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
                <a href={navLinks[0]?.href} aria-label="Ir al inicio">
                  <img src={assets.logo} alt="Arxatec logo" className="w-32" />
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
              <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 w-full modal-suscribe-button">
                {headerProps.actions.login}
              </button>

              <button className=" rounded-md px-4 py-2 text-sm font-semibold shadow-xs hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-60 border border-blue-600 bg-transparent text-blue-600 w-full modal-suscribe-button">
                {headerProps.actions.register}
              </button>
            </div>
          </div>
        )}
      </header>

      <div
        className={`mt-[150px] ${
          !showBanner ? "md:mt-[58px]" : "md:mt-[112px]"
        } `}
      ></div>
    </>
  );
};

export default Header;
