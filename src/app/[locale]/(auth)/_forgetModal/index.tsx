import Input from "@/components/form/Input";
import PhoneInput from "@/components/form/PhoneInput";
import GradientIcon from "@/components/ui/GradientIcon";
import Modal from "@/components/ui/Modal";
import {
  ForgetPasswordProps,
  forgetPasswordSchema,
} from "@/utils/schemas/Auth/ForgetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

export default function ForgetPasswordModal({
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
  } = useForm({ resolver: zodResolver(forgetPasswordSchema(t)) });

  const onSuccess = () => {};

  const onError = () => {};

  const onSubmit = (data: ForgetPasswordProps) => {};
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl w-full ">
        <div className="rounded-xl overflow-hidden relative bg-white/80">
          {/* close Buttom */}
          <button className="absolute top-4 end-4" onClick={onClose}>
            <IoCloseSharp className="w-6 h-6 text-gray-200 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
          </button>
          <div className="bg-gradient-primary-r py-6 px-4">
            <h4 className="text-white">
              {t("pages.auth.forgetPassword.title")}
            </h4>
          </div>
          <form className="p-4">
            <Input
              id="name"
              register={register}
              placeholder={t("components.forms.placeholders.enter_name")}
              errors={errors}
              icon={
                <GradientIcon
                  icon={FaUser}
                  fromColor="#E400FB"
                  toColor="#5200FD"
                  size={24}
                  direction="right"
                />
              }
              className="flex-grow w-full"
            />
            <PhoneInput
              id="phone"
              register={register}
              placeholder={t("components.forms.placeholders.enter_phone")}
              errors={errors}
              icon={
                <GradientIcon
                  icon={FaLock}
                  fromColor="#E400FB"
                  toColor="#5200FD"
                  size={24}
                />
              }
            />
          </form>
        </div>
      </Modal>
    </>
  );
}
