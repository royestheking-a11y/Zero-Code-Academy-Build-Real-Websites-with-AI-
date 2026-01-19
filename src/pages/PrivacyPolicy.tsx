import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-24 pb-16">
                <div className="container-custom max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">প্রাইভেসি পলিসি</h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                        <section>
                            <h2 className="text-xl font-bold mb-3">১. আমরা কি কি তথ্য সংগ্রহ করি?</h2>
                            <p>
                                আমরা আমাদের শিক্ষার্থীদের নাম, ইমেইল এড্রেস, ফোন নাম্বার এবং এনরোলমেন্ট সংক্রান্ত তথ্য সংগ্রহ করি।
                                এছাড়াও ওয়েবসাইটের পারফরম্যান্স এবং ইউজার এক্সপেরিয়েন্স উন্নত করার জন্য কুকিজ ব্যবহার করা হতে পারে।
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">২. তথ্যের ব্যবহার</h2>
                            <p>
                                আপনার প্রদানকৃত তথ্য শুধুমাত্র কোর্স এনরোলমেন্ট, সাপোর্ট প্রদান এবং আমাদের সার্ভিস উন্নত করার কাজে ব্যবহার করা হয়।
                                আমরা আপনার ব্যক্তিগত তথ্য তৃতীয় কোনো পক্ষের সাথে শেয়ার করি না।
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">৩. নিরাপত্তা</h2>
                            <p>
                                আপনার তথ্যের নিরাপত্তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। আমরা নিরাপদ সার্ভার এবং এনক্রিপশন প্রযুক্তি ব্যবহার করি
                                যাতে আপনার ডাটা সুরক্ষিত থাকে।
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">৪. পলিসি আপডেট</h2>
                            <p>
                                যেকোনো সময় আমাদের প্রাইভেসি পলিসি পরিবর্তন করার অধিকার আমরা রাখি। গুরুত্বপূর্ণ পরিবর্তনের ক্ষেত্রে
                                আমরা ইমেইল বা নোটিফিকেশনের মাধ্যমে জানিয়ে দেব।
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">৫. যোগাযোগ</h2>
                            <p>
                                প্রাইভেসি পলিসি নিয়ে কোনো প্রশ্ন থাকলে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন: support@zerocode.bd
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
