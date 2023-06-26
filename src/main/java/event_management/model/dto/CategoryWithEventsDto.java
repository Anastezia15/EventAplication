package event_management.model.dto;

import event_management.model.Category;
import event_management.model.Event;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


import java.sql.Timestamp;
import java.util.Set;

@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
@ToString
public class CategoryWithEventsDto {
    private Long id;
    private String name;
    private Set<Event> events;

    public CategoryWithEventsDto(Category category) {
        this.id = category.getId();
        this.name = category.getName();
        this.events = category.getEvents();
    }
}
