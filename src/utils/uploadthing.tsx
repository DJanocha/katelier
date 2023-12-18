"use client";
import { generateComponents } from "@uploadthing/react";

import type { OurFileRouter } from "~/app/api/uploadthing/core";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import {
  registerUploadedImageValidator
} from "~/validators/uploaded-photo";

const {
  UploadButton: UploadThingUploadButton,
  UploadDropzone: UploadThingUploadDropzone,
  Uploader: UploadThingUploader,
} = generateComponents<OurFileRouter>();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Uploader = () => {
  const { mutate: registerImage } = api.images.registerImage.useMutation();


  return (
    <UploadThingUploader
      endpoint="imageUploader"
      onClientUploadComplete={(uploadedFiles) => {
        uploadedFiles.forEach((file) => {
          console.log("registering uploaded file: ", { file });
          registerImage(file);
          console.log("registered uploaded file: ", { file });
        });
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
      onBeforeUploadBegin={(files) => {
        // Preprocess files before uploading (e.g. rename them)
        return files.map(
          (f) => new File([f], "renamed-" + f.name, { type: f.type }),
        );
      }}
      onUploadBegin={(name) => {
        // Do something once upload begins
        console.log("Uploading: ", name);
      }}
    />
  );
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const UploadDropzone = () => {
  const { mutate: registerImage } = api.images.registerImage.useMutation({
    onSuccess: () => {
      toast({ title: "File uploaded" });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "File uploaded but not synchronized",
      });
    },
  });
  const { toast } = useToast();

  return (
    <UploadThingUploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={(uploadedFiles) => {
        uploadedFiles.forEach((file) => {
          console.log("registering uploaded file: ", { file });
          const fileValidationResult =
            registerUploadedImageValidator.safeParse(file);
          console.log({ fileValidationResult });
          if (!fileValidationResult.success) {
            return toast({
              variant: "destructive",
              title: "File upload failed",
            });
          }
          registerImage(fileValidationResult.data);
        });
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
      onBeforeUploadBegin={(files) => {
        // Preprocess files before uploading (e.g. rename them)
        return files.map(
          (f) => new File([f], "renamed-" + f.name, { type: f.type }),
        );
      }}
      onUploadBegin={(name) => {
        // Do something once upload begins
        console.log("Uploading: ", name);
      }}
    />
  );
};
export const UploadButton = () => {
  const { mutate: registerImage } = api.images.registerImage.useMutation();

  return (
    <UploadThingUploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(uploadedFiles) => {
        uploadedFiles.forEach((file) => {
          console.log("registering uploaded file: ", { file });
          registerImage(file);
          console.log("registered uploaded file: ", { file });
        });
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
      onBeforeUploadBegin={(files) => {
        // Preprocess files before uploading (e.g. rename them)
        return files.map(
          (f) => new File([f], "renamed-" + f.name, { type: f.type }),
        );
      }}
      onUploadBegin={(name) => {
        // Do something once upload begins
        console.log("Uploading: ", name);
      }}
    />
  );
};

// export const UploadButton = () => {
// return (
//   <UploadThingUploadButton
//   endpoint="imageUploader"
//   onClientUploadComplete={(res) => {
//     // Do something with the response
//     console.log("Files: ", res);
//     alert("Upload Completed");
//   }}
//   onUploadError={(error: Error) => {
//     // Do something with the error.
//     alert(`ERROR! ${error.message}`);
//   }}
//   onBeforeUploadBegin={(files) => {
//     // Preprocess files before uploading (e.g. rename them)
//     return files.map(
//       (f) => new File([f], "renamed-" + f.name, { type: f.type }),
//     );
//   }}
//   onUploadBegin={(name) => {
//     // Do something once upload begins
//     console.log("Uploading: ", name);
//   }}
// />
// )
