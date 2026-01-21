import {
    Users,
    DollarSign,
    TrendingUp,
    Clock,
    CheckCircle,
    Activity,
    ShoppingCart,
    Layout
} from "lucide-react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from "recharts";

interface Enrollment {
    price: number;
    status: string;
    enrolledAt: string;
}

interface Order {
    totalPrice: number;
    paymentStatus: string;
    status: string;
    createdAt: string;
}

interface Project {
    _id: string;
}

interface DashboardStatsProps {
    enrollments: Enrollment[];
    orders: Order[];
    projects: Project[];
}

export const DashboardStats = ({ enrollments = [], orders = [], projects = [] }: DashboardStatsProps) => {
    // Enrollments Stats
    const totalEnrollments = enrollments.length;
    const confirmedEnrollments = enrollments.filter(e => e.status === "confirmed").length;
    const enrollmentRevenue = enrollments
        .filter(e => e.status === "confirmed")
        .reduce((sum, e) => sum + e.price, 0);

    // Orders Stats
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === "Completed" || o.paymentStatus === "Paid").length;
    const orderRevenue = orders
        .filter(o => o.paymentStatus === "Paid")
        .reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    const pendingOrders = orders.filter(o => o.status === "Processing" || o.status === "Pending").length;

    // Total Stats
    const totalRevenue = enrollmentRevenue + orderRevenue;
    const totalProjects = projects.length;

    // Process Chart Data (Last 7 Days)
    const getLast7Days = () => {
        const result = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0]; // YYYY-MM-DD
            result.push({
                date: dateStr,
                name: d.toLocaleDateString('bn-BD', { weekday: 'short' }), // Day name in Bangla
                enrollments: 0,
                revenue: 0,
                orders: 0
            });
        }
        return result;
    };

    const last7DaysData = getLast7Days().map(day => {
        const dayEnrollments = enrollments.filter(e => e.enrolledAt.startsWith(day.date));
        const dayOrders = orders.filter(o => o.createdAt.startsWith(day.date));

        const dayEnrollmentRevenue = dayEnrollments
            .filter(e => e.status === "confirmed")
            .reduce((sum, e) => sum + e.price, 0);

        const dayOrderRevenue = dayOrders
            .filter(o => o.paymentStatus === "Paid")
            .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

        return {
            ...day,
            enrollments: dayEnrollments.length,
            orders: dayOrders.length,
            revenue: dayEnrollmentRevenue + dayOrderRevenue
        };
    });

    const stats = [
        {
            label: "মোট আয় (Total)",
            value: `৳${totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: "accent",
            trend: "All time revenue"
        },
        {
            label: "এনরোলমেন্ট",
            value: totalEnrollments,
            icon: Users,
            color: "primary",
            trend: `${confirmedEnrollments} Active`
        },
        {
            label: "মার্কেটপ্লেস অর্ডার",
            value: totalOrders,
            icon: ShoppingCart,
            color: "success",
            trend: `৳${orderRevenue.toLocaleString()} Revenue`
        },
        {
            label: "অ্যাক্টিভ প্রজেক্ট",
            value: totalProjects,
            icon: Layout,
            color: "warning",
            trend: "In Marketplace"
        },
        {
            label: "পেন্ডিং অর্ডার",
            value: pendingOrders,
            icon: Clock,
            color: "error", // Using custom class handling usually, but fallback to text-red-500
            trend: "Action Needed"
        }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-6">ওভারভিউ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${stat.color === 'error' ? 'red-500' : stat.color === 'accent' ? 'amber-500' : stat.color === 'success' ? 'green-500' : 'blue-500'}/10`}>
                                <stat.icon className={`w-5 h-5 ${stat.color === 'error' ? 'text-red-500' : stat.color === 'accent' ? 'text-amber-500' : stat.color === 'success' ? 'text-green-500' : 'text-blue-500'}`} />
                            </div>
                            <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-1 rounded-full whitespace-nowrap">
                                {stat.trend}
                            </span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* Activity Graph */}
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-bold text-foreground">অ্যাক্টিভিটি গ্রাফ (গত ৭ দিন)</h3>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={last7DaysData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis
                                    dataKey="name"
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--muted))' }}
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                />
                                <Bar
                                    dataKey="enrollments"
                                    name="Enrollments"
                                    fill="hsl(var(--primary))"
                                    radius={[4, 4, 0, 0]}
                                    stackId="a"
                                />
                                <Bar
                                    dataKey="orders"
                                    name="Orders"
                                    fill="hsl(var(--destructive))" // using destructve/red for contrast or secondary color
                                    radius={[4, 4, 0, 0]}
                                    stackId="a"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Analytics */}
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="w-5 h-5 text-success" />
                        <h3 className="text-lg font-bold text-foreground">রেভিনিউ এনালিটিক্স (গত ৭ দিন)</h3>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={last7DaysData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis
                                    dataKey="name"
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `৳${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    name="Revenue"
                                    stroke="hsl(var(--success))"
                                    strokeWidth={2}
                                    dot={{ fill: 'hsl(var(--success))', strokeWidth: 2 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};
