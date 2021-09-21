import { GameRole } from '../gameRole';
import { User } from '../user';

export class UserGameDetail {
    user: User;
    gameLobby: string;
    gameRole: GameRole;

    public constructor(init?:Partial<UserGameDetail>) {
        Object.assign(this, init);
    }
}