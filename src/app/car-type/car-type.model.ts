export interface iCar {
    id: string;
    type: string[];
    rate: number;
    tax: string;
   

}

export class Car {
    id: string;
    type: string[] = [];
    rate: number;
    tax: string;
    
        constructor(id: string = '', type: string[] = [], rate: number = 0, tax: string = '') {
            this.id = id;
            this.type = type;
            this.rate = rate;
            this.tax = tax;
        }
}