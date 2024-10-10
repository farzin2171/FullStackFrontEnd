export type BasketItem = {
    productId:number,
    name:string,
    price:number,
    pictureUrl:string,
    barnd:string,
    type:string,
    quantity:number
}

export type Basket= {
    id:number,
    buyerId: string,
    items:BasketItem[]
}