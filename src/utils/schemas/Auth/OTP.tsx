import { z } from "zod";

export const OTPSchema = (t: any) =>
  z.object({
    pin_code: z
      .string()
      .min(4, t("components.forms.errors.otp_min"))
      .max(4, t("components.forms.errors.otp_max")),
  });

export type OTPProps = z.infer<ReturnType<typeof OTPSchema>>;
