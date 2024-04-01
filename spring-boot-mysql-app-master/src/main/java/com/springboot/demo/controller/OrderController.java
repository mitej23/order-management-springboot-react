package com.springboot.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.demo.entity.Order;
import com.springboot.demo.service.OrderService;

@RestController
public class OrderController {
    
    @Autowired
    private OrderService service;
    
    @PostMapping("/createOrder")
    public Order createOrder(@RequestBody Order order) {
        return service.saveOrder(order);
    }
    
    @PostMapping("/createOrders")
    public List<Order> createOrders(@RequestBody List<Order> orders){
        return service.saveOrders(orders);
    }

    @GetMapping("/retrieveOrders")
    public List<Order> retrieveOrders() {
        return service.getAllOrders();
    }
    
    @GetMapping("/retrieveOrderById/{id}")
    public Order retrieveOrderById(@PathVariable int id) {
        return service.getOrderById(id);
    }
    
    @DeleteMapping("/deleteOrder/{id}")
    public String deleteOrder(@PathVariable int id) {
        return service.deleteOrder(id);
    }
    
    @PutMapping("/updateOrder")
    public Order updateOrder(@RequestBody Order order) {
        return service.updateOrder(order);
    }
    
}
