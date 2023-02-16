# Backend for the assignment

## To Run Locally
1. clone the repository `git clone https://github.com/Yash-271120/assignment-backend.git`
2. `cd assignment-backend`
3. `npm install`
3. create .env file as follows - 
```
DB_URI= //your mongoDB URI
PORT=  //Port you want to run app on
SECRET= // secret for jwt token
```
4. `npm run dev` or `node server.js`
5. visit `http://localhost:8080/` to see a welcome messege.


## APIs made 

Base-url = `http://localhost:8080`

- POST @ `Base-url/api/user/register`

  Body - 
```
{
    "name":"yourName",
    "email":"yourEmail@gmail.com",
    "password":"yourPassword",
    "admin":"true(to give admin role else false)"
}
```

- POST @ `Base-url/api/user/login`

  Body - 
```
{
    "email":"yourEmail@gmail.com",
    "password":"yourPassword",
}
```

- GET @ `Base-url/api/items/`


- GET @ `Base-url/api/items/:itemId`

- DELETE @ `Base-url/api/items/:itemId`

- POST @ `Base-url/api/items/`

Body - 
```
{
    "name":"ItemName",
    "price":"itemPrice(Number)"
}
```
- POST @ `Base-url/api/cart/`

Header auth-token required with token 

Body - 
```
{
   "itemId":"itemId"
}
```

- DELETE @ `Base-url/api/cart/:itemId`

Header auth-token required with token 

- POST @ `Base-url/api/order/create`

Header auth-token required with token 

Body - 
```
{
   "cartId":"cartId"
}
```

- GET @ `Base-url/api/admin/generate`

Header auth-token required with token of admin user

- GET @ `Base-url/api/admin/data`

Header auth-token required with token of admin user




