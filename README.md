# StarWoks

## ¿Que es StarWoks?

StarWoks es una WebApp de recetas dirigida a aquellas personas que les gusta cocinar pero no siempre tienen una buena idea sobre que hacer. Se le brindara a los usuarios la posibilidad de crear, editar y eliminar sus propias recetas, ademas de contar con una logica de busqueda de recetas mediante distintos tipos de filtros.

## Casos de uso:

### Registro

- Los visitantes de la pagina tendran la opción de registrarse brindando solo algunos datos (nombre, apellido, email, telefono y una contraseña). Un usuario no podra registrarse si ya existe una cuenta con el mail ingresado. Una vez realizado el registro, el usuario sera logueado automaticamente para ya poder usar la pagina al 100%. Ademas tambien existirá una seleccion obligatoria de una pregunta secreta junto a una respuesta para poder restaurar la contraseña.

### Login

- En caso de que seamos un usuario ya registrado, podremos ingresar a nuestra cuenta unicamente indicando el mail con el que nos registramos y la contraseña. En caso de que el usuario olvide su contraseña, podra hacer click sobre la opcion "olvidaste tu contraseña?" el cual lo redirigira a una pantalla donde indicando la respuesta a una pregunta secreta elegida a la hora de registrarse, tendran la opcion de actualizar la contraseña

### Perfil

- En el perfil se podra visualizar los datos del usuario, dando la posibilidad de editar el nombre, apellido, telefono y la contraseña.

### Busqueda de recetas

- Los visitantes de la WebApp podran buscar sus recetas favoritas, teniendo la posibilidad de filtrar por: Categoria, Ingredientes, Dificultad y Calificacion

### Funcionalidades solo para usuarios

- Crear recetas: El usuario registrado podra crear recetas indicando titulo, ingredientes, dificultad, categorias, procedimiento y ademas adjuntar una imagen de la receta.

- Modificar recetas: El usuario registrado podra modificar todos los datos de la receta mncionados en el punto anterior asi tambien como el estado en el que se encuentra (Activo: visible para todos los visitantes de la pagina. Borrador: visible unicamente para el usuario creador de la receta)

- Eliminar recetas: El usuario registrado podra eliminar las recetas creadas por el mismo

- Calificar: El usuario registrado podra calificar recetas de otros usuarios en base a sus gustos personales, pudiendo otorgar una calificacion entre 1 y 5 estrellas.

# Pre-requisitos:

## Sistema Operativo:

La aplicacion puede ser ejecutada en los sistemas operativos de : Microsoft, macOS y Linux.

## Frameworks utilizados:

- ReactJs
- NodeJs
- Express

## Conocimiento

Se solicita tener un entendimiento basico de los frameworks mencionados anteriormente para poder seguir con el desarrollo de la WebApp de forma mas organica y tener un conocimiento tecnico acorde a las tecnologias utilizadas. Tambien se requiere un manejo de base de datos relacional para poder realizar consultas a la base de datos sin problemas

# Instalacion.

## Repositorios:

El Frontend y el Backend se encuentran en 2 diferentes repositorios de GitHub

### Frontend:

[Backend](https://github.com/gabrielpicc/recetas_back)

### Backend:

[Frontend](https://github.com/gabrielpicc/PaginaRecetas)

## Comandos

Se deberan ejecutar los siguientes comandos tanto para el Backend como el Frontend desde la carpeta raiz del proyecto

### 1) instalar todas las librerias necesarias.

```
> npm install --legacy-peer-deps
```

### 2) Levantar el servidor de manera loccal.

```
> npm start
```

## Seteo de configuraciones - Variables de entorno.

### Base de datos relacional:

dentro de la carpeta `config` se encuentra el archivo `config.json` el cual contiene las variables necesarias para realizar la conexion a la base de datos.
Se debera completar con los siguientes datos:

```
"username": "root",
"password": "********",
"database": "webrecetas",
"host": "127.0.0.1",
"dialect": "mysql",
"operatorsAliases": false
```

### Repositorio externo para almacenar imagenes.

Dentro del ImageController se encuentran las credenciales a cloudinary 

```
cloudinary.config({
    cloud_name: 'matumolise',
    api_key: '459727726443978',
    api_secret: '********'
});
```
