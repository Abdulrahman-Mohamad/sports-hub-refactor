import Input from "@/components/form/Input";
import PhoneInput from "@/components/form/PhoneInput";
import GradientIcon from "@/components/ui/GradientIcon";
import Modal from "@/components/ui/Modal";
import { forgotPasswordFetch } from "@/lib/api/login/forgotPasswordFetch";
import { ForgetPasswordProps, forgetPasswordSchema } from "@/utils/schemas/Auth/ForgetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { FaPhone, FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";

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

  const onSuccess = (res:any) => {
    toast.success(res.message)
  };

  const onError = (res:any) => {
    toast.error(res?.message)
  };

  const onSubmit = async (data: ForgetPasswordProps) => {
    const payload = {
      name:data.name,
      phone:`973${data.phone}`,
      email:data.email,
      content:data.content
    }
    await forgotPasswordFetch(payload,{onSuccess,onError})
    
  };
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
              {t("pages.auth.login.forgetPassword.title")}
            </h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
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
                  icon={FaPhone}
                  fromColor="#E400FB"
                  toColor="#5200FD"
                  size={24}
                  direction="right"
                  className="rotate-90"
                />
              }
            />
            <Input
              id="email"
              type="email"
              placeholder={t("components.forms.placeholders.enter_email")}
              icon={
                <GradientIcon
                  icon={IoIosMail}
                  fromColor="#E400FB"
                  toColor="#5200FD"
                  size={28}
                />
              }
              errors={errors}
              register={register}
            />
            <div className="w-full">
              <textarea
                rows={4}
                {...register("content")}
                className="rounded-lg w-full p-4 bg-white mt-2 border-2 border-gray-200   
            focus:outline-none focus:ring-2 focus:ring-blue-400
            focus:border-transparent transition-all duration-300 disabled:bg-gray-400"
                placeholder={t("components.forms.placeholders.message")}
              />
              {errors.content && (
                <div className="mt-1 capitalize text-sm">
                  <p className="text-statusError font-semibold">
                    {errors.content.message}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center text-nowrap gap-2 font-medium mt-4">
              <motion.button
              whileHover={{scale:1.05}}
              whileTap={{scale:0.95}}
                onClick={onClose}
                className="bg-white border border-primary w-1/2 py-2 rounded-lg cursor-pointer"
              >
                {t("pages.auth.login.forgetPassword.close")}
              </motion.button>
              <motion.button
              whileHover={{scale:1.05}}
              whileTap={{scale:0.95}}
                type="submit"
                className="bg-gradient-primary-r w-1/2 py-2 rounded-lg text-white cursor-pointer"
              >
                {t("pages.auth.login.forgetPassword.submit")}
              </motion.button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
