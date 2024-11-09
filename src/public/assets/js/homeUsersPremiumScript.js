
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
        // Usando SweetAlert2 para mostrar un mensaje de éxito
        Swal.fire({
          title: '¡Sesión cerrada!',
          text: data.message,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          window.location.href = 'http://localhost:8080';  // Redirigir al inicio
        });
      } else {
        // Usando SweetAlert2 para mostrar un mensaje de error
        Swal.fire({
          title: 'Error',
          text: 'Error al cerrar sesión: ' + data.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Usando SweetAlert2 para mostrar un error en caso de fallo en el fetch
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al intentar cerrar sesión.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    })
  });
}

//OBTENER ID USUARIO
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
        console.log(data.dataUser.id);
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


//OBTENER ID CART
async function idCart(userId) {
  try {
    if (!userId) {
      throw new Error('El userId no está definido')
    }

    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Error en la respuesta de la API: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('Respuesta de la API de usuario:', data);
    if (data.status === 'success' && data.data.userCartId) {
      console.log(data.data.userCartId);
      return data.data.userCartId
    } else {
      console.error('No se encontró el userCartId en la respuesta')
      alert('No se pudo obtener el ID del carrito del usuario.')
      return null
    }
  } catch (error) {
    console.error('Error en cartOfUserId:', error)
    alert('Ocurrió un error al intentar obtener el carrito del usuario.')
    return null
  }
}
  
// AGREGA PRODUTO AL CARRITO
async function addToCart(cartId, productId) {
  try {
      
      const url = `http://localhost:8080/api/carts/${cartId}/products/${productId}`;
      const response = await fetch(url, {
          method: 'POST',  
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            quantity: 1 
        })
      })

      if (response.ok) {
          const data = await response.json()
          return data
      } else {
          console.error('Error al agregar el producto al carrito:', response.statusText)
          alert('No se pudo agregar el producto al carrito.')
      }
  } catch (error) {
      // Manejo de errores
      console.error('Error:', error)
      alert('Ocurrió un error al intentar agregar el producto al carrito.')
  }
}

// CONTADOR CARRITO
async function updateCartCount(cartId) {
    try {
      const response = await fetch(`http://localhost:8080/api/carts/${cartId}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.data.totalQuantity}`)
      }
  
      const data = await response.json();
      
      // Verifica que la respuesta tiene un status 'success' y totalQuantity
      if (data.status === 'success' && data.data.totalQuantity !== undefined) {
        console.log('Total Quantity:', data.data.totalQuantity);  // Verificamos el valor de totalQuantity
        return data.data.totalQuantity;  // Retornamos el totalQuantity para actualizar el contador
      } else {
        console.error('No se encontró totalQuantity en la respuesta');
        alert('No se pudo obtener el totalQuantity del carrito.');
        return null;
      }
    } catch (error) {
      console.error('Error en cartOfUserId:', error)
      alert('Ocurrió un error al intentar obtener el carrito del usuario.')
      return null
    }
}




// CARGAR PRODUCTOS 
document.addEventListener('DOMContentLoaded', async function() {
    try {

      const cartCountElement = document.getElementById('cart-count');

      const userId = await idUser();
      const cartId = await idCart(userId);


      if (cartId) {
        // Actualizar el contador del carrito
        const quantity = await updateCartCount(cartId);
        cartCountElement.textContent = quantity;
    } else {
        cartCountElement.textContent = 0;  // Si no hay carrito, mostrar 0
    }
      //Fetch
        const response = await fetch('http://localhost:8080/api/products')
        const data = await response.json()

        if (Array.isArray(data.data)) {
            const products = data.data
            const productContainer = document.getElementById('lista-1')
            productContainer.innerHTML = ''

                                    // Formato para precios en moneda chilena
                                    const numberFormat = new Intl.NumberFormat('es-CL', {
                                      style: 'currency',
                                      currency: 'CLP',
                                      minimumFractionDigits: 0,  // Sin decimales
                                  });

            products.forEach(product => {
              const formattedPrice = numberFormat.format(product.price);
                const productHTML = `
                 <div class="box">
                        <img src="${product.thumbnails}" alt="${product.title}">
                        <div class="product-txt">
                            <h3>${product.autor}</h3>
                            <p>${product.title}</p>
                           <p class="precio">${formattedPrice}</p>
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

  const cartCountElement = document.getElementById('cart-count')

  if (event.target.classList.contains('agregar-carrito')) {
      const productoId = event.target.getAttribute('data-id');
      const userId = await idUser();
      const cartId = await idCart(userId);
      
      try {
        const result = await addToCart(cartId, productoId);
        const quantity = await updateCartCount(cartId)
        cartCountElement.textContent = quantity
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
    }
  }
})

// Actualizar contador al cargar la página
document.addEventListener('DOMContentLoaded', async function() {
  const cartCountElement = document.getElementById('cart-count');
  const userId = await idUser();
  const cartId = await idCart(userId);

  if (cartId) {
      const quantity = await updateCartCount(cartId);
      cartCountElement.textContent = quantity;
  } else {
      cartCountElement.textContent = 0;  // Si no se pudo obtener el cartId, mostrar 0
  }
});


// BOTON CARRITO
document.getElementById('img-carrito').addEventListener('click', function() {
  window.location.href = '/cart';  
});

document.getElementById('crearproducto').addEventListener('click', function(event) {
  window.location.href = '/createProduct'; 
})

document.getElementById('soon').addEventListener('click', function(event) {
  window.location.href = '/soon'; 
})



logoutUser();
idUser();