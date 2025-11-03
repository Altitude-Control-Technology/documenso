import type { ImgHTMLAttributes } from 'react';

export type LogoProps = ImgHTMLAttributes<HTMLImageElement>;

export const BrandingLogoIcon = ({ alt = 'Altitude Control Tech emblem', ...props }: LogoProps) => {
  return <img src="/act/act_mountains.png" alt={alt} {...props} />;
};
