import EmailEntity from '../entities/Email';

export interface UserDTO {
  id: string;
  name: string;
  email: EmailEntity;
  createdAt: Date;
  updatedAt: Date;
}
