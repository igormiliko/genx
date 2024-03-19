import cors from "cors";
import helmet from "helmet";
import nocache from "nocache";
import messages from "../Utils/messages";
import response from "./Middlewares/response";
import {json, urlencoded, Application}  from "express"
import appLocals from "./Middlewares/appLocals";
import cloakingPrimaryKey from "./Middlewares/cloakingPrimaryKey";
import {EventRegister} from "../Services/Event/EventRegister";

class App {
    private app: Application | null
    private port: number = 3333
    private router = require('./Router/Router')
    callbackListen: () => void = () => {
        console.log(`Server is running on port: ${this.port}`)
    }
    
    private globalMiddlewares = [
        () => json({limit: "100mb"}),
        () => urlencoded({extended: true}),
        () => cors(),
        () => helmet(),
        () => nocache(),
        () => appLocals,
    ]
    
    constructor(app: Application, port?: number, callbackListen?: () => void) {
        this.app = app
        this.port = port || this.port
        this.callbackListen = callbackListen || this.callbackListen
        this.loadApp()
        new EventRegister()
    }
    
    private applyGlobalMiddlewares() {
        try {
            if(this.globalMiddlewares.length) {
                for(let middleware of this.globalMiddlewares) {
                    this.app!.use(middleware() as any)
                }
            }
        } catch (error: any) {
            throw new Error(JSON.stringify(error))
        }
    }

    private finalwares() {
        this.app!.use((req,res,next) => {
            next(messages.NOT_FOUND())
        })
        this.app!.use(cloakingPrimaryKey.encryptPrimaryKey)
        this.app!.use(response)
    }
    
    private startRouters() {
        this.app!.use(this.router)
    }

    private loadApp() {
        this.applyGlobalMiddlewares()
        this.startRouters()
        this.finalwares()
    }


    public async init() {
        if(!this.app) {
            throw new Error('Express has not initialized')
        }
        return this.app?.listen(this.port, this.callbackListen)
    }
}

export default App
