import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn, ManyToMany, JoinTable, CannotReflectMethodParameterTypeError, JoinColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'user_table' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  birthDate: Date;

  @Column({nullable: true})
  phone: string;

  @Column({ default: false })
  removed: boolean;

  @Column({ unique: true })
  email: string;

  @UpdateDateColumn({name: 'created_at'})
  createdAt: Date;

  @CreateDateColumn({name: 'updated_at'})
  updatedAt: Date;

 @DeleteDateColumn()
  deletedAt?: Date;
}