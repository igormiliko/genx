import MessageBroker from "../../../Services/Queue/PubSub/MessageBroker"
import Topic from "../../../Services/Queue/PubSub/Topic"
import { TMiddleware } from "../../../types"
import { Application } from "express"
import TopicTest from "./TopicTest"

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
     * Mothod responsable to auto-load the topics from database
     * @returns {Promise<void>}
     */
    protected loadTopics(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                let db = require('./db.json')
                for(let topic of db.topic) {
                    if(topic.name){
                        this.addTopic(new TopicTest(topic.name, topic.events, topic.key ))
                    }
                }

                return resolve()
            } catch (error) {
                return reject(error)
            }
        })
    }


    
    protected validPublish(topic: string, key: Buffer): boolean {
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

                if(!this.validPublish(topic, Buffer.from(String(key)))) {
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
    async install(app?: Application) {
        await this.loadTopics()
        if (app){
            app.post(...this.publishChannel())
            app.post(...this.subscriberChannel())
        }
    }
}

export default MessageBrokerTest