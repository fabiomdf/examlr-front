export class User {
    constructor(
      public id?: string,
      public username?: string,
      public password?: string,
      public email?: string,
      public emailVerified?: boolean
    ) { }
}

export class AccessKey {
  id: string;
  ttl: number;
  created: Date;
  userId: string;
}
