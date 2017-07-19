export class User {
    id: string;
    username: string;
    password: string;
    email: string;
    emailVerified: boolean;
}

export class AccessKey {
  id: string;
  ttl: number;
  created: Date;
  userId: string;
}
