import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  age: number;

  @Column()
  avatar: string;

  @Column()
  description: string;

  @Column()
  level: number;

  @Column({ name: "account_type" })
  accountType: string;

  @Column()
  balance: number;

  @Column()
  country: string;

  @Column()
  language: string;

  @Column({ nullable: true })
  gender: string;

  @Column({
    name: "last_active",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastActive: Date;
}
