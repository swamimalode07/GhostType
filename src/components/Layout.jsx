import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function Layout() {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const hiddenPaths = ["/typing", "/code"];
    setShowFooter(!hiddenPaths.includes(location.pathname));
    setShowHeader(!hiddenPaths.includes(location.pathname));
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && <Header />}
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default Layout;
