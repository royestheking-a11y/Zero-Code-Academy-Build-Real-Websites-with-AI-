
export interface Feature {
    id: string;
    title: string;
    description: string;
    status: 'planned' | 'in-progress' | 'completed';
    votes: number;
    icon?: any; // Ideally this should be a string name if stored in DB, or omitted from type if handled separately
}

export interface PricingPackage {
    id: string;
    name: string;
    originalPrice: number;
    price: number;
    popular: boolean;
    benefits: string[];
    accessLimit: number;
}

export interface GlobalOffer {
    isActive: boolean;
    endTime: string; // ISO string
    title: string;
}

export interface DemoVideo {
    id: string;
    title: string;
    description: string;
    youtubeUrl: string;
    thumbnail: string;
    duration?: string;
}

export interface Coupon {
    id: string;
    code: string;
    discountAmount: number;
    isActive: boolean;
}

export interface Notification {
    id: string;
    userId: string;
    type: 'payment' | 'enrollment' | 'routine' | 'system' | 'module';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    link?: string;
}

export interface RoutineItem {
    id: string;
    date: string;
    day: string;
    time: string;
    topic: string;
    platform: string;
    link: string;
    moduleId?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'admin';
    photo?: string;
    enrollments?: any[];
}
