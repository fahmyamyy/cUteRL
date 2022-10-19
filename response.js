export default class Response {
    constructor(code, message, time, count, data) {
        this.code = code;
        this.message = message;
        this.time = time;
        this.count = count;
        this.data = data;
    }
}