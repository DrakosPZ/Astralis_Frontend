import { GameRole } from '../gameRole';
import { User } from '../user';

export class UserGameDetail {
    user: User;
    gameState: string;
    gameRole: GameRole;

    public constructor(init?:Partial<UserGameDetail>) {
        Object.assign(this, init);
    }
}