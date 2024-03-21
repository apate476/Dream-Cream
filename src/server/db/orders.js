const db = require('./client');

// -Function to create a new order-
async function createOrder(userId, totalPrice, status) {
    try {
        const query = `
            INSERT INTO orders (user_id, total_price, status)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [userId, totalPrice, status]);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

// -Function to add products to an order-
async function addProductsToOrder(orderId, icecreamId, quantity) {
    try {
        const query = `
            INSERT INTO orders_products (order_id, icecream_id, quantity)
            VALUES ($1, $2, $3);
        `;
        await db.query(query, [orderId, icecreamId, quantity]);
    } catch (error) {
        throw error;
    }
}

// -Function to get orders by user ID-
async function getOrdersByUserId(userId) {
    try {
        const query = `
            SELECT * FROM orders
            WHERE user_id = $1;
        `;
        const { rows } = await db.query(query, [userId]);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createOrder,
    addProductsToOrder,
    getOrdersByUserId
};
