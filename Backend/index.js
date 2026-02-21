const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is working!');
});

app.get('/meals', (req, res) => {
    const meals = [
        { id: 1, name: "Mac & Cheese", price: 8.99, description: "Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with cripsy breadcrumbs. A classic comfort food.", image: "mac-and-cheese.jpg"},
        { id: 2, name: "Margherita Pizza", price: 12.99, description: "A classic pizza with fresh mozzarella, tomatoes, and basil on a thin and crispy crust.", image: "margherita-pizza.jpg"},
        { id: 3, name: "Caesar Salad", price: 7.99, description: "Romaine lettuce tossed in Caeser dressing, topped with croutons and parmesan shawlings.", image: "caesar-salad.jpg"},
        { id: 4, name: "Spaghetti Carbonara", price: 10.99, description: "Al dente spaghetti with a creamy sauce made from egg yolk, pecerino cheese.", image: "spaghetti-carbonara.jpg"},
        { id: 5, name: "Veggie Burger", price: 9.99, description: "A juicy veggie patty served on a whole grain bun with lettuce tomato, and a tangy.", image: "veggie-burger.jpg"},
        { id: 6, name: "Grilled Chicken Sandwich", price: 10.99, description: "Tender grilled chicken breast with avocado, bacon, lettuce, and honey mustard on a.", image: "grilled-chicken-sandwich.jpg"},
        { id: 7, name: "Steak Frites", price: 17.99, description: "Succulent steak cooked to your preference, served with crispy golden fries and herb butter.", image: "steak-frites.jpg"},
        { id: 8, name: "Sushi Roll Platter", price: 15.99, description: "An assortment of fresh sushi rolls including California Spicy Tuna, and Eel Avocado.", image: "sushi-roll-platter.jpg"},
        { id: 9, name: "Chicken Curry", price: 13.99, description: "Tender pieces of chicken simmered in a rich and aromatic curry sauce, served with basmati rice.", image: "chicken-curry.jpg"},
        { id: 10, name: "Vegan Buddha Bowl", price: 11.99, description: "A hearty bowl filled with quinea, roasted veggies, avocado, and a tahini dressing.", image: "vegan-buddha-bowl.jpg"},
        { id: 11, name: "Seafood Paella", price: 19.99, description: "A Spanish delicacy filled with saffron-infused rice, shrimp, mussels, and cherizo.", image: "seafood-paella.jpg"},
        { id: 12, name: "Pancake Stack", price: 9.99, description: "Fluffy pancakes stacked high, drizzled with maple syrup and topped with fresh berries.", image: "pancake-stack.jpg"}

    ];
    res.json(meals);
});

app.post('/orders', async (req, res) => {
    console.log('Incoming order:', req.body)
    const orderData = req.body.order;

    await new Promise ((resolve) => setTimeout(resolve, 1000));

    if (
        !orderData ||
        !orderData.items ||
        orderData.items.length === 0 ||
        !orderData.customer ||
        !orderData.customer.email ||
        !orderData.customer.email.includes('@') ||
        !orderData.customer.name ||
        orderData.customer.name.trim() === '' ||
        !orderData.customer.street ||
        orderData.customer.street.trim() === '' ||
        !orderData.customer['postal-code'] ||
        orderData.customer['postal-code'].trim() === '' ||
        !orderData.customer.city ||
        orderData.customer.city.trim() === ''
    ) {
        return res.status(400).json({
            message: 'Missing or invalid order data.'
        });
    }

    const filePath = path.join(__dirname, 'orders.json');

    let existingOrders = [];

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath);
        existingOrders = JSON.parse(fileData);
    }

    existingOrders.push(orderData);

    fs.writeFileSync(filePath, JSON.stringify(existingOrders, null, 2));

    res.status(201).json({ message: 'Order saved successfully!' });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});