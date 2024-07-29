import { Identifiable } from "../interfaces/Identifiable";
import { Model } from "mongoose";

export interface ServiceController<T extends Identifiable> {
    getAll(): Promise<T[]>;
    getbyId(id: number): Promise<T | null>;
    post(item: T): Promise<T>;
    deleteID(id: number): Promise<T | null>;
    put(item: T): Promise<T | null>;
}

export class ServicesGeneric<T extends Identifiable> implements ServiceController<T> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async getAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async getbyId(id: number): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async post(item: T): Promise<T> {
        const newItem = new this.model(item);
        return newItem.save();
    }

    async deleteID(id: number): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    async put(update: T): Promise<T | null> {
        return this.model.findByIdAndUpdate(update.id, update, { new: true }).exec();
    }
}
