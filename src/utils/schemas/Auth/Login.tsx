import { z } from "zod";

export const loginSchema = (t: any) =>
  z
    .object({
      type: z.enum(["phone", "email"]),
      password: z
        .string()
        .min(1, t("validation.password_required"))
        .min(4, t("validation.password_min")),
      email: z.string().optional(),
      phone: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.type === "email") {
        if (!data.email) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("validation.email_required"),
            path: ["email"],
          });
        } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("validation.invalid_email"),
            path: ["email"],
          });
        }
      } else {
        if (!data.phone) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("validation.phone_required"),
            path: ["phone"],
          });
        } else if (!/^\d+$/.test(data.phone)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("validation.phone_digits_only"),
            path: ["phone"],
          });
        } else if (data.phone.length !== 8) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("validation.phone_length_8"),
            path: ["phone"],
          });
        }
      }
    });

export type LoginProps = z.infer<ReturnType<typeof loginSchema>>;
