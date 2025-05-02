import { XMarkIcon } from "@heroicons/react/24/outline";

export const CloseButton = ({ onClick, className = "", size = 4 }) => (
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