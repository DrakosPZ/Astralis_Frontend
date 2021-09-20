import { GameRole } from './gameRole';

export class UserGame {
    user: string;
    gameLobbies: string;
    gameRole: GameRole;

    public constructor(init?:Partial<UserGame>) {
        Object.assign(this, init);
    }
}