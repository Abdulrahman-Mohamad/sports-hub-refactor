import Input from "@/components/form/Input";
import GradientIcon from "@/components/ui/GradientIcon";
import Modal from "@/components/ui/Modal";
import UserMediaInput from "@/components/ui/UserMediaInput";
import { EditDataSchema } from "@/utils/schemas/Profile/EditData";
import { ProfileUser } from "@/utils/types/User/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { toast } from "react-toastify";
import { profileUpdateFetch } from "@/lib/api/profile/profileUpdateFetch";
import { useRouter } from "next/navigation";

export default function ProfileEditDataModal({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: ProfileUser;
}) {
  const t = useTranslations();
  const [image, setImage] = useState<null | string>(null);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(EditDataSchema(t)) });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    await profileUpdateFetch(data, {
      onSuccess: (res: any) => {
        toast.success(res?.message || t("common.success"));
        router.refresh();
        onClose();
      },
      onError: (error: any) => {
        toast.error(error?.message || t("common.error_occurred"));
      },
    });
  };

  useEffect(() => {
    reset({
      username: user?.username || "",
      email: user?.email || "",
      address: user?.address || "",
      media: null,
    });
    setImage(user?.media || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="!max-w-2xl w-full">
      {/*  */}
      <div className="bg-darkMain rounded-xl border-worm glow-worm w-full px-2 py-10 translate-y-10">
        <h2 className="text-white font-bold text-center text-gradient-wormA1">
          {t("pages.profile.edit_data")}
        </h2>

        <form
          className="px-4 py-8 md:px-24 flex flex-col gap-4 items-center max-w-2xl mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <UserMediaInput
            id="media"
            register={register}
            setValue={setValue}
            setImage={setImage}
            image={image}
          />
          <Input
            id="username"
            register={register}
            placeholder={t("components.forms.placeholders.enter_full_name")}
            errors={errors}
            isAuth={false}
            icon={
              <GradientIcon
                icon={FaUser}
                size={20}
                fromColor="#F7ED43"
                toColor="#ED2425"
              />
            }
            className="flex-grow w-full"
          />
          <Input
            id="email"
            register={register}
            placeholder={t("components.forms.placeholders.enter_email")}
            errors={errors}
            isAuth={false}
            icon={
              <GradientIcon
                icon={MdMail}
                size={20}
                fromColor="#F7ED43"
                toColor="#ED2425"
              />
            }
            className="flex-grow w-full"
          />
          <Input
            id="address"
            register={register}
            placeholder={t("components.forms.placeholders.address")}
            errors={errors}
            isAuth={false}
            icon={
              <GradientIcon
                icon={FaLocationDot}
                size={20}
                fromColor="#F7ED43"
                toColor="#ED2425"
              />
            }
            className="flex-grow w-full"
          />
          <div className="flex items-center justify-center gap-4 mt-6 w-full sm:px-4 md:w-3/4 lg:w-3/4">
            <button
              className="btn bg-white hover:bg-white/70 text-redA1 border border-redA1 w-[calc(50%-16px)]"
              type="button"
              onClick={onClose}
            >
              {t("common.dont_save")}
            </button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="btn bg-gradient-wormA1 text-white font-bold border !px-10 w-[calc(50%-16px)]"
            >
              {t("common.save")}
            </motion.button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
