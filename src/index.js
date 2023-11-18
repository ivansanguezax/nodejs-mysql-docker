// Importa la función config desde el paquete dotenv para cargar variables de entorno desde un archivo .env
import { config } from "dotenv";
// Importa el framework Express para construir la aplicación web
import express from "express";
// Importa la función createPool desde el paquete mysql2/promise para gestionar conexiones a la base de datos MySQL
import { createPool } from "mysql2/promise";

// Carga las variables de entorno desde el archivo .env
config();

// Crea una instancia de la aplicación Express
const app = express();

// Imprime en la consola las variables de entorno relacionadas con la base de datos MySQL
console.log({
  host: process.env.MYSQLDB_HOST,
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_PASSWORD,
  port: process.env.MYSQLDB_PORT,
});

// Crea un pool de conexiones a la base de datos MySQL utilizando las variables de entorno
const pool = createPool({
  host: process.env.MYSQLDB_HOST,
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_PASSWORD,
  port: process.env.MYSQLDB_DOCKER_PORT,
});

// Ruta principal que devuelve un mensaje de saludo "Hello World"
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Ruta "/ping" que realiza una consulta a la base de datos y devuelve la respuesta en formato JSON
app.get("/ping", async (req, res) => {
  try {
    // Realiza una consulta a la base de datos para obtener la fecha y hora actual
    const result = await pool.query('SELECT NOW()');
    // Envía la respuesta en formato JSON con la fecha y hora obtenida de la base de datos
    res.json(result[0]);
  } catch (error) {
    // En caso de error, imprime el mensaje de error en la consola y devuelve un error 500 al cliente
    console.error("Error executing query:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Puerto en el que la aplicación escuchará las solicitudes, utiliza el valor de NODE_DOCKER_PORT si está definido, de lo contrario, utiliza el puerto 3000
const PORT = process.env.NODE_DOCKER_PORT || 3000;

// Inicia el servidor y escucha en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
