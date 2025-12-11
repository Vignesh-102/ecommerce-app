export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    category: string
}

export interface CartState {
    items: CartItem[];
}