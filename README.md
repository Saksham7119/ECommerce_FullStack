# E-Commerce Full Stack Application

A full-featured e-commerce platform built with Spring Boot (Backend) and React (Frontend). The application includes user authentication, product management, shopping cart, checkout process, payment integration with Stripe, and an admin dashboard for managing the store.

---

## 🚀 Project Overview

This is a production-ready e-commerce application that demonstrates:

- **RESTful API Development** with Spring Boot
- **Secure Authentication** using JWT tokens with HTTP-only cookies
- **React Frontend** with Redux Toolkit for state management
- **Payment Integration** via Stripe
- **Admin Dashboard** for store management
- **Database Design** with MySQL and JPA/Hibernate

---

## 🛠️ Tech Stack

### Backend
| Technology | Version |
|------------|---------|
| Java | 21 |
| Spring Boot | 3.3.5 |
| Spring Security | 6.x |
| Spring Data JPA | - |
| MySQL | 8.x |
| JWT (jjwt) | 0.13.0 |
| Swagger/OpenAPI | 3.x |
| Stripe API | - |
| Lombok | - |
| ModelMapper | 3.2.4 |

### Frontend
| Technology | Version |
|------------|---------|
| React | 18.3.1 |
| Vite | 5.4.10 |
| Redux Toolkit | 2.3.0 |
| React Router DOM | 7.0.1 |
| Axios | 1.7.7 |
| Material UI (MUI) | 9.0.0 |
| Tailwind CSS | 3.4.15 |
| React Hook Form | 7.72.0 |
| Stripe | 6.1.0 |
| Swiper | 11.1.15 |

---

## 📁 Project Structure

```
ECommerce-FullStack/
├── ecom-backend/                 # Spring Boot Backend
│   ├── src/main/java/com/ecommerce/project/
│   │   ├── config/              # Configuration classes
│   │   │   ├── AppConfig.java   # Application config
│   │   │   ├── SwaggerConfig.java # Swagger/OpenAPI setup
│   │   │   └── WebSecurityConfig.java # Security configuration
│   │   ├── controller/          # REST Controllers
│   │   │   ├── AuthController.java
│   │   │   ├── ProductController.java
│   │   │   ├── CategoryController.java
│   │   │   ├── CartController.java
│   │   │   ├── OrderController.java
│   │   │   ├── AddressController.java
│   │   │   └── AnalyticsController.java
│   │   ├── model/               # JPA Entities
│   │   │   ├── User.java, Role.java, AppRole.java
│   │   │   ├── Product.java, Category.java
│   │   │   ├── Cart.java, CartItem.java
│   │   │   ├── Order.java, OrderItem.java
│   │   │   ├── Payment.java
│   │   │   └── Address.java
│   │   ├── service/             # Business Logic
│   │   ├── repository/         # Data Access
│   │   ├── security/            # JWT & Security
│   │   │   ├── jwt/             # JWT utilities
│   │   │   ├── services/        # UserDetails service
│   │   │   ├── request/         # Request DTOs
│   │   │   └── response/        # Response DTOs
│   │   ├── payload/             # API Payloads/DTOs
│   │   ├── exceptions/         # Custom Exceptions
│   │   └── util/                # Utility classes
│   └── src/main/resources/
│       └── application.properties
│
├── ecom-frontend/                # React Frontend
│   ├── src/
│   │   ├── api/                 # API configuration
│   │   ├── components/
│   │   │   ├── auth/            # Login, Register
│   │   │   ├── admin/           # Admin dashboard
│   │   │   │   ├── dashboard/   # Analytics
│   │   │   │   ├── products/    # Product management
│   │   │   │   ├── categories/  # Category management
│   │   │   │   ├── orders/      # Order management
│   │   │   │   └── sellers/     # Seller management
│   │   │   ├── cart/            # Shopping cart
│   │   │   ├── checkout/        # Checkout flow
│   │   │   ├── products/        # Product browsing
│   │   │   ├── home/            # Home page
│   │   │   └── shared/          # Shared components
│   │   ├── store/               # Redux store
│   │   │   ├── actions/         # Redux actions
│   │   │   └── reducers/        # Redux reducers
│   │   ├── hooks/               # Custom React hooks
│   │   └── utils/               # Utility functions
│   └── package.json
│
└── README.md
```

---

## ✨ Features

### 👤 User Features
- **User Registration & Login** with JWT authentication
- **Product Browsing** with search and category filtering
- **Product Details** with images and descriptions
- **Shopping Cart** add/remove/update items
- **Checkout Process** with address management
- **Order History** view past orders
- **Profile Management** update user details

### 👨‍💼 Admin Features
- **Dashboard** with sales analytics and statistics
- **Product Management** create, update, delete products
- **Category Management** organize products by category
- **Order Management** view and update order status
- **Seller Management** manage seller accounts

### 🛒 Product Features
- Product listing with pagination
- Search by keyword
- Filter by category
- Sort by price, name, date
- Product images upload
- Discount pricing

### 💳 Cart & Checkout
- Add to cart with quantity
- Update item quantities
- Remove items from cart
- Multiple shipping addresses
- Order placement with payment
- Stripe payment integration

---

## 📡 API Endpoints Summary

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signin` | User login |
| POST | `/api/auth/signup` | User registration |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/user` | Get current user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/public/products` | Get all products (paginated) |
| GET | `/api/public/products/{id}` | Get product by ID |
| GET | `/api/public/categories/{id}/products` | Get products by category |
| POST | `/api/admin/products` | Create product (Admin) |
| PUT | `/api/admin/products/{id}` | Update product (Admin) |
| DELETE | `/api/admin/products/{id}` | Delete product (Admin) |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/public/categories` | Get all categories |
| POST | `/api/admin/categories` | Create category (Admin) |
| PUT | `/api/admin/categories/{id}` | Update category (Admin) |
| DELETE | `/api/admin/categories/{id}` | Delete category (Admin) |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/carts/users/cart` | Get user's cart |
| POST | `/api/carts/products/{id}/quantity/{qty}` | Add to cart |
| PUT | `/api/cart/products/{id}/quantity/{op}` | Update cart item |
| DELETE | `/api/carts/{cartId}/product/{productId}` | Remove from cart |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/order/users/payments/{method}` | Place order |
| GET | `/api/orders` | Get user's orders |
| GET | `/api/admin/orders` | Get all orders (Admin) |
| PUT | `/api/admin/orders/{id}/status` | Update order status (Admin) |

### Addresses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/addresses` | Get user addresses |
| POST | `/api/addresses` | Add new address |
| PUT | `/api/addresses/{id}` | Update address |
| DELETE | `/api/addresses/{id}` | Delete address |

### Analytics (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/analytics` | Get dashboard analytics |

---

## 🗃️ Database Entities

### Core Entities

```
┌─────────────────┐       ┌─────────────────┐
│      User       │       │      Role       │
├─────────────────┤       ├─────────────────┤
│ userId          │       │ id              │
│ userName        │       │ name            │
│ email           │       └─────────────────┘
│ password        │
│ phoneNumber     │       ┌─────────────────┐
│ addresses []    │       │    AppRole      │
│ products []     │       ├─────────────────┤
│ orders []       │       │ ADMIN           │
└─────────────────┘       │ SELLER          │
                          │ USER            │
                          └─────────────────┘

┌─────────────────┐       ┌─────────────────┐
│    Category     │       │    Product      │
├─────────────────┤       ├─────────────────┤
│ categoryId      │       │ productId       │
│ categoryName    │       │ productName     │
│ description     │       │ image           │
│ products []     │       │ description     │
└─────────────────┘       │ quantity        │
                          │ price           │
                          │ discount        │
                          │ specialPrice    │
                          │ category        │
                          │ user (seller)   │
                          │ cartItems []    │
                          └─────────────────┘

┌─────────────────┐       ┌─────────────────┐
│      Cart       │       │   CartItem      │
├─────────────────┤       ├─────────────────┤
│ id              │       │ id              │
│ user            │       │ cart            │
│ cartItems []    │       │ product         │
│ totalPrice      │       │ quantity        │
└─────────────────┘       └─────────────────┘

┌─────────────────┐       ┌─────────────────┐
│      Order      │       │  OrderItem      │
├─────────────────┤       ├─────────────────┤
│ orderId         │       │ id              │
│ orderDate       │       │ order           │
│ orderStatus     │       │ product         │
│ totalPrice      │       │ quantity        │
│ paymentMethod   │       │ price           │
│ paymentStatus   │       └─────────────────┘
│ shippingAddress │
│ orderItems []   │
└─────────────────┘

┌─────────────────┐       ┌─────────────────┐
│     Payment     │       │    Address      │
├─────────────────┤       ├─────────────────┤
│ id              │       │ id              │
│ stripePaymentId │       │ name            │
│ amount          │       │ street          │
│ status          │       │ city            │
│ createdDate     │       │ state           │
│ order           │       │ country         │
└─────────────────┘       │ phoneNumber     │
                          │ user            │
                          └─────────────────┘
```

---

## ⚙️ Installation Steps

### Prerequisites

- **Java** 21 or higher
- **Node.js** 18 or higher
- **MySQL** 8.x
- **Maven** 3.x
- **npm** or **yarn**

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ECommerce-FullStack.git
cd ECommerce-FullStack
```

---

### 2. Backend Setup

#### Configure MySQL Database

Create a MySQL database named `ecomsb`:

```sql
CREATE DATABASE ecomsb;
```

#### Update Database Configuration

Edit `ecom-backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/ecomsb
spring.datasource.username=root
spring.datasource.password=your_password

# JWT Configuration
spring.app.jwtSecret=your_secret_key
spring.app.jwtExpirationMs=3000000

# Stripe Configuration
stripe.secret.key=your_stripe_secret_key
```

#### Run the Backend

```bash
cd ecom-backend

# Using Maven Wrapper (Linux/Mac)
./mvnw spring-boot:run

# Using Maven Wrapper (Windows)
mvnw.cmd spring-boot:run

# Or using Maven directly
mvn spring-boot:run
```

The backend will start at `http://localhost:8080`

#### Access Swagger API Documentation

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`

---

### 3. Frontend Setup

```bash
cd ecom-frontend
```

#### Install Dependencies

```bash
npm install
```

#### Configure Environment

Create a `.env` file in `ecom-frontend/` (optional):

```env
VITE_API_URL=http://localhost:8080/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

#### Run the Frontend

```bash
npm run dev
```

The frontend will start at `http://localhost:5173`

---

## 🏃 Running the Application

### Development Mode

1. **Start MySQL** and ensure the `ecomsb` database exists

2. **Start Backend**:
   ```bash
   cd ecom-backend
   mvn spring-boot:run
   ```

3. **Start Frontend** (in a new terminal):
   ```bash
   cd ecom-frontend
   npm run dev
   ```

4. **Access the Application**:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8080/api`
   - Swagger Docs: `http://localhost:8080/swagger-ui.html`

### Default Admin Credentials

After the first run, you can create an admin user through the registration endpoint or directly in the database with the `ADMIN` role.

---

## 📸 Screenshots

> Note: Add your application screenshots here

### Home Page
![Home Page](screenshots/home.png)

### Product Listing
![Products](screenshots/products.png)

### Shopping Cart
![Cart](screenshots/cart.png)

### Checkout
![Checkout](screenshots/checkout.png)

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

### Admin Products
![Admin Products](screenshots/admin-products.png)

---

## 🔐 Security Features

- **JWT Authentication** with HTTP-only cookies
- **Password Encryption** using BCrypt
- **Role-based Access Control** (USER, SELLER, ADMIN)
- **Input Validation** using Jakarta Validation
- **CORS Configuration**
- **Rate Limiting** ready
- **SQL Injection Prevention** via JPA

---

## 🚧 Future Improvements

- [ ] Seller Panel
- [ ] Email notifications for order updates
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Coupon/discount system
- [ ] Order tracking
- [ ] Multi-language support
- [ ] PWA (Progressive Web App) support
- [ ] Advanced search with filters
- [ ] Social login (Google, Facebook)
- [ ] Real-time chat support
- [ ] Mobile app (React Native)
- [ ] Docker containerization
- [ ] CI/CD pipeline

---

## 📄 API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8080/swagger-ui.html`

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Saksham Bajpai - [GitHub]https://github.com/Saksham7119 - [LinkedIn]https://www.linkedin.com/in/saksham-bajpai-03668b278/

---

## ⭐ Show your support

Give a ⭐️ if this project helped you!