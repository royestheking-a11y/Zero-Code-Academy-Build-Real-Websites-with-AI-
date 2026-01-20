import { useState, useEffect } from 'react';
import axios from 'axios';

const PUBLIC_VAPID_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export const usePushSubscription = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if SW is ready and if we already have a subscription
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then(async (registration) => {
                const subscription = await registration.pushManager.getSubscription();
                if (subscription) {
                    setIsSubscribed(true);
                }
            });
        }
    }, []);

    const subscribeToPush = async () => {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            console.error('Push notifications are not supported');
            return;
        }

        setLoading(true);
        try {
            const registration = await navigator.serviceWorker.ready;

            // Subscribe the user
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
            });

            // Send subscription to backend
            await axios.post('http://localhost:5000/api/push/subscribe', subscription);

            setIsSubscribed(true);
            console.log('Push subscription successful');
        } catch (error) {
            console.error('Failed to subscribe to push notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    return { isSubscribed, subscribeToPush, loading };
};
