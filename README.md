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
- list of users that are subscribed on this event

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


# User API

## Endpoints:

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

# Event API

## Endpoints:

### Get all events

- **URL:** `/`
- **Method:** GET
- **Description:** Retrieves all events.
- **Response Body:** List of `Event` objects.
- **Response Status Codes:**
  - 200 OK: Successful operation.

### Get event by ID

- **URL:** `/id/{id}`
- **Method:** GET
- **Description:** Retrieves an event by its ID.
- **Path Variable:**
  - `id`: ID of the event.
- **Response Body:** `Event` object.
- **Response Status Codes:**
  - 200 OK: Successful operation.

### Get event by title

- **URL:** `/title/{title}`
- **Method:** GET
- **Description:** Retrieves an event by its title.
- **Path Variable:**
  - `title`: Title of the event.
- **Response Body:** `Event` object.
- **Response Status Codes:**
  - 200 OK: Successful operation.

### Create event

- **URL:** `/`
- **Method:** POST
- **Description:** Creates a new event.
- **Request Body:** `EventCreateDto` object.
- **Response Body:** `Event` object.
- **Response Status Codes:**
  - 201 Created: Event created successfully.

### Update event

- **URL:** `/{id}`
- **Method:** PATCH
- **Description:** Updates an existing event.
- **Path Variable:**
  - `id`: ID of the event to be updated.
- **Request Body:** `EventUpdateDto` object.
- **Response Body:** `Event` object.
- **Response Status Codes:**
  - 200 OK: Successful operation.

### Subscribe user to event

- **URL:** `/subscribe/{eventId}/{userId}`
- **Method:** PATCH
- **Description:** Subscribes a user to an event.
- **Path Variables:**
  - `eventId`: ID of the event.
  - `userId`: ID of the user.
- **Response Status Codes:**
  - 200 OK: Subscription accomplished successfully.

### Get event subscribers

- **URL:** `/subscribers/{eventId}`
- **Method:** GET
- **Description:** Retrieves all subscribers of an event.
- **Path Variable:**
  - `eventId`: ID of the event.
- **Response Body:** List of `User` objects.
- **Response Status Codes:**
  - 200 OK: Successful operation.

### Get user's subscriptions on events

- **URL:** `/subscriptions_on_events/{userId}`
- **Method:** GET
- **Description:** Retrieves all events subscribed by a user.
- **Path Variable:**
  - `userId`: ID of the user.
- **Response Body:** List of `Event` objects.
- **Response Status Codes:**
  - 200 OK: Successful operation.

### Unsubscribe user from event

- **URL:** `/unsubscribe/{eventId}/{userId}`
- **Method:** PATCH
- **Description:** Unsubscribes a user from an event.
- **Path Variables:**
  - `eventId`: ID of the event.
  - `userId`: ID of the user.
- **Response Status Codes:**
  - 200 OK: Unsubscription accomplished successfully.

### Delete event

- **URL:** `/{id}`
- **Method:** DELETE
- **Description:** Deletes an event.
- **Path Variable:**
  - `id`: ID of the event to be deleted.
- **Response Status Codes:**
  - 200 OK: Successful operation.


# Category API

## Endpoints:

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

# Project Functionality

## User Functionality

- **Registration**: Users can register an account to access the platform.
- **Login**: Registered users can log in to their accounts.
- **Browse Events by Category**: Users can view events of a specific category.
- **Subscribe to an Event**: Users can subscribe to an event to receive updates and notifications.
- **Unsubscribe from an Event**: Users can unsubscribe from events they are no longer interested in.
- **View Subscriptions**: Users can see a list of events they are subscribed to.
- **Create an Event**: Users can create their own events and provide details such as title, description, date, and location.
- **Modify an Event**: Users can edit the details of the events they created.
- **View Subscriptions to Own Events**: Users can see the list of subscribers for the events they created.
- **Delete an Event**: Users have the option to delete events they created.

## Admin Functionality

- **Login**: Administrators can log in to their accounts.
- **View All Users**: Administrators can browse and access information about all registered users.
- **Find a Specific User**: Administrators can search for a particular user based on username or other criteria.
- **Find a Specific Event**: Administrators can search for a specific event based on event details or other criteria.
- **View All Events**: Administrators can see a list of all events available on the platform.
- **Delete a User**: Administrators have the authority to delete user accounts if necessary.
- **Delete an Event**: Administrators can remove events from the platform.
- **Delete a Category**: Administrators can delete categories associated with events.
- **View Subscriptions to an Event**: Administrators can see the list of users subscribed to a particular event.
- **View Subscriptions of a Specific User**: Administrators can view all subscriptions of a specific user.
