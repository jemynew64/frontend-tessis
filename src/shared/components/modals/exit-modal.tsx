import { useEffect, useState } from "react";
import { useExitModal } from "../../store/use-exit-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import Button from "../ui/Button";

type ExitModalProps = {
  onConfirm?: () => void; // Callback opcional para definir la acción al confirmar
};

export const ExitModal = ({ onConfirm }: ExitModalProps) => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExitModal();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Dialog isOpen={isOpen} onClose={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-5">
            <img src="/mascot_sad.svg" alt="Mascot" className="h-20 w-20" />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            ¡Espera, no te vayas!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Estás a punto de salir. ¿Estás seguro?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-4 w-full">
            <Button variant="primary" className="w-full" onClick={close}>
              Seguir aquí
            </Button>
            <Button
              variant="danger"
              className="w-full"
              onClick={() => {
                close();
                if (onConfirm) onConfirm(); // Ejecutar callback al confirmar
              }}
            >
              Salir
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
