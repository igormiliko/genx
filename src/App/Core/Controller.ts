import DefaultMapping from "./Mapping";
import messages from "../../Utils/messages";
import { NextFunction, Request, Response } from "express";
import IDefaultContract from "./Contract";

/**
 * @note The controller's responsibility is to receive the request, respond 
 * to it, and handle errors from underlying layers to respond correctly
 */
class Controller<T> implements IDefaultContract {
    create = (mapping: DefaultMapping<T>) => 
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                res.locals.data = await mapping.create(req)
                
               return next(messages.CREATE_SUCCESS())
            } catch (error) {
                console.log(error)
                return next(messages.SERVER_ERROR(error))
            }
        }
    list = (mapping: DefaultMapping<T>) => 
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                res.locals.data = await mapping.list(req.query)
                
                return next(messages.LIST_SUCCESS())
            } catch (error) {
                return next(messages.SERVER_ERROR(error))
            }
        }
    read = (mapping: DefaultMapping<T>) => 
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                let response = await mapping.read(req)
                
                if(!response) {
                    messages.NOT_FOUND()
                }

                res.locals.data = response
                
                return next(messages.READ_SUCCESS())
            } catch (error) {
                console.log(error)
                return next(messages.SERVER_ERROR(error))
            }
        }
    update = (mapping: DefaultMapping<T>) => 
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                res.locals.data = await mapping.update(req)
                
                return next(messages.UPDATE_SUCCESS())
            } catch (error) {
                return next(messages.SERVER_ERROR(error))
            }
        }

    destroy = (mapping: DefaultMapping<T>) => 
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                res.locals.data = await mapping.destroy(req)
                
                return next(messages.DELETE_SUCCESS())
            } catch (error) {
                return next(messages.SERVER_ERROR(error))
            }
        }
}

export default Controller