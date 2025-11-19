export interface IProduct {
    id: number
    title: string
    url?:string
    price: number
    before_discount_price: number
    inventory: number
    brand: string
    description: string
    images: string[]
    categories: string[]
    features: string[]
  }