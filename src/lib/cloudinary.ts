/**
 * Cloudinary Media Optimization & Transformation Pipeline for Next Order Food
 * Delivers responsive dish thumbnails, AI generative fill banners, and auto-formatted WebP/AVIF assets.
 */

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'thumb' | 'scale' | 'pad';
  gravity?: 'auto' | 'center' | 'face';
  quality?: 'auto' | 'auto:best' | 'auto:eco';
  format?: 'auto' | 'webp' | 'avif';
  improve?: boolean;
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';

export function buildCloudinaryDishUrl(
  publicId: string,
  options: CloudinaryTransformOptions = {}
): string {
  const {
    width = 600,
    height = 450,
    crop = 'fill',
    gravity = 'auto',
    quality = 'auto',
    format = 'auto',
    improve = true,
  } = options;

  const transforms = [
    `f_${format}`,
    `q_${quality}`,
    `c_${crop}`,
    `g_${gravity}`,
    `w_${width}`,
    `h_${height}`,
    ...(improve ? ['e_improve'] : []),
  ].join(',');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}
