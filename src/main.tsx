import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import "./styles/globals.scss";
import router from './routes/AppRouter.tsx';
import { RouterProvider } from 'react-router-dom';
import { GalleryProvider } from './context/GalleryContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GalleryProvider>
      <RouterProvider router={router} />
    </GalleryProvider>
  </StrictMode>,
)