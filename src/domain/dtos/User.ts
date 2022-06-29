import EmailEntity from '../entities/Email';

export interface UserDTO {
  id: string | undefined;
  name: string | undefined;
  email: EmailEntity | undefined;
  created_at: Date | undefined;
  updated_at: Date | undefined;
}
