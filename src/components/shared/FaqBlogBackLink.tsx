import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { FaqSection } from "./FaqSection";
import fetchFaq from "@/db/faqCmsDb";
import BacklinkCalculatorCard from "./BacklinkCalculatorCard";
import { backlinks } from "@/lib/cms/calculators/calculatorpage";
import { blogPosts } from "@/lib/cms/blogpage";
import fetchBlog from "@/db/blogCmsDb";
import useAdminToken from "@/hooks/token";
import { FAQItem } from "@/lib/types";

export function FaqBlogBacklink({ page, category, faqSection }: { page: String, category: String, faqSection: FAQItem[] }) {
    // Fetch the FAQ array for this specific page layout string
    const [faqItems, setFaqItems] = useState(faqSection);
    const [blogs, setBlogs] = useState(blogPosts);
    const { adminAuthToken } = useAdminToken();
    useEffect(() => {
        let isCurrent = true;
        const token = adminAuthToken ?? '';

        void (async () => {
            const faqData = await fetchFaq(`${page}`, token);
            const specificBlog = await fetchBlog("how-to-train-your-dog", token);

            if (!isCurrent) return;

            // If FAQ fetch fails or returns no items, fall back to the prop.
            // If you prefer “show nothing” instead, replace `faqSection` with `[]`.
            setFaqItems(Array.isArray(faqData?.items) ? faqData.items : faqSection);

            setBlogs(
                Array.isArray(specificBlog?.posts)
                    ? specificBlog.posts
                    : (blogPosts ?? []),
            );
        })();

        return () => {
            isCurrent = false;
        };
    }, [adminAuthToken, page, category, faqSection]);
    return (
        <>
            {/* Backlinks || Other Calculators and services */}
            {(() => {
                // Map only 2 random calculators (exclude Dog Age itself)
                const eligibleCards = backlinks.filter(
                    (card) => card.cta.href !== `/calculators/${page}`,
                );

                const stableIndexSeed = `${page}-${category}`;
                let hash = 0;
                for (let i = 0; i < stableIndexSeed.length; i++) {
                    hash = (hash * 31 + stableIndexSeed.charCodeAt(i)) >>> 0;
                }

                const start =
                    eligibleCards.length === 0 ? 0 : hash % eligibleCards.length;
                const cards = [
                    eligibleCards[start],
                    eligibleCards[(start + 1) % eligibleCards.length],
                ].filter(Boolean);

                return <BacklinkCalculatorCard cards={cards} />
            })()}

            <div className="mt-8 grid items-center justify-center grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {(() => {
                    const quizblogPosts = blogs.filter(
                        (post) => post.category === category,
                    );
                    if (quizblogPosts.length === 0) return null;
                    return quizblogPosts.map((article) => (
                        <BlogCard key={article.url} {...article} />
                    ));
                })()}
            </div>

            {faqItems.length > 0 ? (
                <section
                    className="mt-10"
                    aria-label="About frequently asked questions"
                >
                    <FaqSection items={faqItems} />
                </section>
            ) : null}
        </>
    )
}