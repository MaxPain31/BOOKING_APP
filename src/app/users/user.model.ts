export interface iUser {
    id: string;
    userType: string;
    username: string;
    email: string;
    phNo: string;

}

export class User implements iUser{
    id: string;
    userType: string;
    username: string;
    email: string;
    phNo: string;

    constructor(id: string = '', userType: string = '', username: string = '', email: string = '', phNo: string = '') {
    this.id = id;
    this.userType = userType;
    this.username = username;
    this.email = email;
    this.phNo = phNo;
    }
}