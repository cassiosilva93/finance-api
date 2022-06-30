import EmailEntity from '../entities/Email';

export interface UserDTO {
  id: string;
  name: string;
  email: EmailEntity;
  created_at: Date;
  updated_at: Date;
}
