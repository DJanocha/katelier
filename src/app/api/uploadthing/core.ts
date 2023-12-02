import { createUploadthing, type FileRouter } from "uploadthing/next";
import { JwtTokenStorageKey } from "~/atoms/jwt-token-atom";
import { safelyGetUserOrNullByToken } from "~/server/db-utils";
 
const f = createUploadthing();
 
// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
        // This code runs on your server before upload
        const jwtToken = req.cookies.get(JwtTokenStorageKey)?.value
        const user = await safelyGetUserOrNullByToken({jwtToken})
        //   const jwtToken = cookieStore.get(JwtTokenStorageKey)?.value;
        
      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(({ metadata, file }) => {
        //this can be async also
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
 
      console.log("file url", file.url);
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;