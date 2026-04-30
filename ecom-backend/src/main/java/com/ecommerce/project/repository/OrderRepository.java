package com.ecommerce.project.repository;

import com.ecommerce.project.model.Order;
import com.ecommerce.project.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT COALESCE(SUM(o.totalAmount)) FROM Order o")
    long getTotalRevenue();

    Page<Product> findAll(Specification<Product> spec, Pageable pageable);
}
