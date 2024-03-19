import _ from "@prisma/client"
import IDefaultContract from "./Contract"
import Database from "../Database"

/**
 * @note The resolver is responsible for abstracting the execution of queries in the database."
 */
class DefaultResolver<T> implements IDefaultContract {
    private db = Database.getClient()
    private domainName: _.Prisma.ModelName
    protected prism: any = {}
    
    constructor(domainName: _.Prisma.ModelName) {
        this.domainName = domainName
    }

    private prismFy = Object.keys(this.prism).length > 0 ? this.prism : {}

    async create(data: T) {
        return new Promise<T | null>(async (resolve, reject) => {
            try { 
                let prismaObject = {
                    data: data,
                    ...this.prismFy
                }

                let record: T = await (this.db[this.domainName] as any).create(prismaObject) as T
                return resolve(record)
            } catch (error) {
                return reject(error)
            }
        })
    }

    async list() {
        return new Promise<T[]>(async (resolve, reject) => {
            try {
                let record: T[] = await (this.db[this.domainName] as any).findMany(this.prismFy) as T[]
                return resolve(record)
            } catch (error) {
                return reject(error)
            }
        })
    }

    async read(id: number) {
        return new Promise<T | null>(async (resolve, reject) => {
            try {
                let record: T = await (this.db[this.domainName] as any).findUnique({
                    where: {
                        id
                    },
                    select: this.prism.select
                }) as T
                return resolve(record)
            } catch (error) {
                return reject(error)
            }
        })
    }

    async update(id: number, data: T) {
        return new Promise<T | null>(async (resolve, reject) => {
            try {
                let record: T = await (this.db[this.domainName] as any).update({
                    data,
                    where: {
                        id
                    },
                    select: this.prism.select
                }) as T
                return resolve(record)
            } catch (error) {
                return reject(error)
            }
        })
    }

    async destroy(id: number) {
        return new Promise<T | null>(async (resolve, reject) => {
            try {
                let record: T = await (this.db[this.domainName] as any).delete({
                    where: {
                        id
                    },
                    select: this.prism.select
                }) as T
                return resolve(record)
            } catch (error) {
                return reject(error)
            }
        })
    }
}

export default DefaultResolver