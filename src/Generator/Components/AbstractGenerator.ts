import interpolatePattern from "../../Utils/interpolatePattern";
import { GeneratorEngine, ITemplateInterpolation } from "./GeneratorEngine";

interface IAbstractGeneratorConstructor {
    name: string
    module: string
}

type AbstractGenerator_interpolations = { [x: string]: (a: ITemplateInterpolation) => string }

abstract class AbstractGenerator {
    private name: string | null = null
    private module: string | null = null
    private template: string | null = null
    protected abstract interpolations: AbstractGenerator_interpolations

    constructor({
        name,
        module,
    }: IAbstractGeneratorConstructor) {
        this.name = name
        this.module = module
        this.template = (require(`../Templates/${name.toLowerCase()}.template.ts`)).default
    }

    private runInterpolation(createFileInterface: ITemplateInterpolation) {
        let { template } = createFileInterface
        for (let interpolation in this.interpolations) {
            template = template.replace(interpolatePattern(interpolation), this.interpolations[interpolation](createFileInterface))
        }
        return template
    }

    public async install(generatorEngine: GeneratorEngine, tableName?: string) {
        try {
            if (this.name && this.module && this.template) {
                let call = (tn: string) => generatorEngine.createFile({
                    tableName: tn,
                    generatorName: this.name!,
                    moduleName: this.module!,
                    template: this.template!
                }, (createFileInterface: ITemplateInterpolation) => this.runInterpolation(createFileInterface))

                if (tableName) {
                    await call(tableName)
                } else {
                    let iterableTables = Object.entries(generatorEngine.tables!).map(([chave, valor]) => ({ [chave]: valor }))
                    for (let table of iterableTables) {
                        let [tableName] = Object.keys(table)
                        await call(tableName)
                    }
                }
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }
}

export default AbstractGenerator