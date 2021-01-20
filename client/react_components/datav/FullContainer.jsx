import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
  forwardRef,
} from "react";

let defaultStyle = {
  position: "absolute",
  overflow: "hidden",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "#01114B",
};
const FullContainer = forwardRef(
  ({ children, className = "", style = {} }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{ ...defaultStyle, ...style }}
      >
        {children}
      </div>
    );
  }
);

export default FullContainer;

/*
示例：
<FullContainer className="dv-full" style={{backgrounfColor:"#142631"}}>
    <AppHeader></AppHeader>
    <AppContent></AppContent>
</FullContainer>
*/
