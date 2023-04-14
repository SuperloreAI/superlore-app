// Import React and CSS (optional)
import React, { useEffect } from "react";

// Define TypeScript interface for the component's props
interface TemplateComponentProps {
  someProp?: string;
}

// Create the functional component
const TemplateComponent: React.FC<TemplateComponentProps> = ({
  someProp = "default value",
}) => {
  useEffect(() => {
    // Add any side-effects or fetch data here
  }, []);

  return (
    <div>
      <h1>Hello, this is My Component!</h1>
      <p>Some prop value: {someProp}</p>
    </div>
  );
};

// Export the component
export default TemplateComponent;
