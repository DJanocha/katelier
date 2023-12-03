"use client";

import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Parallax,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
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
      effect="coverflow"
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      parallax={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Parallax, Pagination, Navigation, EffectCoverflow]}
      className="mySwiper w-full h-full py-2"
    >
      {images.map((image) => {
        const { name, description = "no description" } = image;
        return (
          <SwiperSlide
            key={image.id}
            className="h-full w-full max-w-max ring-4 ring-pink-400 items-center py-4 rounded-xl bg-cover bg-center flex flex-col gap-4"
          >
            <div className="relative flex h-[400px] w-[300px] flex-col justify-between ">
              <Image
                src={image.url}
                width={240}
                height={360}
                alt={image.key}
                className="absolute left-0  top-0 block w-full rounded-xl"
              />

              <div
                className="flex flex-row justify-end p-1"
                data-swiper-parallax="-100"
              >
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className="shadow-green-400 drop-shadow-xl"
                    >
                      <TrashIcon className="h-6 w-6 text-red-500" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteImage({ id: image.id })}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="flex flex-col gap-2 p-2" data-swiper-parallax="0">
                {
                  <div
                    className="text-slay-100 text-shadow-xl text-xl shadow-black"
                    data-swiper-parallax="-300"
                  >
                    {name}
                  </div>
                }
              </div>
            </div>
            <div className="bg-slate-800/50">
              <div
                className="text-shadow-xl text-sm shadow-black p-2 h-full"
                data-swiper-parallax="-300"
              >
                <p>{description || 'no description...'}</p>
              </div>

            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>

  );
};
