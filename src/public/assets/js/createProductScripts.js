
function createProduct(title, autor, description, code, price, status, stock, category, thumbnails) {

  if (!title || !autor || !description || !description || !code || !price || !status || !stock || !category || !thumbnails) {
    Swal.fire({
      title: 'Error',
      text: 'Por favor, complete todos los campos requeridos.',
      icon: 'error',
      confirmButtonText: 'OK'
    })
    return
  }

  // Datos a enviar
  const userData = {
    title: title,
    autor: autor,
    description: description,
    code: code,
    price: price,
    status: status,
    stock: stock,
    category: category,
    thumbnails: thumbnails
  }

  // Fetch
  fetch('http://localhost:8080/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {  
      Swal.fire({
        title: 'Éxito',
        text: 'Producto creado con éxito.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Vaciar los campos del formulario
        document.getElementById('title').value = '';
        document.getElementById('autor').value = '';
        document.getElementById('description').value = '';
        document.getElementById('code').value = '';
        document.getElementById('price').value = '';
        document.getElementById('status').value = '';
        document.getElementById('stock').value = '';
        document.getElementById('category').value = '';
        document.getElementById('thumbnails').value = '';
      })
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Error al crear el Producto: ' + data.message,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  })
  .catch(error => {
    console.error('Error:', error)
    Swal.fire({
      title: 'Error',
      text: 'Ocurrió un error al intentar crear el producto.',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  })
}


document.getElementById('createProduct-form').addEventListener('submit', function(event) {
  event.preventDefault()

  const title = document.getElementById('title').value
  const autor = document.getElementById('autor').value
  const description = document.getElementById('description').value
  const code = document.getElementById('code').value
  const price = document.getElementById('price').value
  const status = document.getElementById('status').value
  const stock = document.getElementById('stock').value
  const category = document.getElementById('category').value
  const thumbnails = document.getElementById('thumbnails').value

  createProduct(title, autor, description, code, price, status, stock, category, thumbnails)
})

document.getElementById('btn-back').addEventListener('click', function() {
  window.history.back()
})

