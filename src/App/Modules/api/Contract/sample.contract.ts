
import IDefaultContract from "../../../Core/Contract";

abstract class SampleDomain implements IDefaultContract {
    abstract create: (...args: any) => any
    abstract read: (...args: any) => any
    abstract list: (...args: any) => any
    abstract update: (...args: any) => any
    abstract destroy: (...args: any) => any
}

export default SampleDomain
