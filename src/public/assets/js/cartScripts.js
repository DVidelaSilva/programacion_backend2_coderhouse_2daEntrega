
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
          //console.log(data.dataUser.id);
            return data.dataUser.id;  
        } else {
            //console.error('Error: No se encontró el ID del usuario');
            alert('No se pudo obtener el ID del usuario.');
            return null;  
        }
      } catch(error) {
          //console.error('Error:', error)
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
      //console.log(response);
      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.statusText}`)
      }
  
      const data = await response.json()
      //console.log('Respuesta de la API de usuario:', data);
      if (data.status === 'success' && data.data.userCartId) {
        //console.log(data.data.userCartId);
        return data.data.userCartId
      } else {
        console.error('No se encontró el userCartId en la respuesta')
        alert('No se pudo obtener el ID del carrito del usuario.')
        return null
      }
    } catch (error) {
      //console.error('Error en cartOfUserId:', error)
      alert('Ocurrió un error al intentar obtener el carrito del usuario.')
      return null
    }
  }
  
    //VACIAR ID CART
async function deleteAllOfCart(idCart) {
  try {
    if (!idCart) {
      throw new Error('El userId no está definido')
    }

    const response = await fetch(`http://localhost:8080/api/carts/${idCart}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //console.log(response);
    if (!response.ok) {
      throw new Error(`Error en la respuesta de la API: ${response.statusText}`)
    }

    const data = await response.json()
    //console.log('Respuesta de la API de usuario:', data);
    console.log(data);
  } catch (error) {
    //console.error('Error en cartOfUserId:', error)
    alert('Ocurrió un error al intentar obtener el carrito del usuario.')
    return null
  }
}


async function roleUser() {

  try {
      // Fetch
      const response = await fetch('http://localhost:8080/api/sessions/extract', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json();
  
      if (data.dataUser && data.dataUser.role) {
        console.log(data.dataUser.role);
          return data.dataUser.role 
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


  
  document.addEventListener('DOMContentLoaded', async function() {
    try {
        const userId = await idUser();
        const cartId = await idCart(userId);
        console.log('cartId', cartId);
        console.log('userId', userId);

        // Realizar la solicitud para obtener los datos del carrito
        const response = await fetch(`http://localhost:8080/api/carts/${cartId}`);
        const data = await response.json();

        // Comprobamos que la estructura es la esperada
        if (data.status === 'success' && data.data && data.data.cart && Array.isArray(data.data.cart.products)) {
            const products = data.data.cart.products;
            const productContainer = document.getElementById('lista-1');
            productContainer.innerHTML = '';  // Limpiar el contenedor antes de agregar nuevos productos

            // Si no hay productos en el carrito, mostrar mensaje de "Carrito vacío"
            if (products.length === 0) {
                productContainer.innerHTML = `
                    <div class="carrito-vacio">
                        <h1>Carrito vacío</h1>
                    </div>
                `;
            } else {
                // Recorrer el array de productos
                for (let productData of products) {
                    const productId = productData.product;  // Obtener el ID del producto
                    const quantity = productData.quantity;  // Obtener la cantidad

                    // Hacer otra solicitud para obtener los detalles del producto usando su ID
                    const productResponse = await fetch(`http://localhost:8080/api/products/${productId}`);
                    const productDetails = await productResponse.json();

                    if (productDetails.status === 'success') {
                        const product = productDetails.data;
                        const totalPrice = quantity * product.price;

                        // Formatear el precio con el símbolo y formato adecuado para Chile
                        const formattedPrice = new Intl.NumberFormat('es-CL', {
                            style: 'currency',
                            currency: 'CLP',
                            minimumFractionDigits: 0,  // Ajusta a 0 o 2, dependiendo de si quieres mostrar decimales
                        }).format(totalPrice);

                        const productHTML = `
                            <div class="box">
                                <img src="${product.thumbnails}" alt="${product.title}">
                                <div class="product-txt">
                                    <h3>${product.autor}</h3>
                                    <p>${product.title}</p>
                                    <p class="precio">${formattedPrice}</p>
                                    <p>Cantidad: ${quantity}</p> <!-- Mostrar la cantidad -->
                                    <p>Total: ${formattedPrice}</p>  <!-- Mostrar el total calculado -->
                                    <a class="eliminar-carrito btn-3"
                                       data-cart-id="${cartId}"
                                       data-product-id="${productId}">Eliminar del Carrito</a>
                                </div>
                            </div>
                        `;
                        productContainer.innerHTML += productHTML;  // Agregar el HTML generado al contenedor
                    } else {
                        console.error('No se pudieron obtener los detalles del producto', productDetails);
                    }
                }
            }
        } else {
            console.error('La respuesta no contiene los datos esperados', data);
        }

    } catch (error) {
        console.error('Hubo un error al obtener los datos del carrito:', error);
    }
});

document.getElementById('lista-1').addEventListener('click', async function(event) {
  if (event.target.classList.contains('eliminar-carrito')) {
    const cartId = event.target.getAttribute('data-cart-id');
    const productId = event.target.getAttribute('data-product-id');

    try {
      // Hacer el fetch para eliminar el producto del carrito
      const response = await fetch(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      if (data.status === 'success') {
        Swal.fire({
          title: 'Éxito',
          text: 'Producto eliminado del carrito.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Recargar la página o realizar otra acción para actualizar la vista
          window.location.reload();  // Recargar la página para reflejar el cambio
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al eliminar el producto: ' + data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al intentar eliminar el producto del carrito.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
});
    // BOTON CARRITO
document.getElementById('btn-pasar-a-comprar').addEventListener('click', function() {
  window.location.href = '/cartStock';  
});



document.getElementById('btn-vaciar').addEventListener('click', async function() {
  try {
    // Obtener el ID del usuario y el carrito
    const userId = await idUser();
    const cartId = await idCart(userId);

    // Llamar a la función que elimina todos los productos del carrito
    await deleteAllOfCart(cartId);

    // Recargar la página para reflejar los cambios (carrito vacío)
    window.location.reload();
    
  } catch (error) {
    console.error('Hubo un error al intentar actualizar el carrito o al obtener los datos:', error);
  }
});

// Evento para el botón "Volver"
document.getElementById('btn-back').addEventListener('click', async function() {
  try {
    const role = await roleUser();

    if (!role) {
      // Si no obtenemos un rol válido, no hacemos nada
      console.error('Rol no disponible o no válido');
      return;
    }

    console.log("Rol del usuario: ", role);  // Log para depuración

    // Verifica el rol y redirige al usuario según corresponda
    if (role === 'user') {
      window.location.href = '/currentUser';
    } else if (role === 'user-premium') {
      window.location.href = '/currentUserPremium';
    } else if (role === 'admin') {
      window.location.href = '/currentAdmin';
    } else {
      console.error('Rol no válido:', role);
    }
  } catch (error) {
    console.error('Error al manejar el rol del usuario:', error);
  }
});
