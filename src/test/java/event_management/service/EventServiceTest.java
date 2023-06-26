package event_management.service;

import event_management.exception.EventNotFoundException;
import event_management.exception.EventNotValidException;
import event_management.model.Event;
import event_management.model.dto.EventCreateDto;
import event_management.model.dto.EventUpdateDto;
import event_management.model.dto.adapter.EventCreateDtoAdapter;
import event_management.model.dto.adapter.EventUpdateDtoAdapter;
import event_management.repository.CategoryRepository;
import event_management.repository.EventRepository;
import event_management.user_management.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EventServiceTest {

    private EventService eventService;

    @Mock
    private EventRepository eventRepository;

    @Mock
    private EventCreateDtoAdapter eventCreateDtoAdapter;

    @Mock
    private EventUpdateDtoAdapter eventUpdateDtoAdapter;

    @Mock
    private UserRepository userRepository;

    @Mock
    private  CategoryRepository categoryRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        eventService = new EventService(eventRepository, eventCreateDtoAdapter, eventUpdateDtoAdapter,userRepository,categoryRepository);
    }

    @Test
    void getAllEvents() {
        // Given
        List<Event> expectedEvents = new ArrayList<>();
        when(eventRepository.findAll()).thenReturn(expectedEvents);

        // When
        List<Event> actualEvents = eventService.getAll();

        // Then
        assertSame(expectedEvents, actualEvents);
        verify(eventRepository).findAll();
    }

    @Test
    void getExistingEvent() {
        // Given
        Long eventId = 1L;
        Event expectedEvent = new Event();
        when(eventRepository.findById(eventId)).thenReturn(Optional.of(expectedEvent));

        // When
        Event actualEvent = eventService.getEvent(eventId);

        // Then
        assertSame(expectedEvent, actualEvent);
        verify(eventRepository).findById(eventId);
    }

    @Test
    void getNonExistingEvent() {
        // Given
        Long eventId = 1L;
        when(eventRepository.findById(eventId)).thenReturn(Optional.empty());

        // When and Then
        assertThrows(EventNotFoundException.class, () -> eventService.getEvent(eventId));
        verify(eventRepository).findById(eventId);
    }

    @Test
    void saveValidEvent() {
        // Given
        Event event = new Event();
        Event expectedEvent = new Event();
        when(eventRepository.save(event)).thenReturn(expectedEvent);

        // When
        Event savedEvent = eventService.saveEvent(event);

        // Then
        assertSame(expectedEvent, savedEvent);
        verify(eventRepository).save(event);
    }

    @Test
    void saveInvalidEvent() {
        // Given
        Event event = new Event();
        when(eventRepository.save(event)).thenThrow(new RuntimeException("Invalid Event data"));

        // When and Then
        assertThrows(EventNotValidException.class, () -> eventService.saveEvent(event));
        verify(eventRepository).save(event);
    }

    @Test
    void createEvent() {
        // Given
        EventCreateDto eventCreateDto = new EventCreateDto();
        Event createdEvent = new Event();
        when(eventCreateDtoAdapter.fromDto(eventCreateDto)).thenReturn(createdEvent);
        when(eventRepository.save(createdEvent)).thenReturn(createdEvent);

        // When
        Event savedEvent = eventService.createEvent(eventCreateDto);

        // Then
        assertSame(createdEvent, savedEvent);
        verify(eventCreateDtoAdapter).fromDto(eventCreateDto);
        verify(eventRepository).save(createdEvent);
    }

    @Test
    void updateExistingEvent() {
        // Given
        Long eventId = 1L;
        EventUpdateDto eventUpdateDto = new EventUpdateDto();
        Event existingEvent = new Event();
        Event updatedEvent = new Event();

        when(eventRepository.findById(eventId)).thenReturn(Optional.of(existingEvent));
        when(eventUpdateDtoAdapter.updateEventFromDto(existingEvent, eventUpdateDto)).thenReturn(updatedEvent);
        when(eventRepository.save(updatedEvent)).thenReturn(updatedEvent);

        // When
        Event result = eventService.updateEvent(eventId, eventUpdateDto);

        // Then
        assertSame(updatedEvent, result);
        verify(eventUpdateDtoAdapter).updateEventFromDto(existingEvent, eventUpdateDto);
        verify(eventRepository).save(updatedEvent);
    }

    @Test
    void updateNonExistingEvent() {
        // Given
        Long eventId = 1L;
        EventUpdateDto eventUpdateDto = new EventUpdateDto();
        when(eventRepository.findById(eventId)).thenReturn(Optional.empty());

        // When and Then
        assertThrows(EventNotFoundException.class, () -> eventService.updateEvent(eventId, eventUpdateDto));
        verifyNoInteractions(eventUpdateDtoAdapter);
    }

    @Test
    void deleteExistingEvent() {
        // Given
        Long eventId = 1L;
        when(eventRepository.existsById(eventId)).thenReturn(true);

        // When
        eventService.delete(eventId);

        // Then
        verify(eventRepository).existsById(eventId);
        verify(eventRepository).deleteById(eventId);
    }

    @Test
    void deleteNonExistingEvent() {
        // Given
        Long eventId = 1L;
        when(eventRepository.existsById(eventId)).thenReturn(false);

        // When and Then
        assertThrows(EventNotFoundException.class, () -> eventService.delete(eventId));
        verify(eventRepository).existsById(eventId);
    }
}