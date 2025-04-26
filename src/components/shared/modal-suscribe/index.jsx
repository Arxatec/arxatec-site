import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useCallback } from "react";
import { assets } from "../../../utils";
import axios from "axios";

const injectAnimationStyles = () => {
  if (document.getElementById("modal-animations")) return;

  const style = document.createElement("style");
  style.id = "modal-animations";
  style.textContent = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
    @keyframes scaleOut { from { transform: scale(1); opacity: 1; } to { transform: scale(0.95); opacity: 0; } }
    
    .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
    .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
    .animate-fadeOut { animation: fadeOut 0.3s ease-out forwards; }
    .animate-scaleOut { animation: scaleOut 0.3s ease-out forwards; }
  `;
  document.head.appendChild(style);
};

const subscriptionService = {
  create: async (email, name) => {
    try {
      const response = await axios.post(
        "https://arxatec-service-production.up.railway.app/api/v1/waitlist",
        { email, name }
      );
      return { success: true, data: response.data };
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 400) {
          return {
            success: false,
            error:
              "Este correo electrónico ya está suscrito. Por favor verifica que tu correo electrónico sea correcto e intenta nuevamente.",
          };
        } else if (statusCode === 404) {
          return {
            success: false,
            error:
              "El servicio de suscripción no está disponible en este momento. Por favor intenta más tarde o contacta con soporte.",
          };
        }
      }

      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.message ||
          "Ha ocurrido un error al procesar tu solicitud. Por favor intenta nuevamente más tarde.",
      };
    }
  },
};

const CloseButton = ({ onClick, className = "", size = 4 }) => (
  <button
    className={`absolute hover:bg-gray-200 rounded-full p-2 transition-all duration-200 ${className}`}
    onClick={onClick}
    aria-label="Cerrar"
  >
    <XMarkIcon
      className={`size-${size} text-gray-900 pointer-events-none`}
      strokeWidth={2}
    />
  </button>
);

const SubscriptionForm = ({
  props,
  onSubmit,
  isSubmitting,
  errors,
  submitError,
  onChange,
  formValues,
}) => (
  <form className="w-full mt-4 gap-2 flex flex-col" onSubmit={onSubmit}>
    <FormField
      label={props.form.name.label}
      type="text"
      placeholder={props.form.name.placeholder}
      name="name"
      error={errors.name}
      onChange={(e) => onChange("name", e.target.value)}
      value={formValues.name}
      required
    />
    <FormField
      label={props.form.email.label}
      type="email"
      placeholder={props.form.email.placeholder}
      name="email"
      error={errors.email}
      onChange={(e) => onChange("email", e.target.value)}
      value={formValues.email}
      required
    />

    <button
      type="submit"
      className="w-full mt-6 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-70"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Enviando..." : props.form.submit}
    </button>

    {submitError && <p className="text-sm text-red-500 mt-2">{submitError}</p>}

    <p className="text-sm text-gray-500 mt-4">
      {props.terms.p1}{" "}
      <a href="/terminos-y-condiciones" className="underline text-gray-900">
        {props.terms.p2}
      </a>{" "}
      {props.terms.p3}{" "}
      <a href="/politica-de-privacidad" className="underline text-gray-900">
        {props.terms.p4}
      </a>
      .
    </p>
  </form>
);

const FormField = ({
  label,
  type = "text",
  placeholder = "",
  name,
  error,
  onChange,
  required = false,
  value = "",
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      className={`w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 -outline-offset-1 ${
        error ? "outline-red-500" : "outline-gray-300"
      } placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 text-sm`}
      onChange={onChange}
      value={value}
      aria-invalid={error ? "true" : "false"}
    />
    {error && (
      <p className="text-sm text-red-500" role="alert">
        {error}
      </p>
    )}
  </div>
);

export default function ModalSuscribe({ props }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    errors: {},
    isSubmitting: false,
    submitError: "",
  });

  const [modalState, setModalState] = useState({
    isModalActive: localStorage.getItem("IS_MODAL_ACTIVE") || "false",
    isSubscribeModalOpen: false,
    isSubscribeModalClosing: false,
    isThankYouModalOpen: false,
    isThankYouModalClosing: false,
  });

  useEffect(() => {
    injectAnimationStyles();
  }, []);

  useEffect(() => {
    const originalSetItem = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      originalSetItem.call(this, key, value);
      window.dispatchEvent(new Event("localStorageUpdated"));
    };

    const handleStorageChange = () => {
      setModalState((prev) => ({
        ...prev,
        isModalActive: localStorage.getItem("IS_MODAL_ACTIVE") || "false",
      }));
    };

    window.addEventListener("localStorageUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageChange);
      localStorage.setItem = originalSetItem;
    };
  }, []);

  useEffect(() => {
    setModalState((prev) => ({
      ...prev,
      isSubscribeModalOpen: prev.isModalActive === "true",
    }));
  }, [modalState.isModalActive]);

  const handleInputChange = useCallback((field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    const { name, email } = formState;

    if (!name.trim()) {
      errors.name = "El nombre es requerido";
    }

    if (!email.trim()) {
      errors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "El email no es válido";
    }

    setFormState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  }, [formState.name, formState.email]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setFormState((prev) => ({
        ...prev,
        submitError: "",
        isSubmitting: true,
      }));

      if (!validateForm()) {
        setFormState((prev) => ({ ...prev, isSubmitting: false }));
        return;
      }

      const { name, email } = formState;
      const result = await subscriptionService.create(email, name);

      if (result.success) {
        closeSubscribeModal();

        setTimeout(() => {
          setModalState((prev) => ({ ...prev, isThankYouModalOpen: true }));
          setFormState((prev) => ({
            ...prev,
            name: "",
            email: "",
            isSubmitting: false,
          }));
        }, 300);
      } else {
        setFormState((prev) => ({
          ...prev,
          submitError: result.error,
          isSubmitting: false,
        }));
      }
    },
    [formState, validateForm]
  );

  const closeSubscribeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isSubscribeModalClosing: true }));

    setTimeout(() => {
      setModalState((prev) => ({
        ...prev,
        isSubscribeModalOpen: false,
        isSubscribeModalClosing: false,
      }));
    }, 300);
  }, []);

  const closeThankYouModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isThankYouModalClosing: true }));

    setTimeout(() => {
      setModalState((prev) => ({
        ...prev,
        isThankYouModalOpen: false,
        isThankYouModalClosing: false,
      }));
    }, 300);
  }, []);

  return (
    <>
      {modalState.isSubscribeModalOpen && (
        <div
          className={`w-screen top-0 left-0 h-screen bg-black/80 fixed z-[100] md:items-center items-start justify-center p-4 overflow-y-auto flex transition-all duration-300 ease-in-out ${
            modalState.isSubscribeModalClosing
              ? "animate-fadeOut"
              : "animate-fadeIn"
          }`}
          aria-modal="true"
          role="dialog"
          aria-labelledby="subscription-modal-title"
        >
          <div
            className={`w-full max-w-6xl h-fit overflow-auto bg-white rounded-lg grid md:grid-cols-2 shadow-md p-2 relative grid-cols-1 transition-all duration-300 ease-in-out ${
              modalState.isSubscribeModalClosing
                ? "animate-scaleOut"
                : "animate-scaleIn"
            }`}
          >
            <CloseButton
              onClick={closeSubscribeModal}
              className="top-4 right-4 modal-suscribe-button"
            />

            <div className="h-full">
              <img
                src={assets.modals.suscribe}
                alt="Un abogado en su oficina"
                className="w-full h-full overflow-hidden object-cover rounded-md"
                loading="lazy"
              />
            </div>

            <div className="lg:p-8 px-2 py-4">
              <h1
                id="subscription-modal-title"
                className="w-full text-xl lg:text-2xl font-bold text-gray-900"
              >
                {props.title}
              </h1>
              <p className="w-full lg:text-base text-sm text-gray-500 mt-2">
                {props.description}
              </p>

              <SubscriptionForm
                props={props}
                onSubmit={handleSubmit}
                isSubmitting={formState.isSubmitting}
                errors={formState.errors}
                submitError={formState.submitError}
                onChange={handleInputChange}
                formValues={formState}
              />
            </div>
          </div>
        </div>
      )}

      {modalState.isThankYouModalOpen && (
        <div
          className={`w-screen top-0 left-0 h-screen bg-white fixed z-[110] flex flex-col items-center justify-center p-8 transition-all duration-300 ease-in-out ${
            modalState.isThankYouModalClosing
              ? "animate-fadeOut"
              : "animate-fadeIn"
          }`}
          aria-modal="true"
          role="dialog"
          aria-labelledby="thank-you-modal-title"
        >
          <CloseButton
            onClick={closeThankYouModal}
            className="top-4 right-8"
            size={5}
          />

          <div
            className={`max-w-2xl text-center transition-all duration-300 ease-in-out ${
              modalState.isThankYouModalClosing
                ? "animate-scaleOut"
                : "animate-scaleIn"
            }`}
          >
            <img
              src={assets.icon_logo}
              alt="Gracias por suscribirte"
              className="w-40 h-40 mx-auto mb-6 object-cover rounded-full"
              loading="lazy"
            />
            <h1
              id="thank-you-modal-title"
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              ¡Gracias por suscribirte!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Estamos muy contentos de que te hayas unido a nuestra lista.
              Pronto recibirás noticias nuestras.
            </p>
            <button
              onClick={closeThankYouModal}
              className="inline-block transition-all rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              Volver a la página
            </button>
          </div>
        </div>
      )}
    </>
  );
}
