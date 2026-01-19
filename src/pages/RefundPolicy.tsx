import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-24 pb-16">
                <div className="container-custom max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">রিফান্ড পলিসি</h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                        <section>
                            <h2 className="text-xl font-bold mb-3">৭ দিনের মানি ব্যাক গ্যারান্টি</h2>
                            <p>
                                আমরা আমাদের কোর্সের মান নিয়ে আত্মবিশ্বাসী। তবুও, কোনো কারণে যদি আপনি সন্তুষ্ট না হন,
                                এনরোল করার ৭ দিনের মধ্যে রিফান্ড ক্লেইম করতে পারবেন।
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">রিফান্ড পাওয়ার শর্তাবলী</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>এনরোলমেন্টের ৭ দিনের মধ্যে আবেদন করতে হবে।</li>
                                <li>কোর্সের ২০% এর বেশি কন্টেন্ট দেখা হলে রিফান্ড প্রযোজ্য হবে না।</li>
                                <li>বিনা কারণে বা শুধুমাত্র রিসোর্স নেওয়ার উদ্দেশ্যে এনরোল করলে রিফান্ড বাতিল হতে পারে।</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">কিভাবে আবেদন করবেন?</h2>
                            <p>
                                রিফান্ডের জন্য আপনার এনরোলমেন্ট ইমেইল থেকে আমাদের সাপোর্ট ইমেইলে (support@zerocode.bd) মেইল করুন।
                                বিষয় হিসেবে "Refund Request" লিখুন এবং আপনার ট্রানজেকশন আইডি যুক্ত করুন।
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">রিফান্ড প্রসেসিং সময়</h2>
                            <p>
                                যথাযথ যাচাই-বাছাই শেষে আপনার রিফান্ড অ্যাপ্রুভ হলে ৩-৫ কর্মদিবসের মধ্যে আপনার পেমেন্ট মেথডে টাকা ফেরত পাঠানো হবে।
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RefundPolicy;
