import { NextFunction, Request, Response } from "express";

export const ControllersGeneric = (Model: any) => {
    const getAll = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await Model.getAll();
            res.json({ data });
        } catch (error) {
            next(error);
        }
    };

    const getbyId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id);
            const data = await Model.getId(id);
            res.json({ data });
        } catch (error) {
            next(error);
        }
    };

    const post = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const New = req.body;
            const Create = await Model.post(New);
            res.json({ data: Create });
        } catch (error) {
            next(error);
        }
    };

    const deleteID = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id);
            const remove = await Model.deleteID(id);
            res.json({ data: remove });
        } catch (error) {
            next(error);
        }
    };

    const put = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const modify = req.body;
            const update = await Model.put(modify);
            res.json({ data: update });
        } catch (error) {
            next(error);
        }
    };

    return {
        getAll,
        getbyId,
        post,
        deleteID,
        put
    };
};