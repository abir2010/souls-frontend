import { CheckCircle, X, XCircle } from "lucide-react";
import { useToastStore } from "../../store/useToastStore";

const ToastContainer = () => {
  // Access the toasts and removeToast function from the toast store
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl text-sm font-medium animate-in slide-in-from-right-8 fade-in duration-300 text-white min-w-75
            ${toast.type === "success" ? "bg-gray-900" : "bg-red-600"}
          `}
        >
          {toast.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-red-200 shrink-0" />
          )}

          <span className="flex-1">{toast.message}</span>

          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 hover:opacity-75 transition-opacity focus:outline-none"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
