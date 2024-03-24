import { TMiddleware } from "../../../types"
import Topic from "./Topic/Topic"
import { Application } from "express"


class MessageBroker {
    readonly topics: { [x: string]: Topic } = {}

    constructor() {
        this.loadTopics()
    }

    validation(): TMiddleware {
        return (req, res, next) => {

        }
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

    private loadTopics(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                
            } catch (error) {
                
            }
        })
    }

    private publisherChannel(): [string, TMiddleware] {
        return [
            '/publisher/:topic', 
            (req, res, next) => {

            }
        ]
    }

    private subscriberChannel(): [string, TMiddleware] {
        return [
            '/subscribe/:topic', 
            (req, res, next) => {

            }
        ]
    }

    install(app: Application) {
        app.get(...this.publisherChannel())
        app.post(...this.subscriberChannel())
    }
}

export default MessageBroker