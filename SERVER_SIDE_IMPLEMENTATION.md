# Server-Side Implementation Guide

## Overview
This document explains the server-side implementation of the SPI Safe Deposit Box application, which provides better security, performance, and SEO compared to client-side API calls.

## Architecture

### 1. Server Actions (`src/lib/actions.ts`)
- **Authentication Actions**: `loginAction`, `registerAction`, `logoutAction`
- **User Management**: `getCurrentUser`, `isAuthenticated`, `requireAuth`
- **Security**: Uses httpOnly cookies for token storage
- **Redirects**: Automatic redirects after successful operations

### 2. Data Actions (`src/lib/data-actions.ts`)
- **Member Data**: `getMemberData`, `updateMemberData`
- **Subscriptions**: `getSubscriptions`, `createSubscription`
- **Bookings**: `getBookings`, `createBooking`, `updateBooking`
- **Payments**: `getPayments`, `createPayment`
- **KYC**: `submitKYC`

### 3. Server API Client (`src/lib/server-api.ts`)
- **CS API Integration**: Direct calls to Commerce Suite API
- **Authentication**: Automatic token handling from cookies
- **Error Handling**: Centralized error management
- **Type Safety**: Proper TypeScript interfaces

## Key Benefits

### Security
- ✅ **HttpOnly Cookies**: Tokens stored securely on server
- ✅ **No Client Exposure**: API keys and tokens never exposed to browser
- ✅ **Server-Side Validation**: All data validation happens on server
- ✅ **CSRF Protection**: Built-in protection against cross-site attacks

### Performance
- ✅ **Reduced Bundle Size**: No client-side API code
- ✅ **Faster Initial Load**: Server-side rendering
- ✅ **Better Caching**: Server-side caching strategies
- ✅ **Reduced Network Requests**: Direct server-to-server calls

### SEO & UX
- ✅ **Server-Side Rendering**: Better SEO and initial page load
- ✅ **Progressive Enhancement**: Works without JavaScript
- ✅ **Better Error Handling**: Server-side error management
- ✅ **Automatic Redirects**: Seamless user experience

## Implementation Examples

### 1. Server-Side Login Form
```tsx
// src/app/login/server-login-form.tsx
import { loginAction } from '@/lib/actions';

export default function ServerLoginForm() {
  return (
    <form action={loginAction}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

### 2. Server-Side Dashboard
```tsx
// src/app/member/server-dashboard.tsx
import { getCurrentUser } from '@/lib/actions';
import { getBookings, getSubscriptions } from '@/lib/data-actions';

export default async function ServerDashboard() {
  const user = await getCurrentUser();
  const [bookings, subscriptions] = await Promise.all([
    getBookings(user.id),
    getSubscriptions(user.id)
  ]);

  return (
    <div>
      <h1>Welcome, {user.first_name}!</h1>
      {/* Render dashboard content */}
    </div>
  );
}
```

### 3. API Route with Server-Side Calls
```tsx
// src/app/api/auth/login/route.ts
import { ServerCSAPI } from '@/lib/server-api';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const response = await ServerCSAPI.login({ email, password });
  return NextResponse.json(response);
}
```

## Environment Configuration

### Required Environment Variables
```bash
# CS API Configuration
CS_API_BASE_URL=http://localhost:4100/api
CS_API_KEY=your-cs-api-key

# Next.js Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

## Security Considerations

### 1. Cookie Configuration
```typescript
cookieStore.set('auth_token', token, {
  httpOnly: true,           // Prevent XSS attacks
  secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
  sameSite: 'lax',          // CSRF protection
  maxAge: 60 * 60 * 24 * 7, // 7 days expiration
});
```

### 2. Authentication Middleware
```typescript
// src/middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  
  if (!token && !isPublicRoute) {
    return NextResponse.redirect('/login');
  }
  
  return NextResponse.next();
}
```

### 3. Server-Side Data Fetching
```typescript
// All data fetching happens on server
const user = await getCurrentUser();
const bookings = await getBookings(user.id);
```

## Migration from Client-Side

### Before (Client-Side)
```typescript
// ❌ Client-side API calls
const [user, setUser] = useState(null);
const [bookings, setBookings] = useState([]);

useEffect(() => {
  const token = localStorage.getItem('auth_token');
  fetch('/api/bookings', {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json())
    .then(data => setBookings(data));
}, []);
```

### After (Server-Side)
```typescript
// ✅ Server-side data fetching
export default async function Dashboard() {
  const user = await getCurrentUser();
  const bookings = await getBookings(user.id);
  
  return <div>{/* Render with data */}</div>;
}
```

## Best Practices

### 1. Error Handling
- Use try-catch blocks in server actions
- Implement proper error boundaries
- Log errors on server-side
- Provide user-friendly error messages

### 2. Type Safety
- Define proper TypeScript interfaces
- Use type assertions carefully
- Validate data on server-side
- Handle unknown types properly

### 3. Performance
- Use Promise.all for parallel data fetching
- Implement proper caching strategies
- Optimize database queries
- Use streaming for large datasets

### 4. Security
- Validate all inputs on server-side
- Use proper authentication checks
- Implement rate limiting
- Sanitize user inputs

## Deployment Considerations

### 1. Vercel Deployment
- Server actions work out of the box
- Environment variables must be set
- Database connections should be optimized
- Consider edge runtime for better performance

### 2. Production Configuration
- Set secure cookie flags
- Configure proper CORS settings
- Implement monitoring and logging
- Set up error tracking

## Conclusion

The server-side implementation provides:
- **Better Security**: HttpOnly cookies and server-side validation
- **Improved Performance**: Server-side rendering and caching
- **Enhanced UX**: Faster initial loads and better SEO
- **Type Safety**: Proper TypeScript integration
- **Maintainability**: Cleaner code structure and better error handling

This architecture is production-ready and follows Next.js best practices for modern web applications.
