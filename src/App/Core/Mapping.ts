import { Request } from "express";
import IDefaultContract from "./Contract";
import DefaultResolver from "./Resolver";

/**
 * @note The Mapping is responsible for mapping data from other
 * entities to the requested entity and resolve the treatment of the response body.
 */
class DefaultMapping<T> implements IDefaultContract {
    private resolver: DefaultResolver<T>

    constructor(resolver: DefaultResolver<T>) {
        this.resolver = resolver
    }

    async create (req: Request) {
        return new Promise<T | null>(async (resolve, reject) => {
            try {
                const data = await this.resolver.create(req.body.data as T)
                return resolve(data)
            } catch (error) {
                return reject(error)
            }
        })
    }
    async list (query: Request["query"]) {
        return new Promise<T[] | null>(async (resolve, reject) => {
            try {
                const data = await this.resolver.list()
                return resolve(data)
            } catch (error) {
                return reject(error)
            }
        })
    }
    async read (req: Request) {
        return new Promise<T | null>(async (resolve, reject) => {
            try {
                let { id } = req.params
                const data = await this.resolver.read(Number(id))
                return resolve(data)
            } catch (error) {
                return reject(error)
            }
        })
    }
    async update (req: Request) {
        return new Promise<T | null>(async (resolve, reject) => {
            try {
                let { id } = req.params
                const data = await this.resolver.update(Number(id), req.body.data as T)
                return resolve(data)
            } catch (error) {
                return reject(error)
            }
        })
    }
    async destroy (req: Request) {
        return new Promise<T | null>(async (resolve, reject) => {
            try {
                let { id } = req.params
                const data = await this.resolver.destroy(Number(id))
                return resolve(data)
            } catch (error) {
                return reject(error)
            }
        })
    }
}

export default DefaultMapping