const db = require("./client");
const { createUser } = require("./users");

const users = [
  {
    firstname: "Emily",
    lastname: "Johnson",
    email: "emily@example.com",
    password: "securepass",
    address: "123 S Apple Dr",
    city: "Provo",
    state: "Utah",
    zip: 12345,
  },
  {
    firstname: "Liu",
    lastname: "Wei",
    email: "liu@example.com",
    password: "strongpass",
    address: "123 S Apple Dr",
    city: "Provo",
    state: "Utah",
    zip: 12345,
  },
  {
    firstname: "Isabella",
    lastname: "García",
    email: "bella@example.com",
    password: "pass1234",
    address: "123 S Apple Dr",
    city: "Provo",
    state: "Utah",
    zip: 12345,
  },
  {
    firstname: "Mohammed",
    lastname: "Ahmed",
    email: "mohammed@example.com",
    password: "mysecretpassword",
    address: "123 S Apple Dr",
    city: "Provo",
    state: "Utah",
    zip: 12345,
  },
  {
    firstname: "John",
    lastname: "Smith",
    email: "john@example.com",
    password: "password123",
    address: "123 S Apple Dr",
    city: "Provo",
    state: "Utah",
    zip: 12345,
  },
];

const dropTables = async () => {
  try {
    await db.query(`
        DROP TABLE IF EXISTS users ;
        DROP TABLE IF EXISTS icecream;
        DROP TABLE IF EXISTS orders ;
        DROP TABLE IF EXISTS orders_products ;
        DROP TABLE IF EXISTS cart ;
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
          firstname TEXT,
          lastname TEXT,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          address TEXT,
          city TEXT,
          state TEXT,
          zip INTEGER
        )`);

    await db.query(`
        CREATE TABLE icecream(
          id SERIAL PRIMARY KEY,
          flavor TEXT,
          brand TEXT,
          price DECIMAL(5, 2),
          size TEXT,
          imageUrl TEXT,
          nutrition TEXT
        )`);

    await db.query(`
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          total_price DECIMAL(10, 2),
          status TEXT
        )`);

    await db.query(`
        CREATE TABLE orders_products(
          order_id INTEGER REFERENCES orders(id),
          icecream_id INTEGER REFERENCES icecream(id),
          quantity INTEGER,
          PRIMARY KEY(order_id, icecream_id)
        )`);

    await db.query(`
        CREATE TABLE cart(
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          icecream_id INTEGER REFERENCES icecream(id),
          quantity INTEGER DEFAULT 1
        )`);
  } catch (err) {
    throw err;
  }
};

const addIceCreams = async () => {
  try {
    await db.query(`
      INSERT INTO icecream(flavor, brand, price, size, imageUrl, nutrition)
      VALUES 
        ('Oregon Strawberry', 'Tillamook', 5.32, '48 oz.', 'https://images.ctfassets.net/j8tkpy1gjhi5/7f03zWMMpf29F6zH5phUjj/e2057a368cffd22f034acbfcf5dccf07/BR22_48oz_Carton_OregonStrawberry_Rndr_FNL.png', 'https://i5.walmartimages.com/asr/ab80c04c-b13c-416f-8997-d2eb40308e9b.6ee4d8521470e2986ddba9379167242d.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'),
        ('Peaches & Cream', 'Tillamook', 5.32, '48 oz.', 'https://target.scene7.com/is/image/Target/GUEST_2f22b7ee-52b8-4686-a71a-6ea8dedda39a?wid=488&hei=488&fmt=pjpeg', 'https://i5.walmartimages.com/asr/faf76c76-2469-4ea5-9f06-a84ca861f65d.f1286b4a50d72cd3b642c2acb5bdbcb1.jpeg?odnHeight=768&odnWidth=768&odnWidth=768&odnBg=FFFFFF'),
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
      await createUser(user);
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const seedDatabase = async () => {
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

seedDatabase();
