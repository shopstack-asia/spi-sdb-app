export default function DebugPage() {
  return (
    <div style={{ backgroundColor: '#0a1a2f', color: 'white', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ color: 'white', fontSize: '2rem' }}>Debug Page</h1>
      <p style={{ color: 'white' }}>This page should be visible if the app is working.</p>
      <p style={{ color: 'white' }}>If you can see this, the issue is with authentication/middleware.</p>
    </div>
  );
}
