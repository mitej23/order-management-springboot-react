package com.springboot.demo.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.demo.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer>{

	Order findById(int id);
	
}
