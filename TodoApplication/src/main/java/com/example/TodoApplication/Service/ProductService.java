package com.example.TodoApplication.Service;

import com.example.TodoApplication.Model.Product;
import com.example.TodoApplication.Repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository)
    {
        this.repository = repository;
    }

    public Product save(Product product)
    {
        return repository.save(product);
    }

    public List<Product> getAll()
    {
        return repository.findAll();
    }

    public void delete(String id)
    {
        repository.deleteById(id);
    }

    public Product update(Product product)
    {
        return repository.save(product);
    }
}