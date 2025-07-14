import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
OneToMany 
} from "typeorm";
import bcrypt from "bcryptjs";
import { Product } from "./Product";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Product, product => product.user)
  private _products!: Product[];

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  password: string;
  private originalPassword: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
    this.originalPassword = password;
  }

  @AfterLoad()
  setOriginalPassword() {
    this.originalPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password == this.originalPassword) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  public get products():Product[]{
    return this._products
  }
}