// Import React and CSS (optional)
import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";

// Define TypeScript interface for the component's props
interface ChatVideoBlockProps {
  someProp?: string;
}

// Create the functional component
const ChatVideoBlock: React.FC<ChatVideoBlockProps> = ({
  someProp = "default value",
}) => {
  useEffect(() => {
    // Add any side-effects or fetch data here
  }, []);

  return (
    <div className="bg-white shadow-md p-6 mb-4 rounded-lg w-full max-w-[1200px]">
      <div className="flex flex-col md:flex-row md:items-start justify-center md:space-x-4">
        <section id="text-side" className="w-full md:w-1/2">
          <label className="inline-flex items-center mb-4">
            <input
              type="checkbox"
              className="form-checkbox text-indigo-600"
            ></input>
            <span className="ml-2">Checkbox</span>
          </label>
          <input
            className="text-xl font-semibold mb-4 w-full"
            value={`Scene #N`}
          />
          <textarea
            className="w-full p-2 border border-gray-300 rounded resize-none"
            rows={6}
            defaultValue="Lorem ipsum solar descartes"
          ></textarea>
          <button
            id="primary-action"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
          >
            Generate Video
          </button>
          <button
            id="secondary-ghost-action"
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded mt-4"
          >
            Rewrite Text
          </button>
        </section>
        <section
          id="video-side"
          className="w-full md:w-1/2 mt-4 md:mt-0 justify-end"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <video
              className="w-full rounded"
              controls
              style={{
                width: "300px",
                minHeight: "600px",
              }}
            ></video>
            <div
              id="flex-row-on-desktop flex-column-on-mobile"
              className="flex flex-wrap gap-2"
              style={{ maxWidth: "100px" }}
            >
              <img
                src="https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png"
                alt="Small preview 1"
                className="w-full rounded small-preview-in-column"
              />
              <img
                src="https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png"
                alt="Small preview 2"
                className="w-full rounded small-preview-in-column"
              />
              <img
                src="https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png"
                alt="Small preview 3"
                className="w-full rounded small-preview-in-column"
              />
              <img
                src="https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png"
                alt="Small preview 4"
                className="w-full rounded small-preview-in-column"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Export the component
export default ChatVideoBlock;
