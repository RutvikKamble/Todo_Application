package com.example.TodoApplication.Repository;

import com.example.TodoApplication.Model.Product;
import com.example.TodoApplication.Repository.ProductRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository
        extends MongoRepository<Product,String> {
}