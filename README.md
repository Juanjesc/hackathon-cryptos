# Proyecto

![image](https://user-images.githubusercontent.com/89318618/231607935-f3f7807a-0830-45dc-a1d2-22f8331e09a4.png)
- El puerto usado en el back en LocalHost es el 9000
# Login
![image](https://user-images.githubusercontent.com/89318618/231608407-ea149d2c-1bd4-479e-a0fd-9b5630d4ea3c.png)
## Endpoints
- http://localhost:9000/api/users/login --> Encargado de recibir mediante **POST** el usuario y contraseña del formulario de login, para retornar un id de usuario, si la respuesta devuelve algo, ha encontrado un usuario y nos loguea, si la respuesta retorna null, usuario incorrecto y redirige al login.
- http://localhost:9000/api/users/add --> Encargado de Registrar nuevos usuarios a la base de datos
# Dashboard
![image](https://user-images.githubusercontent.com/89318618/231609938-7cb377e6-1c63-4005-8f99-cd88c09e5756.png)
## Endpoints

**Users**

- http://localhost:9000/api/users/get/:userId --> Devolver un usuario pasándole un id usuario por parámetro (no se usa)
- http://localhost:9000/api/users/all --> Devolver todos los usuarios (no se usa)
- http://localhost:9000/api/users/get/infoUser/:id --> Nos devuelve únicamente el depósito y el nombre de un usuario, encargado de mostrar dichos datos en la cabecera de la aplicación
- http://localhost:9000/api/users/update/deposit --> Es un **POST** Encargado de actualizar el depósito de un usuario cuando realiza la compra/venta de una cryptomoneda.

**Cryptomonedas**

- http://localhost:9000/api/cryptomonedas/all --> Encargado de devolvernos todas las cryptomonedas y pintarlas en la tabla del dashboard
- http://localhost:9000/api/cryptomonedas/get/:asset --> Encargado de devolvernos el id de una crytomoneda pasándole por parámetros el asset de la cryptomoneda (no se usa)
- http://localhost:9000/api/cryptomonedas/update/stock --> Es un **POST** Encargado de actualizar el stock de una cryptomoneda, recibe por el body los parámetros cryptostock y cryptoId

**CryptoUser** 

- http://localhost:9000/api/cryptouser/update --> Es un **POST** Encargado de actualizar el amount de un usuario, las cryptomonedas que tiene. Recibe por el body los parámetros, amount, userId, cryptoId
- http://localhost:9000/api/cryptouser/get/:userId/:cryptoId --> Encargado de traernos el usuario de la tabla cryptouser para poder visualizar su amount de cryptomonedas. Recibe por parámetros un id de usuario y un id de cryptomoneda

## Modelado de Datos - PostgresSQL

![image](https://user-images.githubusercontent.com/89318618/231613600-2040e96e-9e0a-4975-8338-19156a8e1d7d.png)






