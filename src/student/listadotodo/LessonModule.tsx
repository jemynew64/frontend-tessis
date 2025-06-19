// LessonModule.tsx
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { HTMLAttributes } from "react";
import { ColorName, colorMap } from "../../shared/utils/color";

interface LessonModuleProps extends HTMLAttributes<HTMLDivElement> {
  stage?: string;
  title: string;
  description?: string;
  color?: ColorName;
}

export const LessonModule = ({
  className,
  stage = "ETAPA 1",
  title,
  description,
  color = "green",
  ...props
}: LessonModuleProps) => {
  const c = colorMap[color];

  return (
    <div
      className={twMerge(
        clsx(
          "rounded-xl px-4 py-3 w-full flex justify-between items-center shadow-md",
          c.bg,
          className
        )
      )}
      {...props}
    >
      <div>
        <p className={clsx("text-xs uppercase font-semibold", c.contrastText)}>
          {stage}
        </p>
        <p className={clsx("text-lg font-bold", c.contrastText)}>
          {title}
        </p>
        {description && (
          <p className={clsx("text-sm font-medium", c.contrastText)}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
