package event_management.repository;

import event_management.model.Category;
import event_management.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    /**
     * Check if an event with the given title exists.
     *
     * @param title the title to check
     * @return true if an event with the title exists, false otherwise
     */
    boolean existsByTitle(String title);
    Optional<Event> findByTitle(String title);
    Optional<Event> findByCreatorId(Long creatorId);

    Page<Event> findByCategory(Category category, Pageable pageable);

    @Query("SELECT e FROM Event e WHERE e.category = :category AND e.date >= CURRENT_TIMESTAMP ORDER BY e.date ASC")
    Page<Event> findUpcomingEventsByCategory(@Param("category") Category category, Pageable pageable);


}

