package com.springboot.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.springboot.demo.entity.Order;
import com.springboot.demo.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;
    
    public Order saveOrder(Order order) {
        return repository.save(order);    
    }
    
    public List<Order> saveOrders(List<Order> orders){
        return repository.saveAll(orders);
    }
    
    public List<Order> getAllOrders() {
        return repository.findAll();
    }
    
    public Order getOrderById(int id) {
        return repository.findById(id);
    }
    
    public String deleteOrder(int id) {
        repository.deleteById(id);
        return "Deleted order with id " + id;
    }
    
    public Order updateOrder(Order order) {
        Order existingOrder = repository.findById(order.getId());
        if (existingOrder != null) {
            existingOrder.setProductName(order.getProductName());
            existingOrder.setProductType(order.getProductType());
            existingOrder.setQuantity(order.getQuantity());
            existingOrder.setPickupAddress(order.getPickupAddress());
            existingOrder.setDropAddress(order.getDropAddress());
            existingOrder.setPickupLatitude(order.getPickupLatitude());
            existingOrder.setPickupLongitude(order.getPickupLongitude());
            existingOrder.setDropLatitude(order.getDropLatitude());
            existingOrder.setDropLongitude(order.getDropLongitude());
            existingOrder.setOrderStatus(order.getOrderStatus());
            return repository.save(existingOrder);
        } else {
            return null; // Handle case when order with given id doesn't exist
        }
    }
}
