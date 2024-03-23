import Job from "../../../Services/Queue/Job";

class Publisher extends Job {
    handle(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // console.log('Publishing ' + this.times)
            if(this.times > 0) {
                reject(`Rejecting in time ${this.times}`)
            } else {
                resolve()
            }
        })
    }
}

export default Publisher