import PasswordInput from "@/components/form/PasswordInput";
import GradientIcon from "@/components/ui/GradientIcon";
import Modal from "@/components/ui/Modal";
import {
  UpdatePasswordProps,
  UpdatePasswordSchema,
} from "@/utils/schemas/Profile/UpdatePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { profileChangePasswordFetch } from "@/lib/api/profile/profileChangePasswordFetch";
import { IoMdClose } from "react-icons/io";

export default function ProfileChangePasswordModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("pages.main.profile.modals.change_password");
  const v = useTranslations("validation");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(UpdatePasswordSchema(v)) });

  const onSubmit = async (data: UpdatePasswordProps) => {
    await profileChangePasswordFetch(data, {
      onSuccess: (res: any) => {
        toast.success(res?.message || t("common.success"));
        onClose();
      },
      onError: (error: any) => {
        toast.error(error?.message || t("common.error_occurred"));
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="!max-w-2xl w-full">
      <div className="bg-white rounded-xl border-worm glow-worm w-full px-2 py-10 relative">
        <div className="absolute top-4 end-4">
          <button type="button" onClick={onClose}>
            <IoMdClose
              size={24}
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            />
          </button>
        </div>
        <form
          className="px-4 py-8 md:px-24 flex flex-col gap-4 items-center max-w-2xl mx-auto "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Image
              src="/images/profile/changpassword-modal.png"
              alt="Sitting User with laptop"
              width={1000}
              height={1000}
              className="w-52"
            />
          </div>
          <PasswordInput
            id="password"
            register={register}
            placeholder={t("enter_password")}
            errors={errors}
            isAuth={false}
            className="flex-grow w-full"
            icon={<GradientIcon icon={FaLock} size={20} />}
          />
          <PasswordInput
            id="password_confirmation"
            register={register}
            placeholder={t("confirm_password")}
            errors={errors}
            isAuth={false}
            className="flex-grow w-full"
            icon={<GradientIcon icon={FaLock} size={20} />}
          />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="btn bg-gradient-primary text-white font-bold border mt-6 w-1/2"
          >
            {t("save")}
          </motion.button>
        </form>
      </div>
    </Modal>
  );
}
