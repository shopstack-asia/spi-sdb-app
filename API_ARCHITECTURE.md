# API Architecture Guide

## Overview
This document explains the API architecture of the SPI Safe Deposit Box application, which uses **server-side only** API calls for security and performance.

## Architecture

### Single API Client: `src/lib/server-api.ts`
- **Purpose**: Server-side API client for Commerce Suite integration
- **Security**: Uses httpOnly cookies for authentication
- **Usage**: Server Actions, API Routes, Server Components
- **Environment**: Server-side only (not exposed to client)

## Key Features

### 🔒 Security
- **HttpOnly Cookies**: Tokens stored securely on server
- **No Client Exposure**: API keys and tokens never exposed to browser
- **Server-Side Validation**: All data validation happens on server
- **CSRF Protection**: Built-in protection against cross-site attacks

### ⚡ Performance
- **Reduced Bundle Size**: No client-side API code
- **Faster Initial Load**: Server-side rendering
- **Better Caching**: Server-side caching strategies
- **Reduced Network Requests**: Direct server-to-server calls

### 🎯 SEO & UX
- **Server-Side Rendering**: Better SEO and initial page load
- **Progressive Enhancement**: Works without JavaScript
- **Better Error Handling**: Server-side error management
- **Automatic Redirects**: Seamless user experience

## Implementation

### 1. Server Actions (`src/lib/actions.ts`)
```typescript
import { ServerCSAPI } from './server-api';

export async function loginAction(formData: FormData) {
  const response = await ServerCSAPI.login({ email, password });
  // Handle response and set cookies
}
```

### 2. Data Actions (`src/lib/data-actions.ts`)
```typescript
import { ServerCSAPI } from './server-api';

export async function getBookings(memberId: string) {
  await requireAuth();
  const response = await ServerCSAPI.getBookings(memberId);
  return response.data;
}
```

### 3. API Routes (`src/app/api/*/route.ts`)
```typescript
import { ServerCSAPI } from '@/lib/server-api';

export async function POST(request: NextRequest) {
  const response = await ServerCSAPI.login(credentials);
  return NextResponse.json(response);
}
```

## API Endpoints

### Authentication
- `ServerCSAPI.login(credentials)` - User login
- `ServerCSAPI.register(data)` - User registration
- `ServerCSAPI.sendOTP(email)` - Send OTP
- `ServerCSAPI.verifyOTP(email, otp)` - Verify OTP

### Member Management
- `ServerCSAPI.getMember(id)` - Get member details
- `ServerCSAPI.updateMember(id, data)` - Update member
- `ServerCSAPI.submitKYC(data)` - Submit KYC documents

### Subscriptions
- `ServerCSAPI.getSubscriptions(memberId)` - Get subscriptions
- `ServerCSAPI.createSubscription(data)` - Create subscription

### Bookings
- `ServerCSAPI.getBookings(memberId)` - Get bookings
- `ServerCSAPI.createBooking(data)` - Create booking
- `ServerCSAPI.updateBooking(id, data)` - Update booking

### Facilities
- `ServerCSAPI.getFacilities()` - Get available facilities
- `ServerCSAPI.getPackages()` - Get subscription packages

### Payments
- `ServerCSAPI.getPayments(memberId)` - Get payment history
- `ServerCSAPI.createPayment(data)` - Create payment

## Environment Configuration

### Required Variables
```bash
# CS API Configuration (Server-side only)
CS_API_BASE_URL=http://localhost:4100/api
CS_API_KEY=your-cs-api-key

# Next.js Configuration
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:4100
```

## Usage Examples

### 1. Server Component
```tsx
import { getCurrentUser } from '@/lib/actions';
import { getBookings } from '@/lib/data-actions';

export default async function Dashboard() {
  const user = await getCurrentUser();
  const bookings = await getBookings(user.id);
  
  return <div>{/* Render with data */}</div>;
}
```

### 2. Server Action Form
```tsx
import { loginAction } from '@/lib/actions';

export default function LoginForm() {
  return (
    <form action={loginAction}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

### 3. API Route
```tsx
import { ServerCSAPI } from '@/lib/server-api';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const response = await ServerCSAPI.createBooking(data);
  return NextResponse.json(response);
}
```

## Security Best Practices

### 1. Authentication
- Use httpOnly cookies for token storage
- Implement proper session management
- Validate tokens on every request
- Handle token expiration gracefully

### 2. Data Validation
- Validate all inputs on server-side
- Use TypeScript for type safety
- Implement proper error handling
- Sanitize user inputs

### 3. Error Handling
- Use try-catch blocks in server actions
- Implement proper error boundaries
- Log errors on server-side
- Provide user-friendly error messages

## Migration Benefits

### Before (Client-Side)
```typescript
// ❌ Client-side API calls
const [data, setData] = useState(null);
useEffect(() => {
  fetch('/api/data', {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json())
    .then(data => setData(data));
}, []);
```

### After (Server-Side)
```typescript
// ✅ Server-side data fetching
export default async function Page() {
  const data = await getData();
  return <div>{/* Render with data */}</div>;
}
```

## Conclusion

This server-side architecture provides:
- **Better Security**: HttpOnly cookies and server-side validation
- **Improved Performance**: Server-side rendering and caching
- **Enhanced UX**: Faster initial loads and better SEO
- **Type Safety**: Proper TypeScript integration
- **Maintainability**: Cleaner code structure

The application now uses a single, secure, server-side API client that follows Next.js best practices for modern web applications.
