import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { assets } from "../../../utils";

export default function ModalSuscribe({ props }) {
  const [isModalActive, setIsModalActive] = useState(
    localStorage.getItem("IS_MODAL_ACTIVE") || "false"
  );
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.call(this, key, value);
      window.dispatchEvent(new Event("localStorageUpdated"));
    };

    const handleStorageChange = () => {
      setIsModalActive(localStorage.getItem("IS_MODAL_ACTIVE") || "false");
    };

    window.addEventListener("localStorageUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageChange);
      localStorage.setItem = originalSetItem; 
    };
  }, []);

  useEffect(() => {
    setOpen(isModalActive === "true")
  }, [isModalActive]);

  return open && (
    <div class="w-screen top-0 left-0 h-screen bg-black/50 fixed z-[100] md:items-center items-start justify-center p-4 overflow-y-auto flex " 
    >
      <div class="w-full max-w-6xl h-fit overflow-auto  bg-white rounded-lg grid md:grid-cols-2 shadow-md p-2 relative grid-cols-1">
        <button className="absolute top-4 right-4 bg-gray-100 rounded-full p-2 modal-suscribe-button">
          <XMarkIcon className="size-4 text-gray-900 pointer-events-none" strokeWidth={2} />
        </button>
        <div>
          <img
            src={assets.modals.suscribe}
            alt="Un abogado en su oficina"
            class="w-full h-full overflow-hidden object-cover rounded-md"
            loading="lazy"
          />
        </div>
        <div class=" lg:p-8 px-2 py-4">
          <h1 className="w-full text-xl lg:text-2xl font-bold text-gray-900">
            {props.title}
          </h1>
          <p className="w-full lg:text-base text-sm text-gray-500 mt-2">
            {props.description}
          </p>
          <form className="w-full mt-4 gap-2 flex flex-col">
            <div className="flex flex-col gap-2">
              <label className="block text-sm/6 font-medium text-gray-900">
                {props.form.name.label}
              </label>
              <input
                type="text"
                placeholder={props.form.name.placeholder}
                className="w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm/6 font-medium text-gray-900">
                {props.form.email.label}
              </label>
              <input
                type="email"
                placeholder={props.form.email.placeholder}
                className="w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              {props.form.submit}
            </button>

            <p className="text-sm text-gray-500 mt-4">
              {props.terms.p1}{" "}
              <a
                href="/terminos-y-condiciones"
                className="underline text-gray-900"
              >
                {props.terms.p2}
              </a>{" "}
              {props.terms.p3}{" "}
              <a
                href="/politica-de-privacidad"
                className="underline text-gray-900"
              >
                {props.terms.p4}
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
