package event_management.service;

import event_management.exception.AlreadyExistsException;
import event_management.exception.EventNotFoundException;
import event_management.exception.EventNotValidException;
import event_management.model.Event;
import event_management.model.dto.EventCreateDto;
import event_management.model.dto.EventUpdateDto;
import event_management.model.dto.adapter.EventCreateDtoAdapter;
import event_management.model.dto.adapter.EventUpdateDtoAdapter;
import event_management.repository.EventRepository;
import event_management.user_management.UserRepository;
import event_management.user_management.model.User;
import event_management.user_management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    private final EventCreateDtoAdapter eventCreateDtoAdapter;

    private final EventUpdateDtoAdapter eventUpdateDtoAdapter;

    private final UserRepository userRepository;

    public List<Event> getAll() {
        return eventRepository.findAll();
    }

    public Event get(Long id) {
        return eventRepository.findById(id).orElseThrow(() -> new EventNotFoundException(id));
    }

    public Event save(Event event) {
        Event savedEvent;

        try {
            savedEvent = eventRepository.save(event);
        } catch (RuntimeException ex) {
            ex.printStackTrace();
            throw new EventNotValidException("Invalid Event data: " + ex.getMessage());
        }

        return savedEvent;
    }

    public Event create(EventCreateDto eventCreateDto) {
        Event createdEvent = eventCreateDtoAdapter.fromDto(eventCreateDto);

        for (Event event:getAll()) {
            if (eventCreateDto.equals(eventCreateDtoAdapter.toDto(event))) throw new AlreadyExistsException("Such event already exists.");
        }

        return eventRepository.save(createdEvent);
    }

    public Event update(Long eventId, EventUpdateDto eventUpdateDto) {
        Event updatedEvent = eventUpdateDtoAdapter.updateEventFromDto(get(eventId), eventUpdateDto);

        return save(updatedEvent);
    }

    public void setEventInUserList(Long eventId, Long userId){
       UserService userService = new UserService(userRepository);
       userService.getUser(userId).getEventSubscriptionSet().add(get(eventId));
    }

    public void delete(Long id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
        } else {
            throw new EventNotFoundException(id);
        }
    }

}
