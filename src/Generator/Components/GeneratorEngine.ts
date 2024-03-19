import fs from 'fs'
import { IPrismaModel } from "../../types";
import PrismaSingleton from "../../App/Database";
import toKebabCase from "../../Utils/toKebabCase";
import AbstractGenerator from "./AbstractGenerator";
import config from "../../../generator.config.json"

export interface ICreateFile_GeneratorEngine { tableName: string, generatorName: string, moduleName: string, template: string }
export interface ITemplateInterpolation extends ICreateFile_GeneratorEngine {
    columns: any;
}
type TGeneratorConfig = {
    tablesToRemove: {},
    overwriteFiles: boolean
    modules: {
        [x: string]: string[]
    }
}

class GeneratorEngine {
    static instance: GeneratorEngine | null = null;
    private config: TGeneratorConfig = config

    static getInstance() {
        if (!GeneratorEngine.instance) {
            GeneratorEngine.instance = new GeneratorEngine();
        }
        return GeneratorEngine.instance;
    }

    static db = PrismaSingleton.getClient()
    
    static types = {
        Int: 'number',
        Float: 'number',
        String: 'string',
        Boolean: 'boolean',
        DateTime: 'Date',
        Enum: 'string',
        Json: 'Record<string, any>',
        Bytes: 'ArrayBuffer',
        BigInt: 'bigint',
        Decimal: 'number',
        UUID: 'string',
        IPAddress: 'string',
        URl: 'string',
        Timestamp: 'number',
        Time: 'string',
        OID: 'string',
        Serial: 'number',
        Citext: 'string',
    };
    
    tables: IPrismaModel[] | null = null

    constructor() {
        this.loadTables()
    }

    private createDirIfNotExist(path: string, callBack?: (e: any) => void | null) {
        return new Promise<void>((resolve, reject) => {
            try {
                if (this.config.overwriteFiles) {
                    throw new Error('Enable the files overwriten')
                }
                fs.readdirSync(path)
                callBack ? callBack(null) : null
                resolve()
            } catch (error) {
                fs.mkdir(path, (e) => {
                    if (e) {
                        callBack ? callBack(e) : null
                        reject(e)
                    }
                })
                resolve()
            }

        })
    }

    private makeModule(modulePath: string) {
        return this.createDirIfNotExist(modulePath)
    }
    
    private makeLayer(layerPath: string) {
       return this.createDirIfNotExist(layerPath)
    }
    
    private makeFile(filePath: string, _template: string, generatorName: string) {
        return new Promise<void>((resolve, reject) => {
            try {
                if (this.config.overwriteFiles) {
                    throw new Error('Enable the files overwriten')
                }
                fs.readFileSync(filePath)
                resolve()
            } catch (error) {
                fs.writeFile(filePath, _template, 'utf8', (err) => {
                    if (err) {
                        reject({ message: `❌ Error while generate ${generatorName}:`, err });
                        return;
                    }
                })
                resolve()
            }
        })
    }

    /**
     * 
     * @returns void
     * @note Method responsible for generate the tables object with yours properties and types
     */
    private async loadTables(): Promise<void> {
        const models: any = {};
        let file = __dirname.replace('Generator\\Components', 'App\\Database') + '\\prisma\\schema.prisma'

        try {
            const fileContent = fs.readFileSync(file, 'utf-8');
            const modelsArrayString = fileContent.split(/model/g).slice(1);

            modelsArrayString.forEach(modelString => {
                const lines = modelString
                    .replace(/[{}'+]/g, '')
                    .trim()
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => !!line);

                const modelName = lines.shift();

                if (modelName) {
                    models[modelName] = {};
                    lines.forEach(line => {
                        const [property, type] = line.split(/\s+/).filter(Boolean);
                        if (!property.includes('@')) {
                            models[modelName][property] = type;
                        }
                    });
                }
            });
            this.tables = models;
        } catch (error) {
            console.error('Error parsing Prisma models:', error);
            return models;
        }
    }

    /**
     * 
     * @param tableName 
     * @param generatorName
     * @param moduleName 
     * @note Please, when you add a new tamplate with a new half-mustache replace, add the variable to be changed in the template
     */
    public async createFile({ tableName, generatorName, moduleName, template }: ICreateFile_GeneratorEngine, templateInterpolation: (template: ITemplateInterpolation) => string) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let fileName = toKebabCase(tableName)

                if(this.config.modules) {
                    Object.keys(config.modules).forEach((key: string) => {
                        if(this.config.modules[key].includes(tableName)) {
                            moduleName = key
                        }
                    })
                }

                let modulePath = `./src/App/Modules/${moduleName}`


                let filePath = `${modulePath}/${generatorName}/${fileName}.${generatorName.toLowerCase()}.ts`

                let columns = (this.tables as any)?.[tableName]

                let _template = templateInterpolation({ tableName, generatorName, moduleName, template, columns })
                
                await this.createDirIfNotExist(`./src/App/Modules`)
                await this.makeModule(modulePath)
                await this.makeLayer(`${modulePath}/${generatorName}`)
                await this.makeFile(filePath, _template, generatorName)

                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    private async loadPistons() {
        return new Promise<AbstractGenerator[]>((resolve, reject) => {
            try {
                let generators: any = []
                let generatorsPath = `${__dirname}/Generators/`
                fs.readdirSync(generatorsPath)
                    .filter((file) => file.includes('.generator.'))
                    .map(async (fileName: string) => {
                        generators.push((require(`${generatorsPath}${fileName}`)).default)
                    });

                return resolve(generators as AbstractGenerator[]);
            } catch (error) {
                reject(error)
            }
        });
    }

    public start(module: string) {
        GeneratorEngine.getInstance().loadPistons()
            .then((generators: any) => {
                return Promise.all(
                    generators.map((generator: any) => {
                        return new Promise<void>((resolve, reject) => {
                            const instance = new generator(module) as AbstractGenerator;

                            instance.install(GeneratorEngine.getInstance())
                                .then(() => resolve())
                                .catch(error => reject(error));
                        });
                    }));
            })
            .catch((e: any) => {
                throw new Error(e)
            })
    }
}

export {GeneratorEngine}

export default GeneratorEngine.getInstance()