import kebabToPascalCase from "../../../Utils/kebabToPascalCase";
import toKebabCase from "../../../Utils/toKebabCase";
import AbstractGenerator from "../AbstractGenerator";
import { ITemplateInterpolation } from "../GeneratorEngine";

class RouteGenerator extends AbstractGenerator {
    protected interpolations: {[x: string]: (arg: ITemplateInterpolation) => string } = {
        className: ({tableName, }) => kebabToPascalCase(toKebabCase(tableName))
    };
    constructor(module: string) {
        super({
            name:'Routes',
            module,
        })
    }
}

export default RouteGenerator
