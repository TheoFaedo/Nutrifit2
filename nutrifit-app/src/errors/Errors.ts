export class NutrifitError extends Error {
    constructor(public messageId: number) {
        super("Error"+messageId);
        this.messageId = messageId;
    }
}