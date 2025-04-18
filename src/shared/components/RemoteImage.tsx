import { useState } from "react";

interface RemoteImageProps {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

export const RemoteImage = ({
  src,
  alt = "Imagen",
  className = "",
  width = 60,
  height = 60,
}: RemoteImageProps) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded ${className}`}
        style={{ width, height }}
      >
        Sin imagen
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover rounded border ${className}`}
      width={width}
      height={height}
      onError={() => setError(true)}
    />
  );
};
