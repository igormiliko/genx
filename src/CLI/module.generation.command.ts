
import { argv } from "process";
import Generators from "../Generator";

function main() {
    const [_, __, module] = argv

    Generators(module || 'api')
}

export default main()
