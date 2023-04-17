// VideoUploader.tsx
import React, { ChangeEvent, useState } from "react";
import { useUploadFirebaseStorage } from "@/lib/firebase/useUploadFirebaseStorage";

const VideoUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { uploading, progress, error, downloadURL, uploadVideo } =
    useUploadFirebaseStorage();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleUploadClick = () => {
    if (file) {
      uploadVideo(file);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUploadClick} disabled={!file || uploading}>
        Upload
      </button>
      {uploading && <progress value={progress} max="100" />}
      {error && <p>Error: {error.message}</p>}
      {downloadURL && <p>Download URL: {downloadURL}</p>}
    </div>
  );
};

export default VideoUploader;
