import AbstractEvent from ".";
import { EventEmitter } from 'events';
import fs from 'fs'

class EventRegister {
  private static instance: EventRegister;

  public static getInstance(): EventRegister {
    if (!EventRegister.instance) {
      EventRegister.instance = new EventRegister();
    }
    return EventRegister.instance;
  }

  public eventEmitter: EventEmitter = new EventEmitter();

  constructor() {
    this.callEvents()
  }

  private callEvents() {
    try {
      let eventsPath = __dirname.replace('Services\\Event', 'App\\Components\\Events')
      fs.readdirSync(eventsPath).map((eventFileName) => {
        if(eventFileName.includes('.event.')) {
          require(`${eventsPath}\\${eventFileName}`)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public events: { [x: string]: AbstractEvent<any> } = {}

  registerEvent(event: AbstractEvent<any>) {
    if (this.events[event.name]) {
      return
    }
    this.events[event.name] = event
  }

  removeEvent(event: AbstractEvent<any>) {
    delete this.events[event.name]
    
    this.eventEmitter.removeListener(event.name, () => {
      console.log(`--------------------------------------\n`)
      console.log(`📴  Removing the Event: ${event.name}\n`)
      console.log(`--------------------------------------\n`)
    })
  }
}

export { EventRegister }

