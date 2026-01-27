import PasswordInput from "@/components/form/PasswordInput";
import GradientIcon from "@/components/ui/GradientIcon";
import Modal from "@/components/ui/Modal";
import { UpdatePasswordProps, UpdatePasswordSchema } from "@/utils/schemas/Profile/UpdatePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { profileChangePasswordFetch } from "@/lib/api/profile/profileChangePasswordFetch";

export default function ProfileChangePasswordModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(UpdatePasswordSchema(t)) });

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
      <div className="bg-darkMain rounded-xl border-worm glow-worm w-full px-2 py-10">
        <h2 className="text-white font-bold text-center text-gradient-wormA1">
          {t("pages.profile.change_password")}
        </h2>
        <form
          className="px-4 py-8 md:px-24 flex flex-col gap-4 items-center max-w-2xl mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Image
              src="/gif/profile/lock.gif"
              alt="Sitting User with laptop"
              width={1000}
              height={1000}
              className="w-[90px] md:w-[110px]"
            />
          </div>
          <PasswordInput
            id="password"
            register={register}
            placeholder={t("components.forms.placeholders.enter_password")}
            errors={errors}
            isAuth={false}
            className="flex-grow w-full"
            icon={
              <GradientIcon
                icon={FaLock}
                size={20}
                fromColor="#F7ED43"
                toColor="#ED2425"
              />
            }
          />
          <PasswordInput
            id="password_confirmation"
            register={register}
            placeholder={t("components.forms.placeholders.confirm_password")}
            errors={errors}
            isAuth={false}
            className="flex-grow w-full"
            icon={
              <GradientIcon
                icon={FaLock}
                size={20}
                fromColor="#F7ED43"
                toColor="#ED2425"
              />
            }
          />
          <div className="flex items-center justify-between flex-wrap gap-4 mt-6">
            <button
              className="btn bg-white hover:bg-white/70 text-redA1 border border-redA1"
              type="button"
              onClick={onClose}
            >
              {t("common.dont_save")}
            </button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="btn bg-gradient-wormA1 text-white font-bold border !px-10"
            >
              {t("common.save")}
            </motion.button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
