import { Identifiable } from "../interfaces/Identifiable";

export interface ServiceController<T extends Identifiable> {
    getAll(): Promise<T[]>;
    getId(id: number): Promise<T | null>;
    post(item: T): Promise<T[]>;  
    deleteID(id: number): Promise<T[]>;
    put(item: T): Promise<T[] | null>; 
}

export class ServicesGeneric<T extends Identifiable> implements ServiceController<T> {
    private data: T[];

    constructor(initial: T[]) {
        this.data = initial;
    }

    async getAll(): Promise<T[]> {
        return this.data;
    }

    async getId(id: number): Promise<T | null> {
        const item = this.data.find(item => item.id === id);
        return item || null;
    }

    async post(item: T): Promise<T[]> {
        this.data.push(item);
        return this.data;
    }

    async deleteID(id: number): Promise<T[]> {
        this.data = this.data.filter(item => item.id !== id);
        return this.data; 
    }

    async put(update: T): Promise<T[] | null> {
        this.data = this.data.map((item: any) => 
        item.id === update.id ? update : item);
        return this.data;
    }
}