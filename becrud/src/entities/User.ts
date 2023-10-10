import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Votes } from "./vote";

@Entity()
export class Users {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	fullName: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@OneToMany(() => Votes, (vote) => vote.user)
	vote: Votes;

	@CreateDateColumn({ type: "timestamp with time zone" })
	createdAt: Date;
}
