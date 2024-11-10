class CartDto {

    constructor(cart) {
        this.id = cart.id;
        this.products = cart.products.map(item => ({
            product: item.product, 
            quantity: item.quantity 
        }))
    }
}



export default CartDto