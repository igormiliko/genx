
import Mapping from "../../../Core/Mapping";
import SampleResolver from "../Resolver/sample.resolver";

/**
 * @note The Mapping is responsible for mapping data from other
 * entities to the requested entity.
 */
class Sample<T> extends Mapping<T> {
    constructor() {
        super(new SampleResolver<T>('sample'))
    }
}

export default Sample
