
export class LoginInformation {
    loginName: string;
    password: string;

    public constructor(init?:Partial<LoginInformation>) {
        Object.assign(this, init);
    }
}