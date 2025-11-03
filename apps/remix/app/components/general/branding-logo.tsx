import type { ImgHTMLAttributes } from 'react';

export type LogoProps = ImgHTMLAttributes<HTMLImageElement>;

export const BrandingLogo = ({ alt = 'Altitude Control Tech logo', ...props }: LogoProps) => {
  return <img src="/act/act_logo.svg" alt={alt} {...props} />;
};
