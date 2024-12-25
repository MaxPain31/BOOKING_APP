export interface iAddress {
    id: string;
    title: string;
    place: string;

}

export class Address implements iAddress {
    id: string;
    title: string;
    place: string;

    
    constructor(id: string = '', title: string = '', place: string = '') {
        this.id = id;
        this.title = title;
        this.place = place;
    
        
    }
}