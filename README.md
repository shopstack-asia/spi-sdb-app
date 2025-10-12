# SPI Safe Deposit Box Web Application

A premium Next.js web application for SPI Safe Deposit Box services, providing digital customer services for secure storage and vault facilities in Thailand.

## 🎯 Features

### Core Functionality
- **Member Registration & KYC Verification** - Complete onboarding flow with document upload
- **Membership Subscription Management** - View and manage active packages
- **Facility Booking System** - Calendar-based booking with visitor management
- **Payment Processing** - Transaction history and renewal management
- **Member Dashboard** - Comprehensive overview of subscriptions, bookings, and payments

### Key Pages
- **Landing Page** - Marketing page with SPI branding and service overview
- **Registration** - Multi-step registration with KYC document upload
- **Member Dashboard** - Central hub for all member activities
- **Facility Booking** - Calendar interface for booking meeting rooms and vault access
- **Visitor Management** - Inline visitor registration and check-in/out system
- **Subscription Management** - Package selection and subscription management
- **Payment History** - Transaction tracking and receipt downloads

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom SPI theme
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Query for server state
- **Authentication**: JWT-based with middleware protection
- **Backend Integration**: REST API proxy routes for CS backend

## 🎨 Design System

### SPI Brand Colors
- **Primary Navy**: `#0a1a2f` - Main brand color
- **Accent Gold**: `#d4af37` - Premium highlights and CTAs
- **Secondary Silver**: `#e5e7eb` - Supporting text and borders
- **Background**: Gradient from navy to dark for depth

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Clear heading structure with proper contrast
- **Accessibility**: WCAG compliant color combinations

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page
│   ├── login/                    # Authentication
│   ├── register/                 # Registration flow
│   ├── member/                   # Member dashboard
│   ├── booking/                  # Facility booking
│   │   ├── page.tsx             # Booking list
│   │   ├── new/                  # New booking form
│   │   └── [id]/                 # Booking details
│   ├── subscription/             # Package management
│   ├── payment/                  # Payment history
│   └── api/                     # API proxy routes
├── components/                   # Reusable components
│   └── ui/                      # shadcn/ui components
├── lib/                         # Utilities and helpers
│   ├── api.ts                   # CS API integration
│   ├── auth.ts                  # Authentication service
│   └── utils.ts                 # Common utilities
├── types/                       # TypeScript definitions
└── styles/                      # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sdb-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   # CS API Configuration (Server-side only)
   CS_API_BASE_URL=http://localhost:4100/api
   CS_APP_KEY=your-cs-app-key
   CS_SECRET_KEY=your-cs-secret-key
   
   # Next.js Configuration
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:4100
   ```

   **Important Security Notes:**
   - `CS_API_BASE_URL` is server-side only (not exposed to client)
   - `CS_APP_KEY` and `CS_SECRET_KEY` are server-side only (not exposed to client)
   - Uses Basic Authentication for CS API access
   - No `NEXT_PUBLIC_*` variables for API configuration
   - All API calls are made server-side for security

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:4100](http://localhost:4100)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Code Structure

#### Components
- All components use TypeScript with proper typing
- shadcn/ui components are fully customizable
- Consistent naming convention: PascalCase for components

#### API Integration
- API routes act as proxy to CS backend
- Centralized error handling
- Type-safe request/response handling

#### State Management
- React Query for server state
- Local state with React hooks
- Form state with React Hook Form

## 🎨 Customization

### Theme Configuration
The SPI theme is configured in `tailwind.config.ts`:

```typescript
colors: {
  spi: {
    navy: "#0a1a2f",
    gold: "#d4af37", 
    silver: "#e5e7eb",
    white: "#ffffff",
    dark: "#1a1a1a"
  }
}
```

### Component Customization
All shadcn/ui components can be customized by modifying the component files in `src/components/ui/`.

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Proper touch targets and gestures
- **Accessibility**: Screen reader support and keyboard navigation

## 🔒 Security Features

- **Authentication**: JWT-based with secure cookie storage
- **Route Protection**: Middleware-based route guards
- **Input Validation**: Zod schema validation
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Built-in Next.js protection

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- **Azure App Service**: Use the provided Dockerfile
- **AWS**: Deploy as static site or serverless function
- **Self-hosted**: Use `npm run build` and serve with Node.js

## 📊 Performance

- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: Use `npm run analyze` to inspect bundle

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Token refresh

### Member Endpoints
- `GET /api/sdb_member/[id]` - Get member details
- `PUT /api/sdb_member/[id]` - Update member

### Booking Endpoints
- `GET /api/sdb_booking` - List bookings
- `POST /api/sdb_booking` - Create booking
- `PUT /api/sdb_booking/[id]` - Update booking

### Package Endpoints
- `GET /api/sdb_package` - List available packages
- `POST /api/sdb_subscription` - Create subscription

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software for SPI Safe Deposit Box services.

## 🆘 Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for SPI Safe Deposit Box Services**