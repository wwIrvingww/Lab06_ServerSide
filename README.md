# Lab06_ServerSide

This project is a backend server for blog management, using Node.js, Express, and MySQL. It provides endpoints to get all blogs, get a blog by its ID, create a new blog, edit an existing blog, and delete a blog.

## Repository Contents

- `index.js`: Main file containing the Express server configuration and endpoint definitions.
- `db.js`: Module handling database operations, including connection and CRUD functions for blogs.
- `connection.js`: Module establishing the connection to the MySQL database.
- `schema.sql`: SQL file defining the database structure and creating a user with privileges.
- `Dockerfile`: Configuration to build a Docker image with MySQL and the database schema.
- `.eslintrc.cjs`: ESLint configuration with rules specific to the Node.js environment.
- `.gitignore`: File specifying which files and folders should be ignored when tracking with Git.
- `package.json`: Node.js configuration file specifying project dependencies and scripts.

## Installation

1. Clone the repository: `git clone https://github.com/wwIrvingww/Lab06_ServerSide.git`
2. Install dependencies: `npm install`

## Database Setup (Docker)

1. Build the Docker image: `docker build -t blog_db .`
2. Run the container: `docker run -p 33068:3306 --name blog_db_container -d blog_db`

## Usage

1. Start the server: `npm start`
2. Access `http://localhost:3000` in your browser or use tools like Postman to test the endpoints.

## Endpoints

- `GET /blogs`: Get all blogs.
- `GET /blogs/:id`: Get a blog by its ID.
- `POST /blogs`: Create a new blog.
- `PUT /blogs/:id`: Edit an existing blog.
- `DELETE /blogs/:id`: Delete a blog by its ID.

## Contributions

Contributions are welcome! If you find any issues or have suggestions, please [open an issue](https://github.com/wwIrvingww/Lab06_ServerSide/issues) or submit a pull request.

## License

This project is under the ISC License - [View details](https://opensource.org/licenses/ISC).

## Contact

- Author: Irving Acosta
- Email: [your@email.com](mor22781@uvg.edu.gt)
