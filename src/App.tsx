import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './providers/theme-provider';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/public/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import RiderDashboard from './pages/dashboard/RiderDashboard';
import DriverDashboard from './pages/dashboard/DriverDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Faq from './pages/public/Faq';
import BookRide from './pages/rides/BookRide';
import RideHistory from './pages/rides/RideHistory';
import AuthInitializer from './components/auth/AuthInitializer';
import Dashboard from './pages/dashboard/Dashboard';
import Unauthorized from './pages/public/Unauthorized';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Router>
          <div className="min-h-screen flex flex-col">
            <AuthInitializer />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                <Route
                  path="/dashboard/:role?"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/rider"
                  element={
                    <ProtectedRoute requiredRole="rider">
                      <RiderDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/driver"
                  element={
                    <ProtectedRoute requiredRole="driver">
                      <DriverDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/admin"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/book-ride"
                  element={
                    <ProtectedRoute>
                      <BookRide />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ride-history"
                  element={
                    <ProtectedRoute>
                      <RideHistory />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
            <Toaster position="bottom-right" />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
