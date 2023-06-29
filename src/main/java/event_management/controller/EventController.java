package event_management.controller;

import event_management.model.Event;
import event_management.model.dto.EventCreateDto;
import event_management.model.dto.EventUpdateDto;
import event_management.repository.EventRepository;
import event_management.service.EventService;
import event_management.user_management.UserRepository;
import event_management.user_management.model.User;
import event_management.user_management.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:8080")
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAll();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/creatorId/{creatorId}")
    public ResponseEntity<List<Event>> getEventByCreatorId(@PathVariable Long creatorId) {
       List <Event> events = eventService.getAll().stream().filter(event -> event.getCreatorId().equals(creatorId))
               .collect(Collectors.toList());
        return ResponseEntity.ok(events);
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Event event = eventService.getEventById(id);
        return ResponseEntity.ok(event);
    }
    @GetMapping("/title/{title}")
    public ResponseEntity<Event> getEventByTitle(@PathVariable String title) {
        Event event = eventService.getEventByTitle(title);
        return ResponseEntity.ok(event);
    }

    @PostMapping
    public ResponseEntity<Event> createEvent(@Valid @RequestBody EventCreateDto event) {
        Event createdEvent = eventService.createEvent(event);
        return ResponseEntity.created(null).body(createdEvent);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @Valid @RequestBody EventUpdateDto eventUpdateDto) {
        Event updatedEvent = eventService.updateEvent(id, eventUpdateDto);
        return ResponseEntity.ok(updatedEvent);
    }

    @PostMapping("/subscribe/{eventId}/{userId}")
    public ResponseEntity<String> setSubscriptions(@PathVariable Long eventId, @PathVariable Long userId) {
        Event event = eventService.getEventById(eventId);
        User user = userService.getUserById(userId);
        event.getUserSubscriptionList().add(user);
        user.getEventSubscriptionList().add(event);

        eventRepository.save(event);
        userRepository.save(user);

        return ResponseEntity.ok("Subscription accomplished successfully");
    }

    @GetMapping("/subscribers/{eventId}")
    public ResponseEntity<Set<User>> getEventSubscribers(@PathVariable Long eventId){
    Set<User> eventSubscribers = eventService.getAllSubscribers(eventId);
        return ResponseEntity.ok(eventSubscribers);
    }
    @GetMapping("/subscriptions_on_events/{userId}")
    public ResponseEntity<Set<Event>> getSubscriptionsOnEvent(@PathVariable Long userId){
        Set<Event> userSubscriptionsOnEvent = eventService.getAllSubscriptionsOnEvents(userId);
        return ResponseEntity.ok(userSubscriptionsOnEvent);
    }

    @PatchMapping("/unsubscribe/{eventId}/{userId}")
    public ResponseEntity<String> removeEventFromUserList(@PathVariable Long eventId, @PathVariable Long userId){
        Event event = eventService.getEventById(eventId);
        User user = userService.getUserById(userId);

        event.getUserSubscriptionList().remove(user);
        user.getEventSubscriptionList().remove(event);

        eventRepository.save(event);
        userRepository.save(user);

        return ResponseEntity.ok("Unsubscription accomplished successfully");
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.delete(id);
        return ResponseEntity.ok().build();
    }
}


