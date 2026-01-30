export interface PackagesProps {
  id: number;
  type: "vip" | "gold" | "silver" | "basic";
  type_trans: string;
  price: string;
  instead_of: string;
  with_offer: boolean;
  zee_coins: number;
  joker: number;
}
