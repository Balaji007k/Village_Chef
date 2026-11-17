import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-[#0F0F0F]">
          
          {/* Header */}
          <Navbar />
          
          {/* Main View Area */}
          <main className="flex-grow">
            <AppRoutes />
          </main>
          
          {/* Footer */}
          <Footer />
          
        </div>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
