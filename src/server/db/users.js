const db = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createUser = async ({
  firstname,
  lastname,
  email,
  password,
  address,
  city,
  state,
  zip,
}) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        INSERT INTO users(firstname, lastname, email, password, address, city, state, zip)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`,
      [firstname, lastname, email, hashedPassword, address, city, state, zip]
    );

    return user;
  } catch (err) {
    throw err;
  }
};

const getUser = async ({ email, password }) => {
  if (!email || !password) {
    return;
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        SELECT * 
        FROM users
        WHERE email=$1;`,
      [email]
    );

    if (!user) {
      return;
    }
    return user;
  } catch (err) {
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    const { rows } = await db.query(
      `SELECT * 
      FROM users`
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, updatedInfo) => {
  // Prepare the SQL query and parameters
  const { firstname, lastname, email, password, address, city, state, zip } =
    updatedInfo;
  const query = `
     UPDATE users
     SET firstname = COALESCE($1, firstname),
         lastname = COALESCE($2, lastname),
         email = COALESCE($3, email),
         password = COALESCE($4, password),
         address = COALESCE($5, address),
         city = COALESCE($6, city),
         state = COALESCE($7, state),
         zip = COALESCE($8, zip)
     WHERE id = $9
     RETURNING *`;
  const params = [
    firstname,
    lastname,
    email,
    password,
    address,
    city,
    state,
    zip,
    userId,
  ];

  // Hash the password if it's provided
  if (password) {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    params[3] = hashedPassword; // Replace the plain text password with the hashed one
  }

  try {
    const {
      rows: [user],
    } = await db.query(query, params);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  getUser,
  getUserByEmail,
  getAllUsers,
  updateUser,
};
