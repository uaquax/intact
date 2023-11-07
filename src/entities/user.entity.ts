import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum AccountType {
  Client = 0,
  Distributor = 1,
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  avatar: string = "/statics/avatars/default.png";

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  level: number;

  @Column({
    name: "account_type",
    type: "enum",
    enum: AccountType,
    default: AccountType.Client,
  })
  accountType: AccountType;

  @Column({ nullable: true })
  balance: number;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  gender: string;

  @Column({
    name: "last_active",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: true,
  })
  lastActive: Date;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: true,
  })
  createdAt: Date;

  @Column({ nullable: true })
  hashedRt: string;

  @Column()
  password: string;
}

export class SerializedUser {
  id: string;
  name: string;
  email: string;
  username: string;
  age: number;
  avatar: string = "/statics/avatars/default.png";
  description: string;
  level: number;
  accountType: AccountType;
  country: string;
  language: string;
  gender: string;
  lastActive: Date = new Date();
  createdAt: Date = new Date();

  @Exclude()
  password: string;

  @Exclude()
  balance: number;

  @Exclude()
  hashedRt: string;
}
