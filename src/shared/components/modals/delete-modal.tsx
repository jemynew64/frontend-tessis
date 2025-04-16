// DeleteModal.tsx
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import Button from "../ui/Button";
import { Trash2 } from "lucide-react";
import { useExitModal } from "../../store/use-exit-modal";

type DeleteModalProps = {
  onConfirm?: () => void; // Acción a ejecutar si el usuario confirma
};

export const DeleteModal = ({ onConfirm }: DeleteModalProps) => {
  const { isOpen, close } = useExitModal();

  const handleDelete = () => {
    if (onConfirm) onConfirm();
    close(); // Cerramos después de ejecutar
  };

  return (
    <Dialog isOpen={isOpen} onClose={close}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-col items-center justify-center gap-4">
          <Trash2 className="w-16 h-16 text-red-600" />
          <DialogTitle className="text-center text-2xl font-bold">
            ¡Espera, seguro que quieres eliminar!
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-4 w-full">
            <Button variant="danger" className="w-full" onClick={handleDelete}>
              Eliminar
            </Button>
            <Button variant="secondary" className="w-full" onClick={close}>
              Cancelar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
