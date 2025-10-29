import type React from 'react';

interface ImageBannerProps {
  children?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  imageClassName?: string;
}

export const ImageBanner: React.FC<ImageBannerProps> = ({
  children,
  imageSrc,
  imageAlt = 'Banner Image',
  className = '',
  imageClassName = 'object-cover',
}) => {
  return (
    <div
      className={`relative w-full h-[28rem] md:h-[36rem] lg:h-[48rem] overflow-hidden border-t-2 border-b-2 border-gradient-to-r border-transparent border-opacity-30 ${className}`}
      style={{
        borderImage:
          'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent) 1',
      }}
    >
      {children ? (
        children
      ) : imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`w-full h-full ${imageClassName}`}
        />
      ) : null}
    </div>
  );
};
