"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import PackagesSuccessConponent from "../../app/[locale]/(main)/packages/[id]/_components/SuccessConponent";
import PackagesErrorComponent from "../../app/[locale]/(main)/packages/[id]/_components/ErrorComponent";
import { toast } from "react-toastify";

export default function CheckoutResultHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"success" | "failed" | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const type = searchParams.get("type");
    const msg = searchParams.get("message") || "";
    const typePackage = searchParams.get("type_package");
    const msgPackage = searchParams.get("message_package");

    if (typePackage && msgPackage) {
      if (typePackage === "0") toast.error(msgPackage);
      if (typePackage === "1") toast.warn(msgPackage);
      cleanupUrl();
    }

    if (type === "success" || type === "failed") {
      setStatus(type as "success" | "failed");
      setMessage(msg);
      setIsOpen(true);
      cleanupUrl();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const cleanupUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("type");
    params.delete("message");
    params.delete("type_package");
    params.delete("message_package");
    const query = params.toString() ? `?${params.toString()}` : "";
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  const handleClose = () => setIsOpen(false);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {status === "success" ? (
        <PackagesSuccessConponent onClose={handleClose} message={message} />
      ) : (
        <PackagesErrorComponent onClose={handleClose} message={message} />
      )}
    </Modal>
  );
}
