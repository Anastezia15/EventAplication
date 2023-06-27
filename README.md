# EventAplication


## Has 2 main parts :
    - event service
        *category
    - user service

# User has:
- username
- password
- email
- firstname
- lastname
- birthdate
- list of user's subscriptions on events

# Event has:
- creatorId
- title
- description
- location
- imageUrl
- date
- time
- Category(instance)

# Category has:
- name
- list of events in this category

# User methods:(package "event_management": package "user_management")
- getAllUsers:
  shows all existing users 
- getUser
  finds user by his name
- - getUserById
    finds user by his id
- updateUser
   validates all fields if they don't mach with the previous ones and aren't null
   updates users's fields that are valid
- {checkEmail ,
   checkUsername ,
   checkUsername} are validation methods used in "updateUser"
- createUser
  if such user doesn't exist already, a new one is created  
- deleteUser
   deletes user by id if such exists

# Event methods:(package "event_management")
- getAllEvents:
  shows all existing Events or throws appropriate exception
- getEvent:
  finds event by it's id
- saveEvent
  calls save method int the EventRepository interface to check if the event we want to save is valid otherwise an exception is thrown
- createEvent
  if such event doesn't exist already, a new one is created
- updateEvent
   updates existing event
- setEventInUserList
  subscribes user to an event adding it to concrete user's list of events
- deleteEvent
  deletes event by id if such exists

# Category methods:(package "event_management")
- getAllCategories:
  shows all existing Categories or throws appropriate exception
- getCategoryById:
  finds Category by it's id
- getCategoryByName:
  finds Category by it's name
- getWithEvents
  shows categories with all events of this specification 
- saveCategory
  calls save method int the CategoryRepository interface to check if the category we want to save is valid otherwise an exception is thrown
- updateCategory
  validates it's name
  if valid saves updated category
- checkNameUpdate
  validation method for the previous endpoint
- deleteCategory
  deletes category by id if such exists


# User Management API

This API provides endpoints for managing users in the event management system.

## Base URL
The base URL for all endpoints is `/users`.

## Endpoints

### Get All Users
- Method: GET
- URL: `/users`
- Description: Retrieves a list of all users.
- Response:
    - HTTP Status Code: 200 (OK)
    - Body: List of user objects.

### Get User by Username
- Method: GET
- URL: `/users/{username}`
- Description: Retrieves a user by their username.
- Parameters:
    - `username` (path parameter): The username of the user to retrieve.
- Response:
    - HTTP Status Code: 200 (OK)
    - Body: User object.

### Get User by ID
- Method: GET
- URL: `/users/id/{id}`
- Description: Retrieves a user by their ID.
- Parameters:
    - `id` (path parameter): The ID of the user to retrieve.
- Response:
    - HTTP Status Code: 200 (OK)
    - Body: User object.

### Create User
- Method: POST
- URL: `/users`
- Description: Creates a new user.
- Request Body: User object containing the user details.
- Response:
    - HTTP Status Code: 201 (Created)
    - Body: User object of the created user.

### Update User
- Method: PUT
- URL: `/users/{id}`
- Description: Updates an existing user.
- Parameters:
    - `id` (path parameter): The ID of the user to update.
- Request Body: User object containing the updated user details.
- Response:
    - HTTP Status Code: 200 (OK)
    - Body: User object of the updated user.

### Delete User
- Method: DELETE
- URL: `/users/{id}`
- Description: Deletes a user.
- Parameters:
    - `id` (path parameter): The ID of the user to delete.
- Response:
    - HTTP Status Code: 200 (OK)
    - Body: None

# Event Management API

This is a RESTful API for managing events. It provides endpoints to perform CRUD (Create, Read, Update, Delete) operations on events.

## Endpoints

### Get All Events

Returns a list of all events.

- **URL**: `/events`
- **Method**: GET
- **Response**: List of Event objects
- **Status Codes**:
    - 200 OK: Returns the list of events.

### Get Event by ID

Returns the details of a specific event.

- **URL**: `/events/{id}`
- **Method**: GET
- **Parameters**:
    - `id`: ID of the event to retrieve
- **Response**: Event object
- **Status Codes**:
    - 200 OK: Returns the event details.

### Create Event

Creates a new event.

- **URL**: `/events`
- **Method**: POST
- **Request Body**: EventCreateDto object (contains event details)
- **Response**: Created Event object
- **Status Codes**:
    - 201 Created: Returns the created event.

### Update Event

Updates an existing event.

- **URL**: `/events/{id}`
- **Method**: PATCH
- **Parameters**:
    - `id`: ID of the event to update
- **Request Body**: EventUpdateDto object (contains updated event details)
- **Response**: Updated Event object
- **Status Codes**:
    - 200 OK: Returns the updated event.

### Set Event in User List

Associates an event with a user.

- **URL**: `/events/{eventId}/{userId}`
- **Method**: PATCH
- **Parameters**:
    - `eventId`: ID of the event to associate
    - `userId`: ID of the user to associate
- **Response**: No response body
- **Status Codes**:
    - 200 OK: The event is associated with the user successfully.

### Delete Event

Deletes an event.

- **URL**: `/events/{id}`
- **Method**: DELETE
- **Parameters**:
    - `id`: ID of the event to delete
- **Response**: No response body
- **Status Codes**:
    - 200 OK: The event is deleted successfully.


# Category API

This API provides endpoints to manage categories.

## Table of Contents
- [Endpoints](#endpoints)
    - [Get all categories](#get-all-categories)
    - [Get category by ID](#get-category-by-id)
    - [Get category events](#get-category-events)
    - [Create a new category](#create-a-new-category)
    - [Update a category](#update-a-category)
    - [Delete a category](#delete-a-category)

## Endpoints

### Get all categories
- Method: GET
- URL: `/categories`
- Description: Retrieves all categories.
- Response:
    - Status: 200 OK
    - Body: List of categories

### Get category by ID
- Method: GET
- URL: `/categories/{id}`
- Description: Retrieves a category by its ID.
- Parameters:
    - `{id}`: ID of the category
- Response:
    - Status: 200 OK
    - Body: Category object

### Get category events
- Method: GET
- URL: `/categories/{id}/events`
- Description: Retrieves the events associated with a category.
- Parameters:
    - `{id}`: ID of the category
- Query Parameters:
    - `page` (optional, default: 0): Page number for pagination
    - `size` (optional, default: 10): Number of items per page
    - `upcoming` (optional, default: false): Filter for upcoming events only
- Response:
    - Status: 200 OK
    - Body: CategoryWithEventsDto object containing the category and its associated events

### Create a new category
- Method: POST
- URL: `/categories`
- Description: Creates a new category.
- Request Body: Category object
- Response:
    - Status: 201 Created
    - Body: Category object of the created category

### Update a category
- Method: PATCH
- URL: `/categories/{id}`
- Description: Updates an existing category.
- Parameters:
    - `{id}`: ID of the category to be updated
- Request Body: CategoryDto object with updated category data
- Response:
    - Status: 200 OK
    - Body: Category object of the updated category

### Delete a category
- Method: DELETE
- URL: `/categories/{id}`
- Description: Deletes a category by its ID.
- Parameters:
    - `{id}`: ID of the category to be deleted
- Response:
    - Status: 200 OK
