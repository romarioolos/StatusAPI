import React from "react";  

export default function Modal({
  isOpen,
  title = "Deactivate account",
  message = "Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.",
  confirmText = "Deactivate",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      aria-labelledby="dialog-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/50 transition-opacity"
        onClick={onCancel}
      ></div>

      {/* Dialog Panel */}
      <div className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg transition-all">
        <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
              {/* Ícone */}
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 id="dialog-title" className="text-base font-semibold text-white">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-400">{message}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 sm:mt-0 sm:w-auto"
            onClick={onCancel}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
