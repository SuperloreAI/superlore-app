// Import React and CSS (optional)
import { SuggestedRaw } from "@/lib/graphql/types/types.generated";
import { placeholderVideoThumbnail } from "@superlore/helpers";
import React, { useEffect } from "react";

interface ReelBarProps {
  raws: SuggestedRaw[];
  removeRaw: (raw: SuggestedRaw) => void;
  compileAndZip: () => void;
}

const styles = {
  stickyFooter: {
    position: "fixed" as const,
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "#fff",
    textAlign: "center" as const,
    padding: 10,
    boxSizing: "border-box" as const,
  },
};

// Create the functional component
const ReelBar: React.FC<ReelBarProps> = ({
  raws,
  removeRaw,
  compileAndZip,
}) => {
  useEffect(() => {
    // Add any side-effects or fetch data here
  }, []);

  return (
    <div style={styles.stickyFooter}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <h3>Reel Bar</h3>
        <button onClick={compileAndZip} style={{ color: "black" }}>
          Export Video
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        {raws.map((raw) => (
          <div
            key={raw.id}
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0px 5px",
            }}
          >
            <img
              src={raw.thumbnail || placeholderVideoThumbnail}
              alt="thumbnail"
              style={{ width: "auto", maxHeight: "100px" }}
            />
            <span onClick={() => removeRaw(raw)}>Remove</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the component
export default ReelBar;
