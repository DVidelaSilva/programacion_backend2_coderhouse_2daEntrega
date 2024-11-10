
function registerUser(firstName, lastName, email, age, password) {

  if (!firstName || !lastName || !email || !password) {
    Swal.fire({
      title: 'Error',
      text: 'Por favor, complete todos los campos requeridos.',
      icon: 'error',
      confirmButtonText: 'OK'
    })
    return
  }


    if (age && isNaN(age)) {
      Swal.fire({
        title: 'Error',
        text: 'La edad debe ser un número.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      return
    }

  // Datos a enviar
  const userData = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  }
  
  // Valida la edad opcional
  if (age) {
    userData.age = age
  }

  // fetch
  fetch('http://localhost:8080/api/sessions/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  .then(response => response.json())
  .then(data => {
    // Manejo de la respuesta
    if (data.status === 'success') {
      Swal.fire({
        title: 'Registro exitoso',
        text: 'Tu cuenta ha sido creada correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.href = 'http://localhost:8080/registerOK'
      })
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Error al registrar el usuario: ' + data.message,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  })
  .catch(error => {
    console.error('Error:', error)
    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema con la conexión al servidor. Intenta más tarde.',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  })
}


document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault()

  const firstName = document.getElementById('first_name').value
  const lastName = document.getElementById('last_name').value
  const email = document.getElementById('email').value
  const age = document.getElementById('age').value
  const password = document.getElementById('password').value

  registerUser(firstName, lastName, email, age, password)
})


document.getElementById('btn-home').addEventListener('click', function(event) {
  event.preventDefault()
  window.location.href = 'http://localhost:8080'
})
