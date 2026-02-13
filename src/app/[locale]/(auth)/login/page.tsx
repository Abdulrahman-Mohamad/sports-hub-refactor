"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/schemas/Auth/Login";
import { loginFetch } from "@/lib/api/login/loginFetch";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/navigation";
import { useUser } from "@/context/UserContext";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Input from "@/components/form/Input";
import PhoneInput from "@/components/form/PhoneInput";
import { FaLock, FaPhone } from "react-icons/fa";
import GradientIcon from "@/components/ui/GradientIcon";
import { IoIosMail } from "react-icons/io";
import PasswordInput from "@/components/form/PasswordInput";
import ForgetPasswordModal from "../_forgetModal";

interface LoginForm {
  type: "phone" | "email";
  email?: string;
  phone?: string;
  password: string;
}

export default function LoginPage() {
  const [modal, setModal] = useState<boolean>(false);
  const t = useTranslations();
  const { setUser } = useUser();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema(t)),
    mode: "onBlur",
    defaultValues: { type: "phone" },
  });

  const onSuccess = (res: any) => {
    const userData = res?.data?.user;
    const token = res?.data?.token;
    if (userData && token) {
      setUser({ user: userData, accessToken: token });
      toast.success(res?.message || t("common.success"));
      if (!userData.is_subscribed) {
        router.push(`/?otp=true`);
      } else {
        router.push(`/`);
      }
      router.refresh();
    } else {
      console.error("UserData or Token is missing in response:", res);
    }
  };

  const onError = (error: any) => {
    toast.error(error?.message || t("common.error_occurred"));
  };

  const onSubmit = async (data: LoginForm) => {
    const payload = {
      type: data.type,
      identity: data.type === "email" ? data.email : `973${data.phone}`,
      password: data.password,
    };

    await loginFetch(payload, { onSuccess, onError });
  };

  const type = watch("type");

  return (
    <>
      <ForgetPasswordModal isOpen={modal} onClose={() => setModal(false)} />
      <div className="flex justify-center items-center min-h-screen px-2 sm:px-10 lg:absolute lg:left-30 lg:right-30 lg:top-26 lg:block lg:px-0 lg:min-h-auto">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-8 py-10 rounded-xl relative bg-white/80 w-full md:px-14 lg:px-20 2xl:px-28"
        >
          <form
            dir="ltr"
            className="space-y-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl pb-2 font-bold text-gradient-primary md:text-5xl">
                {t("pages.auth.login.title")}
              </h2>
              <p className="text-sm md:text-base md:font-medium">
                {t("pages.auth.login.subtitle")}
              </p>
            </div>

            {/* Email Or Phone Radio Buttons */}
            <div className="flex bg-white md:w-2/3 xl:w-1/2 w-full mx-auto rounded-xl text-center items-center justify-between rtl:flex-row-reverse">
              <div className="flex-1">
                <input
                  type="radio"
                  {...register("type")}
                  hidden
                  id="phone1"
                  value={"phone"}
                />
                <label
                  htmlFor="phone1"
                  className={`font-bold hover:cursor-pointer p-3 rounded-lg block transition-all ${type === "phone" ? "bg-gradient-primary text-white" : ""} md:text-lg`}
                >
                  {t("pages.auth.login.phone")}
                </label>
              </div>
              <div className="flex-1">
                <input
                  type="radio"
                  {...register("type")}
                  hidden
                  id="email"
                  value={"email"}
                />
                <label
                  htmlFor="email"
                  className={`font-bold hover:cursor-pointer p-3 rounded-lg block transition-all ${type === "email" ? "bg-gradient-primary text-white" : ""} md:text-lg`}
                >
                  {t("pages.auth.login.email")}
                </label>
              </div>
            </div>

            <div className="space-y-6">
              {type === "phone" ? (
                <PhoneInput
                  id="phone"
                  placeholder={t("components.forms.placeholders.enter_phone")}
                  type="tel"
                  errors={errors}
                  register={register}
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
              ) : (
                <Input
                  id="email"
                  type="email"
                  placeholder={t("components.forms.placeholders.enter_email")}
                  errors={errors}
                  register={register}
                  icon={
                    <GradientIcon
                      icon={IoIosMail}
                      fromColor="#E400FB"
                      toColor="#5200FD"
                      size={28}
                    />
                  }
                />
              )}
              <div>
                <PasswordInput
                  id="password"
                  register={register}
                  errors={errors}
                  type="password"
                  placeholder={t(
                    "components.forms.placeholders.enter_password",
                  )}
                  icon={
                    <GradientIcon
                      icon={FaLock}
                      fromColor="#E400FB"
                      toColor="#5200FD"
                      size={24}
                    />
                  }
                />
                <button
                  type="button"
                  className="rtl:text-start ltr:text-end text-sm font-medium w-full hover:underline mt-6 md:mt-2"
                >
                  <span
                    onClick={() => setModal(true)}
                    className=" hover:cursor-pointer text-gradient-primary"
                  >
                    {t("pages.auth.login.forgot_password")}
                  </span>
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="w-5/6 mx-auto block bg-gradient-primary text-white font-extrabold py-4 rounded-xl cursor-pointer sm:w-2/3 md:w-1/2 md:text-lg lg:w-1/3 xl:w-1/4 2xl:text-xl"
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
