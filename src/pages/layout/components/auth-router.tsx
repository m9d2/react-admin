import { auth } from '@/utils';
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AuthRouter({
    children,
}: {
    children: React.ReactNode;
}) {
    const token = auth.getToken();
    if (token) {
        return <>{children}</>;
    } else {
        return <Navigate to="/login" replace />;
    }
}
