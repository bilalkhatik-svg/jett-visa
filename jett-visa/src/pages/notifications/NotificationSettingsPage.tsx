"use client";

import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import AppHeader from '@/components/core-module/custom-header/AppHeader';
import NotificationToggle from '@/components/core-module/notifications/NotificationToggle';
import {
    loadNotificationFromStorage,
    syncNotificationFromBackend,
    selectNotificationLoading,
} from '@/store/slice/notificationSlice';

export interface NotificationSettingsPageProps {
    userId?: string;
}

export const NotificationSettingsPage: React.FC<NotificationSettingsPageProps> = ({
    userId
}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const loading = useAppSelector(selectNotificationLoading);

    useEffect(() => {
        const initializePreferences = async () => {
            if (userId) {
                try {
                    await dispatch(syncNotificationFromBackend(userId)).unwrap();
                } catch (error) {
                    console.error('Failed to sync from backend, falling back to local storage:', error);
                    await dispatch(loadNotificationFromStorage()).unwrap();
                }
            } else {
                await dispatch(loadNotificationFromStorage()).unwrap();
            }
        };

        initializePreferences();
    }, [dispatch, userId]);

    const handleBackClick = useCallback(() => {
        router.push('/accounts');
    }, [router]);

    return (
        <div className="min-h-screen bg-white">
            <AppHeader titleKey="notifications" onBackClick={handleBackClick} />

            <div className="max-w-sm mx-auto py-6 px-4">
                <div className="max-w-[315px] mx-auto">
                    {!loading && (
                        <NotificationToggle userId={userId} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationSettingsPage;