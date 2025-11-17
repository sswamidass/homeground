import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app">
      <Navigation isTransparent={isHomePage} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
