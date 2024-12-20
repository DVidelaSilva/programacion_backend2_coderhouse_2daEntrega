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
  


document.addEventListener('DOMContentLoaded', async function() {
  try {
      // Obtener los IDs de usuario y carrito
      const userId = await idUser()
      const cartId = await idCart(userId)

      if (!userId || !cartId) {
          alert('No se pudo obtener el ID del usuario o del carrito')
          return
      }
      // Realizar la solicitud para obtener los datos de la compra
      const response = await fetch(`http://localhost:8080/api/carts/pay/${cartId}/user/${userId}`)
      const data = await response.json()

      if (data.status === 'success') {
          const paymentData = data.data

          // Mostrar los detalles en el HTML
          document.getElementById('purchaser-email').textContent = paymentData.purchaser
          
          // Convertir el timestamp a una fecha legible
          const purchaseDate = new Date(paymentData.created_at)
          document.getElementById('purchase-date').textContent = purchaseDate.toLocaleString()

          // Mostrar el monto de pago formateado como moneda
          const formattedAmount = new Intl.NumberFormat('es-CL', {
              style: 'currency',
              currency: 'CLP',
              minimumFractionDigits: 0,
          }).format(paymentData.amount)
          document.getElementById('amount-paid').textContent = formattedAmount

          // Enviar el correo de comprobante al endpoint de tickets
          const ticketData = {
            purchaser: paymentData.purchaser,
            created_at: purchaseDate.toLocaleString(),
            amount: formattedAmount
        }

        // Enviar el correo utilizando fetch
        const emailResponse = await fetch('http://localhost:8080/api/tickets/mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketData)
        })

        const emailData = await emailResponse.json()
        if (emailData.status === 'success') {
        } else {
            console.error('Error al enviar el correo de comprobante:', emailData.message)
        }
      } else {
          console.error('Error al obtener el pago', data.message)
          alert('Error al obtener los detalles del pago')
      }


      // Agregar el evento al botón "Home"
      document.getElementById('home').addEventListener('click', async function() {
        
      let role = await roleUser()

      if(role === 'user'){
      window.location.href = '/currentUser'
      } else if (role ==='user-premium') {
        window.location.href = '/currentUserPremium'
      } else if (role ==='admin'){
        window.location.href = '/currentAdmin'
      }else {
        console.error('Rol no válido:', role)
      }
    })
  } catch (error) {
      console.error('Hubo un error al obtener los datos del pago:', error)
      alert('Ocurrió un error al intentar obtener los datos del pago.')
  }
})



