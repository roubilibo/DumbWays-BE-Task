import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	OneToMany,
	ManyToMany,
	JoinTable,
} from "typeorm";

import { Votes } from "./vote";
import { Party } from "./Party";

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

	@ManyToMany(() => Party, (party) => party.paslons)
	@JoinTable()
	Parties: Party[];

	@CreateDateColumn({ type: "timestamp with time zone" })
	createdAt: Date;

	@CreateDateColumn({ type: "timestamp with time zone" })
	updatedAt: Date;
}
