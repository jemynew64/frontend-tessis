import { ReactNode } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-7 shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 text-gray-600 hover:text-gray-900 focus:outline-none"
        >
        </button>
        {children}
      </div>
    </div>
  );
};

interface DialogHeaderProps {
  children: ReactNode;
  className?: string; // Añadir className opcional
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ children, className }) => (
  <div className={`mb-4 text-lg font-semibold ${className || ''}`}>{children}</div>
);

interface DialogFooterProps {
  children: ReactNode;
  className?: string; // Añadir className opcional
}

const DialogFooter: React.FC<DialogFooterProps> = ({ children, className }) => (
  <div className={`mt-4 flex justify-end ${className || ''}`}>{children}</div>
);

interface DialogTitleProps {
  children: ReactNode;
  className?: string; // Añadir className opcional
}

const DialogTitle: React.FC<DialogTitleProps> = ({ children, className }) => (
  <h2 className={`text-lg font-semibold ${className || ''}`}>{children}</h2>
);

interface DialogDescriptionProps {
  children: ReactNode;
  className?: string; // Añadir className opcional
}

const DialogDescription: React.FC<DialogDescriptionProps> = ({ children, className }) => (
  <p className={`text-sm text-gray-600 ${className || ''}`}>{children}</p>
);

interface DialogContentProps {
  children: ReactNode;
  className?: string; // Añadir className opcional
}

const DialogContent: React.FC<DialogContentProps> = ({ children, className }) => (
  <div className={`bg-white rounded-lg p-4 shadow-lg max-w-lg w-full ${className || ''}`}>
    {children}
  </div>
);

export { Dialog, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogContent };
