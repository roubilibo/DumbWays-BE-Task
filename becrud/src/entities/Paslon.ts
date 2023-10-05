import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	OneToMany,
} from "typeorm";

import { Votes } from "./vote";

@Entity({ name: "paslons" })
export class Paslon {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	visi: string;

	@Column({ nullable: true })
	image: string;

	@OneToMany(() => Votes, (votes) => votes.paslon)
	votes: Votes[];

	@CreateDateColumn({ type: "timestamp with time zone" })
	createdAt: Date;

	@CreateDateColumn({ type: "timestamp with time zone" })
	updatedAt: Date;
}
