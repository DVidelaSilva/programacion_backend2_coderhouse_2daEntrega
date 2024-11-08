
function registerUser(firstName, lastName, email, age, password) {

  if (!firstName || !lastName || !email || !password) {
    alert('Por favor, complete todos los campos requeridos.')
    return
  }
    // Datos a enviar
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };
  
    // Valida la edad opcionl
    if (age) {
      userData.age = age
    }
  
    // Fetch
    fetch('http://localhost:8080/api/sessions/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      if (data.status === 'success') {  
        window.location.href = 'http://localhost:8080/registerOK'
      } else {
        alert('Error al registrar el usuario: ' + data.message)
      }
    })
    .catch(error => {
      console.error('Error:', error)
    });
}
  


// envío del formulario
document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault()

  const firstName = document.getElementById('first_name').value
  const lastName = document.getElementById('last_name').value
  const email = document.getElementById('email').value
  const age = document.getElementById('age').value
  const password = document.getElementById('password').value

  registerUser(firstName, lastName, email, age, password);
});


// botón "Home"
document.getElementById('btn-home').addEventListener('click', function(event) {
  event.preventDefault(); 
  window.location.href = 'http://localhost:8080';
});