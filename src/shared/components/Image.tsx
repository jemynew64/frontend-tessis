
// Definir el tipo para las propiedades del componente
interface ImageProps {
    src: string; // Ruta de la imagen (requerida)
    alt: string; // Texto alternativo (requerido)
    className?: string; // Clases opcionales para estilos adicionales
    width?: string; // Ancho opcional, con valores como "w-20", "w-40", etc.
    height?: string; // Alto opcional, con valores como "h-20", "h-40", etc.
}

const Image = ({ src, alt, className = "", width = "w-20", height = "h-20", ...props }: ImageProps) => {
    return (
        <img 
            src={src}
            alt={alt}
            className={`${className} ${width} ${height} object-contain`} 
            {...props} // Spread para agregar cualquier propiedad adicional
        />
    );
};

export default Image;
