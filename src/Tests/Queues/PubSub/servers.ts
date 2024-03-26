import express from "express"
import fs from "fs"

let ports = [3330, 3331, 3332, 3334, 3335]

for (let port of ports) {
    let server = express()
    server.post('subscriber/observe/:topic',
        (req, res) => {
            let {topic} = req.params
            let {data} = req.body
            let log = `\nhost: ${req.headers.host} | topic: ${topic} | data: ${JSON.stringify(data)}\n`
            fs.writeFileSync('./log.txt', log)

            res.status(200).send()
        }
    )

    server.listen(port, () => console.log(port))
}