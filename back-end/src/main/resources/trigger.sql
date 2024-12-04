-- Create trigger for counting rating star for product
DELIMITER $$

CREATE TRIGGER update_product_rating_after_insert
AFTER INSERT ON product_feedback
FOR EACH ROW
BEGIN
    DECLARE new_avg DECIMAL(3,2);
    
    -- Calculate the new average rating for the product
    SELECT AVG(rating) INTO new_avg
    FROM product_feedback
    WHERE product_id = NEW.product_id;
    
    -- Update the product table with the new average rating and rating count
    UPDATE products
    SET average_rating = new_avg,
        rating_count = rating_count + 1
    WHERE product_id = NEW.product_id;
END $$

DELIMITER ;

-- If a customer updates their feedback (rating), you’ll need to update the rating_count (if applicable) and recalculate the average_rating.
DELIMITER $$

CREATE TRIGGER update_product_rating_after_update
AFTER UPDATE ON product_feedback
FOR EACH ROW
BEGIN
    DECLARE new_avg DECIMAL(3,2);
    
    -- Recalculate the new average rating for the product after the update
    SELECT AVG(rating) INTO new_avg
    FROM product_feedback
    WHERE product_id = OLD.product_id;
    
    -- Update the product table with the new average rating (rating_count remains the same)
    UPDATE products
    SET average_rating = new_avg
    WHERE product_id = OLD.product_id;
END $$

DELIMITER ;
