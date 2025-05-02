import { useEffect, useState, useCallback } from "react";
import { assets } from "../../../utils";
import { subscriptionService } from "./services";
import { CloseButton, SubscriptionForm } from "./components";

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
      errors.name = props.error.name.required;
    }

    if (!email.trim()) {
      errors.email = props.error.email.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = props.error.email.invalid;
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
        let error = ""
        const statusCode =result;
        if(statusCode === 400) {
          error = props.error["400"]
        }else if(statusCode === 404){
          error = props.error["404"]
        }else{
          error = props.error["500"]
        }
        setFormState((prev) => ({
          ...prev,
          submitError: error,
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
              {props.thanks.title}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {props.thanks.description}
            </p>
            <button
              onClick={closeThankYouModal}
              className="inline-block transition-all rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              {props.thanks.button}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
