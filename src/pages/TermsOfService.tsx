import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-24 pb-16">
                <div className="container-custom max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">টার্মস অফ সার্ভিস</h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                        <section>
                            <h2 className="text-xl font-bold mb-3">১. কোর্সের অ্যাক্সেস</h2>
                            <p>
                                এনরোল করার পর আপনি কোর্সের লাইফটাইম অ্যাক্সেস পাবেন। তবে, শেয়ার্ড অ্যাকাউন্ট বা পাইরেসি করার চেষ্টা করলে
                                বিনা নোটিশে অ্যাক্সেস বাতিল করা হতে পারে।
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">২. পেমেন্ট</h2>
                            <p>
                                কোর্সের ফি অফেরতযোগ্য (রিফান্ড পলিসি অনুযায়ী শর্তসাপেক্ষে)। পেমেন্ট করার সময় সঠিক তথ্য প্রদান করা আপনার দায়িত্ব।
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">৩. মেধা সম্পদ</h2>
                            <p>
                                কোর্সের সকল ভিডিও, রিসোর্স এবং কন্টেন্ট Zero Code-এর মেধা সম্পদ। এগুলো অনুমতি ছাড়া বিতরণ, বিক্রি বা কপি করা আইনত দণ্ডনীয় অপরাধ।
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">৪. আচরণবিধি</h2>
                            <p>
                                কমিউনিটি এবং ডিসকর্ড সার্ভারে সকলকে সম্মান বজায় রেখে কথা বলতে হবে। কোনো প্রকার হেইট স্পিচ বা স্প্যামিং গ্রহণযোগ্য নয়।
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">৫. দায়বধ্যতা</h2>
                            <p>
                                আমরা সর্বোচ্চ মানের শিক্ষা প্রদানে প্রতিশ্রুতিবদ্ধ, তবে ব্যক্তিগত সফলতার গ্যারান্টি আমরা প্রদান করি না, কারণ এটি আপনার প্রচেষ্টার উপর নির্ভরশীল।
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;
