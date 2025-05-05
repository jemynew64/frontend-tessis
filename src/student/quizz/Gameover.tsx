interface WinProps {
    onReturn: () => void;
  }

export const Gameover = ({onReturn}: WinProps) => {
  return (
<div className="bg-gradient-to-tr from-red-400 via-red-500 to-red-600 min-h-screen flex flex-col items-center justify-center text-center text-xl font-semibold text-white space-y-4">
    <img src="/corazon-rotov1.svg" alt="Puntos" className=" object-contain size-32" />
        <h2>Game Over</h2>
            <p>Lo siento, se han agotado tus intentos.</p>
                    <button
                        onClick={onReturn}
                        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg text-base hover:bg-blue-700 transition"
                    >
                        Volver a la lección
                    </button>
                </div>  
        )
}
