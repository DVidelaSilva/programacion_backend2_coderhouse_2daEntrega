
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
        Swal.fire({
          title: '¡Sesión cerrada!',
          text: data.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.href = 'http://localhost:8080'
        })
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al cerrar sesión: ' + data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    })
    .catch(error => {
      console.error('Error:', error)
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al intentar cerrar sesión.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  })
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
      const data = await response.json()
  
      if (data.dataUser && data.dataUser.id) {
          return data.dataUser.id 
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
    console.error('Error en cartOfUserId:', error)
    alert('Ocurrió un error al intentar obtener el carrito del usuario.')
    return null
  }
}
  
// AGREGA PRODUTO AL CARRITO
async function addToCart(cartId, productId) {
  try {
      const url = `http://localhost:8080/api/carts/${cartId}/products/${productId}`
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
      })
  
      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.data.totalQuantity}`)
      }
  
      const data = await response.json()
      
      if (data.status === 'success' && data.data.totalQuantity !== undefined) {
        return data.data.totalQuantity
      } else {
        console.error('No se encontró totalQuantity en la respuesta')
        alert('No se pudo obtener el totalQuantity del carrito.')
        return null
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

      const cartCountElement = document.getElementById('cart-count')
      const userId = await idUser()
      const cartId = await idCart(userId)

      if (cartId) {
          const quantity = await updateCartCount(cartId)
          cartCountElement.textContent = quantity
      }
      //Fetch
        const response = await fetch('http://localhost:8080/api/products')
        const data = await response.json()

        if (Array.isArray(data.data)) {
            const products = data.data
            const productContainer = document.getElementById('lista-1')
            productContainer.innerHTML = ''

            const numberFormat = new Intl.NumberFormat('es-CL', {
              style: 'currency',
              currency: 'CLP',
              minimumFractionDigits: 0,  // Sin decimales
            })

            products.forEach(product => {
              const formattedPrice = numberFormat.format(product.price)
                const productHTML = `
                 <div class="box">
                        <img src="${product.thumbnails}" alt="${product.title}">
                        <div class="product-txt">
                            <h3>${product.autor}</h3>
                            <p>${product.title}</p>
                            <p class="precio">${formattedPrice}</p>
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
      const productoId = event.target.getAttribute('data-id')
      const userId = await idUser()
      const cartId = await idCart(userId)
      
      try {
        const result = await addToCart(cartId, productoId)
        const quantity = await updateCartCount(cartId)
        cartCountElement.textContent = quantity
    } catch (error) {
        console.error('Error al agregar al carrito:', error)
    }
  }
})


document.addEventListener('DOMContentLoaded', async function() {
  const cartCountElement = document.getElementById('cart-count')
  const userId = await idUser()
  const cartId = await idCart(userId)

  if (cartId) {
      const quantity = await updateCartCount(cartId)
      cartCountElement.textContent = quantity
  } else {
      cartCountElement.textContent = 0
  }
})


document.getElementById('img-carrito').addEventListener('click', function() {
  window.location.href = '/cart'  
})


document.getElementById('crearusuario').addEventListener('click', function(event) {
  window.location.href = '/createUser'
})


document.getElementById('crearproducto').addEventListener('click', function(event) {
  window.location.href = '/createProduct'
})


document.getElementById('updaterole').addEventListener('click', function(event) {
  window.location.href = '/updateRole' 
})


document.getElementById('soon').addEventListener('click', function(event) {
  window.location.href = '/soon'
})


logoutUser()
idUser()

