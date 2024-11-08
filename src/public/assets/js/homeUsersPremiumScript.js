document.addEventListener('DOMContentLoaded', async function() {
    try {
      // Fetch
        const response = await fetch('http://localhost:8080/api/products')
        const data = await response.json();

        if (Array.isArray(data.data)) {
            const products = data.data
            const productContainer = document.getElementById('lista-1');
            productContainer.innerHTML = ''

            products.forEach(product => {
                const productHTML = `
                    <div class="box">
                        <img src="${product.thumbnails}" alt="${product.title}">
                        <div class="product-txt">
                            <h3>${product.autor}</h3>
                            <p>${product.title}</p>
                            <p class="precio">$${product.price}</p>
                            <a href="#" class="agregar-carrito btn-3" data-id="${product.code}">Agregar al carrito</a>
                        </div>
                    </div>
                `
                productContainer.innerHTML += productHTML
            })
        } else {
            console.error('La propiedad "data" no es un array:', data)
        }
    } catch (error) {
        console.error('Error al obtener los productos:', error)
    }
});


// logout
function logoutUser() {
    document.getElementById('logout').addEventListener('click', function(event) {
      event.preventDefault()
  
      // Fetch
      fetch('http://localhost:8080/api/sessions/logout', {
        method: 'GET',  
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin'  
      })
      .then(response => response.json()) 
      .then(data => {
        if (data.status === 'success') {
          alert(data.message)
          window.location.href = 'http://localhost:8080'; 
        } else {
          alert('Error al cerrar sesión: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al intentar cerrar sesión.');
      });
    });
}
  
  logoutUser();
