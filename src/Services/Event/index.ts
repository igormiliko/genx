// eventEmitter.ts

// Importando módulos necessários
import {EventRegister} from './EventRegister';

type TRemovedEventData = {
    message: string;
    date: Date
}

abstract class AbstractEvent<D>{
    public readonly name: string = this.constructor.name;

    constructor() {
        this.on()
        this.off()
        EventRegister.registerEvent(this)
    }

    private on(): void {
        if (this.listenerOn) {
            EventRegister.eventEmitter.on(this.name, this.listenerOn());
        }
    }

    private off(): void {
        if (this.listenerOff) {
            EventRegister.eventEmitter.on(`${this.name}Removed`, this.listenerOff());
        }
    }

    abstract listenerOn(): (data?: D) => void

    abstract listenerOff(): (data?: D) => void

    public dispatch(data: D): void {
        EventRegister.eventEmitter.emit(this.name, data);
    }

    public remove() {
        let data: TRemovedEventData = {
            date: new Date(),
            message: this.name + ' removed'
        }

        EventRegister.eventEmitter.emit(`${this.name}Removed`, data);

        EventRegister.removeEvent(this)
    }
}


// Exportando a classe concreta
export default AbstractEvent;
