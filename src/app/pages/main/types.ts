export interface IProduct {
    id: number,
    tittle: string,
    price: string,
    img?: string | null | ArrayBuffer,
    optionalTittle?: string
}


export interface INotification {
    type: string,
    text : string,
    show : boolean
}