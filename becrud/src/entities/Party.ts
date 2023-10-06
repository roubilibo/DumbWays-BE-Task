import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Paslon } from "./Paslon";

@Entity({ name: "partai" })
export class Party {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@CreateDateColumn({ type: "timestamp with time zone" })
	createdAt: Date;

	@CreateDateColumn({ type: "timestamp with time zone" })
	updatedAt: Date;

	@ManyToMany(() => Paslon, (paslon) => paslon.votes)
	paslons: Paslon[];
}
