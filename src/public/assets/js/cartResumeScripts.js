
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



  
  document.addEventListener('DOMContentLoaded', async function() {
    try {
        const userId = await idUser();
        const cartId = await idCart(userId);
        console.log('cartId', cartId);
        console.log('userId', userId);

        // Realizar la solicitud para obtener los datos del carrito
        const response1 = await fetch(`http://localhost:8080/api/carts/${cartId}`);
        const data1 = await response1.json();

        // Comprobamos que la estructura es la esperada
        if (data1.status === 'success' && data1.data && data1.data.cart && Array.isArray(data1.data.cart.products)) {
            const products = data1.data.cart.products;  // Aquí obtenemos los productos y sus cantidades
            const productContainer = document.getElementById('lista-1');
            const totalQuantityElem = document.getElementById('total-quantity');
            const totalPriceElem = document.getElementById('total-price');
            let totalQuantity = 0;
            let totalPrice = 0;
            productContainer.innerHTML = '';  // Limpiar el contenedor antes de agregar nuevos productos

            // Realizar la solicitud para obtener el estado de stock de los productos
            const responseStockStatus = await fetch(`http://localhost:8080/api/carts/purchaseCart/${cartId}`);
            const stockData = await responseStockStatus.json();

            if (stockData.status === 'success' && stockData.data && Array.isArray(stockData.data)) {
                const stockStatus = stockData.data;  // Aquí obtenemos el estado de stock de los productos

                // Recorrer el array de productos
                for (let productData of products) {
                    const productId = productData.product;  // Obtener el ID del producto
                    const quantity = productData.quantity;  // Obtener la cantidad de ese producto

                    // Buscar el estado de stock correspondiente a este producto
                    const stockInfo = stockStatus.find(status => status.productId === productId);
                    const stockStatusText = stockInfo ? stockInfo.status : 'no hay stock disponible';  // Si no se encuentra, por defecto se asume "no disponible"
                    console.log(stockStatusText);
                    if (stockStatusText === 'stock disponible') {

                    // Hacer otra solicitud para obtener los detalles del producto usando su ID
                    const productResponse = await fetch(`http://localhost:8080/api/products/${productId}`);
                    const productDetails = await productResponse.json();

                    if (productDetails.status === 'success') {
                        const product = productDetails.data;
                        const productPrice = product.price;

                       // Definir mensaje y clase según el estado del stock
                       let stockMessage = 'Disponible'; // Mensaje de stock
                       let stockClass = 'in-stock';   // Clase para CSS

                       // Calculamos el precio total del producto
                       const totalProductPrice = quantity * productPrice;


                        // Formatear el precio con el símbolo y formato adecuado para Chile
                        const formattedPrice = new Intl.NumberFormat('es-CL', {
                            style: 'currency',
                            currency: 'CLP',
                            minimumFractionDigits: 0,  // Puedes ajustar a 0 o 2, dependiendo de si quieres mostrar decimales
                        }).format(totalProductPrice);

                        // // Acumular el total de la cantidad y el total a pagar solo si el producto está disponible
                        // if (addToTotal) {
                        //     totalQuantity += quantity;
                        //     totalPrice += totalProductPrice;
                        // }
                        totalQuantity += quantity;
                        totalPrice += totalProductPrice;

                        const productHTML = `
                            <div class="box">
                                <img src="${product.thumbnails}" alt="${product.title}">
                                <div class="product-txt">
                                    <h3>${product.autor}</h3>
                                    <p>${product.title}</p>
                                    <p class="precio">${formattedPrice}</p>
                                    <p>Cantidad: ${quantity}</p>
                                    <p>Total: ${formattedPrice}</p>
                                    <p class="stock-status ${stockClass}">${stockMessage}</p> <!-- Mostrar estado de stock -->
                                </div>
                            </div>
                        `;
                        productContainer.innerHTML += productHTML;  // Agregar el HTML generado al contenedor
                    } else {
                        console.error('No se pudieron obtener los detalles del producto', productDetails);
                    }
                }
              }
                // Actualizar los totales en la sección total
                const formattedTotalPrice = new Intl.NumberFormat('es-CL', {
                    style: 'currency',
                    currency: 'CLP',
                    minimumFractionDigits: 0,
                }).format(totalPrice);

                totalQuantityElem.textContent = totalQuantity;
                totalPriceElem.textContent = formattedTotalPrice;

            } else {
                console.error('La respuesta no contiene los datos de stockStatus', stockData);
            }

        } else {
            console.log('La respuesta no contiene los datos esperados', data1);
        }

    } catch (error) {
        console.error('Hubo un error al obtener los datos del carrito:', error);
    }
});



    // BOTON CARRITO
    document.getElementById('btn-pagar').addEventListener('click', function() {
      window.location.href = '/cartPay';  
    });


    document.getElementById('btn-back').addEventListener('click', function() {
      window.history.back();  // Esto llevará al usuario a la página anterior en el historial.
    });