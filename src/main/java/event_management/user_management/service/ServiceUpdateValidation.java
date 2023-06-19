package event_management.user_management.service;

import event_management.user_management.model.dto.UserDto;

interface ServiceUpdateValidation {
    boolean checkEmail(UserDto userDto);
    boolean checkUsername(UserDto userDto);
    boolean checkPassword(UserDto userDto);
}
