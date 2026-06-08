package com.example.TodoApplication.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.TodoApplication.Model.Cart;
import com.example.TodoApplication.Repository.CartRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository repo;

    public Cart addToCart(Cart cart) {

        Optional<Cart> existing = repo.findByProductId(cart.getProductId());

        if (existing.isPresent()) {
            Cart item = existing.get();
            item.setQuantity(item.getQuantity() + 1);
            return repo.save(item);
        } else {
            cart.setQuantity(1);
            return repo.save(cart);
        }
    }

    public List<Cart> getCartItems() {
        return repo.findAll();
    }

    public void removeFromCart(String productId) {
        Optional<Cart> item = repo.findByProductId(productId);
        item.ifPresent(repo::delete);
    }
}