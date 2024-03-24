import { TMiddleware } from "../../../types"
import Publisher from "./Publisher"
import Subscriber from "./Subscriber"
import Topic from "./Topic"
import { Application } from "express"


class MessageBroker {
    readonly topics: { [x: string]: Topic } = {}

    publishers: Publisher[] = []
    subcribers: Subscriber[] = []

    constructor(app: Application) {
        this.loadPublishers();
        this.loadSubscribers();
        this.install(app)
    }

    validation() {
        
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

    private loadPublishers() {

    }

    private loadSubscribers() {

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

    private install(app: Application) {
        app.get(...this.publisherChannel())
        app.post(...this.subscriberChannel())
    }
}

export default MessageBroker