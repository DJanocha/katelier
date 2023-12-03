"use client";

import Image from "next/image";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { type UploadedFile } from "~/validators/uploaded-file";
export type PhotoGalleryProps = {
  images: UploadedFile[];
};
export const PhotoGallery = ({ images }: PhotoGalleryProps) => {
  return (
    <Swiper
    effect={'coverflow'}
    grabCursor={true}
    centeredSlides={true}
    slidesPerView={'auto'}
    coverflowEffect={{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }}
    
    pagination={true}
    modules={[EffectCoverflow, Pagination]}
    className="mySwiper w-full py-12"
  >
    {images.map(image=>(

    <SwiperSlide key={image.id} className="bg-center bg-cover w-[300px] h-[300px] ">
      <AspectRatio ratio={3/4}>

      <Image src={image.url} width={300} height={400} alt={image.key} className="block w-full rounded-xl shadow-md"/>
      </AspectRatio>
    </SwiperSlide>
    ))}
  </Swiper>
  );

};
