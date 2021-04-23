// REGISTER Function
function register() {

    // Henter HTML data
    let usernameRegister = document.getElementById('username');
    let emailRegister = document.getElementById('email');
    let passwordRegister = document.getElementById('password');

    let registerData = {
        username: usernameRegister.value,
        email: emailRegister.value,
        password: passwordRegister.value
    }
    
    // POST REQUEST til localhost
    fetch('http://localhost:7071/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    }).then(res => res.json()).then(data => {
        console.log(data)
        alert("Welcome to GIT-LAID")
    }).catch((err) =>{
        console.error("Error:", err);
    });
};
