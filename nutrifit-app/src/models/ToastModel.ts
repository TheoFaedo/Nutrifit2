export default class ToastModel{
    type: string;
    content: string;

    constructor(type: string = "success", content: string = "A default message"){
        this.type = type;
        this.content = content;
    }
}