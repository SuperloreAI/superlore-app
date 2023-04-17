// useUploadFirebaseStorage.ts
import { useState, useCallback } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadMetadata,
} from "firebase/storage";
import { v4 as uuid } from "uuid";
import { getAuth } from "firebase/auth";

interface UploadState {
  uploading: boolean;
  progress: number;
  error: Error | null;
  downloadURL: string | null;
}

const initialState: UploadState = {
  uploading: false,
  progress: 0,
  error: null,
  downloadURL: null,
};

export const useUploadFirebaseStorage = () => {
  const [uploadState, setUploadState] = useState<UploadState>(initialState);
  const auth = getAuth();

  const uploadVideo = useCallback(
    async (file: File) => {
      const user = auth.currentUser;

      if (!user) {
        setUploadState((prevState) => ({
          ...prevState,
          error: new Error("User not authenticated"),
        }));
        return;
      }

      setUploadState({ ...initialState, uploading: true });

      const metadata: UploadMetadata = {
        contentType: file.type,
        cacheControl: "public, max-age=2628000", // Set the file to be public and cache for one month
      };

      const storage = getStorage();
      const videoID = uuid();
      const storageRef = ref(
        storage,
        `users/${user.uid}/videos/${videoID}/${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadState((prevState) => ({ ...prevState, progress }));
        },
        (error) => {
          setUploadState({ ...initialState, error });
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploadState({ ...initialState, downloadURL });
        }
      );
    },
    [auth]
  );

  return { ...uploadState, uploadVideo };
};
