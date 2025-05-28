export type Users = {
  id:string;
  name:string;  
  success: boolean;
  message: string;
  token: string;
  last_login: string | null;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string; // ISO datetime string
  email: string;
  type: 'student' | string; // you can replace string with other possible values
  invited_by: string | null;
  role: string;
};