import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="app">
      <Navigation isTransparent={true} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
