import { TMiddleware } from "../../../types"
import Topic from "./Topic"
import { Application } from "express"

abstract class MessageBroker {
    readonly topics: { [x: string]: Topic } = {}


    addTopic(topic: Topic) {
        if (this.topics[topic.constructor.name]) {
            return
        }
        this.topics[topic.constructor.name] = topic
    }

    removeTopic(topic: Topic) {
        delete this.topics[topic.constructor.name]
    }

    /**
     * Mothod responsable to load the topics from database
     * @returns {Promise<void>}
     */
    protected abstract loadTopics(): Promise<void> 

    protected abstract validPublish(...args: any): boolean

    /**
     * This is the endpoint to receive messages from the publisher
     * @returns {[string, TMiddleware]}
     */
    protected abstract publishChannel(): [string, TMiddleware]

    protected abstract validSubscribe(): TMiddleware

    /**
     * This is the endpoint for subscribing to a specific topic
     * @returns {[string, TMiddleware]}
     */
    protected abstract subscriberChannel(): [string, TMiddleware]

    /**
     * Method to install the messageBroker in the Express app
     * @param app 
     */
    install(app: Application) {
        app.get(...this.publishChannel())
        app.post(...this.subscriberChannel())
    }
}

export default MessageBroker