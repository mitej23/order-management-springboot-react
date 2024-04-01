package com.springboot.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ORDER_TBL")
public class Order {

    @Id
    @GeneratedValue
    private int id;
    private String productName;
    private String productType;
    private int quantity;
    private String pickupAddress;
    private String dropAddress;
    private double pickupLatitude;
    private double pickupLongitude;
    private double dropLatitude;
    private double dropLongitude;
    private String orderStatus;

    // Constructors, getters, and setters
    
}
