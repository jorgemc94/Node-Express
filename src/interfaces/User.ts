export interface User {
    id: number,
    name: string,
    email: string,
    phone: string,
    photo: string,
    position: {
        name: "Manager" | "Room service" | "Reception",
        description:string
    },
    date: string,
    status: "valid" | "invalid" | "",
    password: string
}