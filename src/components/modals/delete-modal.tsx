import { useExitModal } from "../../store/use-exit-modal";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import Button from "../ui/Button";
import { Trash2 } from "lucide-react";

type ExitModalProps = {
    onConfirm?: () => void; // Callback opcional para definir la acción al confirmar
  };
  
  export const DeleteModal = ({ onConfirm }: ExitModalProps) => {
    const { isOpen, close } = useExitModal();
    return (
      <Dialog isOpen={isOpen} onClose={close}>
        <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-col items-center justify-center gap-4">
      <Trash2 className="w-16 h-16 text-red-600" /> {/* Icono más grande */}
      <DialogTitle className="text-center text-2xl font-bold">
        ¡Espera, seguro que quieres eliminar!
      </DialogTitle>
    </DialogHeader>
          <DialogFooter>
            <div className="flex gap-4 w-full">
              <Button variant="danger" className="w-full" onClick={close}>
                Eliminar
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  close();
                  if (onConfirm) onConfirm(); // Ejecutar callback al confirmar
                }}
              >
                Cancelar
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  