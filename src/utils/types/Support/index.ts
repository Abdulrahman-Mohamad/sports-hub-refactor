export interface SupportUser {
  id: number;
  username: string;
  image_path: null | string;
}

export interface SupportMessage {
  message_id: number;
  is_admin: boolean;
  is_read: boolean;
  message: string;
  created_at: string;
  user: SupportUser;
}

export interface SupportData {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  data: SupportMessage[];
}


export interface SendMessageResponse {
  code: number;
  status: boolean;
  errors: null;
  message: string;
  data: any;
}




