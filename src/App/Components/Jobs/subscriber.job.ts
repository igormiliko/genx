import Job from "../../../Services/Queue/Job";

class Subscriber extends Job {
    handle(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // console.log('Subcribing ' + this.times)
            resolve()
        })
    }
}

export default Subscriber