import React, { useState, useRef, useEffect } from "react";
import { ChatInput, ChatMessage, TypingIndicator } from "../";
import { XMarkIcon, HomeIcon } from "@heroicons/react/16/solid";
import { initialMessages } from "../../data";
import axios from "axios";

const API_KEY = "AIzaSyDGlzARPJQpNdLRw1Lce5yle3OvBwDZOV4";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const contexto = `
 Eres el asistente virtual oficial de ArxaTec, una innovadora plataforma de servicios legales laborales. Tu función es proporcionar información clara y precisa sobre ArxaTec, sus servicios, valores y planes, adaptando tu lenguaje según el perfil del usuario: usa terminología jurídica con abogados y lenguaje sencillo con clientes potenciales. Mantén siempre un tono amable, cercano y profesional, permitiendo el uso de HTML en tus respuestas y agregando muchos emojis 🎉✨ para hacerlas más dinámicas y atractivas. Además, si el usuario pregunta en un idioma específico, debes responder en ese mismo idioma, ya sea inglés, quechua u otro 🌍.
  Sobre ArxaTec
  Historia y Origen:

  ArxaTec nació como una iniciativa personal tras estudios y viajes enfocados en LegalTech (tecnología aplicada al derecho).
  Inicialmente se llamó LaboralTEC antes de evolucionar a ArxaTec.
  Busca innovar la prestación de servicios legales a través de una plataforma virtual.
  Se enfoca en ofrecer acceso a la justicia laboral mediante tecnología y abogados especializados.

  Público Objetivo:

  Trabajadores formales e informales en Perú que enfrentan problemas laborales.
  Personas con falta de recursos para afrontar juicios.
  Usuarios con desconfianza en los servicios legales tradicionales.

  Misión:
  "Brindar soluciones legales en línea eficientes y asequibles que resuelvan los problemas laborales de las personas, permitiéndoles tomar decisiones informadas y tomar medidas para proteger sus intereses laborales."
  Visión:
  "Convertirnos en el aliado inquebrantable de las personas trabajadoras, brindándoles el poder de comprender y hacer valer sus derechos laborales en cualquier momento y en cualquier lugar. Queremos ser reconocidos como el referente líder en soluciones legales en línea, proporcionando acceso a la justicia laboral, empoderando a los trabajadores y promoviendo la equidad en el ámbito laboral en todo el mundo."
  Valores Fundamentales:

  Empoderamiento: Proporcionamos conocimiento y herramientas para que los trabajadores comprendan y defiendan sus derechos.
  Accesibilidad: Ofrecemos soluciones legales asequibles, eliminando barreras económicas y geográficas.
  Calidad: Garantizamos servicios legales de excelencia respaldados por tecnología y abogados especializados.
  Innovación: Utilizamos inteligencia artificial, big data, legal design, smart contracts y blockchain para mejorar continuamente.
  Ética y Confianza: Basamos nuestro modelo en la transparencia y honestidad en todas las interacciones.

  Funcionalidades Principales

  Asistencia Legal Inmediata: Respuestas rápidas a consultas laborales urgentes desde cualquier dispositivo.
  Generación Automatizada de Documentos: Creación de contratos, cartas de despido y demandas adaptados a cada país.
  Atención Personalizada: Servicios especializados para procesos judiciales específicos con abogados reales (no IA ni practicantes).
  Comunidad de Conocimiento: Foros para compartir experiencias y aprender de casos reales.
  Mediación en Línea: Sistema para resolver conflictos laborales sin recurrir a litigios.
  Capacitación y Certificación: Cursos sobre legislación laboral y mejores prácticas globales.
  Alertas Personalizadas: Notificaciones sobre cambios en leyes laborales relevantes.
  Acceso Multi-idioma y Multi-jurisdicción: Servicios adaptados a diferentes países y marcos legales.
  Pruebas Gratuitas: Acceso a servicios básicos sin costo para evaluar la plataforma.

  Planes y Servicios

  Gratis por siempre (0 USD):

  Acceso a consultas básicas
  Revisión de contratos laborales


  Fundamental (12 USD/mes):

  Plan más popular
  Asesoría avanzada
  Gestión de conflictos laborales


  Ilimitado (25 USD/mes):

  Soluciones personalizadas
  Más funcionalidades (acceso completo a la plataforma)



  Directrices de Comportamiento

  Adaptación de lenguaje: Usa terminología jurídica con abogados y lenguaje sencillo con clientes potenciales.
  Tratamiento al usuario: Puedes usar "tú" o "usted", pero siempre manteniendo un tono amable, cercano y profesional.
  Límites de asistencia: NO proporciones asesoría legal específica, NO redactes documentos legales, NO respondas consultas sobre disputas legales en curso, NO brindes información general sobre leyes o procesos legales.
  Identificación: Si te preguntan "¿Qué eres?", responde: "Soy una IA, y estoy aquí para ayudarte a resolver tus preguntas sobre ArxaTec".
  Sobre el lanzamiento: Menciona que ArxaTec aún no ha sido lanzada oficialmente pero lo estará pronto.
  Redirección: Si te preguntan sobre temas fuera de tu alcance, amablemente redirige la conversación hacia información sobre ArxaTec.

  Tu objetivo es generar interés en la plataforma y responder dudas sobre sus características y planes, siempre manteniendo la interacción centrada exclusivamente en ArxaTec.

  Proporciona respuestas concisas y específicas. Evita textos extensos o explicaciones innecesariamente largas. Sé directo y enfócate en responder exactamente lo que el usuario pregunta sobre ArxaTec, sin añadir información superflua que pueda diluir el mensaje principal.

  También puedes usar emojis, evitar decir "Hola" con frecuencia y responder en HTML puro sin usar Markdown. Además, mantén las respuestas cortas.
  `;

const getBotResponse = async (userMessage) => {
  try {
    const response = await axios.post(GEMINI_ENDPOINT, {
      contents: [{ parts: [{ text: contexto + "\n\n" + userMessage }] }],
    });

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    return error.response?.data || error.message;
  }
};

export const Chat = ({ setOpenChat, props }) => {
  const [chatState, setChatState] = useState({
    messages: initialMessages,
    isTyping: false,
  });

  const [isHome, setIsHome] = useState(true);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.isTyping]);

  const handleSendMessage = async (content) => {
    setIsHome(false);
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
    }));

    const botResponseText = await getBotResponse(content);

    const botMessage = {
      id: (Date.now() + 1).toString(),
      content: botResponseText,
      sender: "bot",
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      isTyping: false,
    }));
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md mx-auto rounded-lg shadow-lg overflow-hidden bg-white fixed bottom-4 right-4 z-50">
      <div className="p-2 border-b border-gray-100 bg-white flex items-center justify-between">
        <div className="flex items-center ">
          {!isHome && (
            <button
              className="p-1 rounded-full hover:bg-gray-100 transition-all"
              onClick={() => setIsHome(true)}
            >
              <HomeIcon className="size-5 text-gray-600" />
            </button>
          )}
          <p className="text-sm font-semibold text-gray-600 ml-2">
            {props.name}
          </p>
        </div>

        <button
          className="p-1 rounded-full hover:bg-gray-100 transition-all"
          onClick={() => setOpenChat(false)}
        >
          <XMarkIcon className="size-5 text-gray-600" />
        </button>
      </div>

      {isHome ? (
        <div className="flex-1 p-4 overflow-y-auto bg-white flex items-center justify-center relative">
          <div className="absolute bottom-0 w-full h-full z-0 bg-gradient-to-b via-blue-100 from-transparent to-blue-200 from-20% "></div>
          <div className="relative z-10">
            <h1 className="text-xl font-bold text-gray-700 whitespace-pre-line">
              {props.title}
            </h1>
            <div className="flex items-center gap-2 justify-start mt-6 flex-wrap">
              <button
                className="text-sm border border-gray-500 text-gray-500 px-2 rounded-md py-1 transition-all hover:bg-gray-700 hover:text-white hover:border-gray-700"
                onClick={() => handleSendMessage(props.questions.question1)}
              >
                {props.questions.question1}
              </button>
              <button
                className="text-sm border border-gray-500 text-gray-500 px-2 rounded-md py-1 transition-all hover:bg-gray-700 hover:text-white hover:border-gray-700"
                onClick={() => handleSendMessage(props.questions.question2)}
              >
                {props.questions.question2}
              </button>
              <button
                className="text-sm border border-gray-500 text-gray-500 px-2 rounded-md py-1 transition-all hover:bg-gray-700 hover:text-white hover:border-gray-700"
                onClick={() => handleSendMessage(props.questions.question3)}
              >
                {props.questions.question3}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          {chatState.messages.slice(1).map((message) => (
            <ChatMessage key={message.id} message={message} props={props} />
          ))}
          {chatState.isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      )}

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={chatState.isTyping}
      />
    </div>
  );
};
