import { LoginInformation } from './LoginInformation';
import { UserGame } from './userGame';
import { UserRole } from './userRole';

export class User {
    identifier: string;
    nickName: string;
    role: UserRole;
    loginInformation: LoginInformation
    userGameLobbies: UserGame[];

    public constructor(init?:Partial<User>) {
        Object.assign(this, init);
        if(!init.loginInformation){
            this.loginInformation = new LoginInformation();
        }
    }
}