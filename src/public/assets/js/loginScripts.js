
function loginUser(email, password) {

  // Datos a enviar
  const userData = {
    email: email,
    password: password,
  };

  // Fetch para realizar el login
  fetch('http://localhost:8080/api/sessions/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success' && data.role === 'user') {
      // Redirigir al usuario
      window.location.href = 'http://localhost:8080/api/sessions/currentUser';
    } else if (data.status === 'success' && data.role === 'user-premium') {
      // Redirigir al usuario premium
      window.location.href = 'http://localhost:8080/api/sessions/currentUserPremium';
    } else if (data.status === 'success' && data.role === 'admin') {
      // Redirigir al admin
      window.location.href = 'http://localhost:8080/api/sessions/currentAdmin';
    } else {
      // Si las credenciales son incorrectas o el estado no es 'success'
      Swal.fire({
        title: 'Error',
        text: 'Credenciales incorrectas o no autorizado.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  })
  .catch(error => {
    console.error('Error:', error);
    Swal.fire({
      title: 'Error de conexión',
      text: 'No se pudo conectar al servidor. Intenta de nuevo más tarde.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  });
}
  

// envío del formulario
  document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault()

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  loginUser(email,  password);
});


// botón "Home"
document.getElementById('btn-home').addEventListener('click', function(event) {
  event.preventDefault(); 
  window.location.href = 'http://localhost:8080';
});

document.getElementById('btn-register').addEventListener('click', function(event) {
  event.preventDefault(); 
  window.location.href = '/register';
});

  


