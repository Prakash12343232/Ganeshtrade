import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Customer Pages
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Contact = lazy(() => import('./pages/Contact'));
const Order = lazy(() => import('./pages/Order'));
const Auth = lazy(() => import('./pages/Auth'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminOrders = lazy(() => import('./pages/AdminOrders'));

import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// 🔒 STRICT ADMIN ROUTE
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return null;
  // If not logged in or not admin, go to Admin Login
  if (!isAuthenticated || !isAdmin) return <Navigate to="/admin/login" replace />;

  return children;
};

// 🔒 STRICT USER ROUTE
const UserRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return null;
  // If Admin is logged in, they should NOT see user pages - Redirect to Admin Dashboard
  if (isAuthenticated && isAdmin) return <Navigate to="/admin" replace />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* ADMIN SECTION - COMPLETELY SEPARATE */}
            <Route path="/admin/login" element={
              <Suspense fallback={null}>
                <AdminLogin />
              </Suspense>
            } />

            <Route path="/admin" element={
              <AdminRoute>
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen font-black text-primary animate-pulse uppercase tracking-widest">Ganesh Trades Admin...</div>}>
                  <AdminDashboard />
                </Suspense>
              </AdminRoute>
            } />

            <Route path="/admin/orders" element={
              <AdminRoute>
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen font-black text-primary animate-pulse uppercase tracking-widest">Ganesh Trades Orders...</div>}>
                  <AdminOrders />
                </Suspense>
              </AdminRoute>
            } />

            {/* CUSTOMER SECTION - Wrapped in Layout */}
            <Route path="*" element={
              <UserRoute>
                <Layout>
                  <Suspense fallback={
                    <div className="min-h-[50vh] flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  }>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/order" element={<Order />} />
                      <Route path="/login" element={<Auth />} />
                      {/* Catch-all for user routes */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Suspense>
                </Layout>
              </UserRoute>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
