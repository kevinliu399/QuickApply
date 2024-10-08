package com.QuickApply.QuickApply;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String helloUserController(){
        return "User access level";
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable ObjectId id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // @GetMapping("/username/{username}")
    // public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
    //     Optional<User> user = userService.getUserByUsername(username);
    //     return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    // }

    @GetMapping("/{id}/commonLinks")
    public List<String> getCommonLinks(@PathVariable ObjectId id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(User::getCommonLinks).orElse(null);
    }

    @PutMapping("/{id}/commonLinks")
    public ResponseEntity<User> updateCommonLinks(@PathVariable ObjectId id, @RequestBody List<String> commonLinks) {
        Optional<User> userOptional = userService.getUserById(id);
        if (!userOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        User user = userOptional.get();
        user.setCommonLinks(commonLinks);
        userService.saveUser(user); // Make sure you have a saveUser method in your UserService
        return ResponseEntity.ok(user);
    }
}
