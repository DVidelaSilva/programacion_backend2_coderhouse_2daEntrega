
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



document.addEventListener('DOMContentLoaded', async function() {
    try {
        const userId = await idUser()
        const cartId = await idCart(userId)

        const response1 = await fetch(`http://localhost:8080/api/carts/${cartId}`)
        const data1 = await response1.json()

        if (data1.status === 'success' && data1.data && data1.data.cart && Array.isArray(data1.data.cart.products)) {
            const products = data1.data.cart.products
            const productContainer = document.getElementById('lista-1')
            const totalQuantityElem = document.getElementById('total-quantity')
            const totalPriceElem = document.getElementById('total-price')
            let totalQuantity = 0
            let totalPrice = 0
            productContainer.innerHTML = ''

            const responseStockStatus = await fetch(`http://localhost:8080/api/carts/purchase/${cartId}`)
            const stockData = await responseStockStatus.json()

            if (stockData.status === 'success' && stockData.data && Array.isArray(stockData.data.stockStatus)) {
                const stockStatus = stockData.data.stockStatus

                for (let productData of products) {
                    const productId = productData.product
                    const quantity = productData.quantity

                    const stockInfo = stockStatus.find(status => status.productId === productId)
                    const stockStatusText = stockInfo ? stockInfo.status : 'no hay stock disponible'

                    const productResponse = await fetch(`http://localhost:8080/api/products/${productId}`)
                    const productDetails = await productResponse.json()

                    if (productDetails.status === 'success') {
                        const product = productDetails.data
                        const productPrice = product.price

                        let stockMessage = ''
                        let stockClass = ''
                        let addToTotal = true

                        if (stockStatusText === 'no hay stock disponible') {
                            stockMessage = 'No disponible'
                            stockClass = 'stock-unavailable'
                            addToTotal = false
                        } else {
                            stockMessage = 'Disponible'
                            stockClass = 'stock-available'
                        }

                        const totalProductPrice = addToTotal ? quantity * productPrice : 0

                        const formattedPrice = new Intl.NumberFormat('es-CL', {
                            style: 'currency',
                            currency: 'CLP',
                            minimumFractionDigits: 0,  
                        }).format(totalProductPrice)

                        if (addToTotal) {
                            totalQuantity += quantity
                            totalPrice += totalProductPrice
                        }

                        const productHTML = `
                            <div class="box">
                                <img src="${product.thumbnails}" alt="${product.title}">
                                <div class="product-txt">
                                    <h3>${product.autor}</h3>
                                    <p>${product.title}</p>
                                    <p class="precio">${formattedPrice}</p>
                                    <p>Cantidad: ${quantity}</p>
                                    <p>Total: ${formattedPrice}</p>
                                    <p class="stock-status ${stockClass}">${stockMessage}</p> 
                                </div>
                            </div>
                        `
                        productContainer.innerHTML += productHTML
                    } else {
                        console.error('No se pudieron obtener los detalles del producto', productDetails)
                    }
                }

                const formattedTotalPrice = new Intl.NumberFormat('es-CL', {
                    style: 'currency',
                    currency: 'CLP',
                    minimumFractionDigits: 0,
                }).format(totalPrice)

                totalQuantityElem.textContent = totalQuantity
                totalPriceElem.textContent = formattedTotalPrice

            } else {
                console.error('La respuesta no contiene los datos de stockStatus', stockData)
            }
        } else {
            console.log('La respuesta no contiene los datos esperados', data1)
        }
    } catch (error) {
        console.error('Hubo un error al obtener los datos del carrito:', error)
    }
})


document.getElementById('btn-pagar').addEventListener('click', function() {
  window.location.href = '/cartResume'
})

    
document.getElementById('btn-back').addEventListener('click', function() {
  window.history.back()
})

