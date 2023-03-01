import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { SchedulesUserProperties } from "./schedulesUsersProperties.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column ({type:"varchar", length:45})
    name: string

    @Column ({type: "varchar", length: 45, unique: true})
    email: string

    @Column ({type: "boolean", default: true})
    admin: boolean = false

    @Column ({type: "varchar", length: 120})
    password: string

    @CreateDateColumn({type: "date"})
    createdAt: string 

    @UpdateDateColumn({type:"date"})
    updatedAt: string 

    @DeleteDateColumn({type:"date"})
    deletedAt: string 

    @OneToMany(() => SchedulesUserProperties, schedulesUserPropeties => schedulesUserPropeties.user)    
    schedule: SchedulesUserProperties[]
}   