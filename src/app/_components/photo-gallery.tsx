"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { TrashIcon } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { TRPCError } from "@trpc/server";
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
import { EditableLabel } from "./editable-label";

export type PhotoGalleryProps = {
  images: UploadedFile[];
};
export const PhotoGallery = ({ images }: PhotoGalleryProps) => {
  const { toast } = useToast();
  const apiUtils = api.useUtils();
  const router = useRouter();
  const { mutate: updateImage } = api.files.updateImage.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      if (error instanceof TRPCError) {
        toast({ title: error.message, variant: "destructive" });
      }
    },
  });
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
      className="mySwiper h-full w-full items-center py-2"
    >
      {images.map((image) => {
        const { name, description = "no description" } = image;
        return (
          <SwiperSlide
            key={image.id}
            className="flex h-full w-full max-w-max  flex-col items-center gap-4 rounded-xl bg-center py-4 backdrop-blur-sm "
          >
            <div className="relative flex h-photo-height w-photo-width flex-col justify-between overflow-y-hidden ">
              <Image
                src={image.url}
                width={300}
                height={400}
                alt={image.key}
                className="absolute left-0  top-0 block w-full overflow-y-hidden rounded-xl"
              />

              <div
                className="flex flex-row justify-end p-1"
                data-swiper-parallax="-100"
              >
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className="shadow-green-400 drop-shadow-xl backdrop-blur-lg"
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
              <div
                className="flex w-photo-width flex-col gap-2 p-2 backdrop-blur-xl"
                data-swiper-parallax="0"
              >
                {
                  <div
                    className="text-slay-100 text-shadow-xl text-xl shadow-black"
                    data-swiper-parallax="-300"
                  >
                    <EditableLabel
                      isLabelCompact
                      label="Name"
                      defaultValue={name}
                      onSave={(newVal) =>
                        updateImage({
                          id: image.id,
                          updatedValues: { name: newVal },
                        })
                      }
                    />
                  </div>
                }
              </div>
            </div>

            <div
              className={
                "text-shadow-xl relative flex h-full w-photo-width flex-col gap-4 p-2 text-sm shadow-black backdrop-blur-xl"
              }
              data-swiper-parallax="-300"
            >
              <div className="relative flex flex-col gap-4 backdrop-blur-xl ">
                <EditableLabel
                  label="Description"
                  defaultValue={description}
                  onSave={(newVal) =>
                    updateImage({
                      id: image.id,
                      updatedValues: { description: newVal },
                    })
                  }
                />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
