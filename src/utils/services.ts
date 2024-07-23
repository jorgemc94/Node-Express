export interface Identifiable {
    id: number;
}

export interface ServiceController<T extends Identifiable> {
    getAll(): T[],
    getId(id: number): T,
    post(item: T): T,
    deleteID(id: number): T[],
    put(item: T): T[], 
}

export class ServicesGeneric<T extends Identifiable> implements ServiceController<T> {
    private data: T[] = [];
    constructor (initial : T[]) {
        this.data = initial;
    }

    getAll(): T[] {
        return this.data;
    }

    getId(id: number): T {
        const item = this.data.find((item: any) => item.id === id);
        if (!item) throw new Error('Item not found');
        return item;
    }

    post(item: T): T {
        this.data.push(item);
        return(item)
    }

    deleteID(id: number): T[] {
        this.data = this.data.filter(item => item.id !== id);
        return this.data;
    }

    put(update: T): T[] {
        this.data = this.data.map((item: any) => 
            item.id === update.id ? update : item
        );
        return this.data;
    }
}