import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "todos" })
export class Todos {
	@PrimaryGeneratedColumn()
	id: number;
	@Column({ nullable: true })
	name: string;
	@Column({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
	})
	posted_at: Date;
}
