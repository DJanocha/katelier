"use client";

import { UploadDropzone } from "~/utils/uploadthing";

export const AddPhotoForm = () => {
  return (

      <div> <UploadDropzone endpoint="imageUploader"/></div>
  );
};
