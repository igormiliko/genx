import {
    Request,
    Response,
    NextFunction
} from "express";
import messages from "../../Utils/messages";

function response(
    response: {code: number, error: any, message: any},
    req: Request,
    res: Response,
    next: NextFunction,
){
    try {
        let responseObject = {
            metadata: {
                status: response.code,
                error: response.error,
                message: response.message,
            },
            data: res.locals.data
        };
        

        let finalResponse = JSON.stringify(responseObject, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
        .replace(/"(-?\d+)n"/g, (_, a) => a)

        return res.status(responseObject.metadata.status).json(JSON.parse(finalResponse));
    } catch (error) {
        console.log(error)
        return res.status(500).json(messages.SERVER_ERROR(error))
    }
};

export default response