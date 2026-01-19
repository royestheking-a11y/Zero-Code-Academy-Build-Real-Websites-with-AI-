import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    structuredData?: any;
}

export const SEO = ({
    title,
    description,
    keywords = [],
    image = "https://zerocodeacademy.vercel.app/og-image.png",
    url = "https://zerocodeacademy.vercel.app",
    structuredData
}: SEOProps) => {
    const siteTitle = `${title} | Zero Code Academy`;

    return (
        <Helmet>
            {/* Basic Metadata */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            {keywords.length > 0 && (
                <meta name="keywords" content={keywords.join(", ")} />
            )}

            {/* Open Graph */}
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Zero Code Academy" />

            {/* Twitter */}
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:card" content="summary_large_image" />

            {/* Structured Data (JSON-LD) */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};
