
function registerUser(firstName, lastName, email, age, password, role) {

    if (!firstName || !lastName || !email || !password || !role) {
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

    const validRoles = ['admin', 'user-premium', 'user']
    if (!validRoles.includes(role)) {
      Swal.fire({
        title: 'Error',
        text: 'El rol debe ser uno de los siguientes: admin, user-premium, user.',
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
    role: role
  }

  // Valida la edad opcional
  if (age) {
    userData.age = age
  }

  // Fetch
  fetch('http://localhost:8080/api/users', {
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
        text: 'Usuario registrado con éxito.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Vaciar los campos del formulario
        document.getElementById('first_name').value = '';
        document.getElementById('last_name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('age').value = '';
        document.getElementById('password').value = '';
        document.getElementById('role').value = '';
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
      text: 'Ocurrió un error al intentar registrar el usuario.',
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
  const role = document.getElementById('role').value

  registerUser(firstName, lastName, email, age, password, role)
})

document.getElementById('btn-back').addEventListener('click', function() {
  window.history.back()
})

