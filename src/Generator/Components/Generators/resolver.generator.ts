

import kebabToPascalCase from "../../../Utils/kebabToPascalCase";
import toKebabCase from "../../../Utils/toKebabCase";
import AbstractGenerator from "../AbstractGenerator";
import { ITemplateInterpolation } from "../GeneratorEngine";

class ResolverGenerator extends AbstractGenerator {
    protected interpolations: {[x: string]: (arg: ITemplateInterpolation) => string } = {
        className: ({tableName}) => kebabToPascalCase(toKebabCase(tableName))
    };
    
    constructor(module: string) {
        super({
            name:'Resolver',
            module,
        })
    }
}

export default ResolverGenerator


