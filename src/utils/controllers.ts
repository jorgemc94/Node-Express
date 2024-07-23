import { NextFunction, Request, Response } from "express"

export const ControllersGeneric = (Model : any) => {
    const getAll = async (_req : Request, res: Response, next: NextFunction) => {
        try {
            const data = await Model.getAll();
            res.json({data});
            return getAll;
        } catch(error) {
            next(error);
        }
    }

    const getId = async (req : Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const data = await Model.getId(id);
            res.json({data});
            return getId;
        } catch(error) {
            next(error);
        }
    }

    const post = async (req : Request, res: Response, next: NextFunction) => {
        try {
            const New = req.body;
            const Create = await Model.post(New);
            res.json({data: Create})
            return post;
        } catch(error) {
            next(error);
        }
    }

    const deleteID = async (req : Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const remove = await Model.deleteID(id);
            res.json({data: remove});
            return deleteID;
        } catch(error) {
            next(error);
        }
    }

    const put = async (req : Request, res: Response, next: NextFunction) => {
        const modify = req.body;
        const update = await Model.put(modify);
        res.json({data: update});
        return(put);
    }
}