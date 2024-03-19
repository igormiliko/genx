

import kebabToPascalCase from "../../../Utils/kebabToPascalCase";
import toKebabCase from "../../../Utils/toKebabCase";
import AbstractGenerator from "../AbstractGenerator";
import { ITemplateInterpolation } from "../GeneratorEngine";

class MappingGenerator extends AbstractGenerator {
    protected interpolations: {[x: string]: (arg: ITemplateInterpolation) => string } = {
        className: ({tableName}) => kebabToPascalCase(toKebabCase(tableName)),
        fileName: ({tableName}) => toKebabCase(tableName),
        tableName: ({tableName}) => tableName,
    };
    
    constructor(module: string) {
        super({
            name:'Mapping',
            module,
        })
    }
}

export default MappingGenerator


