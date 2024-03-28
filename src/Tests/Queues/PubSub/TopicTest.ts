import Publisher from "../../../Services/Queue/PubSub/Publisher";
import Subscriber from "../../../Services/Queue/PubSub/Subscriber";
import Topic from "../../../Services/Queue/PubSub/Topic";

class TopicTest extends Topic {
    protected loadPublishers(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                let db = require('./db.json')
                for (let publisher of db.publishers) {
                    if (publisher["pub-key"]) {
                        this.publishers.push(
                            new Publisher(publisher["pub-key"])
                        )
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
                let db = require('./db.json')
                for (let subscriber of db.subscribers) {
                    if (subscriber["sub-key"]) {
                        this.subscribers.push(
                            new Subscriber(
                                subscriber['sub-key'],
                                subscriber.url,
                                subscriber.topics
                            )
                        )
                    }
                }

                return resolve()
            } catch (error) {
                return reject(error)
            }
        })
    }
}

export default TopicTest