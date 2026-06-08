package com.example.TodoApplication.Controller;

import com.example.TodoApplication.Model.Product;
import com.example.TodoApplication.Service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping
    public Product addProduct(
            @RequestBody Product product)
    {
        return service.save(product);
    }

    @GetMapping
    public List<Product> getAllProducts()
    {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id)
    {
        service.delete(id);
    }

    @PutMapping
    public Product updateProduct(@RequestBody Product product)
    {
        return service.update(product);
    }
}