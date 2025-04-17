import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardLinkProps extends LinkProps {
  title: string;
  imgSrc: string;
  imgAlt?: string;
  containerClassName?: string;
  imageClassName?: string;
  titleClassName?: string;
}

export const CardLink: React.FC<CardLinkProps> = ({
  to,
  title,
  imgSrc,
  imgAlt,
  containerClassName,
  imageClassName,
  titleClassName,
  ...props
}) => {
  const baseContainerClasses = twMerge(
    clsx(
      "bg-white p-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:shadow-lg transition w-full lg:w-auto",
      containerClassName
    )
  );

  const baseImageClasses = twMerge(
    clsx("w-32 h-32 object-cover mb-4 rounded-md", imageClassName)
  );

  const baseTitleClasses = twMerge(
    clsx("text-lg font-semibold text-center", titleClassName)
  );

  return (
    <Link to={to} className={baseContainerClasses} {...props}>
      <img src={imgSrc} alt={imgAlt ?? title} className={baseImageClasses} />
      <p className={baseTitleClasses}>{title}</p>
    </Link>
  );
};