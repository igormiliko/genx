interface IDefaultContract {
    create: (...args: any) => any
    read: (...args: any) => any
    list: (...args: any) => any
    update: (...args: any) => any
    destroy: (...args: any) => any
}

export default IDefaultContract