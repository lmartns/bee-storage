import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserStatus } from "../../types/enums/userStatus.enum";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
  })
  name!: string;

  @Column({ unique: true, type: "varchar" })
  email!: string;

  @Column({
    type: "varchar",
  })
  password!: string;

  @CreateDateColumn({
    type: "date",
  })
  createdAt!: Date;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus;
}
