import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Module } from '@/data/modules';
import { PricingPackage, Feature, RoutineItem, Coupon, DemoVideo, Notification, User } from '@/types/content';
// Import other types as needed, or define them here/shared file
// For now, I'll rely on TS inference or `any` if types are complex imports
// Auth Hooks
export const useLogin = () => {
    return useMutation({
        mutationFn: async (credentials: { email: string; studentId?: string; deviceId?: string }) => {
            const { data } = await api.post('/auth/login', credentials);
            return data;
        }
    });
};

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: async (userData: Partial<User>) => {
            const { data } = await api.put('/auth/profile', userData);
            return data; // Returns updated user
        }
    });
};


// --- Modules ---
export const useModules = () => {
    return useQuery({
        queryKey: ['modules'],
        queryFn: async () => {
            const { data } = await api.get('/content/modules');
            return data;
        }
    });
};


export const useCreateModule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newModule: any) => {
            const { data } = await api.post('/content/modules', newModule);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['modules'] });
        }
    });
};

export const useUpdateModule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updatedModule: any) => {
            const { data } = await api.put(`/content/modules/${updatedModule.id}`, updatedModule);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['modules'] });
        }
    });
};

export const useDeleteModule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/content/modules/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['modules'] });
        }
    });
};

// --- Features ---
export const useFeatures = () => {
    return useQuery({
        queryKey: ['features'],
        queryFn: async () => {
            const { data } = await api.get('/content/features');
            return data;
        }
    });
};

// --- Pricing ---
export const usePricing = () => {
    return useQuery({
        queryKey: ['pricing'],
        queryFn: async () => {
            const { data } = await api.get('/content/pricing');
            return data;
        }
    });
};

// --- Routine ---
export const useRoutine = () => {
    return useQuery({
        queryKey: ['routine'],
        queryFn: async () => {
            const { data } = await api.get('/content/routine');
            return data;
        }
    });
};

// --- Offer ---
export const useOffer = () => {
    return useQuery({
        queryKey: ['offer'],
        queryFn: async () => {
            const { data } = await api.get('/content/offer');
            return data;
        }
    });
};

// --- Demo Videos ---
export const useDemoVideos = () => {
    return useQuery({
        queryKey: ['demoVideos'],
        queryFn: async () => {
            const { data } = await api.get('/content/demo-videos');
            return data;
        }
    });
};

// --- Coupons ---
export const useCoupons = () => {
    return useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const { data } = await api.get('/content/coupons');
            return data;
        }
    });
};

export const useAddCoupon = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (coupon: any) => {
            const { data } = await api.post('/content/coupons', coupon);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['coupons'] });
        }
    });
};

export const useDeleteCoupon = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/content/coupons/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['coupons'] });
        }
    });
};

// --- Feature Mutations ---
export const useCreateFeature = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newFeature: any) => {
            const { data } = await api.post('/content/features', newFeature);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['features'] });
        }
    });
};

export const useUpdateFeature = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updatedFeature: any) => {
            const { data } = await api.put(`/content/features/${updatedFeature.id}`, updatedFeature);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['features'] });
        }
    });
};

export const useDeleteFeature = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/content/features/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['features'] });
        }
    });
};

// --- Pricing Mutations ---
export const useCreatePricing = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newPricing: any) => {
            const { data } = await api.post('/content/pricing', newPricing);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pricing'] });
        }
    });
};

export const useUpdatePricing = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updatedPricing: any) => {
            const { data } = await api.put(`/content/pricing/${updatedPricing.id}`, updatedPricing);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pricing'] });
        }
    });
};

export const useDeletePricing = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/content/pricing/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pricing'] });
        }
    });
};

// --- Offer Mutations ---
export const useUpdateOffer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updatedOffer: any) => {
            const { data } = await api.put('/content/offer', updatedOffer); // Offer is singleton, often PUT /content/offer or similar
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offer'] });
        }
    });
};

// --- Routine Mutations ---
export const useCreateRoutine = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newRoutine: any) => {
            const { data } = await api.post('/content/routine', newRoutine);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['routine'] });
        }
    });
};

export const useUpdateRoutine = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updatedRoutine: any) => {
            const { data } = await api.put(`/content/routine/${updatedRoutine.id}`, updatedRoutine);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['routine'] });
        }
    });
};

export const useDeleteRoutine = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/content/routine/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['routine'] });
        }
    });
};

// --- DemoVideo Mutations ---
export const useCreateDemoVideo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newVideo: any) => {
            const { data } = await api.post('/content/demo-videos', newVideo);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['demoVideos'] });
        }
    });
};

export const useUpdateDemoVideo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updatedVideo: any) => {
            const { data } = await api.put(`/content/demo-videos/${updatedVideo.id}`, updatedVideo);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['demoVideos'] });
        }
    });
};

export const useDeleteDemoVideo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/content/demo-videos/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['demoVideos'] });
        }
    });
};

// --- Notification Hooks ---
export const useNotifications = (userId: string) => {
    return useQuery({
        queryKey: ['notifications', userId],
        queryFn: async () => {
            if (!userId) return [];
            const { data } = await api.get(`/content/notifications?userId=${userId}`);
            return data;
        },
        enabled: !!userId
    });
};

export const useAddNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (notification: any) => {
            const { data } = await api.post('/content/notifications', notification);
            return data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['notifications', variables.userId] });
        }
    });
};

export const useMarkRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userId: string) => {
            await api.put(`/content/notifications/${userId}/read`, {});
        },
        onSuccess: (data, userId) => {
            queryClient.invalidateQueries({ queryKey: ['notifications', userId] });
        }
    });
};


// --- Enrollments ---
export interface Enrollment {
    _id?: string;
    id?: string;
    name: string;
    email: string;
    mobile: string;
    packageName?: string;
    packageId?: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    coupon?: string;
    paymentMethod?: string;
    trxId?: string;
    referenceCode?: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    enrolledAt: string;
}

export const useEnrollments = () => {
    return useQuery({
        queryKey: ['enrollments'],
        queryFn: async () => {
            const { data } = await api.get('/enrollments');
            return data as Enrollment[];
        }
    });
};

export const useCheckEnrollment = (email: string) => {
    return useQuery({
        queryKey: ['enrollment-check', email],
        queryFn: async () => {
            const { data } = await api.get(`/enrollments/check/${email}`);
            return data;
        },
        enabled: !!email
    });
};

export const useCreateEnrollment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (enrollment: Omit<Enrollment, '_id' | 'id'>) => {
            const { data } = await api.post('/enrollments', enrollment);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['enrollments'] });
        }
    });
};

export const useUpdateEnrollment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updates }: { id: string } & Partial<Enrollment>) => {
            const { data } = await api.put(`/enrollments/${id}`, updates);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['enrollments'] });
        }
    });
};

export const useDeleteEnrollment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/enrollments/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['enrollments'] });
        }
    });
};
