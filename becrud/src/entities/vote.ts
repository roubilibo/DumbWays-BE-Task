import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

import { Paslon } from "./Paslon";
import { Users } from "./User";

@Entity({ name: "voter" })
export class Votes {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	voterName: string;

	@ManyToOne(() => Users, (user) => user.vote)
	user: Users;

	@ManyToOne(() => Paslon, (paslon) => paslon.votes)
	paslon: Paslon;

	@CreateDateColumn({ type: "timestamp with time zone" })
	createdAt: Date;

	@CreateDateColumn({ type: "timestamp with time zone" })
	updatedAt: Date;
}
