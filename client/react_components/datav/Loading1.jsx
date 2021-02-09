import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
  forwardRef,
} from "react";

let defaultStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
const Loading = forwardRef(({ children, className = "", style = {} }, ref) => {
  return (
    <div ref={ref} className={className} style={{ ...defaultStyle, ...style }}>
      <svg width="50px" height="50px">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="transparent"
          strokeWidth="3"
          strokeDasharray="31.415, 31.415"
          stroke="#02bcfe"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0, 25 25;360, 25 25"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke"
            values="#02bcfe;#3be6cb;#02bcfe"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        <circle
          cx="25"
          cy="25"
          r="10"
          fill="transparent"
          strokeWidth="3"
          strokeDasharray="15.7, 15.7"
          stroke="#3be6cb"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="360, 25 25;0, 25 25"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke"
            values="#3be6cb;#02bcfe;#3be6cb"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <div style={{ fontSize: 15 }}>{children}</div>
    </div>
  );
});

export default Loading;

/*
示例：
import Loading1 from "@/modules/client/react_components/datav/Loading1";
<Loading1></Loading1>
*/
