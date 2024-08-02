export type archivedType = "false" | "true";

export interface Contact {
    date: string,
    client: {
        name: string,
        email: string,
        phone: string,
        image: string,
    },
    _id?: string,
    subject: string,
    comment: string,
    archived: archivedType,
}