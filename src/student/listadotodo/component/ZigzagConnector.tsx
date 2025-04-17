interface ZigzagConnectorProps {
    reverse?: boolean;
  }
  
  export const ZigzagConnector = ({ reverse = false }: ZigzagConnectorProps) => {
    return (
      <svg
        className="w-full h-12"
        viewBox="0 0 100 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d={
            reverse
              ? "M100,0 C50,50 50,50 0,100"
              : "M0,0 C50,50 50,50 100,100"
          }
          stroke="#84cc16" // Tailwind lime-500
          strokeWidth="4"
          fill="none"
        />
      </svg>
    );
  };
  