import { z } from "zod";

export const forgetPasswordSchema = (t: any) =>
  z.object({
    name: z.string().min(1, t("validation.name_required")),
    phone: z
      .string()
      .min(1, t("validation.phone_required"))
      .regex(/^\d+$/, t("validation.phone_digits_only"))
      .length(8, t("validation.phone_length_8")),
    email: z
      .email({ message: t("validation.invalid_email") })
      .min(1, t("validation.email_required")),
    content: z.string().min(1, t("validation.message_required")),
  });

export type ForgetPasswordProps = z.infer<
  ReturnType<typeof forgetPasswordSchema>
>;
