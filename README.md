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

# User enpoints:(package "event_management": package "user_management")
- getAllUsers:
  shows all existing users 
- getUser
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

# Event enpoints:(package "event_management")
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

# Category enpoints:(package "event_management")
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
