import Publisher from "../../../Services/Queue/PubSub/Publisher";
import Topic from "../../../Services/Queue/PubSub/Topic";

class TopicTest extends Topic {
    protected loadPublishers(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                let db = require('./db.json')
                for (let publisher of db.publishers) {
                    if (publisher["pub-key"]) {
                        // this.addTopic(new Publisher(topic.name, topic.events, topic.key))
                    }
                }

                return resolve()
            } catch (error) {
                return reject(error)
            }
        })
    }
    protected loadSubscribers(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {

            } catch (error) {

            }
        })
    }
}

export default TopicTest