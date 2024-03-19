import { Router as router, Application } from "express"
import { TMiddleware } from "../../types"
import path from "path"
import fs from 'fs'
import AbstractRoute from "../Core/Route"
import IDefaultContract from "../Core/Contract"
import cloakingPrimaryKey from "../Middlewares/cloakingPrimaryKey"

export type TAddMiddlewareToReturn = { [key: string]: Array<{ place: 'up' | 'down', middleware: TMiddleware }> } | void
export type TRouteConfig = {
    [key in keyof IDefaultContract]: TRoute
}

export type TRoute = {
    param?: null | string,
    method: 'get' | 'put' | 'post' | 'delete'
}

class Router {
    public router = router()

    private static instance: Router;

    private constructor() {
        this.loadRoutes()
    }

    public static getInstance(): Router {
        if (!Router.instance) {
            Router.instance = new Router();
        }
        return Router.instance;
    }

    private importValidator(module: string, domain: string) {
        return new Promise<{ default: any }>(async (resolve, reject) => {
            try {
                return resolve(await import(`../Modules/${module}/Validator/${domain}.validator.ts`))
            } catch (error) {
                return reject(error)
            }
        })
    }

    private importController(module: string, domain: string) {
        return new Promise<{ default: any }>(async (resolve, reject) => {
            try {
                return resolve(await import(`../Modules/${module}/Controller/${domain}.controller.ts`))
            } catch (error) {
                return reject(error)
            }
        })
    }

    private importMapping(module: string, domain: string) {
        return new Promise<{ default: any }>(async (resolve, reject) => {
            try {
                return resolve(await import(`../Modules/${module}/Mapping/${domain}.mapping.ts`))
            } catch (error) {
                return reject(error)
            }
        })
    }

    private async composeMiddlewares(module: string, domain: string, action: keyof IDefaultContract, addMiddlewareTo: () => TAddMiddlewareToReturn) {
        const { default: VALIDATOR } = await this.importValidator(module, domain)
        const { default: CONTROLLER } = await this.importController(module, domain)
        const { default: MAPPING } = await this.importMapping(module, domain)

        let middlewares = [
            VALIDATOR.validate(action),
            CONTROLLER[action](new MAPPING()),
        ]

        let up: TMiddleware[] = []
        let down: TMiddleware[] = []

        addMiddlewareTo()?.[action]?.map((mid) => {
            if (mid.place === 'up') {
                up.push(mid.middleware)
            } else {
                down.push(mid.middleware)
            }
        })

        return [...up, ...middlewares, ...down]
    }

    private async injectRoute(route: AbstractRoute) {
        try {
            const { module, domain, config, addMiddlewareTo } = route
            const routes = Object.keys(config) as Array<keyof TRouteConfig>

            let action: keyof TRouteConfig
            for (action of routes) {
                let { param, method } = config[action as keyof TRouteConfig]

                let middlewares = await this.composeMiddlewares(module, domain, action, addMiddlewareTo)
                this.router[method](
                    `/${module}/${domain}${param ? `/${param}` : ''}`,
                    cloakingPrimaryKey.decryptPrimaryKey,
                    ...middlewares
                )
            }

        } catch (error: any) {
            throw new Error(error)
        }
    }

    private initializeRoute(routesPath: string, module: string){
        return new Promise<void>((resolve, reject) => {
            try {
                fs.readdirSync(routesPath).forEach((routeFile) => {
                    let [domainName] = routeFile.split('.')
                    let {default: route}: {default: any} = require(routesPath + '\\' + routeFile)
                    route = new route(module, domainName)
                    this.injectRoute(route)
                })
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    } 

    private loadRoutes() {
        return new Promise<void>((resolve, reject) => {
            try {
                let modulesPath = path.join(__dirname.replace('\\index.ts', '').replace('Router', '\\Modules'))
                fs.readdirSync(modulesPath)
                    .forEach((moduleName: string) => {
                        let modulePath = path.join(modulesPath, '\\' + moduleName)
                        
                        fs.readdirSync(modulePath).filter((dirII) => dirII === 'Routes').forEach(async (Routes) => {
                            let routesPath = path.join(modulePath, Routes)

                            await this.initializeRoute(routesPath, moduleName)
                        })
                    });
                return resolve();
            } catch (error) {
                reject(error)
            }
        });
    }
}

module.exports = Router.getInstance().router