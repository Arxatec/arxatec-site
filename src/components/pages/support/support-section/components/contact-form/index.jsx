import { useState } from "react";
import { assets } from "../../../../../../utils/assets.utilities.ts";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalState, setModalState] = useState({
    isThankYouModalOpen: false,
    isThankYouModalClosing: false,
  });

  const validateField = (name, value) => {
    switch (name) {
      case "first_name":
      case "last_name":
        return value.trim() ? "" : "Este campo es obligatorio";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Correo electrónico inválido";
      case "phone":
        return /^[+\d\s()-]{7,}$/.test(value)
          ? ""
          : "Número de teléfono inválido";
      case "country":
      case "subject":
        return value.trim() ? "" : "Este campo es obligatorio";
      case "message":
        return value.trim().length >= 10
          ? ""
          : "El mensaje debe tener al menos 10 caracteres";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    console.log(
      JSON.stringify({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        subject: formData.subject,
        message: formData.message,
      })
    );

    try {
      const response = await fetch(
        "https://arxatec-service-production.up.railway.app/api/v1/form/support",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            subject: formData.subject,
            message: formData.message,
          }),
        }
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          country: "",
          subject: "",
          message: "",
        });
        setModalState({ ...modalState, isThankYouModalOpen: true });
      } else {
        const statusCode = response.status;
        setSubmitStatus("error");

        switch (statusCode) {
          case 400:
            setErrorMessage(
              "Hay un problema con los datos enviados. Por favor, revisa la información e inténtalo de nuevo."
            );
            break;
          case 401:
            setErrorMessage(
              "No tienes autorización para enviar este formulario."
            );
            break;
          case 403:
            setErrorMessage("No tienes permiso para realizar esta acción.");
            break;
          case 404:
            setErrorMessage(
              "No se encontró el servicio de contacto. Por favor, inténtalo más tarde."
            );
            break;
          case 422:
            setErrorMessage(
              "No se pudo procesar la información. Por favor, verifica que todos los campos sean correctos."
            );
            break;
          case 429:
            setErrorMessage(
              "Has enviado demasiadas solicitudes. Por favor, espera unos minutos antes de intentarlo de nuevo."
            );
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            setErrorMessage(
              "Hay un problema con nuestros servidores. Por favor, inténtalo más tarde."
            );
            break;
          default:
            setErrorMessage(
              "Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo."
            );
        }
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        "No se pudo conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeThankYouModal = () => {
    setModalState({ ...modalState, isThankYouModalClosing: true });
    setTimeout(() => {
      setModalState({
        isThankYouModalOpen: false,
        isThankYouModalClosing: false,
      });
    }, 300);
  };

  const CloseButton = ({ onClick, className, size = 6 }) => (
    <button
      type="button"
      className={`absolute text-gray-400 hover:text-gray-500 focus:outline-none ${className}`}
      onClick={onClick}
    >
      <span className="sr-only">Cerrar</span>
      <svg
        className={`h-${size} w-${size}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="w-full">
            <label
              htmlFor="first_name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Nombre
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 ${
                  errors.first_name ? "outline-red-500" : "outline-gray-300"
                } placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 text-sm`}
                placeholder="Ingrese su nombre"
              />
              {errors.first_name && (
                <p className="mt-1 text-xs text-red-500">{errors.first_name}</p>
              )}
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="last_name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Apellido
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 ${
                  errors.last_name ? "outline-red-500" : "outline-gray-300"
                } placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm`}
                placeholder="Ingrese su apellido"
              />
              {errors.last_name && (
                <p className="mt-1 text-xs text-red-500">{errors.last_name}</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Correo electrónico
          </label>
          <div className="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 ${
                errors.email ? "outline-red-500" : "outline-gray-300"
              } placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 text-sm`}
              placeholder="Ingrese su correo electrónico"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="phone"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Teléfono
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 ${
                errors.phone ? "outline-red-500" : "outline-gray-300"
              } placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 text-sm`}
              placeholder="Ingrese su número de teléfono"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="country"
            className="block text-sm/6 font-medium text-gray-900"
          >
            País
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
              className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 ${
                errors.country ? "outline-red-500" : "outline-gray-300"
              } placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 text-sm`}
              placeholder="Ingrese su país"
            />
            {errors.country && (
              <p className="mt-1 text-xs text-red-500">{errors.country}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="subject"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Asunto
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 ${
                errors.subject ? "outline-red-500" : "outline-gray-300"
              } placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 text-sm`}
              placeholder="Ingrese el asunto del mensaje"
            />
            {errors.subject && (
              <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="message"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Mensaje
          </label>
          <div className="mt-2">
            <textarea
              rows="4"
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 ${
                errors.message ? "outline-red-500" : "outline-gray-300"
              } placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 text-sm`}
              placeholder="Escriba su mensaje aquí"
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message}</p>
            )}
          </div>
        </div>
        <p className="text-sm mt-4 text-gray-700">
          Al enviar este formulario, acepta nuestra política de privacidad y
          términos de servicio.
        </p>

        {submitStatus === "success" && (
          <p className="mt-4 text-sm text-green-600 font-medium">
            Su mensaje ha sido enviado correctamente. Nos pondremos en contacto
            pronto.
          </p>
        )}

        {submitStatus === "error" && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600 font-medium">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded-md ${
            isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-500"
          } px-4 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 w-full mt-12`}
        >
          {isSubmitting ? "Enviando..." : "Enviar mensaje"}
        </button>
      </form>

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
              alt="Gracias por contactarnos"
              className="w-40 h-40 mx-auto mb-6 object-cover rounded-full"
              loading="lazy"
            />
            <h1
              id="thank-you-modal-title"
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              ¡Gracias por contactarnos!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Hemos recibido tu mensaje y nos pondremos en contacto contigo lo
              antes posible.
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
