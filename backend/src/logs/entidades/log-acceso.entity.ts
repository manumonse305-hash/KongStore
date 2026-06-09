import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('log_accesos')
export class LogAcceso {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'usuario_id',
  })
  usuarioId!: number;

  @Column({
    nullable: true,
    length: 100,
  })
  ip!: string;

  @Column({
    nullable: true,
    length: 255,
  })
  browser!: string;

  @Column({
    type: 'enum',
    enum: ['INGRESO', 'SALIDA'],
  })
  evento!: string;

  @CreateDateColumn({
    name: 'fecha_hora',
  })
  fechaHora!: Date;
}