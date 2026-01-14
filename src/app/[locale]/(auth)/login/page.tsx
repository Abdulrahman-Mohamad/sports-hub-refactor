"use client";

import { useForm } from "react-hook-form";
import { loginFetch } from "@/lib/api/login/loginFetch";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/navigation";
import { useUser } from "@/context/UserContext";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Input from "@/components/form/Input";
import { FaLock, FaPhone } from "react-icons/fa";
import GradientIcon from "@/components/ui/GradientIcon";
import { IoIosMail } from "react-icons/io";
import PasswordInput from "@/components/form/PasswordInput";

interface LoginForm {
  type: "phone" | "email";
  identity: string;
  password: string;
}

export default function LoginPage() {
  const [modal, setModal] = useState<boolean>(false);
  const t = useTranslations();
  const { setUser, user } = useUser();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<LoginForm>({
    defaultValues: { type: "phone" },
  });

  const onSuccess = (res: any) => {
    const userData = res?.data?.user;
    const token = res?.data?.token;
    if (userData && token) {
      setUser({ user: userData, accessToken: token });
      toast.success(res?.message || t("common.success"));
      router.push(`/`);
    } else {
      console.error("UserData or Token is missing in response:", res);
    }
  };

  const onError = (error: any) => {
    try {
      // تحويل النص القادم من apiFetch إلى كائن
      const errorData = JSON.parse(error.message);

      // الوصول لحقل message المذكور في رد الـ API الخاص بك
      const apiMessage = errorData.error?.message;

      toast.error(apiMessage || t("common.error_occurred"));
    } catch (e) {
      toast.error(t("common.error_occurred"));
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await loginFetch(data, { onSuccess, onError });
    } catch (error) {
      // Error is handled in onError callback
    }
  };

  const type = watch("type");

  return (
    <div
      className="flex justify-center items-center px-2
      sm:px-10
    lg:absolute lg:left-30 lg:right-30 lg:top-26 lg:block lg:px-0
    "
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
        <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
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

          {/* Email Or Phone Radio Buttons */}
          <div className="flex bg-white md:w-2/3 w-full mx-auto rounded-xl text-center items-center justify-between rtl:flex-row-reverse">
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
                className={`font-bold hover:cursor-pointer p-3 rounded-lg block transition-all
                  ${type === "phone" ? "bg-gradient-primary text-white" : ""}
                  md:text-lg
                  `}
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
                className={`font-bold hover:cursor-pointer p-3 rounded-lg block transition-all
                  ${type === "email" ? "bg-gradient-primary text-white" : ""}
                  md:text-lg
                  `}
              >
                {t("pages.auth.login.email")}
              </label>
            </div>
          </div>

          <div className="space-y-6">
            {type === "phone" ? (
              <Input
                id="identity"
                placeholder={t("components.forms.placeholders.enter_phone")}
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
            ) : (
              <Input
                id="identity"
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
            )}
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
                type="password"
                placeholder={t("pages.auth.login.enter_password")}
              />
              <button
                onClick={() => setModal(true)}
                type="button"
                className="text-end text-sm font-medium w-full text-blue-600 mt-2 hover:underline cursor-pointer"
              >
                {t("pages.auth.login.forgot_password")}
              </button>
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
  );
}
