// eventEmitter.ts

// Importando módulos necessários
import { EventEmitter } from 'events';
import {EventRegister} from './EventRegister';

abstract class AbstractEvent<D>{
    protected eventEmitter: EventEmitter;
    public readonly name: string = this.constructor.name;

    constructor() {
        this.eventEmitter = EventRegister.getInstance().eventEmitter;

        this.on()
        this.off()
        EventRegister.getInstance().registerEvent(this)
    }

    private on(): void {
        this.eventEmitter.on(this.name, this.listenerOn());
    }

    private off(): void {
        this.eventEmitter.off(this.name, this.listenerOff());
    }

    public dispatch(data: D): void {
        this.eventEmitter.emit(this.name, data);
    }
    
    abstract listenerOn(): (data?: D) => void 
    
    abstract listenerOff(): (data?: D) => void
}


// Exportando a classe concreta
export default AbstractEvent;
