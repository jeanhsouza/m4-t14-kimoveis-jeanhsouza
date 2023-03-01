import { Column,CreateDateColumn,Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Address } from "./adresses.entity";
import { Category } from "./categories.entity";
import { SchedulesUserProperties } from "./schedulesUsersProperties.entity";


@Entity("realEstate")
export class RealEstate {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column ({type:"boolean", default: true})
    sold: boolean = false

    @Column ({type: "decimal", precision: 12, scale: 2})
    value: number | string

    @Column ({type:"integer"})
    size: number

    @CreateDateColumn({type: "date"})
    createdAt: string
    
    @UpdateDateColumn ({type: "date"})
    updatedAt: string

    @OneToOne(() => Address)
    address: Address

    @ManyToOne (() => Category)
    category : Category  
    
    @OneToMany(() => SchedulesUserProperties, schedulesUserPropeties => schedulesUserPropeties.realEstate)
    schedule: SchedulesUserProperties[]

}   