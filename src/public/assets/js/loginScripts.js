
function loginUser(email, password) {

    // datos a enviar
    const userData = {
      email: email,
      password: password,
    };
  
    // Fetch
    fetch('http://localhost:8080/api/sessions/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      if (data.status === 'success' && data.role === 'user') {  
        window.location.href = 'http://localhost:8080/api/sessions/currentUser';
      } else if (data.status === 'success' && data.role === 'user-premium') { 
        window.location.href = 'http://localhost:8080/api/sessions/currentUserPremium';
      } else if (data.status === 'success' && data.role === 'admin') { 
        window.location.href = 'http://localhost:8080/api/sessions/currentAdmin';
      }     
      else {
        alert('Error al registrar el usuario: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
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


  

