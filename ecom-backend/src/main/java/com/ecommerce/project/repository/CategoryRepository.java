package com.ecommerce.project.repository;

import com.ecommerce.project.model.Category;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;


public interface CategoryRepository extends JpaRepository<Category , Long> {

    Category findByCategoryName(@NotBlank String categoryName);
}
