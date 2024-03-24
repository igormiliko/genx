import { TMiddleware } from "../../../types"
import Topic from "./Topic"
import { Application } from "express"


class MessageBroker {
    readonly topics: { [x: string]: Topic } = {}

    constructor() {
        this.loadTopics()
    }

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
    private loadTopics(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                
            } catch (error) {
                
            }
        })
    }


    
    private validPublish(topic: string): boolean {
        return true
    }

    /**
     * This is the endpoint to receive messages from the publisher
     * @returns {[string, TMiddleware]}
     */
    private publishChannel(): [string, TMiddleware] {
        return [
            '/publish/:topic', 
            // Put here your api authentication middleware for improve the security
            (req, res, next) => {
                let {topic} = req.params

                if(!this.validPublish(topic)) {
                    next()
                }
            }
        ]
    }

    private subcribeValidation(): TMiddleware {
        return (req, res, next) => {

        }
    }

    /**
     * This is the endpoint for subscribing to a specific topic
     * @returns {[string, TMiddleware]}
     */
    private subscriberChannel(): [string, TMiddleware] {
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

export default MessageBroker