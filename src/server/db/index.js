const db = require("./client");

async function getAllIceCream() {
  const { rows } = await db.query(` SELECT * FROM iceCream`);
  return rows;
}

async function getSinlgeIceCream(id) {
  const { rows } = await db.query(
    `
    SELECT * FROM iceCream
    WHERE id = $1
    `,
    [id]
  );

  return rows[0];
}

async function addFlavor(flavor) {
  const { rows } = await db.query(
    `
    INSERT INTO icecream (flavor, brand, price, size, "imageUrl", nutrition)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `,
    [
      flavor.flavor,
      flavor.brand,
      flavor.price,
      flavor.size,
      flavor.imageUrl,
      flavor.nutrition,
    ]
  );
  return rows;
}

module.exports = { getAllIceCream, getSinlgeIceCream, addFlavor };
