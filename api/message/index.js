module.exports = async function (context, req) {
    const { method } = req.method;
    switch (method) {
        case 'GET':
            await getCars(context);
            break;
        case 'POST':
            await addCar(context, req.body);
            break;
        case 'PUT':
            await updateCar(context, req.params.id, req.body);
            break;
        case 'DELETE':
            await deleteCar(context, req.params.id);
            break;
        default:
            context.res = {
                status: 405,
                body: 'Method Not Allowed'
            };
            break;
    }
};

const cars = require('./cars.json');

async function getCars(context) {
    context.res = {
        body: cars
    };
}

async function addCar(context, newCar) {
    cars.push(newCar);
    context.res = {
        body: newCar
    };
}

async function updateCar(context, id, updatedCar) {
    const index = cars.findIndex(car => car.id === id);
    if (index !== -1) {
        cars[index] = updatedCar;
        context.res = {
            body: updatedCar
        };
    } else {
        context.res = {
            status: 404,
            body: 'Car not found'
        };
    }
}

async function deleteCar(context, id) {
    const index = cars.findIndex(car => car.id === id);
    if (index !== -1) {
        cars.splice(index, 1);
        context.res = {
            body: { message: `Car with id ${id} deleted` }
        };
    } else {
        context.res = {
            status: 404,
            body: 'Car not found'
        };
    }
}
