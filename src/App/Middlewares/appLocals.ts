import { Request, Response, NextFunction } from "express"

/**
 * @note Middleware responsable to create properties in the res.locals object to adjust the shared infos
 */
export default (req: Request, res: Response, next: NextFunction) => {
    res.locals.data = {}

    res.locals.validator =  null;
    
    next()
}