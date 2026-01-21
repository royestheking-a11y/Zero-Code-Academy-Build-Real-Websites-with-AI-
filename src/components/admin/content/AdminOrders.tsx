import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Search, Filter, Download, Paperclip, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const AdminOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
            const res = await axios.get(`${apiUrl}/orders`);
            setOrders(res.data);
        } catch (error) {
            toast.error('অর্ডার লোড করতে সমস্যা হয়েছে');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id: string, field: string, value: string) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

            // If marking order as Processing/Completed, auto-mark payment as Paid if it's not already
            if (field === 'status' && (value === 'Processing' || value === 'Completed')) {
                await axios.put(`${apiUrl}/orders/${id}/status`, { status: value, paymentStatus: 'Paid' });
                toast.success(`অর্ডার স্ট্যাটাস ${value} এবং পেমেন্ট ভেরিফাইড করা হয়েছে`);
            } else {
                await axios.put(`${apiUrl}/orders/${id}/status`, { [field]: value });
                toast.success('আপডেট সফল হয়েছে');
            }
            fetchOrders(); // Refresh
        } catch (error) {
            toast.error('স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("আপনি কি নিশ্চিত যে এই অর্ডারটি ডিলিট করতে চান?")) return;

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
            await axios.delete(`${apiUrl}/orders/${id}`);
            toast.success('অর্ডার মুছে ফেলা হয়েছে');
            fetchOrders();
        } catch (error) {
            toast.error('অর্ডার মুছতে সমস্যা হয়েছে');
        }
    };

    const filteredOrders = orders.filter(order =>
        order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.whatsapp?.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold">মার্কেটপ্লেস অর্ডার</h2>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="অর্ডার খুঁজুন..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Download className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="border rounded-xl bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>অর্ডার আইডি</TableHead>
                            <TableHead>কাস্টমার</TableHead>
                            <TableHead>আইটেম/প্রজেক্ট</TableHead>
                            <TableHead>ফাইল</TableHead>
                            <TableHead>মূল্য</TableHead>
                            <TableHead>পেমেন্ট ইনফো</TableHead>
                            <TableHead>অবস্থা (Status)</TableHead>
                            <TableHead>তারিখ</TableHead>
                            <TableHead>অ্যাকশন</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9} className="text-center py-8">লোড হচ্ছে...</TableCell>
                            </TableRow>
                        ) : filteredOrders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell className="font-mono font-medium">{order.orderId}</TableCell>
                                <TableCell>
                                    <div className="font-semibold">{order.customerName}</div>
                                    <div className="text-xs text-muted-foreground">{order.whatsapp}</div>
                                </TableCell>
                                <TableCell className="max-w-[200px]">
                                    <div className="truncate text-sm">
                                        {order.items?.map((i: any) => i.title).join(', ') || order.projectRef || 'কাস্টম রিকোয়েস্ট'}
                                    </div>
                                    <Badge variant="outline" className="text-[10px] mt-1">{order.orderType}</Badge>
                                </TableCell>
                                <TableCell>
                                    {order.files && order.files.length > 0 ? (
                                        <div className="flex flex-col gap-1">
                                            {order.files.map((file: any, idx: number) => (
                                                <Button
                                                    key={idx}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-auto p-0 flex items-center gap-1 text-xs text-blue-600 hover:underline justify-start"
                                                    onClick={() => {
                                                        // Force download using Cloudinary flag or generic download
                                                        let url = file.url;
                                                        if (url.includes('cloudinary.com') && url.includes('/upload/')) {
                                                            url = url.replace('/upload/', '/upload/fl_attachment/');
                                                        }
                                                        window.open(url, '_blank');
                                                    }}
                                                >
                                                    <Download className="w-3 h-3" />
                                                    Download {file.name || 'File'}
                                                </Button>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground text-xs">-</span>
                                    )}
                                </TableCell>
                                <TableCell className="font-bold">৳{order.totalPrice}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <div className="text-sm font-medium capitalize">{order.paymentMethod}</div>
                                        {order.paymentReference && (
                                            <div className="text-xs text-muted-foreground font-mono select-all bg-muted px-1 rounded w-fit">
                                                Ref: {order.paymentReference}
                                            </div>
                                        )}
                                        <div className={`text-[10px] px-1.5 py-0.5 rounded-full w-fit ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' :
                                            order.paymentStatus === 'Failed' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {order.paymentStatus === 'Paid' ? 'পরিশোধিত' :
                                                order.paymentStatus === 'Failed' ? 'ব্যর্থ' : 'অপেক্ষমান'}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue={order.status}
                                        onValueChange={(val) => updateStatus(order._id, 'status', val)}
                                    >
                                        <SelectTrigger className={`h-8 w-[110px] border-none text-xs font-bold text-white ${order.status === 'Completed' ? 'bg-green-600' :
                                            order.status === 'Processing' ? 'bg-blue-600' : 'bg-slate-500'
                                            }`}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Pending">Pending (অপেক্ষমান)</SelectItem>
                                            <SelectItem value="Processing">Processing (চলমান)</SelectItem>
                                            <SelectItem value="Completed">Completed (সম্পন্ন)</SelectItem>
                                            <SelectItem value="Cancelled">Cancelled (বাতিল)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-muted-foreground text-xs">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                        onClick={() => handleDelete(order._id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminOrders;
