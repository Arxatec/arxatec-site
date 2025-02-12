import React, { useState } from "react";

const QaSection = () => {
  const faqs = [
    {
      question: "¿Qué es esta plataforma y cómo puede ayudarme?",
      answer:
        "Nuestra plataforma es una solución integral diseñada para abogados y profesionales del derecho. Integra inteligencia artificial con herramientas avanzadas como CRM para la gestión de clientes, una comunidad interactiva para compartir conocimientos y colaborar con otros abogados, y la integración con servicios de Google. Con Arxatec, puedes gestionar casos de manera eficiente, automatizar tareas repetitivas, comunicarte con clientes en tiempo real y acceder a una red de profesionales para fortalecer tu práctica legal.",
    },
    {
      question: "¿Cuánto cuesta el servicio?",
      answer:
        "Ofrecemos distintos planes según tus necesidades. Contamos con un plan gratuito que permite acceso a la comunidad y herramientas básicas, ideal para quienes inician. También disponemos de planes premium con funcionalidades avanzadas como gestión de clientes con CRM, automatización de documentos, análisis de datos con IA y más. Te invitamos a revisar nuestra sección de precios para elegir el plan que mejor se adapte a ti.",
    },
    {
      question: "¿Cómo puedo registrarme?",
      answer:
        "Registrarte es rápido y sencillo. Solo haz clic en 'Registrarse', completa el formulario con tu nombre, correo y contraseña, y confirma tu cuenta mediante el enlace que recibirás por correo. Una vez registrado, tendrás acceso inmediato a la plataforma y todas sus herramientas según el plan seleccionado. Si necesitas ayuda, nuestro equipo de soporte está disponible para asistirte.",
    },
    {
      question: "¿Qué diferencia a esta plataforma de otras?",
      answer:
        "Arxatec no es solo una herramienta de gestión, sino un ecosistema completo para abogados. Combinamos inteligencia artificial con automatización de documentos, gestión de casos, CRM avanzado y una comunidad activa de profesionales del derecho. Además, facilitamos la conexión entre abogados y clientes mediante comunicación en tiempo real y funciones especializadas para mejorar la eficiencia del trabajo legal.",
    },
    {
      question: "¿Es segura la información que subo?",
      answer:
        "Sí, la seguridad es nuestra prioridad. Implementamos encriptación avanzada y cumplimos con normativas internacionales como el RGPD para garantizar la privacidad de los datos. Además, ofrecemos autenticación en dos pasos y acceso restringido a información confidencial, asegurando que solo personas autorizadas puedan visualizarla.",
    },
    {
      question: "¿Puedo acceder desde cualquier dispositivo?",
      answer:
        "Sí, nuestra plataforma es completamente web y está optimizada para funcionar en cualquier dispositivo con conexión a internet. Puedes acceder desde computadoras, tablets o smartphones sin necesidad de instalar aplicaciones adicionales. Todo está diseñado para brindarte una experiencia fluida desde cualquier lugar.",
    },
    {
      question: "¿Ofrecen soporte?",
      answer:
        "Sí, contamos con un equipo de soporte especializado listo para ayudarte en cualquier momento. Puedes contactarnos mediante nuestro chat en vivo dentro de la plataforma, por correo electrónico o accediendo a nuestra sección de preguntas frecuentes y tutoriales. Nuestro objetivo es brindarte la mejor experiencia posible y resolver cualquier duda que tengas.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(-1);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40 w-full">
        <div className="mx-auto w-full">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-base/7 font-semibold text-blue-600 text-left">
              Preguntas frecuentes
            </h2>
            <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-950 text-left">
              Preguntas y respuestas
            </p>
            <p className="mt-6 max-w-2xl text-pretty text-left text-base font-medium text-gray-600">
              Choose an affordable plan that's packed with the best features for
              engaging your audience, creating customer loyalty, and driving
              sales.
            </p>
          </div>

          <dl className="mt-2 divide-y divide-gray-900/10 w-full bg-white p-6 rounded-lg shadow-lg">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between text-left text-gray-900 text-lg"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-base font-semibold">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      {openIndex === index ? (
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
                            d="M18 12H6"
                          />
                        </svg>
                      ) : (
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
                            d="M12 6v12m6-6H6"
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                </dt>
                <dd
                  className={`mt-2 pr-12 text-gray-600 ${
                    openIndex === index ? "" : "hidden"
                  }`}
                >
                  <p className="text-base/7">{faq.answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default QaSection;
