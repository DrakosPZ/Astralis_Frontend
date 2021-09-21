import { Action } from "./action";

export class Message{
    gameID: string;
    userID: string;
    action: Action;

    specializedObject: string;

    public constructor(init?:Partial<Message>) {
        Object.assign(this, init);
    }
}