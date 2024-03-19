export default `
import Mapping from "../../../Core/Mapping";
import {{className}}Resolver from "../Resolver/{{fileName}}.resolver";

/**
 * @note The Mapping is responsible for mapping data from other
 * entities to the requested entity.
 */
class {{className}}<T> extends Mapping<T> {
    constructor() {
        super(new {{className}}Resolver<T>('{{tableName}}'))
    }
}

export default {{className}}
`
    