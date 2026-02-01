export interface ShowPointsProps{
  points: number;
  zee_coins: number;
  joker: number;
}

export interface ShowPointsResponse{
  code: number;
  status: boolean;
  error: any;
  message: string;
  data: ShowPointsProps;
}