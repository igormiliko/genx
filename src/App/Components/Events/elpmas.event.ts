import AbstractEvent from "../../../Services/Event";

type TElpmas_DataEvent = {message: string}

class Elpmas extends AbstractEvent<TElpmas_DataEvent> {
    listenerOff(){
        return (data?: TElpmas_DataEvent) => {
            console.log("In off -> " + data?.message)
        }
    }
    listenerOn() {
        return (data?: TElpmas_DataEvent) => {
            console.log("In on created -> " + data?.message)
        }
    }
}

new Elpmas()