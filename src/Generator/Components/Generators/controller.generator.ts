
import AbstractGenerator from "../AbstractGenerator";
import { ITemplateInterpolation } from "../GeneratorEngine";

class ControllerGenerator extends AbstractGenerator {
    protected interpolations: {[x: string]: (arg: ITemplateInterpolation) => string } = {
        tableName: ({tableName}) => tableName,
    };
    constructor(module: string) {
        super({
            name:'Controller',
            module,
        })
    }
}

export default ControllerGenerator

