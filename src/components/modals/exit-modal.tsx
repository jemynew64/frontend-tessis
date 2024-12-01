import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExitModal } from '../../store/use-exit-modal';  // Mantén esta dependencia

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/Dialog';  // Los componentes del modal
import Button from '../ui/Button';  // Tu botón estilizado

export const ExitModal = () => {
  const navigate = useNavigate(); // Navegación
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
            <img
              src="/mascot_sad.svg"
              alt="Mascot"
              className="h-20 w-20"
            />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">¡Espera, no te vayas!</DialogTitle>
          <DialogDescription className="text-center text-base">
            Estás a punto de salir de la lección. ¿Estás seguro?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-4 w-full">
            <Button variant="primary" className="w-full" onClick={close}>Seguir aprendiendo</Button>
            <Button
              variant="danger"
              className="w-full"
              onClick={() => {
                close();
                navigate('/matematicas'); // Regresar a la página de matemáticas
              }}
            >
              Terminar sesión
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
