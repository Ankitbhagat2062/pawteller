import { fetchSeo } from "@/db/seoCmsDb";
import type { FAQItem, FooterSection, SectionProps, seoProps } from "@/lib/types";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Blog", href: "/blog" },
  { label: "Quiz", href: "/quiz?quiz=breed-match" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerSections: FooterSection[] = [
  {
    title: "Tools",
    links: [
      { label: "Breed Calculator", href: "/calculators/dog-name" },
      { label: "Food Calculator", href: "/calculators/dog-food" },
      { label: "Age Calculator", href: "/calculators/dog-age" },
      { label: "Weight Tracker", href: "/calculators/puppy-weight" },
    ],
  },
  {
    title: "Content",
    links: [
      { label: "Breed Quiz", href: "/quiz?quiz=breed-match" },
      { label: "Blog", href: "/blog" },
      { label: "Care Guides", href: "/guides" },
      { label: "Pet Health", href: "/health" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];
// terms
export const toc: { id: string; label: string }[] = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "calculators", label: "Use of Calculators" },
  {
    id: "educational-disclaimer",
    label: "Educational Information Disclaimer",
  },
  { id: "no-vet-advice", label: "No Veterinary Advice" },
  { id: "availability", label: "Website Availability" },
  { id: "ip", label: "Intellectual Property" },
  { id: "submissions", label: "User Submissions" },
  { id: "third-party", label: "Third-Party Links" },
  { id: "limitation", label: "Limitation of Liability" },
  { id: "changes", label: "Changes to Terms" },
  { id: "contact", label: "Contact" },
];
// privacy
export const SECTIONS: SectionProps[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content:
      "We collect information you provide directly to us, such as when you create an account (if applicable), submit a form, contact us, or subscribe to emails. We may also collect information automatically, such as device and usage data (for example, pages viewed, approximate location, and browser type).",
  },
  {
    id: "how-we-use-information",
    title: "How We Use Information",
    content:
      "We use the information we collect to operate and improve Pawteller, provide calculators and content, personalize user experience, respond to questions and requests, and send transactional or requested communications. We also use information to monitor performance and security and to prevent fraudulent or harmful activity.",
  },
  {
    id: "email-subscriptions",
    title: "Email Subscriptions",
    content:
      "If you subscribe to emails, we may send you newsletters, updates, and relevant content. You can unsubscribe at any time by using the unsubscribe link in the email or by contacting us. We only use your email for the purposes described at the time of subscription.",
  },
  {
    id: "analytics",
    title: "Analytics",
    content:
      "We use analytics tools to understand how visitors interact with our site. These tools help us measure usage, improve content, and identify issues. Analytics data is typically aggregated or de-identified, though it may still be linked to device identifiers depending on the provider.",
  },
  {
    id: "advertising",
    title: "Advertising",
    content:
      "We may display advertisements or work with advertising partners. These partners may use cookies or similar technologies to deliver ads based on your interests and to measure ad performance. You can usually manage ad targeting through your browser settings or the opt-out options provided by the advertising partners.",
  },
  {
    id: "cookies",
    title: "Cookies",
    content:
      "We use cookies and similar technologies to make the site work properly, remember preferences, and analyze traffic. You can control cookies through your browser settings. Disabling cookies may affect certain features and parts of the site.",
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    content:
      "We may use third-party vendors and service providers (such as hosting, analytics, and communication services). These third parties may process data on our behalf according to their terms and privacy practices. We aim to select providers that help protect data and use it only for the services they provide.",
  },
  {
    id: "data-rights",
    title: "Data Rights",
    content:
      "Depending on your location, you may have rights regarding your personal information, such as access, correction, deletion, portability, or objection to certain processing. To make a request, contact us using the information in the Contact section. We may need to verify your identity before fulfilling certain requests.",
  },
  {
    id: "contact",
    title: "Contact",
    content:
      "Questions about this Privacy Policy, privacy requests, or data concerns can be sent to: support@pawteller.com. We will respond as soon as reasonably possible.",
  },
] as const;

export const fetchData = async ({pageKey , adminToken}: {pageKey: string, adminToken?: string}) => {
  const seoData = await fetchSeo(pageKey, adminToken);
  return seoData;
}

export const FAQ = {
  "home": [
    {
      id: "how-to-use-calculators",
      question: "How do I use Pawteller’s calculators?",
      answer:
        "Choose the calculator that matches what you want to know (puppy weight, dog age, food portion, pregnancy, growth, or name ideas). Enter the required details, then review the results—Pawteller is designed to make estimates easy to understand so you can make informed next steps for your dog’s health.",
    },
    {
      id: "are-results-accurate",
      question: "Are Pawteller’s results accurate?",
      answer:
        "Pawteller uses practical, vet-informed guidance to estimate ranges and timelines. Because every dog is unique, always treat results as guidance—not a diagnosis. If you’re dealing with medical concerns or unusual symptoms, consult your veterinarian.",
    },
    {
      id: "what-do-i-need-to-know",
      question: "What information do I need before I calculate anything?",
      answer:
        "Most calculators require a small set of inputs (for example: puppy age in months, current weight, or lifestyle/activity info). You’ll see the exact fields on each calculator page so you can submit with confidence.",
    },
    {
      id: "puppy-weight-vs-growth",
      question: "What’s the difference between puppy weight and growth tracking?",
      answer:
        "The Puppy Weight calculator helps estimate adult size from current age/weight. Growth tracking is for monitoring how a dog’s weight changes over time and seeing a curve compared to typical ranges.",
    },
    {
      id: "dog-food-portion-guidance",
      question: "Does the food portion calculator replace vet nutrition advice?",
      answer:
        "No. The Dog Food calculator provides a helpful estimate of daily calories and cups based on general guidance. Your vet may recommend different targets based on your dog’s condition, allergies, weight goals, and activity level.",
    },
    {
      id: "breed-quiz-compatibility",
      question: "How does the breed compatibility quiz work?",
      answer:
        "Answer a few quick questions about your lifestyle and household. Pawteller matches you with your top breed recommendations so you can compare energy, size, and care needs—then explore calculators and guides relevant to your choice.",
    },
    {
      id: "where-to-find-more-guides",
      question: "Where can I find more dog care information?",
      answer:
        "Visit the Knowledge Base / blog section for practical, easy-to-apply guides. Topics are designed to complement the calculators and help you understand what the numbers mean in real life.",
    },
    {
      id: "safety-and-privacy",
      question: "Is Pawteller safe to use, and is my information private?",
      answer:
        "Pawteller is built for pet-care education. Results are estimates and should not be used as medical instructions. If you share personal info through the site, it should only be used for its intended purpose—always review the relevant site pages for the latest privacy and safety details.",
    },
  ],
  "quiz": [
    {
      question: "How does the quiz work?",
      answer:
        "You answer a series of lifestyle questions. We score each breed based on your selections and then show your best-fit matches.",
    },
    {
      question: "Is the quiz a guarantee?",
      answer:
        "No—every dog is an individual. The results are meant to help you narrow down good matches before you meet and evaluate specific breeds.",
    },
    {
      question: "How accurate are the results?",
      answer:
        "Accuracy depends on how closely your answers reflect your real lifestyle and needs. If your situation changes, your best-fit breed may change too.",
    },
    {
      question: "Do you store my information?",
      answer:
        "We only use your details to deliver your personalized quiz results. We do not sell your information.",
    },
    {
      question: "Can I retake the quiz?",
      answer:
        "Yes. You can restart anytime and get results for a different set of preferences.",
    },
  ],
  "puppyweight": [
    {
      question: "How accurate is the weight prediction?",
      answer: "Our predictions are accurate within ±15% for most breeds when using data from puppies 8+ weeks old. Accuracy improves with age. Mixed-breed predictions use the average of the closest matching breeds.",
    },
    {
      question: "Does gender affect a puppy's adult weight?",
      answer: "Yes — males typically weigh 10–20% more than females in most breeds. Our algorithm factors in sex when available, and our ranges reflect the typical variation between male and female dogs.",
    },
    {
      question: "Why is my puppy growing faster than the chart?",
      answer: "Every individual puppy is different. Rapid growth isn't always good — it can put stress on developing bones and joints. If your puppy is significantly above the curve, consult your vet about caloric intake and potential nutritional adjustments.",
    },
    {
      question: "At what age do giant breeds stop growing?",
      answer: "Giant breeds like Great Danes and Saint Bernards may not reach their full adult size until 18–24 months. Even after skeletal growth stops, they continue to 'fill out' and gain muscle mass for several more months.",
    },
    {
      question: "Should I be worried if my puppy is small for their breed?",
      answer: "Not necessarily. Some puppies are naturally smaller due to genetics. However, if your puppy is consistently below 80% of the expected weight for their age, it's worth a vet visit to rule out parasites, nutritional deficiencies, or underlying health issues.",
    },
  ],
  "dogpregnancy": [
    {
      id: "faq-1",
      question: "Can I feed my dog puppy food during pregnancy?",
      answer:
        "Yes, from week 6 onwards, it's often recommended to switch to high-quality puppy food as it contains more calories and calcium needed for the developing puppies and milk production.",
    },
    {
      id: "faq-2",
      question: "How many puppies will my dog have?",
      answer:
        "Litter size depends heavily on breed and individual health. Small breeds typically have 1–4 puppies, while large breeds can have 6–12 or more. An ultrasound around day 25 or X-ray after day 55 can give an accurate count.",
    },
    {
      id: "faq-3",
      question: "Should I exercise my pregnant dog?",
      answer:
        "Light to moderate exercise is beneficial in early pregnancy. Avoid strenuous activity and rough play, especially in the final three weeks. Gentle walks are ideal throughout pregnancy.",
    },
    {
      id: "faq-4",
      question: "How do I know if labor has started?",
      answer:
        "Signs include restlessness, nesting behavior, loss of appetite, and a drop in rectal temperature below 100°F (37.8°C). Active labor begins with visible contractions and straining.",
    },
  ],
  "dogname": [
    {
      question: "How many dog names should I consider?",
      answer:
        "We recommend generating at least 10-15 name options to choose from. This gives you plenty of variety to test and see what feels right for your new puppy or dog.",
    },
    {
      question: "Can I change my dog's name if I've been using another one?",
      answer:
        "Yes! Dogs can learn new names at any age with consistent training and positive reinforcement. It may take a few weeks for them to adjust, but it's definitely possible.",
    },
    {
      question: "What makes a good dog name?",
      answer:
        "Good dog names are short (1-2 syllables), easy to pronounce, don't sound like commands, and reflect your dog's personality. They should feel natural when you say them out loud.",
    },
    {
      question: "Should I match the name to my dog's size?",
      answer:
        "While not necessary, many people prefer matching name style to dog size. Shorter, punchier names work great for small dogs, while longer, stronger names suit larger breeds. Ultimately, choose what feels right!",
    },
    {
      question: "Are unique names better than popular ones?",
      answer:
        "It depends on your preference! Popular names are recognizable and classic, while unique names help your dog stand out. Both can work equally well as long as you love the name and your dog responds to it.",
    },
    {
      question: "How do I test if a name works for my dog?",
      answer:
        "Try calling the name out loud in different situations. See if you feel comfortable saying it at the dog park, at the vet, and at home. Your dog will also give you feedback on whether they respond to the sound of the name.",
    },
  ],
  "doggrowth": [
    {
      id: "gfaq-1",
      question: "How accurate is the puppy growth calculator?",
      answer:
        "The calculator uses established veterinary growth curves based on adult weight classifications (toy, small, medium, large, and giant). While it provides a highly accurate statistical baseline for standard development, individual growth spurts can vary depending on genetics, diet, and gender.",
    },
    {
      id: "gfaq-2",
      question: "At what age do puppies completely stop growing?",
      answer:
        "It depends heavily on the breed size. Toy and small breeds often reach their full adult size between 9 to 12 months. Medium breeds take about 12 months, while large and giant breeds (like Golden Retrievers or Great Danes) can continue filling out and growing structurally until they are 18 to 24 months old.",
    },
    {
      id: "gfaq-3",
      question: "What should I do if my puppy is tracking above or below the curve?",
      answer:
        "Slight deviations are normal, but a sudden spike or drop across growth percentiles warrants a check-in with your vet. Growing too fast can put dangerous stress on a large breed's developing joints, while falling behind could indicate nutritional gaps or underlying parasite issues.",
    },
    {
      id: "gfaq-4",
      question: "How does spaying or neutering affect my puppy's growth?",
      answer:
        "Early spaying or neutering removes sex hormones that signal the growth plates in a puppy's bones to close. Doing this too early can cause the bones to grow slightly longer than normal, which is why modern veterinary guidelines often recommend waiting until large or giant breeds are structurally mature.",
    },
  ],
  "dogfood": [
    {
      id: "dfaq-1",
      question: "Is the calorie number based on scientific veterinary formulas?",
      answer:
        "Yes. The calculator uses RER (70 × (kg)^0.75) as the baseline, then applies multipliers for life stage and activity level—an approach consistent with how veterinary nutrition assessments estimate energy needs.",
    },
    {
      id: "dfaq-2",
      question: "Why do “cups per day” vary between brands?",
      answer:
        "Because kibble density differs. The calculator uses ~350 kcal/cup as a practical conversion, but you should always compare to your bag’s kcal per cup (or kcal per 1/2 cup) and adjust accordingly.",
    },
    {
      id: "dfaq-3",
      question: "Should I feed the result exactly?",
      answer:
        "Start with the estimate, then fine-tune. If your dog is gaining weight, reduce portions; if losing weight, increase. Aim for a healthy body condition score and consult your vet if weight changes are significant or rapid.",
    },
    {
      id: "dfaq-4",
      question: "Does this account for pregnancy or senior dogs?",
      answer:
        "Yes. Pregnancy and senior feeding typically require different energy needs, so we apply higher or lower multipliers based on the selected life stage. For pregnancy and medical conditions, follow your veterinarian’s guidance.",
    },
  ],
  "dogage": [
    {
      question: "Is the 'multiply by 7' rule accurate?",
      answer: "No, this outdated rule oversimplifies dog aging. Dogs age much faster in their first two years, then the rate slows down. Additionally, breed size significantly affects how quickly dogs age.",
    },
    {
      question: "Why do large dogs age faster than small dogs?",
      answer: "Larger dogs have faster metabolisms and shorter lifespans. They reach physical maturity quickly and experience more rapid cellular aging, which is why a 10-year-old Great Dane is much older in human terms than a 10-year-old Chihuahua.",
    },
    {
      question: "When is my dog considered a senior?",
      answer: "A dog is typically considered a senior between 45-65 human years old (approximately 7-10 dog years depending on size). This is when preventative veterinary care becomes especially important.",
    },
    {
      question: "How often should I take my senior dog to the vet?",
      answer: "Senior dogs should visit the veterinarian at least twice a year for wellness exams. More frequent visits may be needed if your dog has health conditions.",
    },
  ],
  "blog": [
    {
      id: "blog-faq-1",
      question: "How do you choose the topics for the Pawteller blog?",
      answer:
        "We focus on the questions dog owners ask most often: growth & weight, feeding and calories, aging, and everyday behavior/health decisions. Topics are written to be scannable and paired with calculators when an answer needs numbers.",
    },
    {
      id: "blog-faq-2",
      question: "Are the guidance and calculators on your blog veterinarian-vetted?",
      answer:
        "Pawteller provides educational information and uses established veterinary frameworks for calculations. It can’t diagnose or replace a qualified veterinarian. For medical concerns or unusual symptoms, contact your vet.",
    },
    {
      id: "blog-faq-3",
      question: "How should I use a calculator together with a blog guide?",
      answer:
        "Use the blog for context (what’s happening, what to watch for, and why), then use the calculator for the numbers (calories, expected weight, or age equivalence). If your real-world results differ a lot, adjust gradually and confirm with your veterinarian.",
    },
    {
      id: "blog-faq-4",
      question: "What if my puppy’s growth or feeding results don’t match the article’s chart?",
      answer:
        "Small differences are normal—every puppy varies. If your puppy is consistently far above or below expectations, or growth changes suddenly, it may signal diet, parasites, or a health issue. A vet check is the safest next step.",
    },
    {
      id: "blog-faq-5",
      question: "How often should I update feeding and portion estimates?",
      answer:
        "Re-check when your dog’s weight changes, when you move to a new life stage, or if your body-condition score changes (gaining/losing). Many owners re-evaluate every 2–4 weeks for puppies and less often for adults—always guided by your vet if there are health concerns.",
    },
    {
      id: "blog-faq-6",
      question: "Do your articles cover mixed-breed dogs?",
      answer:
        "Yes. When calculators are involved, mixed-breed estimates typically use a blended approach based on the closest matching factors. Because mixed-breeds vary widely, treat ranges as a starting point and fine-tune using real growth and body condition.",
    },
    {
      id: "blog-faq-7",
      question: "Can I rely on dog-age comparisons (like \"multiply by 7\")?",
      answer:
        "No—rules like “multiply by 7” are oversimplified. Dogs typically age faster early on, and breed size changes the pace. Pawteller uses more realistic age frameworks so you can understand senior-care timing better.",
    },
  ],
  "feeding-your-puppy": [
    {
      id: "feeding-faq-1",
      question: "How do I calculate calories for my puppy?",
      answer:
        "Use a baseline like RER (Resting Energy Requirement), then apply a life-stage factor (puppy age and activity level). From there, convert calories to servings using the kcal-per-cup (or kcal-per-gram) listed on your dog food bag.",
    },
    {
      id: "feeding-faq-2",
      question: "Why are life-stage multipliers different for younger puppies?",
      answer:
        "Because puppies grow fast and burn more energy per pound of body weight than adults. Younger puppies generally need a higher multiplier to support rapid development, while older puppies and adults need less.",
    },
    {
      id: "feeding-faq-3",
      question: "How many meals should I feed each day?",
      answer:
        "A common guideline is 4 small meals for puppies under 4 months, 3 meals for older puppies, and 2 meals for adults. Smaller, more frequent meals can help reduce tummy upset and help energy stay steady.",
    },
    {
      id: "feeding-faq-4",
      question: "What should I do if my puppy is gaining too quickly or too slowly?",
      answer:
        "Re-check the calculations and adjust gradually. If weight is consistently off the expected range, consider switching life-stage assumptions (age/activity) and confirm the numbers with your veterinarian—especially if your puppy seems unusually hungry, lethargic, or has digestive issues.",
    },
  ],
  "puppy-training-basics": [
    {
      id: "training-faq-1",
      question: "What should I focus on first when training a new puppy?",
      answer:
        "Start with predictable routines and basic skills: name response, sit/down, leash habits, and housetraining. Pair training with positive reinforcement (treats, praise, play) and keep sessions short so puppies stay engaged.",
    },
    {
      id: "training-faq-2",
      question: "How do I choose a training plan that matches my lifestyle?",
      answer:
        "Match time and energy: high-energy breeds typically need daily exercise plus mental work, while lower-energy breeds may do well with shorter walks and structured play. Your best plan is the one you can repeat consistently.",
    },
    {
      id: "training-faq-3",
      question: "Is it okay to take training advice from other owners or should I follow only experts?",
      answer:
        "Use advice as guidance, but tailor it to your puppy’s temperament and your household. When in doubt, consult a qualified trainer or your veterinarian—especially if you’re dealing with fear, aggression, or sudden behavior changes.",
    },
    {
      id: "training-faq-4",
      question: "How do I handle shedding/allergies when picking a breed?",
      answer:
        "If shedding is a concern, prioritize low-shedding coat types and plan for grooming. Remember that “minimal shedding” still involves dander and fur maintenance—so it’s smart to meet the breed (or a close look-alike) and consider allergy sensitivity before committing.",
    },
  ],
  "dog-years-to-human-years": [
    {
      id: "age-faq-1",
      question: "Why is “multiply by 7” inaccurate?",
      answer:
        "It’s a rough lifespan shortcut that doesn’t reflect how dogs age in stages. Dogs often age faster early on, and aging pace varies by size and biology, so a single multiplier oversimplifies reality.",
    },
    {
      id: "age-faq-2",
      question: "How do you estimate a dog’s “human age” more accurately?",
      answer:
        "A better approach uses stage-based frameworks: early years map to more human years per year, and then the conversion rate changes depending on breed size (small, medium, large, giant). Tools like a Dog Age Calculator follow these veterinary-style ranges.",
    },
    {
      id: "age-faq-3",
      question: "When should I start thinking of my dog as a senior?",
      answer:
        "Many references place “senior care” earlier for larger breeds and later for smaller breeds. If you want a practical rule: use your size/breed estimate, then adjust based on real health—energy, mobility, appetite, and vet findings.",
    },
    {
      id: "age-faq-4",
      question: "What senior-care changes make the biggest difference?",
      answer:
        "Often, it’s joint support, maintaining a healthy weight, appropriate feeding (based on body condition), and more frequent checkups. Small adjustments can help preserve comfort and mobility as your dog ages.",
    },
  ],
  "puppy-growth-tracker": [
    {
      id: "growth-faq-1",
      question: "What’s normal during the first weeks of puppy growth?",
      answer:
        "In the earliest phase, puppies are largely developing basic senses and mobility. Weight gain and growth can vary, but milestones like eye opening and transitioning to play/solid food typically show up around the age ranges described in the article. Track trends, not single-day weight.",
    },
    {
      id: "growth-faq-2",
      question: "How should I use a growth tracker or weight calculator?",
      answer:
        "Use it to estimate typical ranges, then compare with your puppy’s real measurements. Update your inputs as your puppy grows (especially body weight and age), and adjust feeding gradually rather than reacting to one weigh-in.",
    },
    {
      id: "growth-faq-3",
      question: "What if my puppy is outside the predicted weight range?",
      answer:
        "Small differences are normal. If your puppy is consistently far above/below expectations or growth changes suddenly, it may indicate diet needs, parasites, or a health issue—check with your veterinarian for the safest next step.",
    },
    {
      id: "growth-faq-4",
      question: "When does the biggest growth spurt usually happen?",
      answer:
        "Many puppies hit faster growth during early-to-mid months, then enter an adolescent stage where growth slows and training needs increase. Large breeds often take longer to mature than small breeds, so timelines vary by size.",
    },
  ],
}

export const SEO = {
  "home": {
    title: "Pawteller | Premium Growth & Pet Health Insights",
    description:
      "Accurate dog growth calculators, vet-informed insights, and interactive health tracking features.",
    keywords: ["dog growth", "puppy weight", "dog age calculator", "breed quiz", "pet health"],
  },
  "about": {
    title: "About Pawteller | Fast Dog Growth Calculators & Vet-Informed Guides",
    description:
      "Learn about Pawteller’s mission to help dog owners make confident decisions with fast calculators, clear guides, and vet-informed insights—built for everyday use.",
    keywords: [
      "about Pawteller",
      "dog health insights",
      "dog growth calculator",
      "puppy weight",
      "dog age calculator",
      "vet-informed pet care",
      "breed quiz",
      "pet health guides",
    ],
  },
  "/quiz?quiz=dog-age": {
    title: "Dog Age Quiz: Calculate Your Pup's Real Biological Age | Pawteller",
    description: "Debunk the 7-year rule! Take our 2-minute dog biological age quiz to find out where your pup stands based on breed size, skeletal maturity, and dental markers.",
    keywords: [
      "dog age quiz",
      "calculate dog biological age",
      "7 human years rule myth",
      "when is a dog considered a senior",
      "how to tell a rescue dog age",
      "dog skeletal maturity by breed size",
      "small dog lifespan vs large dog",
      "puppyhood to adolescence timeline",
      "pawteller age calculator"
    ]
  },
  "/quiz?quiz=dog-safety": {
    title: "Dog Nutrition & Safety Quiz | Pawteller",
    description: "Take our fast, interactive dog safety and nutrition quiz to spot hazards, learn what’s toxic, and get personalized health insights.",
    keywords: ["dog nutrition quiz", "dog safety", "hazards for dogs", "toxic foods", "xylitol", "chocolate poisoning"]
  },
  "/quiz?quiz=dog-language": {
    title: "Dog Body Language Quiz: Can You Decode Your Pup's Signals? | Pawteller",
    description: "Take this quick 2-minute quiz to test your knowledge of dog body language. Learn what yawns, lip licking, and 'whale eye' actually mean for your dog's stress levels.",
    keywords: [
      "dog body language quiz",
      "dog communication quiz",
      "understand dog body language",
      "dog yawning meaning stress",
      "dog whale eye meaning",
      "stiff wagging tail meaning",
      "why do dogs lick their lips",
      "can you speak dog quiz",
      "pawteller quiz"
    ]
  },
  "/quiz?quiz=dog-iq": {
    title: "Interactive Dog Breed & Health Quiz | Pawteller",
    description: "Take our fast, interactive pet quiz to test your dog care knowledge, discover ideal breeds, and unlock customized health insights.",
    keywords: [
      "dog quiz",
      "interactive pet quiz",
      "dog IQ",
      "dog behavior",
      "dog intelligence",
      "pawteller"
    ]
  },
  "/quiz?quiz=breed-match": {
    title: "Dog Breed Match Quiz | Pawteller",
    description: "Take our interactive dog breed match quiz to discover the best-fit breeds for your lifestyle and unlock personalized care insights.",
    keywords: [
      "dog breed quiz",
      "breed match",
      "best dog breed for families",
      "dog temperament quiz",
      "dog activity level",
      "find the right dog",
      "hypoallergenic dogs quiz",
      "apartment dogs quiz"
    ]
  },
  "puppyweight": {
    title: "Puppy Weight Calculator: Predict Adult Size",
    description:
      "Use our veterinarian-approved puppy weight calculator to estimate your puppy’s adult weight, see growth progress, and understand when your dog will stop growing.",
    keywords: [
      "puppy weight calculator",
      "predict adult weight",
      "puppy growth",
      "dog growth chart",
      "when do puppies stop growing",
      "vet approved dog calculator",
      "puppy weight by breed",
      "estimate adult size",
    ],
  },
  "dogpregnancy": {
    title:
      "Dog Pregnancy Calculator: Estimate Due Date & Gestation | Pawteller",
    description:
      "Use Pawteller’s dog pregnancy calculator to estimate your dog’s due date, track week-by-week milestones, and know when to contact a vet. Based on veterinary gestation averages.",
    keywords: [
      "dog pregnancy calculator",
      "dog due date calculator",
      "dog gestation calculator",
      "how long are dogs pregnant",
      "dog whelping timeline",
      "dog pregnancy week by week",
      "pregnant dog care",
      "veterinary pregnancy milestones",
      "ultrasound timing pregnancy dogs",
      "signs of labor in dogs",
    ],
  },
  "dogname": {
    title: "Dog Name Generator: Find the Perfect Name for Your Pup | Pawteller",
    description: "Discover the ideal name for your dog with our interactive dog name generator. Filter by gender, size, personality, and breed style to unlock tailored name ideas.",
    keywords: [
      "dog name generator",
      "puppy name generator",
      "find a dog name",
      "male dog names",
      "female dog names",
      "unique puppy names",
      "cool dog names",
      "dog naming tool"
    ]
  },
  "doggrowth": {
    title: "Dog Growth Calculator: Predict Adult Weight by Breed | Pawteller",
    description:
      "Use Pawteller’s dog growth calculator to predict your puppy’s adult weight. Enter breed, age, and current weight to see a clear growth forecast and milestone guidance.",
    keywords: [
      "dog growth calculator",
      "puppy weight calculator",
      "predict adult weight",
      "breed growth chart",
      "puppy growth predictor",
      "dog growth curve",
      "how big will my puppy get",
      "vet-informed puppy weight",
      "puppy milestone calculator",
      "adult weight estimate",
    ],
  },
  "dogfood": {
    title: "Dog Food Calculator: How Many Cups & Calories Per Day",
    description: "Use our dog food calculator to estimate daily calories and cups per day based on weight, life stage (puppy, adult, senior, pregnant) and activity level. Includes transparent ~350 kcal/cup conversion.",
    keywords: ["dog food calculator", "dog calorie calculator", "cups per day", "how much to feed a dog", "puppy feeding guide", "senior dog nutrition", "weight based feeding", "RER formula", "veterinary nutrition"],
  },
  "dogage": {
    title: "Dog Age Calculator (Convert Dog Years to Human Years) | Pawteller",
    description:
      "Use Pawteller’s dog age calculator to convert your dog’s age into human years. Choose small, medium, large, or giant size for a more accurate life-stage estimate.",
    keywords: [
      "dog age calculator",
      "convert dog years to human years",
      "dog years to human years",
      "dog life stage calculator",
      "human age equivalent for dogs",
      "dog aging by size",
      "small dog age to human years",
      "large dog age to human years",
      "giant dog years to human years",
      "dog senior years calculator",
    ],
  },
  "calculator": {
    title: "Dog Growth & Health Calculators | Pawteller",
    description: "Use Pawteller’s vet-informed dog calculators to estimate growth, convert dog age to human years, plan nutrition, and track key life stages. Fast, mobile-friendly, SEO-first.",
    keywords: [
      "dog growth calculator",
      "dog age calculator",
      "puppy weight calculator",
      "dog food calculator",
      "dog pregnancy calculator",
      "dog name generator",
      "pet care calculators",
      "veterinary pet care",
      "dog years to human years",
      "feeding calculator",
    ],
  },
  "blog": {
    title: "Expert Pet Care Guides, Tips & Calculators | Pawteller",
    description:
      "Explore data-driven insights, veterinarian-vetted puppy growth tracking tips, dog nutrition guides, and care advice to keep your pup healthy.",
    keywords: [
      "pet care guides",
      "dog care tips",
      "puppy growth tracker",
      "puppy growth calculator",
      "dog nutrition",
      "vet-vetted dog advice",
      "dog health tips",
      "puppy weight calculator",
      "dog years calculator",
      "dog age calculator",
      "breed-specific care",
      "new puppy checklist",
      "dog wellness",
      "science-based pet care",
      "pawteller blog",
    ],
  }
}
