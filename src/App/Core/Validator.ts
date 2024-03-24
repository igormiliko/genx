import { Request, NextFunction, Response } from "express";
import IDefaultContract from "./Contract";
import reply from "../../Utils/reply";

abstract class Validator implements IDefaultContract {
    public entityPrimaryKey = 'id'
    public module = null
    public abstract validColumns: any

    registerValidator(res: Response) {
        res.locals.validator = this
    }

    list = (req: Request, res: Response, next: NextFunction) => {
        try {

            next()
        } catch (error) {
            next(reply.SERVER_ERROR(error))
        }
    }

    read = (req: Request, res: Response, next: NextFunction) => {
        try {

            next()
        } catch (error) {
            next(reply.SERVER_ERROR(error))
        }
    }

    create = (req: Request, res: Response, next: NextFunction) => {
        try {

            next()
        } catch (error) {
            next(reply.SERVER_ERROR(error))
        }
    }

    update = (req: Request, res: Response, next: NextFunction) => {
        try {

            next()
        } catch (error) {
            next(reply.SERVER_ERROR(error))
        }
    }

    destroy = (req: Request, res: Response, next: NextFunction) => {
        try {

            next()
        } catch (error) {
            next(reply.SERVER_ERROR(error))
        }
    }

    validate(contractMethod: keyof IDefaultContract) {
        return (req: Request, res: Response, next: NextFunction) => {
            this.registerValidator(res)

            return this[contractMethod](req, res, next)
        }
    }
}

export default Validator