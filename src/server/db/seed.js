const db = require("./client");
const { createUser } = require("./users");

const users = [
  {
    name: "Emily Johnson",
    email: "emily@example.com",
    password: "securepass",
  },
  {
    name: "Liu Wei",
    email: "liu@example.com",
    password: "strongpass",
  },
  {
    name: "Isabella García",
    email: "bella@example.com",
    password: "pass1234",
  },
  {
    name: "Mohammed Ahmed",
    email: "mohammed@example.com",
    password: "mysecretpassword",
  },
  {
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
  },
  // Add more user objects as needed
];

const dropTables = async () => {
  try {
    await db.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS icecream;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS orders_products;
        `);
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )`);

    await db.query(`

          CREATE TABLE iceCream(
            id SERIAL PRIMARY KEY,
            flavor TEXT,
            brand TEXT,
            price DECIMAL(2),
            size TEXT,
            "imageUrl" TEXT,
           nutrition TEXT
          )
        `);

    await db.query(`
          CREATE TABLE orders(
            id SERIAL PRIMARY KEY,
            userId INTEGER,
            orderId INTEGER,
            orderDate DATE,
            shippingAddress TEXT,
            status TEXT
          )
    `);

    await db.query(`
          CREATE TABLE orders_products(
            orderId INTEGER,
            productId INTEGER,
            quantity INTEGER
          )
    `);
  } catch (err) {
    throw err;
  }
};

const addIceCreams = async () => {
  try {
    await db.query(`
      INSERT INTO iceCream(flavor, brand, price, size, "imageUrl", nutrition)
      VALUES ('Oregon Strawberry', 'Tillamook', 5.32, '48 oz.', 'https://images.ctfassets.net/j8tkpy1gjhi5/7f03zWMMpf29F6zH5phUjj/e2057a368cffd22f034acbfcf5dccf07/BR22_48oz_Carton_OregonStrawberry_Rndr_FNL.png', 'https://i5.walmartimages.com/asr/ab80c04c-b13c-416f-8997-d2eb40308e9b.6ee4d8521470e2986ddba9379167242d.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'),
      ('Peaches & Cream', 'Tillamook', 5.32, '48 oz.', 'https://target.scene7.com/is/image/Target/GUEST_2f22b7ee-52b8-4686-a71a-6ea8dedda39a?wid=488&hei=488&fmt=pjpeg', 'https://i5.walmartimages.com/asr/faf76c76-2469-4ea5-9f06-a84ca861f65d.f1286b4a50d72cd3b642c2acb5bdbcb1.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'),
      ('Bunny Tracks', 'Blue Bunny', 7.89, '46 oz.', 'https://target.scene7.com/is/image/Target/GUEST_0e4d7874-0d0a-4a10-bd96-b8300e211957?wid=488&hei=488&fmt=pjpeg', 'https://www.kroger.com/product/images/large/back/0007064001237'),
      ('Chocolate', 'Bryers', 5.14, '48 oz.', 'https://i5.walmartimages.com/seo/Breyers-Chocolate-Ice-Cream-48-oz_183c293a-34f9-413d-8ab8-9d91b92ef4be.89ec111b4a3e50eda7666415f5bc007b.jpeg', 'https://assets.wakefern.com/is/image/wakefern/7756725420-577?$Mi9Product_detail$')
    `);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const seedDatabse = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await addIceCreams();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabse();