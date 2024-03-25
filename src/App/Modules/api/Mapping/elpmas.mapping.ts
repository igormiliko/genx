
import Mapping from "../../../Core/Mapping";
import ElpmasResolver from "../Resolver/elpmas.resolver";

/**
 * @note The Mapping is responsible for mapping data from other
 * entities to the requested entity.
 */
class Elpmas<T> extends Mapping<T> {
    constructor() {
        super(new ElpmasResolver<T>('elpmas'))
    }
}

export default Elpmas
