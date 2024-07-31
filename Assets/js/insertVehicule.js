
async function insertVehicle() {
    let image = document.querySelector('.Vimage1');
    let title = document.querySelector('.VehiclesTitle').value;
    let brand = document.querySelector('.VehiclesBrand').value;
    let overview = document.querySelector('.VehiclesOverview').value;
    let pricePerDay = document.querySelector('.PricePerDay').value;
    let fuelType = document.querySelector('.FuelType').value;
    let modelYear = document.querySelector('.ModelYear').value;
    let seatingCapacity = document.querySelector('.SeatingCapacity').value;

    const formData = new FormData()

    formData.append('image', image.files[0])

    const response = await fetch('http://localhost:3400/utilitaire/add', {
        method: 'POST',
        body: formData,
    });
    let data = await response.json()
    if (response.status === 200) {
        let uploadedImage = data.newFileName
        let vehicle = {
            
            VehiclesTitle: title,
            VehiclesBrand: parseInt(brand),
            VehiclesOverview: overview,
            PricePerDay: parseInt(pricePerDay),
            FuelType: fuelType,
            ModelYear: parseInt(modelYear),
            SeatingCapacity: parseInt(seatingCapacity),
            Vimage1: uploadedImage,
            
        }

        let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(vehicle),
        }

        const response = await fetch(
            'http://localhost:3400/utilitaire/insert/picture',
            request
        ).then((res) => {
            if (res.status === 200) {
                alert('Vehicle inserted successfully')
            }
        })
    }
}
