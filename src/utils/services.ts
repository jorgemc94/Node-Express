import { Identifiable } from "../interfaces/Identifiable";
import { Model } from "mongoose";

export interface ServiceController<T extends Identifiable> {
    getAll(): Promise<T[]>;
    getbyId(id: string): Promise<T | null>;
    add(item: T): Promise<T>;
    deleteID(id: string): Promise<T | null>;
    update(item: T): Promise<T | null>;
}

export class ServicesGeneric<T extends Identifiable> implements ServiceController<T> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async getAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async getbyId(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async add(item: T): Promise<T> {
        const newItem = new this.model(item);
        return newItem.save();
    }

    async deleteID(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    async update(item: T): Promise<T | null> {
        return this.model.findByIdAndUpdate(item._id, item, { new: true }).exec();
    }
}