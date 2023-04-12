export class UserRegister {
  userId: string;
  username: string;
  password: string;
  email: string;
  fullname: string;
  birthdate: string;
  deposit: number;
}

export type NewUserRegister = Omit<UserRegister, 'userId'>;
