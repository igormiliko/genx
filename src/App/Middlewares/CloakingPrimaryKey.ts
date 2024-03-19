import { Request, Response, NextFunction } from "express"
import Crypt from "../../Services/Crypt"
import Validator from "../Core/Validator"
import messages from "../../Utils/messages"

/**
 * @note The request start with the decryptPrimaryKey and finish with encryptPrimaryKey
 */
class CloakingPrimaryKey {
    private static timeToId = 1000 * 60 * 60 * 24
    
    async decryptPrimaryKey(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.params.id) {
                let [iv, idStamp] = req.params.id.split('.')
                let [id, time] = (await Crypt.decipher(String(idStamp), iv)).split('.')

                if(Number(time) + CloakingPrimaryKey.timeToId < new Date().getTime()) {
                    next(messages.BAD_REQUEST())
                }

                req.params.id = id
            }

            return next()
        } catch (error) {
            console.log(error)
            return next(messages.SERVER_ERROR(error))
        }
    }

    async encryptPrimaryKey(responseData: any, req: Request, res: Response, next: NextFunction) {
        try {

            let { data, validator }: { data: any, validator: Validator } = res.locals as any
            
            if(!validator) {
                return next(messages.BAD_REQUEST())
            }

            let primaryKey = validator.entityPrimaryKey


            data = Array.isArray(data) ? data : [data]


            data = await Promise.all(data.map(async (record: { [x: string]: any }) => {
                for (let key in record) {
                    if (key === primaryKey) {
                        return {
                            ...record, [primaryKey]: await Crypt.cipher(record[primaryKey] + '.' + new Date().getTime())
                        }
                    }
                }
                return record

            }))

            res.locals.data = data

            return next(responseData)
        } catch (error) {
            console.log(error)
            res.locals.data = null
            return next(messages.SERVER_ERROR(error))
        }
    }
}

export default new CloakingPrimaryKey()