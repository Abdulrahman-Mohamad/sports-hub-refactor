import { motion } from "framer-motion";
import React, { useEffect } from "react";

// Modal component with TypeScript props
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent body scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[99]"
      onClick={onClose} // Close on backdrop click
    >
      {/* Modal content */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className={`rounded-xl max-h-screen w-full mx-4 sm:mx-10 md:max-w-md lg:max-w-2xl  ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent close on content click
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
