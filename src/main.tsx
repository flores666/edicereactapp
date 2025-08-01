import '@/assets/styles/reset.css';
import '@/assets/styles/styles.css';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {router} from '@/routes';
import {AuthProvider} from '@/providers/Auth/AuthProvider';
import {NotificationsProvider} from "@/providers/Notifications/NotificationsProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <NotificationsProvider>
                <RouterProvider router={router}/>
            </NotificationsProvider>
        </AuthProvider>
    </StrictMode>
);
