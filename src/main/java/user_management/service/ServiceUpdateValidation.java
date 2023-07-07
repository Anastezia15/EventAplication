package user_management.service;

import user_management.model.dto.UserDto;

interface ServiceUpdateValidation {
    boolean checkEmail(UserDto userDto);
    boolean checkUsername(UserDto userDto);
    boolean checkPassword(UserDto userDto);
}
