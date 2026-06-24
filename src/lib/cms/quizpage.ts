import type { FAQItem, quizDataProps } from "@/lib/types";

export const quizData: quizDataProps[] = [
  // 1. THE BREED MATCH QUIZ
  {
    seo: {
      title: "Dog Breed Match Quiz | Pawteller",
      description:
        "Take our interactive dog breed match quiz to discover the best-fit breeds for your lifestyle and unlock personalized care insights.",
      keywords: [
        "dog breed quiz",
        "breed match",
        "best dog breed for families",
        "dog temperament quiz",
        "dog activity level",
        "find the right dog",
        "hypoallergenic dogs quiz",
        "apartment dogs quiz",
      ],
    },
    banner: "The Breed Match Quiz",
    title: "Which dog breed fits your life?",
    totalQuestions: 6,
    estimatedTime: "2 minutes",
    category: "Lifestyle",
    url: "/quiz?quiz=breed-match",
    header: "We found your match!",
    subheader: "Your top breed is a Poodle ... plus 2 other strong matches.",
    button: "Reveal my top 3 breeds",
    steps: [
      {
        question: "What's your home like?",
        options: ["Apartment", "House with yard"],
      },
      {
        question: "How active is your lifestyle?",
        options: ["Mostly chill", "Daily walks", "Always on the move"],
      },
      {
        question: "Kids at home?",
        options: ["Yes, little ones", "No kids"],
      },
      {
        question: "First-time dog owner?",
        options: ["First-timer", "Experienced"],
      },
      {
        question: "Shedding tolerance?",
        options: ["Low shed please", "Shedding is fine"],
      },
      {
        question: "Preferred size?",
        options: ["Small", "Medium", "Large", "Any size"],
      },
    ],
    dogs: [
      "Poodle",
      "Golden Retriever",
      "Labrador Retriever",
      "French Bulldog",
      "Cavalier King Charles Spaniel",
      "Miniature Schnauzer",
      "Bichon Frise",
      "Shih Tzu",
      "Havanese",
      "Boston Terrier",
      "Whippet",
      "Greyhound",
      "Border Collie",
      "Australian Shepherd",
      "German Shepherd",
      "Bernese Mountain Dog",
      "Newfoundland",
      "Great Dane",
      "Pembroke Welsh Corgi",
      "Chihuahua",
      "Pug",
      "Dachshund",
      "Maltese",
      "Papillon",
      "Yorkshire Terrier",
      "English Springer Spaniel",
      "Vizsla",
      "Weimaraner",
      "Samoyed",
      "Shetland Sheepdog",
    ],
  },
  // 2. IS YOUR DOG A SECRET GENIUS?
  {
    seo: {
      title: "Interactive Dog Breed & Health Quiz | Pawteller",
      description:
        "Take our fast, interactive pet quiz to test your dog care knowledge, discover ideal breeds, and unlock customized health insights.",
      keywords: [
        "dog quiz",
        "interactive pet quiz",
        "dog IQ",
        "dog behavior",
        "dog intelligence",
        "pawteller",
      ],
    },
    banner: "The Canine Intelligence Test",
    title: "Is your dog a secret genius?",
    totalQuestions: 6,
    estimatedTime: "2 minutes",
    url: "/quiz?quiz=dog-iq",
    category: "Intelligence",
    header: "We calculated your dog's IQ!",
    subheader:
      "See if your pup belongs in the genius tier or the professional couch potato club.",
    button: "Reveal my dog's IQ profile",
    steps: [
      {
        question:
          "How long does it take your dog to find a treat hidden under a cup?",
        options: [
          "Under 5 seconds",
          "5 to 15 seconds",
          "They get distracted and walk away",
          "They knock the cup over instantly",
        ],
      },
      {
        question:
          "Does your dog recognize specific word cues outside of 'walk' or 'treat'?",
        options: [
          "Yes, dozens of distinct words",
          "Only a few basic commands",
          "They mostly respond to tone of voice",
          "They choose selective hearing",
        ],
      },
      {
        question: "How does your dog react to a mirror?",
        options: [
          "They ignore it completely ",
          "They bark or try to play with other dog",
          "They look behind the mirror to check",
          "They've never noticed it",
        ],
      },
      {
        question:
          "If an obstacle (like a baby gate) blocks their path, what do they do?",
        options: [
          "Find a way around or figure out how to open/bypass it",
          "Whine until you clear the path for them",
          "Try to brute-force push right through it",
          "Accept their fate and nap right there",
        ],
      },
      {
        question:
          "Can your dog trick you into giving them extra meals or attention?",
        options: [
          "Regularly—they are a master manipulator",
          "Occasionally, if I'm not paying attention",
          "No, they are too honest/clueless",
          "I am the one who tricks them",
        ],
      },
      {
        question:
          "When you pick up your keys or put on shoes, what does your dog do?",
        options: [
          "Predicts exactly what it means based on the specific item",
          "Gets excited for any potential outing",
          "Doesn't care until I head for the door",
          "Stays asleep",
        ],
      },
    ],
  },

  // 3. CAN YOU SPEAK "DOG"? DECODE YOUR PUP'S BODY LANGUAGE
  {
    seo: {
      title:
        "Dog Body Language Quiz: Can You Decode Your Pup's Signals? | Pawteller",
      description:
        "Take this quick 2-minute quiz to test your knowledge of dog body language. Learn what yawns, lip licking, and 'whale eye' actually mean for your dog's stress levels.",
      keywords: [
        "dog body language quiz",
        "dog communication quiz",
        "understand dog body language",
        "dog yawning meaning stress",
        "dog whale eye meaning",
        "stiff wagging tail meaning",
        "why do dogs lick their lips",
        "can you speak dog quiz",
        "pawteller quiz",
      ],
    },
    banner: "Dog Communication Quiz",
    title: "Can you speak 'dog'? Decode your pup's body language",
    totalQuestions: 6,
    estimatedTime: "2 minutes",
    category: "Lifestyle",
    url: "/quiz?quiz=dog-language",
    header: "Your score has been tallied!",
    subheader:
      "Find out if you truly speak 'dog' or if you're misinterpreting your pup's signals.",
    button: "Reveal my communication score",
    steps: [
      {
        question:
          "Your dog yawns while a child is hugging them tightly. What does this mean?",
        options: [
          "They are tired and sleepy",
          "They are feeling stressed or uncomfortable",
          "They are happy and content",
          "They are showing affection",
        ],
      },
      {
        question:
          "A dog is wagging its tail, but the tail is stiff, held high, and moving very fast. Is it friendly?",
        options: [
          "Yes, a wagging tail always means a happy dog",
          "No, this indicates high arousal, alertness, or potential tension",
          "It means the dog is scared and submissive",
          "It means the dog is about to lie down",
        ],
      },
      {
        question:
          "What is your dog telling you when they show the whites of their eyes ('whale eye')?",
        options: [
          "They are feeling guilty about something",
          "They are playing hide and seek",
          "They are anxious, threatened, or uncomfortable",
          "They have an eye infection",
        ],
      },
      {
        question:
          "Your dog rolls onto their back during a tense interaction. What are they communicating?",
        options: [
          "'Please rub my belly right now!'",
          "'I am submissive and do not want a conflict'",
          "'I am ready to attack'",
          "'I am perfectly relaxed'",
        ],
      },
      {
        question:
          "When playing, your dog lowers their front legs and keeps their hips in the air. What is this?",
        options: [
          "A sign of physical pain or stretching",
          "A play bow—signaling everything from here on out is just fun",
          "A defensive posture before a bite",
          "An invitation to go outside to potty",
        ],
      },
      {
        question:
          "Your dog keeps licking their own lips repeatedly, but there is no food around. Why?",
        options: [
          "They are thirsty",
          "They are pacifying themselves due to stress or mild anxiety",
          "They are trying to taste something in the air",
          "They are mimicking human smiles",
        ],
      },
    ],
  },

  // 4. THE ULTIMATE DOG NUTRITION & SAFETY QUIZ
  {
    seo: {
      title: "Dog Nutrition & Safety Quiz | Pawteller",
      description:
        "Take our fast, interactive dog safety and nutrition quiz to spot hazards, learn what’s toxic, and get personalized health insights.",
      keywords: [
        "dog nutrition quiz",
        "dog safety",
        "hazards for dogs",
        "toxic foods",
        "xylitol",
        "chocolate poisoning",
      ],
    },
    banner: "Pet Safety & Health",
    title: "The ultimate dog nutrition & safety quiz",
    totalQuestions: 6,
    estimatedTime: "2 minutes",
    category: "Nutrition",
    url: "/quiz?quiz=dog-safety",
    header: "Safety report generated!",
    subheader:
      "Discover which household hazards you successfully spotted—and the ones you missed.",
    button: "Reveal my detailed safety key",
    steps: [
      {
        question:
          "Which of these common baking ingredients is highly toxic to dogs?",
        options: [
          "Baking soda",
          "Xylitol (birch sugar sweetener)",
          "Vanilla extract",
          "Brown sugar",
        ],
      },
      {
        question:
          "Your dog accidentally eats a single grape. What should your immediate action be?",
        options: [
          "Wait and see if they show symptoms",
          "Contact a vet or pet poison hotline immediately",
          "Give them plenty of water to flush it out",
          "Don't worry, grapes are only bad in massive amounts",
        ],
      },
      {
        question:
          "Which type of bone is generally considered the most dangerous to feed a dog?",
        options: [
          "Raw beef bones",
          "Cooked chicken bones (highly prone to splintering)",
          "Raw marrow bones",
          "Dehydrated bully sticks",
        ],
      },
      {
        question: "What makes chocolate dangerous to dogs?",
        options: [
          "The high sugar content",
          "Theobromine (which dogs cannot metabolize efficiently)",
          "The dairy and milk fats",
          "The caffeine content alone",
        ],
      },
      {
        question:
          "Which backyard plant is highly toxic to dogs if chewed or ingested?",
        options: ["Dandelions", "Marigolds", "Sago Palms", "Sunflowers"],
      },
      {
        question:
          "Is it safe to give your dog human medications like Ibuprofen or Advil for pain?",
        options: [
          "Yes, just in tiny doses",
          "Only if they are a large breed dog",
          "Absolutely not, it can cause severe organ failure",
          "Yes, it works identically to dog anti-inflammatories",
        ],
      },
    ],
  },

  // 5. HOW WELL DO YOU KNOW YOUR DOG'S BIOLOGICAL AGE?
  {
    seo: {
      title:
        "Dog Age Quiz: Calculate Your Pup's Real Biological Age | Pawteller",
      description:
        "Debunk the 7-year rule! Take our 2-minute dog biological age quiz to find out where your pup stands based on breed size, skeletal maturity, and dental markers.",
      keywords: [
        "dog age quiz",
        "calculate dog biological age",
        "7 human years rule myth",
        "when is a dog considered a senior",
        "how to tell a rescue dog age",
        "dog skeletal maturity by breed size",
        "small dog lifespan vs large dog",
        "puppyhood to adolescence timeline",
        "pawteller age calculator",
      ],
    },
    banner: "Canine Longevity & Milestones",
    title: "How well do you know your dog's biological age?",
    totalQuestions: 6,
    estimatedTime: "2 minutes",
    url: "/quiz?quiz=dog-age",
    category: "Growth",
    header: "Biological profile ready!",
    subheader:
      "We calculated your dog's life stage milestones based on their size and physical markers.",
    button: "Reveal my dog's biological age",
    steps: [
      {
        question:
          "True or False: Every calendar year is exactly 7 human years for any dog.",
        options: [
          "True, that's the standard golden rule",
          "False, aging depends heavily on size and breed",
        ],
      },
      {
        question:
          "At what age is a giant breed dog (like a Great Dane) typically considered a senior?",
        options: [
          "5 to 6 years old",
          "8 to 9 years old",
          "11 to 12 years old",
          "They senior at the same time as small dogs",
        ],
      },
      {
        question:
          "At what age do most small breed dogs reach full physical skeletal maturity?",
        options: [
          "Around 6 months",
          "Around 9 to 12 months",
          "Around 18 to 24 months",
          "3 years old",
        ],
      },
      {
        question:
          "Which dog size group generally enjoys the longest biological lifespan?",
        options: [
          "Giant breeds (over 90 lbs)",
          "Large breeds (50 - 90 lbs)",
          "Medium breeds (20 - 50 lbs)",
          "Toy and Small breeds (under 20 lbs)",
        ],
      },
      {
        question:
          "When considering a dog's life stage, what marks the end of 'puppyhood' and start of 'adolescence'?",
        options: [
          "When they switch to adult food",
          "The onset of sexual maturity / hormonal changes (around 6-8 months)",
          "Exactly on their first birthday",
          "When they stop growing in height",
        ],
      },
      {
        question:
          "Which biological marker is most commonly used by vets to estimate an unknown rescue dog's age?",
        options: [
          "Coat graying around the muzzle",
          "The amount of tartar and wear on their teeth",
          "The clarity of their eyes",
          "Their overall energy levels",
        ],
      },
    ],
  },
];

export const quizFaqBase: FAQItem[] = [
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
];


export interface Breed {
  name: string;
  size: "Small" | "Medium" | "Large";
  home: ("Apartment" | "House with yard")[];
  energy: "Mostly chill" | "Daily walks" | "Always on the move";
  beginnerFriendly: boolean;
  goodWithKids: boolean;
  shedding: "Low shed please" | "Shedding is fine";
  description: string;
  temperament: string[];
  goodFor: string[];
  challenges: string[];
  lifespan: string;
  whyMatch: Record<string, string>;
}
export interface QuizResult {
  userName: string;
  topMatches: {
    rank: number;
    breed: string;
    compatibility: number;
    description?: string;
    temperament?: string[];
    lifespan?: string;
    reasons?: string[];
    scoreBreakdown?: {
      apartmentLiving: string;
      lifestyleMatch: string;
      kidFriendly: string;
      beginnerFriendly: string;
      lowShedding: string;
      sizePreference: string;
      total: string;
    };
  }[];
}

export const breedDatabase: Breed[] = [
  {
    name: "Poodle",
    size: "Medium",
    home: ["Apartment", "House with yard"],
    energy: "Daily walks",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Low shed please",
    description: "Highly intelligent and versatile companion.",
    temperament: ["Intelligent", "Friendly", "Trainable"],
    goodFor: ["Families", "Apartments"],
    challenges: ["Grooming needs"],
    lifespan: "12-15 years",
    whyMatch: { lowShed: "Low-shedding coat", beginner: "Easy to train" },
  },
  {
    name: "Golden Retriever",
    size: "Large",
    home: ["House with yard"],
    energy: "Daily walks",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Friendly family dog.",
    temperament: ["Gentle", "Loyal", "Outgoing"],
    goodFor: ["Families", "Children"],
    challenges: ["Heavy shedding"],
    lifespan: "10-12 years",
    whyMatch: { kids: "Excellent with children" },
  },
  {
    name: "Labrador Retriever",
    size: "Large",
    home: ["House with yard"],
    energy: "Daily walks",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Popular, affectionate, active companion.",
    temperament: ["Friendly", "Eager", "Social"],
    goodFor: ["Families", "Active owners"],
    challenges: ["Needs exercise"],
    lifespan: "10-12 years",
    whyMatch: { active: "Loves activities" },
  },
  {
    name: "French Bulldog",
    size: "Small",
    home: ["Apartment"],
    energy: "Mostly chill",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Easygoing apartment companion.",
    temperament: ["Affectionate", "Adaptable"],
    goodFor: ["City living"],
    challenges: ["Heat sensitivity"],
    lifespan: "10-12 years",
    whyMatch: { apartment: "Ideal for apartments" },
  },
  {
    name: "Cavalier King Charles Spaniel",
    size: "Small",
    home: ["Apartment", "House with yard"],
    energy: "Mostly chill",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Sweet-natured lap dog.",
    temperament: ["Gentle", "Affectionate"],
    goodFor: ["Families"],
    challenges: ["Separation anxiety"],
    lifespan: "12-15 years",
    whyMatch: { kids: "Great family companion" },
  },
  {
    name: "Miniature Schnauzer",
    size: "Small",
    home: ["Apartment", "House with yard"],
    energy: "Daily walks",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Low shed please",
    description: "Alert and adaptable.",
    temperament: ["Smart", "Friendly"],
    goodFor: ["First-time owners"],
    challenges: ["Needs training"],
    lifespan: "12-15 years",
    whyMatch: { lowShed: "Low-shedding" },
  },
  {
    name: "Bichon Frise",
    size: "Small",
    home: ["Apartment"],
    energy: "Mostly chill",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Low shed please",
    description: "Cheerful low-shedding companion.",
    temperament: ["Playful", "Friendly"],
    goodFor: ["Families"],
    challenges: ["Regular grooming"],
    lifespan: "14-15 years",
    whyMatch: { apartment: "Thrives in apartments" },
  },
  {
    name: "Shih Tzu",
    size: "Small",
    home: ["Apartment"],
    energy: "Mostly chill",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Low shed please",
    description: "Affectionate companion dog.",
    temperament: ["Loyal", "Friendly"],
    goodFor: ["Small homes"],
    challenges: ["Coat maintenance"],
    lifespan: "10-16 years",
    whyMatch: { relaxed: "Perfect relaxed lifestyle" },
  },
  {
    name: "Havanese",
    size: "Small",
    home: ["Apartment", "House with yard"],
    energy: "Daily walks",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Low shed please",
    description: "Outgoing family companion.",
    temperament: ["Social", "Playful"],
    goodFor: ["Families"],
    challenges: ["Needs attention"],
    lifespan: "14-16 years",
    whyMatch: { kids: "Excellent with children" },
  },
  {
    name: "Boston Terrier",
    size: "Small",
    home: ["Apartment"],
    energy: "Daily walks",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Compact and friendly.",
    temperament: ["Bright", "Affectionate"],
    goodFor: ["City living"],
    challenges: ["Heat sensitivity"],
    lifespan: "11-13 years",
    whyMatch: { apartment: "Great urban dog" },
  },
  {
    name: "Whippet",
    size: "Medium",
    home: ["Apartment", "House with yard"],
    energy: "Daily walks",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Gentle and athletic.",
    temperament: ["Calm", "Sweet"],
    goodFor: ["Moderately active owners"],
    challenges: ["Sensitive nature"],
    lifespan: "12-15 years",
    whyMatch: { relaxed: "Calm indoors" },
  },
  {
    name: "Greyhound",
    size: "Large",
    home: ["Apartment", "House with yard"],
    energy: "Mostly chill",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Surprisingly relaxed indoors.",
    temperament: ["Gentle", "Quiet"],
    goodFor: ["Apartments"],
    challenges: ["Strong prey drive"],
    lifespan: "10-14 years",
    whyMatch: { apartment: "Excellent apartment giant" },
  },
  {
    name: "Border Collie",
    size: "Medium",
    home: ["House with yard"],
    energy: "Always on the move",
    beginnerFriendly: false,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Extremely intelligent working dog.",
    temperament: ["Focused", "Energetic"],
    goodFor: ["Experienced owners"],
    challenges: ["Needs constant stimulation"],
    lifespan: "12-15 years",
    whyMatch: { active: "Thrives on activity" },
  },
  {
    name: "Australian Shepherd",
    size: "Medium",
    home: ["House with yard"],
    energy: "Always on the move",
    beginnerFriendly: false,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Smart and energetic herder.",
    temperament: ["Loyal", "Active"],
    goodFor: ["Outdoor lifestyles"],
    challenges: ["High exercise needs"],
    lifespan: "12-15 years",
    whyMatch: { active: "Perfect for active people" },
  },
  {
    name: "German Shepherd",
    size: "Large",
    home: ["House with yard"],
    energy: "Always on the move",
    beginnerFriendly: false,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Confident working breed.",
    temperament: ["Loyal", "Protective"],
    goodFor: ["Experienced owners"],
    challenges: ["Needs training"],
    lifespan: "9-13 years",
    whyMatch: { experienced: "Excels with experienced owners" },
  },
  {
    name: "Bernese Mountain Dog",
    size: "Large",
    home: ["House with yard"],
    energy: "Daily walks",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Gentle giant family dog.",
    temperament: ["Calm", "Affectionate"],
    goodFor: ["Families"],
    challenges: ["Short lifespan"],
    lifespan: "7-10 years",
    whyMatch: { kids: "Patient with children" },
  },
  {
    name: "Newfoundland",
    size: "Large",
    home: ["House with yard"],
    energy: "Daily walks",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Massive, sweet-tempered dog.",
    temperament: ["Gentle", "Patient"],
    goodFor: ["Families"],
    challenges: ["Drooling"],
    lifespan: "8-10 years",
    whyMatch: { kids: "Known as nanny dog" },
  },
  {
    name: "Great Dane",
    size: "Large",
    home: ["House with yard"],
    energy: "Mostly chill",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Elegant giant breed.",
    temperament: ["Friendly", "Gentle"],
    goodFor: ["Families"],
    challenges: ["Short lifespan"],
    lifespan: "7-10 years",
    whyMatch: { relaxed: "Calm despite size" },
  },
  {
    name: "Pembroke Welsh Corgi",
    size: "Medium",
    home: ["Apartment", "House with yard"],
    energy: "Daily walks",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Smart and cheerful.",
    temperament: ["Outgoing", "Bright"],
    goodFor: ["Families"],
    challenges: ["Heavy shedding"],
    lifespan: "12-15 years",
    whyMatch: { beginner: "Trainable and friendly" },
  },
  {
    name: "Chihuahua",
    size: "Small",
    home: ["Apartment"],
    energy: "Mostly chill",
    beginnerFriendly: false,
    goodWithKids: false,
    shedding: "Low shed please",
    description: "Tiny dog with huge personality.",
    temperament: ["Alert", "Bold"],
    goodFor: ["Singles"],
    challenges: ["Can be stubborn"],
    lifespan: "14-17 years",
    whyMatch: { apartment: "Excellent small-space dog" },
  },
  {
    name: "Pug",
    size: "Small",
    home: ["Apartment"],
    energy: "Mostly chill",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Charming and affectionate.",
    temperament: ["Playful", "Loving"],
    goodFor: ["Families"],
    challenges: ["Breathing issues"],
    lifespan: "12-15 years",
    whyMatch: { relaxed: "Loves lounging" },
  },
  {
    name: "Dachshund",
    size: "Small",
    home: ["Apartment", "House with yard"],
    energy: "Daily walks",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Brave and curious.",
    temperament: ["Independent", "Loyal"],
    goodFor: ["Small homes"],
    challenges: ["Back problems"],
    lifespan: "12-16 years",
    whyMatch: { apartment: "Fits smaller homes" },
  },
  {
    name: "Maltese",
    size: "Small",
    home: ["Apartment"],
    energy: "Mostly chill",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Low shed please",
    description: "Elegant companion dog.",
    temperament: ["Gentle", "Playful"],
    goodFor: ["Apartments"],
    challenges: ["Grooming"],
    lifespan: "12-15 years",
    whyMatch: { lowShed: "Minimal shedding" },
  },
  {
    name: "Papillon",
    size: "Small",
    home: ["Apartment", "House with yard"],
    energy: "Daily walks",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Tiny but highly intelligent.",
    temperament: ["Smart", "Friendly"],
    goodFor: ["First-time owners"],
    challenges: ["Fragile size"],
    lifespan: "13-16 years",
    whyMatch: { beginner: "Easy to train" },
  },
  {
    name: "Yorkshire Terrier",
    size: "Small",
    home: ["Apartment"],
    energy: "Daily walks",
    beginnerFriendly: true,
    goodWithKids: false,
    shedding: "Low shed please",
    description: "Confident toy breed.",
    temperament: ["Bold", "Affectionate"],
    goodFor: ["City living"],
    challenges: ["Grooming"],
    lifespan: "11-15 years",
    whyMatch: { lowShed: "Low-shedding coat" },
  },
  {
    name: "English Springer Spaniel",
    size: "Medium",
    home: ["House with yard"],
    energy: "Always on the move",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Energetic sporting dog.",
    temperament: ["Friendly", "Active"],
    goodFor: ["Active families"],
    challenges: ["Needs exercise"],
    lifespan: "12-14 years",
    whyMatch: { active: "Loves outdoor life" },
  },
  {
    name: "Vizsla",
    size: "Large",
    home: ["House with yard"],
    energy: "Always on the move",
    beginnerFriendly: false,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Athletic and affectionate.",
    temperament: ["Energetic", "Loyal"],
    goodFor: ["Runners"],
    challenges: ["Separation anxiety"],
    lifespan: "12-14 years",
    whyMatch: { active: "Excellent for active owners" },
  },
  {
    name: "Weimaraner",
    size: "Large",
    home: ["House with yard"],
    energy: "Always on the move",
    beginnerFriendly: false,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "High-energy hunting breed.",
    temperament: ["Smart", "Energetic"],
    goodFor: ["Experienced owners"],
    challenges: ["Needs stimulation"],
    lifespan: "10-13 years",
    whyMatch: { experienced: "Best with experienced handlers" },
  },
  {
    name: "Samoyed",
    size: "Large",
    home: ["House with yard"],
    energy: "Daily walks",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Fluffy and friendly.",
    temperament: ["Social", "Gentle"],
    goodFor: ["Families"],
    challenges: ["Heavy shedding"],
    lifespan: "12-14 years",
    whyMatch: { kids: "Wonderful family dog" },
  },
  {
    name: "Shetland Sheepdog",
    size: "Medium",
    home: ["House with yard"],
    energy: "Daily walks",
    beginnerFriendly: true,
    goodWithKids: true,
    shedding: "Shedding is fine",
    description: "Intelligent and devoted.",
    temperament: ["Smart", "Loyal"],
    goodFor: ["Families"],
    challenges: ["Barking tendency"],
    lifespan: "12-14 years",
    whyMatch: { beginner: "Responsive to training" },
  },
];
