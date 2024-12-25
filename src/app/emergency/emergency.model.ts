export interface iContact {
    id: string;
    name: string;
    contactNum: string;
}

export class Contact implements iContact {
    id: string;
    name: string;
    contactNum: string;
    
    constructor(id: string = '', name: string = '', contactNum: string = '') {
        this.id = id;
        this.name = name;
        this.contactNum = contactNum;
    }
}