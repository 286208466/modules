import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
  forwardRef,
} from "react";

import { debounce } from "../../utils/debounce-throttle";

let defaultStyle = {
  position: "absolute",
  overflow: "hidden",
  top: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
  transformOrigin: "left top",
};


const PanelContainer = ({
  children,
  className = "",
  style = {},
  ratioWh = [0, 0],
  designWh = [0, 0],
  exceptNodes = [],
}) => {
  const containerRef = useRef();

  useLayoutEffect(() => {
    if (designWh[0] && designWh[0] > 0) {
      containerRef.current.style.width = designWh[0] + "px";
    }
    if (designWh[1] && designWh[1] > 0) {
      containerRef.current.style.height = designWh[1] + "px";
    }
    setTransform();
  });

  const setTransform = () => {
    let { innerWidth, innerHeight } = window;
    let scaleX = 1;
    let scaleY = 1;
    if (ratioWh[0] && ratioWh[0] > 0) {
      scaleX = innerWidth / parseInt(ratioWh[0]);
    }
    if (ratioWh[1] && ratioWh[1] > 0) {
      scaleY = innerHeight / parseInt(ratioWh[1]);
    }
    containerRef.current.style.transform = `scale(${scaleX}, ${scaleY}`;
    if (exceptNodes.length > 0) {
      exceptNodes.forEach((item) => {
        item.style.transform = `scale(${1 / scaleX}, ${1 / scaleY}`;
      });
    }
  };

  const debounceSetTransform = debounce(setTransform, 300);

  useEffect(() => {
    window.addEventListener("resize", debounceSetTransform, false);
    return () => {
      window.removeEventListener("resize", debounceSetTransform);
    };
  }, []);
  return (
    <div
      className={className}
      ref={containerRef}
      style={{ ...defaultStyle, ...style }}
    >
      {children}
    </div>
  );
};

export default PanelContainer;
