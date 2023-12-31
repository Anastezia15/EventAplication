package event_management.service;

import event_management.exception.AlreadyExistsException;
import event_management.exception.EventNotFoundException;
import event_management.exception.EventNotValidException;
import event_management.model.Event;
import event_management.model.dto.EventCreateDto;
import event_management.model.dto.EventUpdateDto;
import event_management.model.dto.adapter.EventCreateDtoAdapter;
import event_management.model.dto.adapter.EventUpdateDtoAdapter;
import event_management.repository.CategoryRepository;
import event_management.repository.EventRepository;
import user_management.model.User;
import user_management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;


@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    private final EventCreateDtoAdapter eventCreateDtoAdapter;

    private final EventUpdateDtoAdapter eventUpdateDtoAdapter;

    private final CategoryRepository categoryRepository;

    private final UserService userService;

    public List<Event> getAll() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElseThrow(() -> new EventNotFoundException(id));
    }
    public Event getEventByTitle(String title) {
        return eventRepository.findByTitle(title).orElseThrow(() -> new EventNotFoundException(title));
    }

    public Event saveEvent(Event event) {
        Event savedEvent;

        try {
            savedEvent = eventRepository.save(event);
        } catch (RuntimeException ex) {
            ex.printStackTrace();
            throw new EventNotValidException("Invalid Event data: " + ex.getMessage());
        }

        return savedEvent;
    }
    public Event getEventByUser(User user){
        return eventRepository.findByCreatorId(user.getId()).orElseThrow(() -> new EventNotFoundException(user.getId(), 1L));
    }


    public Event createEvent(EventCreateDto eventCreateDto) {
        Event createdEvent = eventCreateDtoAdapter.fromDto(eventCreateDto);

        for (Event event:getAll()) {
            if (eventCreateDto.equals(eventCreateDtoAdapter.toDto(event))) throw new AlreadyExistsException("Such event already exists.");
        }

        CategoryService categoryService = new CategoryService(categoryRepository, eventRepository);
        categoryService.getCategoryById(categoryRepository.findByName(eventCreateDto.getCategory()).get().getId()).getEvents().add(createdEvent);


        return eventRepository.save(createdEvent);
    }

    public Event updateEvent(Long eventId, EventUpdateDto eventUpdateDto) {
        Event updatedEvent = eventUpdateDtoAdapter.updateEventFromDto(getEventById(eventId), eventUpdateDto);

        return saveEvent(updatedEvent);
    }

    public Set<User> getAllSubscribers(Long eventId){
        return getEventById(eventId).getUserSubscriptionList();
    }
    public Set<Event> getAllSubscriptionsOnEvents(Long userId){
        return userService.getUserById(userId).getEventSubscriptionList();
    }

    public void delete(Long id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
        } else {
            throw new EventNotFoundException(id);
        }
    }

}
