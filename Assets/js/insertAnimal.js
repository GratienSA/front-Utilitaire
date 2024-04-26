let category = document.querySelector('.category')
let box = document.querySelector('.box')
let client = document.querySelector('.client')

async function fetchDatas() {
    client.innerHTML = ''
    let clients = await fetch('http://localhost:3111/user/all')
    let clientsList = await clients.json()

    if (clientsList.result) {
        clientsList.result.forEach((element) => {
            client.innerHTML += `<option value=${element.id_client}>${element.name_client}</option>`
        })
    }

    let categories = await fetch('http://localhost:3111/category/all')
    let categoriesList = await categories.json()

    if (categoriesList.result) {
        categoriesList.result.forEach((element) => {
            category.innerHTML += `<option value=${element.id_animal_category}>${element.name_category}</option>`
        })
    }

    let boxs = await fetch('http://localhost:3111/box/all')
    let boxesList = await boxs.json()

    if (boxesList.result) {
        boxesList.result.forEach((element) => {
            box.innerHTML += `<option value=${element.id_box}>${element.name_box}</option>`
        })
    }
}

// let boxs = await fetch('http://localhost:3111/box/all')
// let categories = await fetch('http://localhost:3111/categories/all')

fetchDatas()

async function insertAnimal() {
    let image = document.querySelector('.image')
    let name = document.querySelector('.name').value

    let arrival = document.querySelector('.arrival').value
    let departure = document.querySelector('.departure').value

    const formData = new FormData()

    formData.append('image', image.files[0])

    const response = await fetch(
        'http://localhost:3111/animal/insert/picture',
        {
            method: 'POST',
            body: formData,
        }
    )
    let data = await response.json()

    if (response.status === 200) {
        let uploadedImage = data.newFileName

        let animal = {
            name: name,
            arrival: new Date(arrival),
            departure: new Date(departure),
            category: category.value,
            client: client.value,
            box: box.value,
            image: uploadedImage,
        }

        let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(animal),
        }

        const response = await fetch(
            'http://localhost:3111/animal/insert/',
            request
        ).then((res) => {
            if (res.status === 200) {
                alert('inserted')
            }
        })
    }
}
