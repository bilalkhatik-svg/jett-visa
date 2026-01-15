"use client";

import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useTranslation } from 'react-i18next';
import {
  selectNotificationEnabled,
  selectSystemPermission,
  saveNotification,
  refreshPermissionStatus,
  requestNotificationPermission,
} from '@/store/slice/notificationSlice';


export interface NotificationToggleProps {
  userId?: string;
  helperText?: string;
}

const DEFAULT_HELPER_TEXT = "notification.helper_text";

const TEXT_CONSTANTS = {
  LABEL: 'notification.toggle_label',
  SUCCESS_ENABLED: 'notification.enabled',
  SUCCESS_DISABLED: 'notification.disabled',
  ERROR_ENABLE: 'Failed to enable notifications',
  ERROR_SAVE: 'Failed to save notification preference',
  ERROR_DENIED: 'Notification permission was denied',
};

export const NotificationToggle: React.FC<NotificationToggleProps> = ({
  userId,
  helperText = DEFAULT_HELPER_TEXT,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const enabled = useAppSelector(selectNotificationEnabled);
  const systemPermission = useAppSelector(selectSystemPermission);
  const [optimisticState, setOptimisticState] = React.useState<boolean | null>(null);
  const [showMessage, setShowMessage] = React.useState<{ text: string; type: 'success' | 'error' | 'warning' } | null>(null);
  
  const isFullyEnabled = optimisticState !== null
    ? optimisticState
    : (enabled && systemPermission === 'granted');

  // Simple toast notification
  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);
  const handleRefreshPermission = useCallback(() => {
    dispatch(refreshPermissionStatus());
  }, [dispatch]);
  useEffect(() => {
    handleRefreshPermission();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleRefreshPermission();
      }
    };

    const handleFocus = () => {
      handleRefreshPermission();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [handleRefreshPermission]);

  const handleEnableNotifications = useCallback(async () => {
    try {
      setOptimisticState(true);

      const permission = await requestNotificationPermission();

      if (permission === 'granted') {
        await dispatch(saveNotification({ userId, enabled: true })).unwrap();

        // TODO: Add API call if needed
        // if (userId) {
        //   await notificationApi.updateNotificationPreference(userId, true);
        // }

        setShowMessage({ text: t(TEXT_CONSTANTS.SUCCESS_ENABLED), type: 'success' });
      } else if (permission === 'denied') {
        setOptimisticState(false);
        setShowMessage({ text: TEXT_CONSTANTS.ERROR_DENIED, type: 'warning' });
      } else if (permission === 'default') {
        setOptimisticState(false);
        await dispatch(saveNotification({ userId, enabled: true })).unwrap();
      }

      setOptimisticState(null);
    } catch (error) {
      console.error('Error enabling notifications:', error);
      setOptimisticState(null);
      setShowMessage({ text: TEXT_CONSTANTS.ERROR_ENABLE, type: 'error' });
    }
  }, [dispatch, userId, t]);

  const handleDisableNotifications = useCallback(async () => {
    try {
      setOptimisticState(false);
      await dispatch(saveNotification({ userId, enabled: false })).unwrap();

      // TODO: Add API call if needed
      // if (userId) {
      //   await notificationApi.updateNotificationPreference(userId, false);
      //   await notificationApi.unregisterPushToken(userId);
      // }

      setShowMessage({ text: t(TEXT_CONSTANTS.SUCCESS_DISABLED), type: 'success' });

      setOptimisticState(null);
    } catch (error) {
      console.error('Error disabling notifications:', error);
      setOptimisticState(null);
      setShowMessage({ text: TEXT_CONSTANTS.ERROR_SAVE, type: 'error' });
    }
  }, [dispatch, userId, t]);

  const handleToggleChange = useCallback(
    async () => {
      const newValue = !isFullyEnabled;

      if (newValue) {
        if (systemPermission === 'denied') {
          setShowMessage({ text: TEXT_CONSTANTS.ERROR_DENIED, type: 'warning' });
        } else {
          await handleEnableNotifications();
        }
      } else {
        await handleDisableNotifications();
      }
    },
    [isFullyEnabled, systemPermission, handleEnableNotifications, handleDisableNotifications]
  );

  return (
    <div className="flex flex-col gap-2 w-full relative">
      {/* Toast notification */}
      {showMessage && (
        <div
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ${
            showMessage.type === 'success' ? 'bg-green-500 text-white' :
            showMessage.type === 'error' ? 'bg-red-500 text-white' :
            'bg-yellow-500 text-white'
          }`}
        >
          {showMessage.text}
        </div>
      )}

      <div
        className="flex justify-between items-center w-full"
        role="group"
        aria-labelledby="notification-toggle-label"
      >
        <label
          id="notification-toggle-label"
          className="font-poppins font-medium text-base text-[#00366B] cursor-pointer"
          onClick={handleToggleChange}
        >
          {t(TEXT_CONSTANTS.LABEL)}
        </label>

        <button
          onClick={handleToggleChange}
          disabled={systemPermission === 'denied'}
          role="switch"
          aria-checked={isFullyEnabled}
          aria-label="Toggle notifications"
          aria-describedby="notification-helper-text"
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0087FA] focus:ring-offset-2 ${
            isFullyEnabled ? 'bg-[#0087FA]' : 'bg-[#CCCCCC]'
          } ${systemPermission === 'denied' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 shadow-sm ${
              isFullyEnabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      <p
        id="notification-helper-text"
        className="w-[208px] font-poppins font-normal text-xs text-[#737373]"
      >
        {t(helperText)}
      </p>
    </div>
  );
};

export default NotificationToggle;