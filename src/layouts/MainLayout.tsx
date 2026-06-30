import { Outlet } from 'react-router-dom';

import Header from './../components/common/Header/Header';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="main-layout">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;