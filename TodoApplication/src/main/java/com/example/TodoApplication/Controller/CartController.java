package com.example.TodoApplication.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.TodoApplication.Model.Cart;
import com.example.TodoApplication.Service.CartService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService service;

    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {
        return service.addToCart(cart);
    }

    @GetMapping
    public List<Cart> getCart() {
        return service.getCartItems();
    }

    @DeleteMapping("/{productId}")
    public void remove(@PathVariable String productId) {
        service.removeFromCart(productId);
    }
}