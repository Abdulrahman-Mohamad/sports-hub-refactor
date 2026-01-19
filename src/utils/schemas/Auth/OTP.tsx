import { z } from "zod";

export const OTPSchema = (t: any) =>
  z.object({
    otp: z
      .string()
      .regex(/^\d{4}$/, { message: t("pages.auth.otp.otp_validation") }),
  });

export type OTPProps = z.infer<ReturnType<typeof OTPSchema>>;
