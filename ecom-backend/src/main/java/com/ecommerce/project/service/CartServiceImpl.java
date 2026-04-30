package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Cart;
import com.ecommerce.project.model.CartItem;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.CartItemDTO;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.repository.CartItemRepository;
import com.ecommerce.project.repository.CartRepository;
import com.ecommerce.project.repository.ProductRepository;
import com.ecommerce.project.util.AuthUtil;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    CartRepository cartRepository;

    @Autowired
    AuthUtil authUtil;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public CartDTO addProductToCart(Long productId, Integer quantity) {
        Cart cart = createCart();

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productID", productId));

        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(
                cart.getId(), productId);

        if (cartItem != null)
            throw new APIException("Product " + product.getProductName() + " already exists in cart");

        if (product.getQuantity() == 0)
            throw new APIException(product.getProductName() + " is not available");

        if (product.getQuantity() < quantity) {
            throw new APIException("Please make an order of the " + product.getProductName()
                    + " less than or equal to " + product.getQuantity());
        }

        CartItem newCartItem = new CartItem();
        newCartItem.setCart(cart);
        newCartItem.setProduct(product);
        newCartItem.setQuantity(quantity);
        newCartItem.setDiscount(product.getDiscount());

        // ✅ Use specialPrice if available, otherwise fall back to regular price
        double price = (product.getSpecialPrice() != null && product.getSpecialPrice() > 0)
                ? product.getSpecialPrice()
                : product.getPrice();

        newCartItem.setProductPrice(price);
        cartItemRepository.save(newCartItem);

        // Update cart total
        cart.setTotalPrice(cart.getTotalPrice() + (price * quantity));
        cartRepository.save(cart);

        // map and return CartDTO...
        CartDTO cartDTO = modelMapper.map(cart , CartDTO.class);
        List<CartItem> cartItems = cart.getCartItems();
        Stream<ProductDTO> productDTOStream = cartItems.stream().map(item -> {
            ProductDTO map = modelMapper.map(item.getProduct() , ProductDTO.class);
            map.setQuantity(item.getQuantity());
            return map;
        });

        cartDTO.setProducts(productDTOStream.toList());

        //Return Updated Cart
        return cartDTO;
    }

//    @Override
//    public CartDTO addProductToCart(Long productId, Integer quantity) {
//        //Find existing cart or create one
//        Cart cart = createCart();
//
//        //Retrieve Product Details
//        Product product = productRepository.findById(productId)
//                .orElseThrow(() -> new ResourceNotFoundException("Product" , "productID" , productId));
//
//
//        //Perform Validations
//         CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(
//                 cart.getId(),
//                 productId
//         );
//         if (cartItem != null)
//             throw new APIException("Product " + product.getProductName() + " already exists in cart");
//
//         if(product.getQuantity() == 0)
//             throw new APIException(product.getProductName() + " is not available");
//
//        if(product.getQuantity() < quantity) {
//            throw new APIException("Please make an order of the " + product.getProductName()
//                    + " less than or equal to " + product.getQuantity());
//        }
//
//        //Create Cart Item
//        CartItem newCartItem = new CartItem();
//        newCartItem.setProduct(product);
//        newCartItem.setCart(cart);
//        newCartItem.setQuantity(quantity);
//        newCartItem.setDiscount(product.getDiscount());
//        newCartItem.setProductPrice(product.getSpecialPrice());
//
//        //Save Cart Item
//        cartItemRepository.save(newCartItem);
//        cart.setTotalPrice(cart.getTotalPrice() + (product.getSpecialPrice()*quantity));
//        cartRepository.save(cart);
//
//        CartDTO cartDTO = modelMapper.map(cart , CartDTO.class);
//        List<CartItem> cartItems = cart.getCartItems();
//        Stream<ProductDTO> productDTOStream = cartItems.stream().map(item -> {
//            ProductDTO map = modelMapper.map(item.getProduct() , ProductDTO.class);
//            map.setQuantity(item.getQuantity());
//            return map;
//        });
//
//        cartDTO.setProducts(productDTOStream.toList());
//
//        //Return Updated Cart
//        return cartDTO;
//    }

    @Override
    public List<CartDTO> getAllCarts() {

        List<Cart> carts = cartRepository.findAll();

        if(carts.isEmpty())
            throw new APIException("No cart Exists!");

        List<CartDTO> cartDTOS = carts.stream()
                .map(cart -> {
                    CartDTO cartDTO = modelMapper.map(cart , CartDTO.class);

                    List<ProductDTO> products = cart.getCartItems().stream()
                            .map( cartItem -> {
                                ProductDTO productDTO = modelMapper.map(cartItem.getProduct(), ProductDTO.class);
                                productDTO.setQuantity(cartItem.getQuantity());
                                return productDTO;
                                }
                            )

                            .toList();
                    cartDTO.setProducts(products);
                    return cartDTO;
                }).collect(Collectors.toList());

        return cartDTOS;
    }

    @Override
    public CartDTO getCart(String emailId, Long cartId) {
        Cart cart = cartRepository.findCartByEmailAndCartId(emailId , cartId);
        if(cart == null)
            throw new ResourceNotFoundException("Cart" , "cartId" , cartId);

        CartDTO cartDTO = modelMapper.map(cart , CartDTO.class);
        cart.getCartItems().forEach(c -> c.getProduct().setQuantity(c.getQuantity()));
        List<ProductDTO> products = cart.getCartItems().stream()
                .map(p -> modelMapper.map(p.getProduct() , ProductDTO.class))
                .toList();
        cartDTO.setProducts(products);

        return cartDTO;
    }

    @Override
    @Transactional
    public CartDTO updateProductQuantityInCart(Long productId, Integer quantity) {
        String email = authUtil.loggedInEmail();
        Cart userCart = cartRepository.findCartByEmail(email);
        Long cartId = userCart.getId();

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart" , "cartId" , cartId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product" , "productId" , productId));

        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cartId , productId);
        if(cartItem == null)
            throw new APIException("Product" + product.getProductName() + "not available in the cart");

        int newQuantity = cartItem.getQuantity() + quantity;
        if(newQuantity < 0){
            throw new APIException("The resulting quantity cannot be negative");
        }

        if(newQuantity == 0) {
            deleteProductFromCart(cartId, productId);
        }else {
            cartItem.setProductPrice(product.getSpecialPrice());
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItem.setDiscount(product.getDiscount());
            cart.setTotalPrice(cart.getTotalPrice() + (cartItem.getProductPrice() * quantity));
            cartRepository.save(cart);
        }
        CartItem updatedItem = cartItemRepository.save(cartItem);
        if(updatedItem.getQuantity() == 0)
            cartItemRepository.deleteById(updatedItem.getCartItemId());

        CartDTO cartDTO = modelMapper.map(cart , CartDTO.class);
        List<CartItem> cartItems = cart.getCartItems();

        Stream<ProductDTO> productStream = cartItems.stream().map(item -> {
            ProductDTO prd = modelMapper.map(item.getProduct() , ProductDTO.class);
            prd.setQuantity(item.getQuantity());
            return prd;
        });

        cartDTO.setProducts(productStream.toList());
        return cartDTO;
    }

    @Transactional
    @Override
    public String deleteProductFromCart(Long cartId, Long productId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart" , "cartId" , cartId));

        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cartId , productId);
        if(cartItem == null)
            throw new ResourceNotFoundException("Product" , "productId" , productId);

        cart.setTotalPrice(
                cart.getTotalPrice() - (cartItem.getProductPrice() * cartItem.getQuantity())
        );

        cartItemRepository.deleteCartItemByProductIdAndCartId(cartId , productId);
        return "Product " + cartItem.getProduct().getProductName() + " removed!";
    }

    @Override
    public void updateProductInCarts(Long cartId, Long productId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart" , "cartId" , cartId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product" , "productId" , productId));

        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cartId , productId);

        if(cartItem == null)
            throw new APIException("Product " + product.getProductName() + " not available in the cart!");

        double cartPrice = cart.getTotalPrice() -
                (cartItem.getProductPrice() * cartItem.getQuantity());

        cartItem.setProductPrice(product.getSpecialPrice());
        cart.setTotalPrice(cartPrice +
                (cartItem.getProductPrice() * cartItem.getQuantity()));

        cartItem = cartItemRepository.save(cartItem);
    }

    @Transactional  
    @Override
    public String createOrUpdateCartWithItems(List<CartItemDTO> cartItems) {
        //Get User Email
        String emailId = authUtil.loggedInEmail();

        //Check if existing cart available or create new
        Cart existingCart = cartRepository.findCartByEmail(emailId);
        if(existingCart == null){
            existingCart = new Cart();
            existingCart.setTotalPrice(0.00);
            existingCart.setUser(authUtil.loggedInUser());
            existingCart = cartRepository.save(existingCart);
        }else {
            //Clear all current item in existing cart
            cartItemRepository.deleteAllByCartId(existingCart.getId());
        }

        double totalPrice = 0.00;
        //Process Each item in the request to add to cart
        for(CartItemDTO cartItemDTO : cartItems){
            Long productId = cartItemDTO.getProductId();
            Integer quantity = cartItemDTO.getQuantity();

            //Find the product by ID
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Product" , "productId" , productId));

            //Directly update product stock price and total price
//            product.setQuantity(product.getQuantity() - quantity);
            totalPrice += product.getSpecialPrice() * quantity;

            //Create and Save
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(existingCart);
            cartItem.setQuantity(quantity);
            cartItem.setProductPrice(product.getSpecialPrice());
            cartItem.setDiscount(product.getDiscount());
            cartItemRepository.save(cartItem);
        }

        //Update total price and save
        existingCart.setTotalPrice(totalPrice);
        cartRepository.save(existingCart);

        return "Cart Created or updated with new items Successfully!";
    }

    private Cart createCart(){
        Cart userCart = cartRepository.findCartByEmail(authUtil.loggedInEmail());
        if(userCart!=null) return userCart;

        Cart cart = new Cart();
        cart.setTotalPrice(0.00);
        cart.setUser(authUtil.loggedInUser());
        Cart newCart = cartRepository.save(cart);
        return newCart;
    }
}
