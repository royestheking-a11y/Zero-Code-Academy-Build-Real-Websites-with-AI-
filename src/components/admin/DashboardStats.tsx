import {
    Users,
    DollarSign,
    TrendingUp,
    Clock,
    CheckCircle,
    Activity
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

interface DashboardStatsProps {
    enrollments: Enrollment[];
}

export const DashboardStats = ({ enrollments }: DashboardStatsProps) => {
    const totalEnrollments = enrollments.length;
    const confirmedEnrollments = enrollments.filter(e => e.status === "confirmed").length;
    const totalRevenue = enrollments
        .filter(e => e.status === "confirmed")
        .reduce((sum, e) => sum + e.price, 0);
    const pendingEnrollments = enrollments.filter(e => e.status === "pending").length;

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
                revenue: 0
            });
        }
        return result;
    };

    const last7DaysData = getLast7Days().map(day => {
        const dayEnrollments = enrollments.filter(e => e.enrolledAt.startsWith(day.date));
        return {
            ...day,
            enrollments: dayEnrollments.length,
            revenue: dayEnrollments
                .filter(e => e.status === "confirmed")
                .reduce((sum, e) => sum + e.price, 0)
        };
    });

    const stats = [
        {
            label: "মোট এনরোলমেন্ট",
            value: totalEnrollments,
            icon: Users,
            color: "primary",
            trend: "+12% last week"
        },
        {
            label: "মোট আয়",
            value: `৳${totalRevenue}`,
            icon: DollarSign,
            color: "accent",
            trend: "+8% last week"
        },
        {
            label: "কনফার্মড",
            value: confirmedEnrollments,
            icon: CheckCircle,
            color: "success",
            trend: "95% completion"
        },
        {
            label: "পেন্ডিং",
            value: pendingEnrollments,
            icon: Clock,
            color: "warning",
            trend: "Needs attention"
        }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-6">ওভারভিউ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}/10`}>
                                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                            </div>
                            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                                {stat.trend}
                            </span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* Enrollment Graph */}
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-bold text-foreground">এনরোলমেন্ট গ্রাফ (গত ৭ দিন)</h3>
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
                                    tickFormatter={(value) => `${value}`}
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
