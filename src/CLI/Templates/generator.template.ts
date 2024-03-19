export default `

import kebabToPascalCase from "../../../Utils/kebabToPascalCase";
import toKebabCase from "../../../Utils/toKebabCase";
import AbstractGenerator from "../AbstractGenerator";
import { ITemplateInterpolation } from "../GeneratorEngine";

class {{generatorName}}Generator extends AbstractGenerator {
    protected interpolations: {[x: string]: (arg: ITemplateInterpolation) => string } = {
        className: ({tableName}) => kebabToPascalCase(toKebabCase(tableName))
    };
    
    constructor(module: string) {
        super({
            name:'{{generatorName}}',
            module,
            templateInterpolation: (createFileInterface) => this.defaultTemplateInterpolation(createFileInterface)
        })
    }
}

export default {{generatorName}}Generator


`
