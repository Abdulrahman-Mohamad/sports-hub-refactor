export interface CheckoutPayload {
  package_id: number;
  payment_method_id: number;
  promo_code_id: number;
  channel_id: string;
  click_id?: string | null;
}

export interface CheckoutResponse {
  code: number;
  status: boolean;
  message: string;
  data: any;
}

export interface VerifyPinResponse {
  code: number;
  status: boolean;
  message: string;
  data?: any;
}