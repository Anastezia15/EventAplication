package event_management.user_management;

import event_management.user_management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>  {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
