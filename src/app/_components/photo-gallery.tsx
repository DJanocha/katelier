"use client";

import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Navigation, Pagination, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { type UploadedFile } from "~/validators/uploaded-file";
export type PhotoGalleryProps = {
  images: UploadedFile[];
};
export const PhotoGallery = ({ images }: PhotoGalleryProps) => {
  const { toast } = useToast();
  const apiUtils = api.useUtils();
  const router = useRouter();
  const { mutate: deleteImage } = api.files.removeImage.useMutation({
    onSuccess: async () => {
      toast({ title: "Removed file" });
      await apiUtils.files.getMyImages.invalidate();
      router.refresh();
    },
    onError: () => {
      toast({ title: "Removing file failed", variant: "destructive" });
    },
  });
  return (
    <Swiper
      // style={{
      //   '--swiper-navigation-color': '#fff',
      //   '--swiper-pagination-color': '#fff',
      // }}
      speed={600}
      parallax={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Parallax, Pagination, Navigation]}
      className="mySwiper"
    >
      {images.map((image) => {
        const title = ""; //todo: extend file db model schema with optional title and use it here
        const description = ""; //todo: extend file db model schema with optional description and use it here
        return (
          <SwiperSlide key={image.id} className="overflow-hidden rounded-xl">
            <div className="relative flex h-[400px] w-[300px] flex-col justify-between ">
              <Image
                src={image.url}
                width={300}
                height={400}
                alt={image.key}
                className="absolute left-0  top-0 w-full rounded-xl "
              />
              <div
                className="flex flex-row justify-end p-1"
                data-swiper-parallax="-100"
              >
                <Button
                  variant={"ghost"}
                  className="shadow-green-400 drop-shadow-xl"
                  onClick={() => deleteImage({ id: image.id })}
                >
                  <TrashIcon className="h-6 w-6 text-red-500" />
                </Button>
              </div>
              <div className="flex flex-col gap-2 p-2" data-swiper-parallax="0">
                {title ? (
                  <div
                    className="text-slay-100 text-shadow-xl text-xl shadow-black"
                    data-swiper-parallax="-300"
                  >
                    {title}
                  </div>
                ) : null}
                {description ? (
                  <div
                    className="text-shadow-xl text-sm shadow-black"
                    data-swiper-parallax="-300"
                  >
                    <p>{description}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
