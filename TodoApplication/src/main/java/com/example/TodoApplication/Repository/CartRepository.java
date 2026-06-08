package com.example.TodoApplication.Repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.TodoApplication.Model.Cart;

import java.util.Optional;

public interface CartRepository extends MongoRepository<Cart, String> {
    Optional<Cart> findByProductId(String productId);
}