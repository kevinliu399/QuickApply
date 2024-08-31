package com.QuickApply.QuickApply;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private User user;
    private ObjectId userId;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userId = new ObjectId();
        user = new User(userId, "testuser", "password", "test@example.com", Arrays.asList("link1", "link2"), Arrays.asList());
    }

    @Test
    void createUser_ShouldReturnCreatedUser() {
        when(userService.createUser(any(User.class))).thenReturn(user);

        ResponseEntity<User> response = userController.createUser(user);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
        verify(userService, times(1)).createUser(user);
    }

    @Test
    void getAllUsers_ShouldReturnListOfUsers() {
        List<User> userList = Arrays.asList(user);
        when(userService.getAllUsers()).thenReturn(userList);

        ResponseEntity<List<User>> response = userController.getAllUsers();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userList, response.getBody());
        verify(userService, times(1)).getAllUsers();
    }

    @Test
    void getUserById_ShouldReturnUser_WhenUserExists() {
        when(userService.getUserById(any(ObjectId.class))).thenReturn(Optional.of(user));

        ResponseEntity<User> response = userController.getUserById(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }

    @Test
    void getUserById_ShouldReturnNotFound_WhenUserDoesNotExist() {
        when(userService.getUserById(any(ObjectId.class))).thenReturn(Optional.empty());

        ResponseEntity<User> response = userController.getUserById(userId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void getCommonLinks_ShouldReturnCommonLinks_WhenUserExists() {
        when(userService.getUserById(any(ObjectId.class))).thenReturn(Optional.of(user));

        List<String> result = userController.getCommonLinks(userId);

        assertEquals(user.getCommonLinks(), result);
    }

    @Test
    void updateCommonLinks_ShouldUpdateAndReturnUser() {
        when(userService.getUserById(any(ObjectId.class))).thenReturn(Optional.of(user));
        when(userService.saveUser(any(User.class))).thenReturn(user);

        List<String> newLinks = Arrays.asList("link3", "link4");
        ResponseEntity<User> response = userController.updateCommonLinks(userId, newLinks);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(newLinks, response.getBody().getCommonLinks());
    }

    @Test
    void updateCommonLinks_ShouldReturnNotFound_WhenUserDoesNotExist() {
        when(userService.getUserById(any(ObjectId.class))).thenReturn(Optional.empty());

        List<String> newLinks = Arrays.asList("link3", "link4");
        ResponseEntity<User> response = userController.updateCommonLinks(userId, newLinks);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
