import Topic from "../../../Services/Queue/PubSub/Topic"
import MessageBrokerTest from "./MessageBrokerTest"
import {exec} from 'child_process'


describe.only('MessageBroker pub/sub engine tests', () => {
    let MB = new MessageBrokerTest()

    beforeAll(async () => {
    //     // run subscriber servers to observe the events 
    //     exec(`ts-node C:/Users/igor.delgado/personal/genx/src/Tests/Queues/PubSub/servers.ts`)

        await new Promise((r)=> setTimeout(r, 500))
    })
    
    test.only('Load topics', async () => {
        await MB.install()
        for (let topic in MB.topics) {
            if(!(MB.topics[topic] instanceof Topic)) {
                return false
            }
        }

        return true
    })

    // test.only('Load subscribers', () => {
        
    // })

    // test.only('Load publishers', () => {
        
    // })

    // test.only('Subscribe on a topic', () => {
        
    // })

    // test.only('Observe an event', () => {
        
    // })
})