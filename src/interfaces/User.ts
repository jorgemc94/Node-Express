
export type nameType = "Manager" | "Room service" | "Reception";
export type statusType =  "valid" | "invalid" | "";

export interface User {
    _id?: string,
    name: string,
    email: string,
    phone: string,
    photo: string,
    position: {
        name: nameType,
        description:string
    },
    date: string,
    status:statusType,
    password: string
}