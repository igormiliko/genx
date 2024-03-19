

import kebabToPascalCase from "../../../Utils/kebabToPascalCase";
import toKebabCase from "../../../Utils/toKebabCase";
import AbstractGenerator from "../AbstractGenerator";
import { ITemplateInterpolation } from "../GeneratorEngine";


class ValidatorGenerator extends AbstractGenerator {
    protected interpolations: {[x: string]: (arg: ITemplateInterpolation) => string } = {
        className: ({tableName}) => kebabToPascalCase(toKebabCase(tableName)),
        columns: ({columns}) => {
            return JSON.stringify(columns)
            .replace('{', '{ \n\t\t')
                .replace(/,/g, ',\n\t\t', )
                .replace(/:/g, ': ')
                .replace('}', '\n\t}')
        },
        primaryKey: ({columns}) => Object.keys(columns)[0]
    };
    
    constructor(module: string) {
        super({
            name:'Validator',
            module,
        })
    }
}

export default ValidatorGenerator


