import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

import { Paslon } from "./Paslon";

@Entity({ name: "voter" })
export class Votes {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	voterName: string;

	@ManyToOne(() => Paslon, (paslon) => paslon.votes)
	paslon: Paslon;

	@CreateDateColumn({ type: "timestamp with time zone" })
	createdAt: Date;

	@CreateDateColumn({ type: "timestamp with time zone" })
	updatedAt: Date;
}
