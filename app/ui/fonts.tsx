import { Work_Sans, Plus_Jakarta_Sans, Source_Serif_4 } from 'next/font/google';

export const workSans = Work_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '600', '800'],
  subsets: ['latin'],
});

export const sourceSerifPro = Source_Serif_4({
  weight: ['400'],
  style: ['italic', 'normal'],
  subsets: ['latin'],
  variable: '--font-source-seif-pro',
});
