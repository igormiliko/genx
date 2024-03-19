import AbstractEvent from "../../../Services/Event";

type TSampleCreated_DataEvent = {message: string}

class SampleCreated extends AbstractEvent<TSampleCreated_DataEvent> {
    listenerOff(){
        return (data?: TSampleCreated_DataEvent) => {
            console.log("In off -> " + data?.message)
        }
    }
    listenerOn() {
        return (data?: TSampleCreated_DataEvent) => {
            console.log("In on created -> " + data?.message)
        }
    }
}

export default new SampleCreated()