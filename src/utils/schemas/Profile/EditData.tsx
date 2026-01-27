import { z } from "zod";

export const EditDataSchema = (t: any) =>
  z.object({
    username: z.string().min(1, t("validation.username_required")),
    email: z
      .email({ message: t("validation.email_invalid") })
      .nullable()
      .or(z.literal("")),
    address: z.string().optional(),
    media: z.union([z.instanceof(File), z.string(), z.null()]).optional(),
  });

export type EditDataProps = z.infer<ReturnType<typeof EditDataSchema>>;
