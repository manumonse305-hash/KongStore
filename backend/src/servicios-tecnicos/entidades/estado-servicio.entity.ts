import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ServicioTecnico } from './servicio-tecnico.entity';

@Entity('estados_servicio')
export class EstadoServicio {
  @PrimaryGeneratedColumn({ name: 'id_estado_s' })
  idEstadoServicio!: number;

  @Column({ length: 50, unique: true })
  nombre!: string;

  @OneToMany(() => ServicioTecnico, servicio => servicio.estado)
  servicios!: ServicioTecnico[];
}