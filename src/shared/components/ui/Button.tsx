interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  // Define las clases base comunes
  const baseClasses = "inline-flex items-center justify-center font-bold rounded transition-colors";

  // Condicionales de las variantes
  const variantClasses =
    variant === "primary"
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : variant === "secondary"
      ? "bg-gray-500 text-white hover:bg-gray-600"
      : variant === "danger"
      ? "bg-red-500 text-white hover:bg-red-600"
      : "";

  // Condicionales del tamaño
  const sizeClasses =
    size === "sm"
      ? "px-2 py-1 text-sm"
      : size === "lg"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2 text-base"; // Por defecto tamaño "md"

  // Concatenar todas las clases
  const allClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  return <button className={allClasses} {...props} />;
};

export default Button;
