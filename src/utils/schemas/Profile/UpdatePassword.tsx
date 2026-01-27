import {z} from "zod";

export const UpdatePasswordSchema = (t: any) => z.object({
    password: z.string().min(4, t('validation.password_min')),
    password_confirmation: z.string(),
    }).refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: t('validation.passwords_match'),
});


export type UpdatePasswordProps = z.infer<ReturnType<typeof UpdatePasswordSchema>>;