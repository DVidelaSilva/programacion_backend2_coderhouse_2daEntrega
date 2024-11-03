class ProductDto {

    constructor(product) {
        this.title = product.title;
        this.autor = product.autor;
        this.description = product.description;
        this.code = product.code;
        this.price = product.price;
        this.status = product.status;
        this.stock = product.stock;
        this.category = product.category;
        this.thumbnails = product.thumbnails;
    }
}


export default ProductDto