import MessageBroker from "../../../Services/Queue/PubSub/MessageBroker"
import Topic from "../../../Services/Queue/PubSub/Topic"
import { TMiddleware } from "../../../types"
import { Application } from "express"

class MessageBrokerTest extends MessageBroker {
    readonly topics: { [x: string]: Topic } = {}

    addTopic(topic: Topic) {
        if (this.topics[topic.name]) {
            return
        }
        this.topics[topic.name] = topic
    }

    removeTopic(topic: Topic) {
        delete this.topics[topic.name]
    }

    /**
     * Mothod responsable to load the topics from database
     * @returns {Promise<void>}
     */
    protected loadTopics(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                let topics = require('./db.json')
                console.log(topics)
            } catch (error) {
                console.log(error)
            }
        })
    }


    
    protected validPublish(topic: string): boolean {
        return true
    }

    /**
     * This is the endpoint to receive messages from the publisher
     * @returns {[string, TMiddleware]}
     */
    protected publishChannel(): [string, TMiddleware] {
        return [
            '/publish/:topic', 
            // Put here your api authentication middleware for improve the security
            (req, res, next) => {
                let {topic} = req.params
                let key = req.headers.authorization

                if(!this.validPublish(topic)) {
                    next()
                }
            }
        ]
    }

    protected validSubscribe(): TMiddleware {
        return (req, res, next) => {

        }
    }

    /**
     * This is the endpoint for subscribing to a specific topic
     * @returns {[string, TMiddleware]}
     */
    protected subscriberChannel(): [string, TMiddleware] {
        return [
            '/subscribe/:topic', 
            // Put here your api authentication middleware for improve the security
            (req, res, next) => {

            }
        ]
    }

    /**
     * Method to install the messageBroker in the Express app
     * @param app 
     */
    install(app: Application) {
        app.get(...this.publishChannel())
        app.post(...this.subscriberChannel())
    }
}

export default MessageBrokerTest