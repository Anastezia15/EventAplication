package event_management.exception;

public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException(Long id) {
        super("Can't find the user with the id " + id);
    }
}
