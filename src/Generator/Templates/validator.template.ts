export default `import Validator from "../../../Core/Validator";

class {{className}} extends Validator {
    public entityPrimaryKey: string = "{{primaryKey}}";
    public validColumns = {{columns}}
}

export default new {{className}}()
`