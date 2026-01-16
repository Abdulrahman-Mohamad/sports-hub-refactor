"use client";
import Input from "@/components/form/Input";
import PasswordInput from "@/components/form/PasswordInput";
import PhoneInput from "@/components/form/PhoneInput";
import GradientIcon from "@/components/ui/GradientIcon";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaLock, FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

type RegisterForm = {
  country_code: string;
  invited_by: string;
  operator: "zain" | "batelco" | "stc" | "";
  password: string;
  password_confirmation: string;
  phone: string;
  phone_without_code: string;
};

export default function RegisterPage() {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterForm>({
    mode: "onBlur",
    defaultValues: {
      country_code: "973",
      invited_by: "",
      operator: "",
      password: "",
      password_confirmation: "",
      phone: "",
      phone_without_code: "",
    },
  });

  const onSuccess = (res: any) => {};
  const onError = (error: any) => {};
  const onSubmit = async (data: RegisterForm) => {};

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen px-2
      sm:px-10
    lg:absolute lg:left-30 lg:right-30 lg:top-26 lg:block lg:px-0 lg:min-h-auto"
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-8 py-10 rounded-xl relative bg-white/80 w-full
        md:px-14
        lg:px-20
        2xl:px-28
        "
        >
          <form
            dir="ltr"
            className="space-y-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="text-center space-y-4">
              <h2
                className="text-4xl pb-2 font-bold text-gradient-primary
            md:text-5xl
            "
              >
                {t("pages.auth.login.title")}
              </h2>
              <p
                className="text-sm
            md:text-base md:font-medium
            "
              >
                {t("pages.auth.login.subtitle")}
              </p>
            </div>

            

            <div className="space-y-6">
              
                <PhoneInput
                  id="phone"
                  placeholder={t("components.forms.placeholders.enter_phone")}
                  type="tel"
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
                  errors={errors}
                  register={register}
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
              
              <div>
                <PasswordInput
                  id="password"
                  icon={
                    <GradientIcon
                      icon={FaLock}
                      fromColor="#E400FB"
                      toColor="#5200FD"
                      size={24}
                    />
                  }
                  register={register}
                  errors={errors}
                  type="password"
                  placeholder={t(
                    "components.forms.placeholders.enter_password"
                  )}
                />
                
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="w-5/6 mx-auto block bg-gradient-primary text-white font-extrabold py-4 rounded-xl cursor-pointer
              sm:w-2/3
              md:w-1/2 md:text-lg
              lg:w-1/3
              xl:w-1/4
              2xl:text-xl
              "
              >
                {t("pages.auth.login.login")}
              </motion.button>

              <p className="text-sm text-center ">
                {t("pages.auth.login.no_account")}{" "}
                <Link
                  href={`/register`}
                  className="text-primary font-bold hover:underline cursor-pointer"
                >
                  {t("pages.auth.login.sign_up")}
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
