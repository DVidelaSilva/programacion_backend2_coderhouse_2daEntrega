
function registerUser(email, newRole) {

  if (!email || !newRole) {
    Swal.fire({
      title: 'Error',
      text: 'Por favor, complete todos los campos requeridos.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  // Datos a enviar
  const userData = {
    email: email,
    newRole: newRole
  };

  // Fetch
  fetch('http://localhost:8080/api/users/update/role', {
    method: 'PUT',
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
        text: 'El rol del usuario se ha actualizado con éxito.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Vaciar los campos del formulario
        document.getElementById('email').value = '';
        document.getElementById('newRole').value = '';
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Error al asignar el rol: ' + data.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  })
  .catch(error => {
    console.error('Error:', error);
    Swal.fire({
      title: 'Error',
      text: 'Ocurrió un error al intentar actualizar el rol del usuario.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  });
}
  


// envío del formulario
document.getElementById('updaterole-form').addEventListener('submit', function(event) {
  event.preventDefault()

  const email = document.getElementById('email').value
  const newRole = document.getElementById('newRole').value

  registerUser(email, newRole);
});


document.getElementById('btn-back').addEventListener('click', function() {
  window.history.back();  // Esto llevará al usuario a la página anterior en el historial.
});


// // botón "Home"
// document.getElementById('btn-home').addEventListener('click', function(event) {
//   event.preventDefault(); 
//   window.location.href = 'http://localhost:8080';
// });