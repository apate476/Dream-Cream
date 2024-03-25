const db = require("./client");

async function addToCart(userId, icecreamId) {
  try {
    // -Check if the item already exists in the cart-
    const existingItem = await db.query(
      `
            SELECT * FROM cart
            WHERE user_id = $1 AND icecream_id = $2;
        `,
      [userId, icecreamId]
    );

    if (existingItem.rows.length > 0) {
      // -If the item exists, update its quantity-
      await db.query(
        `
                UPDATE cart
                SET quantity = quantity + 1
                WHERE user_id = $1 AND icecream_id = $2;
            `,
        [userId, icecreamId]
      );
    } else {
      // -If the item doesn't exist, insert it into the cart-
      await db.query(
        `
                INSERT INTO cart (user_id, icecream_id)
                VALUES ($1, $2);
            `,
        [userId, icecreamId]
      );
    }

    return { success: true };
  } catch (error) {
    throw error;
  }
}

async function removeFromCart(userId, icecreamId) {
  try {
    // -Remove the item from the cart-
    await db.query(
      `
            DELETE FROM cart
            WHERE user_id = $1 AND icecream_id = $2;
        `,
      [userId, icecreamId]
    );

    return { success: true };
  } catch (error) {
    throw error;
  }
}

async function getCartItemsByUserId(userId) {
  try {
    const { rows } = await db.query(
      `
            SELECT * 
            FROM cart
            WHERE user_id=$1;`,
      [userId]
    );

    return rows;
  } catch (err) {
    throw err;
  }
}

async function clearCart(userId) {
  try {
    // -Clear all items from the user's cart-
    await db.query(
      `
            DELETE FROM cart
            WHERE user_id = $1;
        `,
      [userId]
    );

    return { success: true };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addToCart,
  removeFromCart,
  getCartItemsByUserId,
  clearCart,
};
