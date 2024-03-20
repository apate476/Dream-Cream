const db = require('./client');

const isLoggedIn = (req) => {
    return !!req.user;
  };

async function addToCart(userId, icecreamId) {
    try {
        
        const existingItem = await db.query(`
            SELECT * FROM cart
            WHERE user_id = $1 AND icecream_id = $2;
        `, [userId, icecreamId]);

        if (existingItem.rows.length > 0) {
            
            await db.query(`
                UPDATE cart
                SET quantity = quantity + 1
                WHERE user_id = $1 AND icecream_id = $2;
            `, [userId, icecreamId]);
        } else {
            
            await db.query(`
                INSERT INTO cart (user_id, icecream_id)
                VALUES ($1, $2);
            `, [userId, icecreamId]);
        }

        return { success: true };
    } catch (error) {
        throw error;
    }
}

async function removeFromCart(userId, icecreamId) {
    try {
        
        await db.query(`
            DELETE FROM cart
            WHERE user_id = $1 AND icecream_id = $2;
        `, [userId, icecreamId]);

        return { success: true };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    isLoggedIn,
    addToCart,
    removeFromCart
};
