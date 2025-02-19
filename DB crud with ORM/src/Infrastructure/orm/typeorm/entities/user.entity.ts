import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { UserRole } from "../../../../Domain/modals/user.modals";
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: ["admin", "user"],
    default: "user",
  })
  role: UserRole;

  @Column({ nullable: true })
  address?: string;

  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updatedAt?: string;

  @DeleteDateColumn()
  deletedAt?: string;
}
