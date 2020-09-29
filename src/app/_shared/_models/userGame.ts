import { GameRole } from './gameRole';

export class UserGame {
    user: string;
    gameState: string;
    gameRole: GameRole;

    public constructor(init?:Partial<UserGame>) {
        Object.assign(this, init);
    }
}