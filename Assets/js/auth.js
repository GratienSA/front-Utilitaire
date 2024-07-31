// Fonction pour gérer l'inscription de l'utilisateur
async function handleRegister() {
    // Récupération des valeurs des champs du formulaire
    let EmailId = document.querySelector('.email').value;
    let Password = document.querySelector('.password').value;
    let FullName = document.querySelector('.FullName').value;
    let ContactNo = document.querySelector('.ContactNo').value; 
    let dob = document.querySelector('.dob').value;
    let Address = document.querySelector('.Address').value;
    let City = document.querySelector('.City').value;
    let Country = document.querySelector('.Country').value;

     // Création de l'objet utilisateur avec les données du formulaire
     let user = {
        email: EmailId,
        password: Password,
        FullName: FullName,
        
        ContactNo: ContactNo,
        dob: dob,
        Address: Address,
        City: City,
        Country: Country,
        
    }

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(user),
    }

    let apiRequest = fetch('http://localhost:3400/user/register', request)
    let response = await apiRequest
    console.log(response)
    if (response.status === 200) {
        window.location.href = './login.html'
    } else {
        alert('Mauvais identifiants')
    }
}

async function handleLogin() {
    let email = document.querySelector('.email').value
    let password = document.querySelector('.password').value

    let user = {
        identifier: email,
        password: password,
    }

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(user),
    }

    let apiRequest = fetch('http://localhost:3400/user/login', request)
    let response = await apiRequest
    let data = await response.json()
    console.log(data,response)
    if (response.status === 200) {
        let jwt = data.jwt
        let role = data.role
        window.localStorage.setItem('jwt', jwt)
        console.log(role)
        if (role === 'admin') {
            window.location.href = '../../Views/admin/admin.html'
        } else {
            window.location.href = '../../Views/user/user.html'
        }
    } else {
        alert('Mauvais identifiants')
    }
}
