import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "paslon" })
export class Paslon {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	visi: string;

	@Column({ nullable: true })
	image: string;
}
