export type FaqPageKey =
  | "home"
  | "about"
  | "contact"
  | "terms"
  | "privacy"
  | "quiz"
  | "blog"
  | "dog-age"
  | "dog-food"
  | "dog-name"
  | "dog-pregnancy"
  | "dog-growth"
  | "puppy-weight";

export const faqPageOptions: { value: FaqPageKey; label: string }[] = [
  { value: "home", label: "Home" },
  { value: "about", label: "About" },
  { value: "contact", label: "Contact" },
  { value: "terms", label: "Terms" },
  { value: "privacy", label: "Privacy" },
  { value: "quiz", label: "Quiz" },
  { value: "blog", label: "Blog" },
  { value: "dog-age", label: "Calculator: Dog Age" },
  { value: "dog-food", label: "Calculator: Dog Food" },
  { value: "dog-name", label: "Calculator: Dog Name" },
  { value: "dog-pregnancy", label: "Calculator: Dog Pregnancy" },
  { value: "dog-growth", label: "Calculator: Dog Growth" },
  { value: "puppy-weight", label: "Calculator: Puppy Weight" },
];
