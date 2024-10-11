# Dream Cream 🍦

Delight in the timeless journey of flavors with Dream Cream, an e-commerce platform where every scoop is a celebration of creamy indulgence. This full-stack web application allows users to browse, search, and order premium ice cream flavors. It is designed using the PERN stack (PostgreSQL, Express.js, React.js, Node.js) and includes various features for efficient user and product management.

## Description

Dream Cream is a premium online ice cream shop offering a diverse range of flavors, from classic favorites to innovative new creations. Each pint is crafted from locally-sourced ingredients, ensuring quality and sustainability. Customers can easily browse the selection, place orders, and enjoy a seamless e-commerce experience.

## Wireframe and Database Outline

- **Wireframe**: Visual representation of the Dream Cream user interface. Check it out [here](https://excalidraw.com/#json=ysov1p9sgKu2cWSqh1u7A,4Kwr1mEaz8279ARH0HXRSw).
- **Tables Outline**: Database schema detailing the structure of the application's database. View it [here](https://dbdiagram.io/d/Ice-Cream-Store-65f1e8f0b1f3d4062cdabfe1).

## Technologies Used

- **PostgreSQL**: Database for storing user, product, and order information.
- **Express.js**: Backend framework used for routing and handling API requests.
- **React.js**: Frontend framework used for building a dynamic and responsive user interface.
- **Node.js**: Backend JavaScript runtime environment used for building the server.

## Setup

To set up the project on your local machine, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/apate476/dream-cream.git
    ```
2. Navigate into the project directory:
    ```bash
    cd dream-cream
    ```
3. Create a `.env` file in the root directory and add your JWT secret:
    ```
    JWT_SECRET=your_password_here
    ```

4. Install all dependencies:
    ```bash
    npm install
    ```

5. Create the database:
    ```bash
    createdb capstoneData
    ```

6. Seed the database:
    ```bash
    npm run seed
    ```

7. Start the development server:
    ```bash
    npm run dev
    ```

8. Open your browser and go to `http://localhost:3000` to interact with the application.

## How to Use

1. **Browsing Products**: Users can browse the wide range of ice cream flavors displayed in an interactive and visually appealing format.
2. **Search Functionality**: Easily search for ice cream flavors by category or keyword.
3. **Placing an Order**: Users can add items to their cart and securely place orders online.
4. **Admin Features**: Admins have the ability to add, edit, and remove products from the platform.

## Development Workflow

When working on the project, follow this workflow:

1. **Pull the latest changes**:
    ```bash
    git pull origin main
    ```
2. **Create/move to your branch**:
    ```bash
    git checkout -b {branch-name}
    ```
3. **Before pushing changes**, ensure you're on your branch:
    ```bash
    git status
    ```
4. After making changes, commit and push:
    ```bash
    git push origin {branch-name}
    ```
5. **After a successful push and merge**, always run:
    ```bash
    git pull origin main
    ```

Following these steps will help minimize conflicts and ensure smooth collaboration among team members.
