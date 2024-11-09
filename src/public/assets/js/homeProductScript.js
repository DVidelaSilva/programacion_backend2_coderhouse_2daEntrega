document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch
        const response = await fetch('http://localhost:8080/api/products');
        const data = await response.json();

        if (Array.isArray(data.data)) {
            const products = data.data;
            const productContainer = document.getElementById('lista-1');
            productContainer.innerHTML = '';

            products.forEach(product => {
                // Formatear el precio con el símbolo y formato adecuado para Chile
                const formattedPrice = new Intl.NumberFormat('es-CL', {
                    style: 'currency',
                    currency: 'CLP',
                    minimumFractionDigits: 0,  // Ajusta a 2 si quieres mostrar decimales
                }).format(product.price);  // Aquí usamos product.price, no totalPrice

                const productHTML = `
                    <div class="box">
                        <img src="${product.thumbnails}" alt="${product.title}">
                        <div class="product-txt">
                            <h3>${product.autor}</h3>
                            <p>${product.title}</p>
                            <p class="precio">${formattedPrice}</p> 
                            <a class="agregar-carrito btn-3"">Comprar</a>
                        </div>
                    </div>
                `;
                productContainer.innerHTML += productHTML;
            });
        } else {
            console.error('La propiedad "data" no es un array:', data);
        }
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
});




// Delegar el evento de "Agregar al carrito" al contenedor de productos
document.getElementById('lista-1').addEventListener('click', function(event) {
    if (event.target.classList.contains('agregar-carrito')) {
        // Redirigir al usuario a la página de login
        window.location.href = '/login';
    }
});