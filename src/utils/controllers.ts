import { NextFunction, Request, Response } from "express";

export const ControllersGeneric = (Model: any) => {
    const getAll = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await Model.getAll();
            res.json(data);
        } catch (error) {
            next(error);
        }
    };

    const getbyId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const data = await Model.getbyId(id);
            res.json(data);
        } catch (error) {
            next(error);
        }
    };

    const add = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newItem = req.body;
            console.log(req.body)
            const createdItem = await Model.add(newItem);
            res.json(createdItem);
        } catch (error) {
            next(error);
        }
    };

    const deleteID = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const removedItem = await Model.deleteID(id);
            res.json(removedItem);
        } catch (error) {
            next(error);
        }
    };

    const update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const result = await Model.update({ _id: id, ...updatedData });
            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    return {
        getAll,
        getbyId,
        add,
        deleteID,
        update
    };
};
