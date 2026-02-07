export interface PromoCodeResponse {
  code: number;
  status: boolean;
  errors: null;
  message: string;
  data: PromoCodeResponseData
}

export interface PromoCodeResponseData{
  package:PromoCodeResponsePackage
  promo_code:PromoCodeResponsePromoCode
}

export interface PromoCodeResponsePackage{
  id: number;
  type: string;
  type_trans: string;
  with_offer: boolean;
  zee_coins: number;
  joker: number;
  price: string;
  instead_of: string;
  total_price: string;
}

export interface PromoCodeResponsePromoCode{
  id: number;
  code: string;
  type: string;
  discount_value: string;
}