const API_URL = 'http://localhost:5000/api';

document.getElementById('loginBtn').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            document.getElementById('auth').style.display = 'none';
            document.getElementById('carForm').style.display = 'block';
            loadCars();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Failed to login. Please try again.');
    }
});

document.getElementById('registerBtn').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('User registered successfully!');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('Failed to register. Please try again.');
    }
});

document.getElementById('addCarBtn').addEventListener('click', async () => {
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You must be logged in to add a car.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/cars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ make, model, year, price, description }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Car added successfully!');
            loadCars();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Add car error:', error);
        alert('Failed to add car. Please try again.');
    }
});

async function loadCars() {
    try {
        const response = await fetch(`${API_URL}/cars`);
        const cars = await response.json();
        const carList = document.getElementById('cars');

        carList.innerHTML = '';

        cars.forEach(car => {
            const li = document.createElement('li');
            li.textContent = `${car.make} ${car.model} (${car.year}) - $${car.price}`;
            carList.appendChild(li);
        });
    } catch (error) {
        console.error('Load cars error:', error);
        alert('Failed to load cars.');
    }
}

// Load cars on page load
loadCars();
