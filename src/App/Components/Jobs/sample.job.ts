import Job from "../../../Services/Queue/Job";

class Sample extends Job {
    handle(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if(this.times > 0) {
                reject(`Rejecting in time ${this.times}`)
            } else {
                resolve()
            }
        })
    }
}

export default Sample