// useToast.js
import { useState } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description, duration = 3000 }) => {
    if (toasts.length > 0) return; // Evitar múltiples toasts

    const id = Date.now();
    setToasts([{ id, title, description, duration }]);

    setTimeout(() => {
      setToasts([]);
    }, duration);
  };

  const ToastContainer = () => (
    <div className="fixed bottom-4 right-4 space-y-2">
      {toasts.map(({ id, title, description, duration }) => (
        <div
          key={id}
          className="w-80 p-4 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 h-1 bg-blue-500" style={{ animation: `shrink ${duration}ms linear` }}></div>
          <strong className="text-gray-800">{title}</strong>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      ))}
      <style>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );

  return { toast, ToastContainer };
};
