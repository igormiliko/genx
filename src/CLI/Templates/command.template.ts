export default `
import { argv } from "process";

function main() {
    const [_, __, commandName] = argv

    if (!commandName.includes('.')) {
        throw new Error('Please add an action to the command, like: DOMAIN.ADD')
    }
}

export default main()
`