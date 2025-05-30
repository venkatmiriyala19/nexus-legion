"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  isActive = false,
}) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  // Determine background and icon color based on active state
  const bgColor = isActive ? "bg-white" : "bg-[#1e1e1e]";

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full ${bgColor} cursor-pointer shadow-md ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      aria-pressed={isActive}
    >
      {Children.map(children, (child) =>
        cloneElement(child, { isHovered, isActive })
      )}
    </motion.div>
  );
}

function DockLabel({ children, className = "", ...rest }) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute bottom-[-2rem] left-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#1e1e1e] px-2 py-0.5 text-xs text-white z-20`}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = "", isActive = false }) {
  // Set the icon color based on active state
  const iconColor = isActive ? "text-[#1E1E1E]" : "text-white";

  return (
    <div
      className={`flex items-center justify-center ${iconColor} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 64,
  dockHeight = 256,
  baseItemSize = 50,
  currentPath = "",
}) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  // Calculate the maximum expansion space needed
  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );

  return (
    <div className="relative" style={{ height: panelHeight }}>
      {/* This is a placeholder that maintains the consistent height in the document flow */}
      <div className="w-full" style={{ height: panelHeight }}></div>

      {/* The actual dock that expands on hover without affecting layout */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex justify-center z-10 w-full overflow-visible"
        style={{ pointerEvents: "none" }}
      >
        <motion.div
          onMouseMove={({ pageX }) => {
            isHovered.set(1);
            mouseX.set(pageX);
          }}
          onMouseLeave={() => {
            isHovered.set(0);
            mouseX.set(Infinity);
          }}
          className={`${className} relative mt-4 flex items-end w-fit gap-4 rounded-2xl pb-2 px-4 bg-[#3E065F]/80 backdrop-blur-sm`}
          style={{
            height: panelHeight,
            pointerEvents: "auto",
            transform: `translateY(0)`,
            transformOrigin: "bottom center",
          }}
          role="toolbar"
          aria-label="Application dock"
        >
          {items.map((item, index) => {
            // Check if this item corresponds to the current route
            const isActive = item.path === currentPath;

            return (
              <DockItem
                key={index}
                onClick={item.onClick}
                className={item.className}
                mouseX={mouseX}
                spring={spring}
                distance={distance}
                magnification={magnification}
                baseItemSize={baseItemSize}
                isActive={isActive}
              >
                <DockIcon isActive={isActive}>{item.icon}</DockIcon>
                <DockLabel>{item.label}</DockLabel>
              </DockItem>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
