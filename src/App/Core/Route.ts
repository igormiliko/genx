import IDefaultContract from "./Contract";
import { TAddMiddlewareToReturn, TRoute, TRouteConfig } from "../Router/Router";

class AbstractRoute {
    public domain: string
    public module: string

    constructor(module: string, domain: string) {
        this.domain = domain
        this.module = module
        this.buildRoutes()
    }

    protected routesToMerge: (() => {[key: string]: TRoute})[] = []

    public config: TRouteConfig = {
        list: {
            method: 'get'
        },
        create: {
            method: 'post'
        },
        destroy: {
            param: ':id',
            method: 'delete'
        },
        read: {
            param: ':id',
            method: 'get'
        },
        update: {
            param: ':id',
            method: 'put'
        },
    }

    public addMiddlewareTo(): TAddMiddlewareToReturn {}

    private buildRoutes() {
        for (let merge of this.routesToMerge) {
            this.config = { ...this.config, ...merge() }
        }
    }

    protected mergeRoute(contractMethodName: keyof IDefaultContract, routeConfig: TRoute) {
        this.routesToMerge.push(() => ({[contractMethodName]: routeConfig }))
    }

    /**
     * @note Method used to add new routes to the Domain router with the method this.mergeRoutes
     */
    protected merger(): void {}
 }

export default AbstractRoute