
// logout
function logoutUser() {
  document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault(); 

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
        window.location.href = 'http://localhost:8080'
      } else {
        alert('Error al cerrar sesión: ' + data.message)
      }
    })
    .catch(error => {
      console.error('Error:', error)
      alert('Ocurrió un error al intentar cerrar sesión.')
    })
  })
}

//ID USUARIO

async function idUser() {

  try {
      // Fetch
      const response = await fetch('http://localhost:8080/api/sessions/extract', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json();
  
      if (data.dataUser && data.dataUser.id) {
          return data.dataUser.id;  
      } else {
          console.error('Error: No se encontró el ID del usuario');
          alert('No se pudo obtener el ID del usuario.');
          return null;  
      }
    } catch(error) {
        console.error('Error:', error)
        alert('Ocurrió un error al intentar cerrar sesión.')
        return null
      }
  }

// CARGAR PRODUCTOS 
document.addEventListener('DOMContentLoaded', async function() {
    try {
      //Fetch
        const response = await fetch('http://localhost:8080/api/products')
        const data = await response.json()

        if (Array.isArray(data.data)) {
            const products = data.data
            const productContainer = document.getElementById('lista-1')
            productContainer.innerHTML = ''

            products.forEach(product => {
                const productHTML = `
                 <div class="box">
                        <img src="${product.thumbnails}" alt="${product.title}">
                        <div class="product-txt">
                            <h3>${product.autor}</h3>
                            <p>${product.title}</p>
                            <p>${product.id}</p> 
                            <p class="precio">$${product.price}</p>
                            <!-- Aquí agregamos el _id de MongoDB al botón como un data-id -->
                            <a class="agregar-carrito btn-3" data-id="${product.id}">Agregar al carrito</a>
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
})

// AGREGAR PRODUCTO AL CARRITO  
document.getElementById('lista-1').addEventListener('click', async function(event) {

  if (event.target.classList.contains('agregar-carrito')) {
      const productoId = event.target.getAttribute('data-id');

      const userId = await idUser();

      console.log('idProducto', productoId);
      console.log('idUsuario', userId); 
  }
});





logoutUser();