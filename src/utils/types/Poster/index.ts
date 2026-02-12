export interface PosterData {
  title: string;
  description: string;
  link: string;
  open_mins: number;
  media_path: string;
}

export interface PosterResponse {
  code: number;
  status: boolean;
  errors: any;
  message: string;
  data: PosterData | null;
}