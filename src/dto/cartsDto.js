class CartDto {

    constructor(cart) {
        this.id = cart.id;
        this.products = cart.products.map(item => ({
            product: item.product, // ID del producto
            quantity: item.quantity // Cantidad del producto en el carrito
        }));
    }
}


export default CartDto