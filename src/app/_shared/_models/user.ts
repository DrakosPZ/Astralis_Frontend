import { LoginInformation } from './LoginInformation';
import { UserRole } from './userRole';

export class User {
    identifier: string;
    nickName: string;
    role: UserRole;
    loginInformation: LoginInformation

    public constructor(init?:Partial<User>) {
        Object.assign(this, init);
        if(!init.loginInformation){
            this.loginInformation = new LoginInformation();
        }
    }
}