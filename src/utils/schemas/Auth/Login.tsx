import {z} from "zod";

export const loginSchema = (t: any) => z.object({
    type: z.string().min(1, t('validation.type_required')),
    identity: z.string().min(1, t('validation.identity_required')),
    password: z.string().min(4, t('validation.password_min')),
})

export type LoginProps = z.infer<ReturnType<typeof loginSchema>>;