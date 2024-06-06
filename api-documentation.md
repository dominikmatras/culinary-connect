# 👨🏻‍🍳 Culinary Connect API

The Culinary Connect API contains endpoint for Meals, Users, Tables and Orders.

# Meals API

## 🍗 Get All Meals

Use this endpoint to get all meals.

### Method: GET

> ```
> {{URL}}api/v1/meals
> ```

### Headers

| Content-Type  | Value                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE0NDAwNDc3LCJleHAiOjE3MjIxNzY0Nzd9.tUsGomsUJc9JCNqdmDap1SHTVxsmTfbiUiQ6mfX7sjw |

### 🔑 Authentication bearer

| Param | value   | Type   |
| ----- | ------- | ------ |
| token | {{jwt}} | string |

## 🍗 Get Meal

Use this endpoint to get one meal.

### Method: GET

> ```
> {{URL}}api/v1/meals/{UUID}
> ```

## 🍗 Create New Meal

Use this endpoint to crate a new meal.

### Method: POST

> ```
> {{URL}}api/v1/meals
> ```

### Body (**raw**)

```json
{
	"name": "Burger with baccon",
	"price": 20,
	"description": "Delicious burger with baccon!"
}
```

## 🍗 Update Meal

Use this endpoint to update a one meal

### Method: PATCH

> ```
> {{URL}}api/v1/meals/{UUID}
> ```

### Body (**raw**)

```json
{
	"name": "Burger",
	"price": 20,
	"description": "Delicious burger"
}
```

## 🍗 Delete Meal

Use this endpoint to delete a meal.

### Method: DELETE

> ```
> {{URL}}api/v1/meals/{UUID}
> ```

### 🔑 Authentication bearer

| Param | value   | Type   |
| ----- | ------- | ------ |
| token | {{jwt}} | string |

# Users API

## 👤 Sign Up

Use this endpoint to create a new user.

### Method: POST

> ```
> {{URL}}api/v1/users/signup
> ```

### Body (**raw**)

```json
{
	"name": "Johny",
	"email": "johny@onet.pl",
	"role": "cooker",
	"password": "12345678",
	"passwordConfirm": "12345678"
}
```

## 👤 Log In

Use this endpoint to login in.

### Method: POST

> ```
> {{URL}}api/v1/users/login
> ```

### Body (**raw**)

```json
{
	"email": "johny@onet.pl",
	"password": "12345678"
}
```

## 👤 Forgot Password

Use this endpoint to forgot user password.

### Method: POST

> ```
> {{URL}}api/v1/users/forgotPassword
> ```

## 👤 Reset Password

Use this endpoint to reset user password.

### Method: PATCH

> ```
> {{URL}}api/v1/users/resetPassword/f1eb644b3adf89d7195197bda373f470cfc308a8536ed5c010be5decee45b3ba
> ```

### Body (**raw**)

```json
{
	"password": "12345678",
	"passwordConfirm": "12345678"
}
```

## 👤 Get All Users

Use this endpoint to get all users.

### Method: GET

> ```
> {{URL}}api/v1/users
> ```

## 👤 Get User

Use this endpoint to get courent user.

### Method: GET

> ```
> {{URL}}api/v1/users/getUser
> ```

# Tables API

## 🪑 Get All Tables

Use this endpoint to get all tables.

### Method: GET

> ```
> {{URL}}api/v1/tables
> ```

## 🪑 Get Table

Use this endpoint to get one table

### Method: GET

> ```
> {{URL}}api/v1/tables/{UUID}
> ```

## 🪑 Create New Table

Use this endpoint to create a new table.

### Method: POST

> ```
> {{URL}}api/v1/tables
> ```

### Body (**raw**)

```json
{
	"tableNumber": 5,
	"status": "avaliable"
}
```

## 🪑 Update Table

Use this endpoint to update a table.

### Method: PATCH

> ```
> {{URL}}api/v1/tables/{UUID}
> ```

### Body (**raw**)

```json
{
	"status": "occupied"
}
```

## 🪑 Delete Table

Use this endpoint to delete a table.

### Method: DELETE

> ```
> {{URL}}api/v1/tables/{UUID}
> ```

# Orders API

## 📝 Get All Orders

Use this endpoint to get all orders.

### Method: GET

> ```
> {{URL}}api/v1/orders
> ```

## 📝 Get Order

Use this endpoint to get one order.

### Method: GET

> ```
> {{URL}}api/v1/orders/{UUID}
> ```

## 📝 Create Order

Use this endpoint to create a new order.

### Method: POST

> ```
> {{URL}}api/v1/orders
> ```

### Body (**raw**)

```json
{
	"tableId": 1,
	"meals": [
		{
			"meal": 1,
			"quantity": 8
		}
	]
}
```

## 📝 Update Order

Use this endpoint to update an order.

### Method: PATCH

> ```
> {{URL}}api/v1/orders/{UUID}
> ```

### Body (**raw**)

```json
{
	"status": "completed"
}
```

## 📝 Delete Order

Use this endpoint to delete an order.

### Method: DELETE

> ```
> {{URL}}api/v1/orders/{UUID}
> ```
