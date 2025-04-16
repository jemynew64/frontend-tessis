import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { HTMLAttributes } from "react";

interface LearningUnitProgressProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
  className?: string;
}

export const LearningUnitProgress = ({
  children,
  className,
  ...props
}: LearningUnitProgressProps) => {
  const containerClasses = twMerge(
    clsx("flex flex-col items-center gap-4 text-black", className)
  );

  const titleClasses = " text-2xl font-bold";

  return (
    <div className={containerClasses} {...props}>
      {/* Título arriba centrado */}
      <h2 className={titleClasses}>{children}</h2>

    </div>
  );
};
