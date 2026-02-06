# NovaMart Frontend - Project Documentation

## Project Overview
NovaMart is a modern, fully responsive ecommerce frontend built with React, Tailwind CSS, and React Router. This is a complete frontend-only implementation featuring product browsing, cart management, and a multi-step checkout flow.

## Tech Stack
- **React 19.0.0** - UI library
- **Vite 6.3.1** - Build tool and dev server
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **React Router DOM 7.5.1** - Client-side routing
- **Lucide React 0.503.0** - Icon library
- **Context API** - Global state management

## Project Structure
```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx - Reusable button with variants (primary, secondary, danger, outline)
│   │   ├── Container.jsx - Max-width wrapper for consistent layout
│   │   ├── ErrorBoundary.jsx - Error boundary for graceful error handling
│   │   ├── Footer.jsx - Global footer with links and newsletter
│   │   ├── Navbar.jsx - Responsive navigation with cart badge and Add Product button
│   │   └── ProtectedRoute.jsx - Route protection component for authenticated routes
│   └── product/
│       ├── ProductCard.jsx - Individual product card component
│       └── ProductGrid.jsx - Responsive grid for products
├── checkout/
│   └── PaymentMethod.jsx - Payment method selection component
├── context/
│   ├── AuthContext.jsx - Authentication state with login/signup/logout
│   ├── CartContext.jsx - Global cart state with localStorage persistence
│   ├── DataContext.jsx - (Legacy - can be removed if unused)
│   └── ProductContext.jsx - Product-related global state
├── data/
│   └── products.js - Mock product data (12 products)
├── layouts/
│   └── MainLayout.jsx - Main layout wrapper (Navbar + Content + Footer)
├── pages/
│   ├── About.jsx - Company information with mission, values, and features
│   ├── AddProduct.jsx - Admin page to add new products (protected route)
│   ├── Cart.jsx - Shopping cart with quantity management
│   ├── CategoryProduct.jsx - Category-filtered products
│   ├── Checkout.jsx - Multi-step checkout with form validation
│   ├── Contact.jsx - Contact form and company information
│   ├── Home.jsx - Landing page with hero, features, and products
│   ├── Login.jsx - User login page
│   ├── NotFound.jsx - 404 error page
│   ├── Products.jsx - All products with advanced filtering
│   ├── SignUp.jsx - User registration page
│   └── SingleProduct.jsx - Product details and related products
├── routes/
│   └── AppRoutes.jsx - Centralized route definitions with protected routes
├── utils/
│   └── stockUtils.js - Stock management utility functions
├── App.jsx - Root component with ErrorBoundary and AuthProvider wrapper
├── index.css - Tailwind imports only
└── main.jsx - React entry point with CartContext and AuthContext providers
```

## Key Features

### 1. Authentication System (NEW)
- **AuthContext.jsx**: Centralized authentication state management
  - `isAuthenticated` - Boolean flag indicating login status
  - `user` - Current logged-in user object with id, name, email
  - `loading` - Loading state during auth check
  - `login(email, password)` - Authenticate user
  - `signup(name, email, password)` - Register new user
  - `logout()` - Logout and clear session
  - Mock localStorage-based user database
  - Demo account: demo@example.com / demo123

- **Login & Signup Pages**: Form validation and error handling
  - Email validation with regex
  - Password strength requirements (min 6 chars)
  - Error messages for invalid credentials
  - Session persistence via localStorage

- **ProtectedRoute Component**: Guards authenticated-only routes
  - Checks `isAuthenticated` state
  - Shows loading spinner while checking auth
  - Redirects to `/login` if not authenticated
  - Prevents unauthorized route access

### 2. Admin Features (NEW)
- **AddProduct Page** (`/admin/add-product`) - Protected admin route
  - Allows authenticated users to add new products
  - Form fields: name, category, price, description, stock
  - Only accessible when logged in
  - Route protected by ProtectedRoute component

- **Add Product Button in Navbar** (NEW)
  - Styled button positioned next to Contact link
  - Shows only when user is authenticated
  - Desktop: Primary blue button with Plus icon
  - Mobile: Menu item in hamburger menu
  - Routes to `/admin/add-product`
  - No layout shift when button appears/disappears

### 3. Component System
- **Button Component**: Reusable with 4 variants (primary, secondary, danger, outline) and 3 sizes (sm, md, lg)
- **Container Component**: Consistent max-width (7xl) and responsive padding
- **ProductCard**: Image, rating, price with discount, stock status, add to cart
- **ProductGrid**: Responsive grid (1-4 columns), loading states, empty state
- **Navbar**: Responsive with auth-aware Add Product button
- **ResponsiveMenu**: Mobile hamburger menu with auth-aware menu items

### 2. Pages

#### Home Page
- Hero section with gradient background (blue-600 to blue-800)
- Search bar with white text input
- Search functionality to filter products by query
- 3-column features grid (Free Shipping, Secure Checkout, Quality Products)
- Featured products section (8 products)
- Promotional banner with CTA

#### Products Page
- Sidebar filtering:
  - Text search by product name
  - Category filter (radio buttons)
  - Price range slider
- Responsive product grid
- Results counter
- Empty state handling

#### Single Product Page
- Large product image
- Category badge
- Star rating and review count
- Price with discount calculation
- Stock indicator
- Quantity selector
- Add to cart button
- Related products (same category)

#### Cart Page
- Empty cart state with CTA
- Cart items with:
  - Product image, name, price
  - Quantity controls (+/-)
  - Delete button
- Order summary sidebar:
  - Subtotal
  - Tax (10%)
  - Shipping (free over $100)
  - Total
  - Promo code input
- Proceed to checkout button

#### Checkout Page
- **Step 1: Shipping Information**
  - Form fields: firstName, lastName, email, phone, address, city, state, zipCode, country
  - Validation with error messages
  - Email regex validation
- **Step 2: Payment Information**
  - Card name, number, expiry (MM/YY), CVV
  - Validation: 16-19 digits, MM/YY format, 3-4 digit CVV
- **Step 3: Order Confirmation**
  - Success message
  - Order details with itemized breakdown
  - Continue shopping button
- Sticky order summary sidebar throughout all steps

#### About Page
- Hero section with gradient
- Mission & Vision (2-column grid)
- Why Choose Us (4-feature grid with icons)
- Core Values (4-value grid with accent borders)
- CTA section

#### Contact Page
- Hero section
- 3 info cards: Address, Email, Phone
- Contact form with validation
- Success message on submission

#### 404 Not Found
- Large 404 text
- Helpful message
- CTAs to Home and Products
- Quick links to other pages

#### Login Page (NEW)
- Email and password input fields
- Form validation (email regex, min 6 char password)
- Error message display
- Link to signup page
- Demo account info (demo@example.com / demo123)

#### Signup Page (NEW)
- Name, email, and password input fields
- Form validation
- Error message display
- Link to login page
- Account creation with localStorage persistence

#### AddProduct Page (NEW - PROTECTED ROUTE)
- Form to add new products to the catalog
- Fields: product name, category, price, description, stock
- Protected by ProtectedRoute (login required)
- Redirects to login if not authenticated

### 3. State Management

#### AuthContext (NEW)
Provides global authentication state with the following:
- `isAuthenticated` - Boolean flag for login status
- `user` - Current user object {id, name, email}
- `loading` - Loading state during auth initialization
- `error` - Error messages from failed auth operations
- Methods:
  - `login(email, password)` - Authenticate user with validation
  - `signup(name, email, password)` - Register new user
  - `logout()` - Clear session and logout
  - `validateEmail(email)` - Email regex validation
  - `validatePassword(password)` - Min 6 character requirement
  - `validateName(name)` - Min 2 character requirement

Features:
- Auto-login on app initialization from localStorage
- Demo user setup if no users exist
- Session persistence via localStorage
- Email and password validation
- Error handling with user feedback

#### CartContext
Provides global cart state with the following methods:
- `addToCart(product)` - Add product or increment quantity
- `updateQuantity(id, amount)` - Increase/decrease quantity
- `deleteItem(id)` - Remove item from cart

Features:
- Automatic localStorage persistence
- Auto-load on app initialization
- Auto-save on every cart change

### 4. Routing
All routes defined in `AppRoutes.jsx`:
- `/` - Home
- `/login` - User login (NEW)
- `/signup` - User registration (NEW)
- `/products` - All products with filtering
- `/product/:id` - Product details
- `/category/:category` - Category products
- `/cart` - Shopping cart
- `/checkout` - Checkout flow
- `/about` - About page
- `/contact` - Contact page
- `/admin/add-product` - Add product (PROTECTED - login required, NEW)
- `*` - 404 Not Found

**Protected Routes:**
- `/admin/add-product` wrapped in `<ProtectedRoute>`
- Redirects to `/login` if `isAuthenticated === false`

### 5. Error Handling
- **ErrorBoundary**: Catches React errors and displays fallback UI
- Shows error details in development mode
- Provides "Go to Home" and "Reload Page" buttons

## Mock Data
`src/data/products.js` contains 12 sample products:
- Categories: Electronics, Accessories, Peripherals, Storage
- Fields: id, name, category, price, originalPrice, image, description, rating, reviews, inStock
- Price range: $14.99 - $399.99

## Styling Approach
- **100% Tailwind CSS** - No inline styles, no custom CSS classes
- **Responsive design** - Mobile-first with sm/md/lg/xl breakpoints
- **Consistent spacing** - Using Tailwind's spacing scale
- **Color scheme** - Blue primary (#3B82F6), Gray neutrals
- **Typography** - Font sizes from text-sm to text-5xl

## Development Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features required
- CSS Grid and Flexbox support needed

## Performance Considerations
- React.lazy() can be added for code splitting
- Images use placeholder URLs (replace with optimized images)
- LocalStorage for cart persistence (no backend calls)

## Future Enhancements
1. **Backend Integration**
   - Replace mock data with API calls
   - Real payment processing
   - User authentication

2. **Additional Features**
   - Product search with debouncing
   - User wishlist
   - Order history
   - Product reviews
   - Image galleries

3. **Optimization**
   - Code splitting with React.lazy()
   - Image optimization
   - SEO meta tags
   - Analytics integration

4. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

## Recent Updates (Phase 5 - Authentication & Admin Features)

### Authentication System Implementation
1. **AuthContext.jsx** - Created complete authentication state management
   - User login with email/password validation
   - User signup with form validation
   - Session persistence via localStorage
   - Demo user setup (demo@example.com / demo123)
   - Loading states and error handling

2. **Login & Signup Pages** - Implemented user authentication UI
   - Email regex validation
   - Password strength requirements
   - User-friendly error messages
   - Form submission handling

3. **ProtectedRoute Component** - Created route protection
   - Checks authentication status
   - Loading spinner during auth check
   - Redirects to login if not authenticated
   - Prevents unauthorized access

4. **AddProduct Page** - Created admin product creation page
   - Form with product fields
   - Protected by ProtectedRoute (login required)
   - Only accessible to authenticated users

5. **Navbar Enhancement** - Added "Add Product" button
   - Desktop: Primary blue button next to Contact link
   - Mobile: Menu item in hamburger menu
   - Conditional rendering based on `isAuthenticated`
   - Plus icon from lucide-react
   - Responsive design with `hidden md:block`

6. **ResponsiveMenu Enhancement** - Added mobile "Add Product" support
   - Conditional rendering in mobile menu
   - Same visibility rules as desktop
   - Maintains responsive layout

7. **Home Page Update** - Changed search bar styling
   - Updated input text color to white
   - Better visibility on blue gradient background

### Security Features
- ✅ Frontend authentication checks with conditional rendering
- ✅ Protected routes with `<ProtectedRoute>` wrapper
- ✅ Auto-redirect to login for unauthorized access attempts
- ✅ Session persistence with localStorage
- ✅ No hardcoded auth flags or credentials
- ✅ Loading states during auth checks

### UI/UX Improvements
- ✅ Add Product button prominently displayed in navbar
- ✅ Only visible when logged in (prevents layout shift)
- ✅ Responsive design (desktop button + mobile menu item)
- ✅ White search bar text for better contrast
- ✅ Plus icon for visual distinction

## Backend Integration Points (For Backend Development)

### API Endpoints Needed
The frontend expects the following backend endpoints:

#### Authentication
- `POST /api/auth/login` - User login
  - Request: `{email, password}`
  - Response: `{success, user: {id, name, email}, token}`

- `POST /api/auth/signup` - User registration
  - Request: `{name, email, password}`
  - Response: `{success, user: {id, name, email}, token}`

- `POST /api/auth/logout` - User logout
  - Request: `{token}`
  - Response: `{success}`

#### Products
- `GET /api/products` - Get all products
  - Query params: `search, category, minPrice, maxPrice`
  - Response: `{products: [{id, name, category, price, originalPrice, image, description, rating, reviews, inStock}]}`

- `GET /api/products/:id` - Get single product
  - Response: `{product: {...}}`

- `POST /api/products` - Add new product (PROTECTED)
  - Headers: `Authorization: Bearer {token}`
  - Request: `{name, category, price, description, stock}`
  - Response: `{success, product: {...}}`

#### Cart
- `POST /api/cart/add` - Add to cart (OPTIONAL - currently localStorage)
  - Request: `{productId, quantity}`
  
- `PUT /api/cart/update` - Update cart quantity
  - Request: `{cartItems}`

#### Orders/Checkout
- `POST /api/checkout` - Create order
  - Request: `{shippingInfo, paymentInfo, cartItems}`
  - Response: `{success, orderId, orderDetails}`

### LocalStorage Keys Used
- `novamart_user` - Current logged-in user
- `novamart_users` - User database (mock - replace with backend)
- `cartItems` - Shopping cart items

### Currently Mock/Frontend-Only
- User authentication (can be replaced with JWT tokens)
- Product data (currently hardcoded in products.js)
- Cart management (currently localStorage)
- Checkout process (form validation only, no payment processing)
- Order management (no persistence)

## License
This is a demonstration project for educational purposes.

---

**Last Updated**: Phase 5 Complete (Feb 5, 2026)
**Status**: Frontend Ready for Backend Integration
**Next Phase**: Backend API Development

### Summary of Completed Features
- ✅ Complete frontend UI with all pages
- ✅ Authentication system (login/signup/logout)
- ✅ Protected admin routes
- ✅ Add Product button in navbar (auth-aware)
- ✅ Shopping cart with localStorage persistence
- ✅ Multi-step checkout flow
- ✅ Product filtering and search
- ✅ Error handling and validation
- ✅ Responsive mobile design
- ✅ Accessibility features (ErrorBoundary)

### Ready for Backend Integration
- All API endpoint requirements documented
- LocalStorage keys identified for backend replacement
- Protected route patterns established
- Form validation in place (ready for backend submission)
