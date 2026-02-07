import { PackagesProps } from "./Packages";

export interface PackagesShowProps {
  package: PackagesProps
  payment_methods: PaymentMethod[];
}

export interface PaymentMethod {
  id: number;
  title: string;
  media_path: string;
}

export type modalStepType="shipping"|"otp"|"success"|"error"|"operator"
