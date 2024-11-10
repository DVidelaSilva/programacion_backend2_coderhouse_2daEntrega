
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
        const data = await response.json()
    
        if (data.dataUser && data.dataUser.id) {
            return data.dataUser.id
        } else {
            alert('No se pudo obtener el ID del usuario.')
            return null
        }
      } catch(error) {
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
      })

      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.statusText}`)
      }
  
      const data = await response.json()

      if (data.status === 'success' && data.data.userCartId) {
        return data.data.userCartId
      } else {
        console.error('No se encontró el userCartId en la respuesta')
        alert('No se pudo obtener el ID del carrito del usuario.')
        return null
      }
    } catch (error) {
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
    })

    if (!response.ok) {
      throw new Error(`Error en la respuesta de la API: ${response.statusText}`)
    }
    const data = await response.json()
  } catch (error) {
    alert('Ocurrió un error al intentar obtener el carrito del usuario.')
    return null
  }
}

//OBTENER ROLE USUARIO
async function roleUser() {
  try {
      // Fetch
      const response = await fetch('http://localhost:8080/api/sessions/extract', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
  
      if (data.dataUser && data.dataUser.role) {
          return data.dataUser.role 
      } else {
          console.error('Error: No se encontró el ID del usuario')
          alert('No se pudo obtener el ID del usuario.')
          return null
      }
    } catch(error) {
        console.error('Error:', error)
        alert('Ocurrió un error al intentar cerrar sesión.')
        return null
      }
}


  
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const userId = await idUser()
        const cartId = await idCart(userId)

        const response = await fetch(`http://localhost:8080/api/carts/${cartId}`)
        const data = await response.json()

        if (data.status === 'success' && data.data && data.data.cart && Array.isArray(data.data.cart.products)) {
            const products = data.data.cart.products
            const productContainer = document.getElementById('lista-1')
            productContainer.innerHTML = ''

            // Si no hay productos en el carrito, mostrar mensaje de "Carrito vacío"
            if (products.length === 0) {
                productContainer.innerHTML = `
                    <div class="carrito-vacio">
                        <h1>Carrito vacío</h1>
                    </div>
                `
            } else {
                for (let productData of products) {
                    const productId = productData.product
                    const quantity = productData.quantity

                    const productResponse = await fetch(`http://localhost:8080/api/products/${productId}`)
                    const productDetails = await productResponse.json()

                    if (productDetails.status === 'success') {
                        const product = productDetails.data
                        const totalPrice = quantity * product.price

                        const formattedPrice = new Intl.NumberFormat('es-CL', {
                            style: 'currency',
                            currency: 'CLP',
                            minimumFractionDigits: 0, 
                        }).format(totalPrice)

                        const productHTML = `
                            <div class="box">
                                <img src="${product.thumbnails}" alt="${product.title}">
                                <div class="product-txt">
                                    <h3>${product.autor}</h3>
                                    <p>${product.title}</p>
                                    <p class="precio">${formattedPrice}</p>
                                    <p>Cantidad: ${quantity}</p> 
                                    <p>Total: ${formattedPrice}</p>  
                                    <a class="eliminar-carrito btn-3"
                                       data-cart-id="${cartId}"
                                       data-product-id="${productId}">Eliminar del Carrito</a>
                                </div>
                            </div>
                        `
                        productContainer.innerHTML += productHTML
                    } else {
                        console.error('No se pudieron obtener los detalles del producto', productDetails)
                    }
                }
            }
        } else {
            console.error('La respuesta no contiene los datos esperados', data)
        }

    } catch (error) {
        console.error('Hubo un error al obtener los datos del carrito:', error)
    }
})


document.getElementById('lista-1').addEventListener('click', async function(event) {
  if (event.target.classList.contains('eliminar-carrito')) {
    const cartId = event.target.getAttribute('data-cart-id')
    const productId = event.target.getAttribute('data-product-id')

    try {
      const response = await fetch(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()
      if (data.status === 'success') {
        Swal.fire({
          title: 'Éxito',
          text: 'Producto eliminado del carrito.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.reload()
        })
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al eliminar el producto: ' + data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error)
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al intentar eliminar el producto del carrito.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }
})


document.getElementById('btn-pasar-a-comprar').addEventListener('click', function() {
  window.location.href = '/cartStock'
})


document.getElementById('btn-vaciar').addEventListener('click', async function() {
  try {
    const userId = await idUser()
    const cartId = await idCart(userId)

    await deleteAllOfCart(cartId)

    window.location.reload()
    
  } catch (error) {
    console.error('Hubo un error al intentar actualizar el carrito o al obtener los datos:', error)
  }
})


document.getElementById('btn-back').addEventListener('click', async function() {
  try {
    const role = await roleUser()

    if (!role) {
      console.error('Rol no disponible o no válido')
      return
    }

    if (role === 'user') {
      window.location.href = '/currentUser'
    } else if (role === 'user-premium') {
      window.location.href = '/currentUserPremium'
    } else if (role === 'admin') {
      window.location.href = '/currentAdmin'
    } else {
      console.error('Rol no válido:', role)
    }
  } catch (error) {
    console.error('Error al manejar el rol del usuario:', error)
  }
})
