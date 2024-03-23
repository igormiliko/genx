import AbstractEvent from ".";
import { EventEmitter } from 'events';
import fs from 'fs'

class EventRegister {
  static eventEmitter: EventEmitter = new EventEmitter();

  constructor() {
    EventRegister.init()
  }

  private static init() {
    try {
      let eventsPath = __dirname.replace('Services\\Event', 'App\\Components\\Events')
      fs.readdirSync(eventsPath).map((eventFileName) => {
        if (eventFileName.includes('.event.')) {
          require(`${eventsPath}\\${eventFileName}`)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  static events: { [x: string]: AbstractEvent<any> } = {}

  static registerEvent(event: AbstractEvent<any>) {
    if (EventRegister.events[event.name]) {
      return
    }

    EventRegister.events[event.name] = event
  }

  static removeEvent(event: AbstractEvent<any>) {
    EventRegister.eventEmitter.removeAllListeners(event.name)
    EventRegister.eventEmitter.removeAllListeners(`${event.name}Removed`)

    delete EventRegister.events[event.name]
  }
}

const events = EventRegister.events

export { EventRegister }

export default events
