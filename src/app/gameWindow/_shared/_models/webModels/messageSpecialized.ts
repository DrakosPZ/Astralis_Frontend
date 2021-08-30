import { Action } from "./action";
import { SpecializedMessage } from "./subTypes/specializedMessage";

export class MessageSpecialized{
    gameID: string;
    userID: string;
    action: Action;

    specializedObject: SpecializedMessage;

    public constructor(init?:Partial<MessageSpecialized>) {
        Object.assign(this, init);
    }
}