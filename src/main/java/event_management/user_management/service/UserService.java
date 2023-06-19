package event_management.user_management.service;

import event_management.exception.AlreadyExistsException;
import event_management.user_management.UserRepository;
import event_management.user_management.model.User;
import event_management.user_management.model.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements ServiceUpdateValidation {
    private  final UserRepository userRepository;
    User userFromDb;

    public List<User> getAllUsers()
    {
        return userRepository.findAll();
    }
    public User getUser(Long userId){

        return userRepository.findById(userId).orElseThrow();
    }

    public User updateUser(Long userId, UserDto userDto){
        userFromDb = getUser(userId);
        if(checkEmail(userDto)) userFromDb.setEmail(userDto.getEmail());
        if(checkUsername(userDto)) userFromDb.setUsername(userDto.getUsername());
        if (checkPassword(userDto)) userFromDb.setPassword(userDto.getPassword());
        if (!userDto.getFirstName().equals(userFromDb.getFirstName())) userFromDb.setFirstName(userDto.getFirstName());
        if (!userDto.getLastName().equals(userFromDb.getLastName())) userFromDb.setLastName(userDto.getLastName());
        if (!userDto.getDateOfBirth().equals(userFromDb.getDateOfBirth())) userFromDb.setDateOfBirth(userDto.getDateOfBirth());

        return userRepository.save(userFromDb);
    }

    public User createUser(User user) {
        boolean ifUsernameExists = getAllUsers().stream().anyMatch(userFromList -> userFromList.getUsername().equals(user.getUsername()));
        if(ifUsernameExists) throw new AlreadyExistsException("Such user already exists");

        return userRepository.save(user);
    }
    @Override
    public boolean checkEmail(UserDto userDto) {
        return userDto.getEmail() != null &&
                !userDto.getEmail().equals(userFromDb.getEmail()) &&
                userRepository.existsByEmail(userFromDb.getEmail());
    }

    @Override
    public boolean checkUsername(UserDto userDto) {
        return userDto.getUsername() != null &&
                !userDto.getUsername().equals(userFromDb.getUsername()) &&
                userRepository.existsByUsername(userFromDb.getUsername());
    }

    @Override
    public boolean checkPassword(UserDto userDto) {
        return !userDto.getPassword().equals(userFromDb.getPassword());
    }

    public void deleteUser(final Long id)  {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            System.out.println("Such user doesn't exist");
        }
    }
}
