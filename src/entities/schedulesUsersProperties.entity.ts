import { Column,Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { RealEstate } from "./realEstate.entity";
import { User } from "./users.entity";

@Entity("schedulesUserProperties")
export class SchedulesUserProperties {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column ({type:"date"})
    date: string

    @Column ({type: "time"})
    hour: string

    @ManyToOne(()=> RealEstate)
    realEstate: RealEstate

    @ManyToOne(() => User)
    user: User

}   