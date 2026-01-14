import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";

interface DropdownProps {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  label?: React.ReactNode | string;
  className?: string;
  btnClassName?: string;
  menuClassName?: string;
  align?: "start" | "end" | "center";
  animationType?: "vertical" | "horizontal";
}

const Dropdown: React.FC<DropdownProps> = ({
  icon: Icon = <FaUser />,
  children,
  defaultOpen = false,
  label,
  className = "",
  btnClassName = "",
  menuClassName = "",
  align = "end",
  animationType = "vertical",
}) => {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const alignmentClasses = {
    start: "start-0",
    end: "end-0",
    center: "left-1/2",
  };

  return (
    <motion.div className={`relative  ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between gap-4 p-3 cursor-pointer outline-none ${btnClassName}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span>{Icon}</span>
        </div>
        {label}
      </button>

      <AnimatePresence>
        {/* Dropdown Menu */}
        {isOpen && (
          <motion.div
            initial={
              animationType === "horizontal"
                ? { x: locale === "ar" ? "100%" : "-100%", opacity: 0 }
                : { y: "-100%", x: align === "center" ? "-50%" : "0%" }
            }
            animate={
              animationType === "horizontal"
                ? { x: 0, opacity: 1 }
                : { y: 0, x: align === "center" ? "-50%" : "0%" }
            }
            exit={
              animationType === "horizontal"
                ? { x: locale === "ar" ? "100%" : "-100%", opacity: 0 }
                : {
                    y: "-100%",
                    x: align === "center" ? "-50%" : "0%",
                    opacity: 0,
                  }
            }
            className={`shadow-xl absolute ${alignmentClasses[align]} top-[calc(100%+10px)] bg-white min-w-[180px] rounded-lg flex flex-col overflow-hidden z-10 ${menuClassName}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dropdown;
