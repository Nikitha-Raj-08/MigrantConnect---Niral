"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// ThemeToggle has been removed
import {
  ChevronDown,
  Menu,
  X,
  Globe,
  Users,
  Building2,
  FileText,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Briefcase,
} from "lucide-react"

// Language translations
const translations = {
  english: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Our Services",
      faq: "FAQ",
      login: "Login",
    },
    hero: {
      title: "Empowering Migrant Workers with Digital Solutions",
      subtitle:
        "A secure platform connecting workers with verified employers, ensuring fair wages and access to government welfare schemes.",
      cta: "Get Started",
    },
    about: {
      title: "Who We Are?",
      description:
        "MigrantConnect is a digital platform designed to address the challenges faced by migrant workers in India. We provide a secure, transparent ecosystem that connects workers with verified employers, ensures fair wages, and facilitates access to government welfare schemes. Our mission is to empower migrant workers through technology and create a more equitable labor market.",
    },
    services: {
      title: "Our Services",
      aadhaar: {
        title: "Aadhaar-Based Registration",
        description:
          "Secure identity verification using Aadhaar ensures authentic profiles for both workers and employers.",
      },
      jobs: {
        title: "Job Matching & Tracking",
        description:
          "AI-powered job matching connects workers with suitable employment opportunities based on skills and location.",
      },
      welfare: {
        title: "Welfare Scheme Access",
        description:
          "Simplified access to government welfare schemes with eligibility checking and application assistance.",
      },
    },
    faq: {
      title: "Frequently Asked Questions",
      questions: [
        {
          question: "How does Aadhaar-based registration work?",
          answer:
            "Our platform uses Aadhaar authentication to verify the identity of workers and employers. This ensures that all users on the platform are genuine and creates a secure environment for job matching.",
        },
        {
          question: "What job services are provided?",
          answer:
            "We offer job matching based on skills and location, transparent wage agreements, payment tracking, and a grievance redressal system to ensure fair treatment of workers.",
        },
        {
          question: "Is this platform free for workers?",
          answer:
            "Yes, the platform is completely free for migrant workers. We believe in providing accessible services to those who need them most.",
        },
      ],
    },
    footer: {
      quickLinks: "Quick Links",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      contact: "Contact Us",
      rights: "© 2023 MigrantConnect. All rights reserved.",
    },
  },
  tamil: {
    nav: {
      home: "முகப்பு",
      about: "எங்களைப் பற்றி",
      services: "எங்கள் சேவைகள்",
      faq: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
      login: "உள்நுழைய",
    },
    hero: {
      title: "புலம்பெயர் தொழிலாளர்களுக்கு டிஜிட்டல் தீர்வுகள்",
      subtitle:
        "சரிபார்க்கப்பட்ட முதலாளிகளுடன் தொழிலாளர்களை இணைக்கும், நியாயமான ஊதியங்களை உறுதிசெய்யும் மற்றும் அரசு நல திட்டங்களுக்கான அணுகலை வழங்கும் ஒரு பாதுகாப்பான தளம்.",
      cta: "தொடங்குங்கள்",
    },
    about: {
      title: "நாங்கள் யார்?",
      description:
        "MigrantConnect என்பது இந்தியாவில் புலம்பெயர் தொழிலாளர்கள் எதிர்கொள்ளும் சவால்களை நிவர்த்தி செய்ய வடிவமைக்கப்பட்ட ஒரு டிஜிட்டல் தளமாகும். நாங்கள் தொழிலாளர்களை சரிபார்க்கப்பட்ட முதலாளிகளுடன் இணைக்கும், நியாயமான ஊதியங்களை உறுதிசெய்யும் மற்றும் அரசு நல திட்டங்களுக்கான அணுகலை எளிதாக்கும் ஒரு பாதுகாப்பான, வெளிப்படையான சூழலை வழங்குகிறோம். தொழில்நுட்பத்தின் மூலம் புலம்பெயர் தொழிலாளர்களுக்கு அதிகாரம் அளிப்பதும், மேலும் சமத்துவமான தொழிலாளர் சந்தையை உருவாக்குவதும் எங்கள் நோக்கமாகும்.",
    },
    services: {
      title: "எங்கள் சேவைகள்",
      aadhaar: {
        title: "ஆதார் அடிப்படையிலான பதிவு",
        description:
          "ஆதார் பயன்படுத்தி பாதுகாப்பான அடையாள சரிபார்ப்பு தொழிலாளர்கள் மற்றும் முதலாளிகள் இருவருக்கும் உண்மையான சுயவிவரங்களை உறுதிசெய்கிறது.",
      },
      jobs: {
        title: "வேலை பொருத்தம் & கண்காணிப்பு",
        description:
          "AI-ஆல் இயக்கப்படும் வேலை பொருத்தம் திறன்கள் மற்றும் இருப்பிடத்தின் அடிப்படையில் தொழிலாளர்களை பொருத்தமான வேலைவாய்ப்புகளுடன் இணைக்கிறது.",
      },
      welfare: {
        title: "நல திட்ட அணுகல்",
        description: "தகுதி சரிபார்ப்பு மற்றும் விண்ணப்ப உதவியுடன் அரசு நல திட்டங்களுக்கான எளிமையாக்கப்பட்ட அணுகல்.",
      },
    },
    faq: {
      title: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
      questions: [
        {
          question: "ஆதார் அடிப்படையிலான பதிவு எவ்வாறு செயல்படுகிறது?",
          answer:
            "எங்கள் தளம் தொழிலாளர்கள் மற்றும் முதலாளிகளின் அடையாளத்தை சரிபார்க்க ஆதார் அங்கீகாரத்தைப் பயன்படுத்துகிறது. இது தளத்தில் உள்ள அனைத்து பயனர்களும் உண்மையானவர்கள் என்பதை உறுதிசெய்கிறது மற்றும் வேலை பொருத்தத்திற்கான பாதுகாப்பான சூழலை உருவாக்குகிறது.",
        },
        {
          question: "என்ன வேலை சேவைகள் வழங்கப்படுகின்றன?",
          answer:
            "நாங்கள் திறன்கள் மற்றும் இருப்பிடத்தின் அடிப்படையில் வேலை பொருத்தம், வெளிப்படையான ஊதிய ஒப்பந்தங்கள், கட்டண கண்காணிப்பு மற்றும் தொழிலாளர்களின் நியாயமான நடத்தையை உறுதிசெய்ய குறைதீர்ப்பு அமைப்பு ஆகியவற்றை வழங்குகிறோம்.",
        },
        {
          question: "இந்த தளம் தொழிலாளர்களுக்கு இலவசமா?",
          answer:
            "ஆம், இந்த தளம் புலம்பெயர் தொழிலாளர்களுக்கு முற்றிலும் இலவசம். மிகவும் தேவைப்படுபவர்களுக்கு அணுகக்கூடிய சேவைகளை வழங்குவதில் நாங்கள் நம்புகிறோம்.",
        },
      ],
    },
    footer: {
      quickLinks: "விரைவு இணைப்புகள்",
      privacy: "தனியுரிமைக் கொள்கை",
      terms: "பயன்பாட்டு விதிமுறைகள்",
      contact: "எங்களை தொடர்பு கொள்ள",
      rights: "© 2023 MigrantConnect. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    },
  },
  hindi: {
    nav: {
      home: "होम",
      about: "हमारे बारे में",
      services: "हमारी सेवाएँ",
      faq: "अक्सर पूछे जाने वाले प्रश्न",
      login: "लॉगिन",
    },
    hero: {
      title: "प्रवासी श्रमिकों को डिजिटल समाधानों के साथ सशक्त बनाना",
      subtitle:
        "एक सुरक्षित प्लेटफॉर्म जो श्रमिकों को सत्यापित नियोक्ताओं से जोड़ता है, उचित मजदूरी सुनिश्चित करता है और सरकारी कल्याण योजनाओं तक पहुंच प्रदान करता है।",
      cta: "शुरू करें",
    },
    about: {
      title: "हम कौन हैं?",
      description:
        "MigrantConnect एक डिजिटल प्लेटफॉर्म है जिसे भारत में प्रवासी श्रमिकों द्वारा सामना की जाने वाली चुनौतियों का समाधान करने के लिए डिज़ाइन किया गया है। हम एक सुरक्षित, पारदर्शी पारिस्थितिकी तंत्र प्रदान करते हैं जो श्रमिकों को सत्यापित नियोक्ताओं से जोड़ता है, उचित मजदूरी सुनिश्चित करता है, और सरकारी कल्याण योजनाओं तक पहुंच की सुविधा प्रदान करता है। हमारा मिशन प्रौद्योगिकी के माध्यम से प्रवासी श्रमिकों को सशक्त बनाना और एक अधिक न्यायसंगत श्रम बाजार बनाना है।",
    },
    services: {
      title: "हमारी सेवाएँ",
      aadhaar: {
        title: "आधार-आधारित पंजीकरण",
        description:
          "आधार का उपयोग करके सुरक्षित पहचान सत्यापन श्रमिकों और नियोक्ताओं दोनों के लिए प्रामाणिक प्रोफाइल सुनिश्चित करता है।",
      },
      jobs: {
        title: "नौकरी मिलान और ट्रैकिंग",
        description: "AI-संचालित नौकरी मिलान श्रमिकों को कौशल और स्थान के आधार पर उपयुक्त रोजगार के अवसरों से जोड़ता है।",
      },
      welfare: {
        title: "कल्याण योजना पहुंच",
        description: "पात्रता जांच और आवेदन सहायता के साथ सरकारी कल्याण योजनाओं तक सरलीकृत पहुंच।",
      },
    },
    faq: {
      title: "अक्सर पूछे जाने वाले प्रश्न",
      questions: [
        {
          question: "आधार-आधारित पंजीकरण कैसे काम करता है?",
          answer:
            "हमारा प्लेटफॉर्म श्रमिकों और नियोक्ताओं की पहचान को सत्यापित करने के लिए आधार प्रमाणीकरण का उपयोग करता है। यह सुनिश्चित करता है कि प्लेटफॉर्म पर सभी उपयोगकर्ता वास्तविक हैं और नौकरी मिलान के लिए एक सुरक्षित वातावरण बनाता है।",
        },
        {
          question: "कौन सी नौकरी सेवाएँ प्रदान की जाती हैं?",
          answer:
            "हम कौशल और स्थान के आधार पर नौकरी मिलान, पारदर्शी वेतन समझौते, भुगतान ट्रैकिंग, और श्रमिकों के उचित व्यवहार को सुनिश्चित करने के लिए शिकायत निवारण प्रणाली प्रदान करते हैं।",
        },
        {
          question: "क्या यह प्लेटफॉर्म श्रमिकों के लिए मुफ्त है?",
          answer:
            "हां, यह प्लेटफॉर्म प्रवासी श्रमिकों के लिए पूरी तरह से मुफ्त है। हम उन लोगों के लिए सुलभ सेवाएं प्रदान करने में विश्वास करते हैं जिन्हें इनकी सबसे अधिक आवश्यकता है।",
        },
      ],
    },
    footer: {
      quickLinks: "त्वरित लिंक",
      privacy: "गोपनीयता नीति",
      terms: "उपयोग की शर्तें",
      contact: "संपर्क करें",
      rights: "© 2023 MigrantConnect. सर्वाधिकार सुरक्षित।",
    },
  },
}

type LanguageKey = keyof typeof translations

interface LandingPageProps {
  language: string
}

export function LandingPage({ language }: LandingPageProps) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [expandedFAQs, setExpandedFAQs] = useState<number[]>([])
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<string | null>(null)

  // Ensure language is a valid key, default to English if not
  const safeLanguage = translations[language as LanguageKey] ? (language as LanguageKey) : "english"
  const t = translations[safeLanguage]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    // Get the current theme from localStorage
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme) {
      setTheme(storedTheme)
      // Apply the theme to the document
      document.documentElement.classList.toggle("dark", storedTheme === "dark")
    } else {
      // Default to light theme if not set
      setTheme("light")
      document.documentElement.classList.remove("dark")
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleFAQ = (index: number) => {
    if (expandedFAQs.includes(index)) {
      setExpandedFAQs(expandedFAQs.filter((i) => i !== index))
    } else {
      setExpandedFAQs([...expandedFAQs, index])
    }
  }

  const handleLanguageChange = (newLanguage: string) => {
    localStorage.setItem("preferredLanguage", newLanguage)
    window.location.reload()
  }

  const handleLogin = (type: string) => {
    setLoginDialogOpen(false)
    router.push(`/login?type=${type}`)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="flex min-h-screen flex-col dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/95 dark:border-gray-800 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}
      >
        <div className="container flex h-16 items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <span className="text-xl font-bold">MigrantConnect</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-sm font-medium hover:text-primary">
              {t.nav.home}
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary">
              {t.nav.about}
            </a>
            <a href="#services" className="text-sm font-medium hover:text-primary">
              {t.nav.services}
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-primary">
              {t.nav.faq}
            </a>

            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              >
                <Globe className="h-4 w-4" />
                {safeLanguage === "english" ? "English" : safeLanguage === "tamil" ? "தமிழ்" : "हिन्दी"}
                <ChevronDown className="h-4 w-4" />
              </Button>

              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-gray-700">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      className="w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700"
                      onClick={() => handleLanguageChange("english")}
                    >
                      English
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700"
                      onClick={() => handleLanguageChange("tamil")}
                    >
                      தமிழ் (Tamil)
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700"
                      onClick={() => handleLanguageChange("hindi")}
                    >
                      हिन्दी (Hindi)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Theme toggle removed */}

            <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
              <DialogTrigger asChild>
                <Button>{t.nav.login}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{t.nav.login}</DialogTitle>
                  <DialogDescription>Choose your account type to continue</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <Button
                    className="flex flex-col items-center justify-center h-32 gap-2"
                    onClick={() => handleLogin("worker")}
                  >
                    <Users className="h-8 w-8" />
                    <span>Worker Login</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-32 gap-2"
                    onClick={() => handleLogin("employer")}
                  >
                    <Building2 className="h-8 w-8" />
                    <span>Employer Login</span>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme toggle removed */}
            <button
              className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-4 bg-background dark:bg-gray-900 border-t dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              <div className="dropdown w-full">
                <a
                  href="#home"
                  className="text-sm font-medium hover:text-primary block py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.home}
                </a>
              </div>
              <div className="dropdown w-full">
                <a
                  href="#about"
                  className="text-sm font-medium hover:text-primary block py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.about}
                </a>
              </div>
              <div className="dropdown w-full">
                <a
                  href="#services"
                  className="text-sm font-medium hover:text-primary block py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.services}
                </a>
              </div>
              <div className="dropdown w-full">
                <a
                  href="#faq"
                  className="text-sm font-medium hover:text-primary block py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.faq}
                </a>
              </div>
              \
              <div className="pt-2 border-t dark:border-gray-800">
                <div className="dropdown w-full relative">
                  <button
                    className="flex items-center justify-between w-full text-sm font-medium py-2"
                    onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  >
                    <span>Language</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${languageMenuOpen ? "rotate-180" : ""}`} />
                  </button>
                  {languageMenuOpen && (
                    <div className="mt-1 py-1 bg-background dark:bg-gray-800 border rounded-md dark:border-gray-700">
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700"
                        onClick={() => handleLanguageChange("english")}
                      >
                        English
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700"
                        onClick={() => handleLanguageChange("tamil")}
                      >
                        தமிழ் (Tamil)
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700"
                        onClick={() => handleLanguageChange("hindi")}
                      >
                        हिन्दी (Hindi)
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <Button
                className="w-full mt-2"
                onClick={() => {
                  setMobileMenuOpen(false)
                  setLoginDialogOpen(true)
                }}
              >
                {t.nav.login}
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div className="space-y-2" variants={fadeIn}>
                <h1
                  className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl ${safeLanguage !== "english" ? "leading-relaxed leading-loose" : ""}`}
                >
                  {t.hero.title}
                </h1>
                <p
                  className={`mx-auto max-w-[700px] text-muted-foreground dark:text-gray-400 md:text-xl ${safeLanguage !== "english" ? "leading-10" : ""}`}
                >
                  {t.hero.subtitle}
                </p>
              </motion.div>
              <motion.div variants={fadeIn}>
                <Link href="/register">
                  <Button size="lg" className="px-8">
                    {t.hero.cta}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div className="space-y-4 px-4" variants={fadeIn}>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center lg:text-left">
                  {t.about.title}
                </h2>
                <p
                  className={`text-muted-foreground dark:text-gray-400 md:text-lg ${safeLanguage !== "english" ? "leading-9" : "leading-relaxed"}`}
                >
                  {t.about.description}
                </p>
              </motion.div>
              <motion.div
                className="mx-auto w-full max-w-[500px] overflow-hidden rounded-xl border border-muted dark:border-gray-800 shadow-lg"
                variants={fadeIn}
              >
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Migrant workers using technology"
                  width={500}
                  height={400}
                  className="w-full h-auto"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted dark:bg-gray-800 transition-colors duration-300"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.services.title}</h2>
              </div>
            </motion.div>

            <motion.div
              className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                className="flex flex-col items-center space-y-4 rounded-lg border bg-background dark:bg-gray-900 dark:border-gray-700 p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="rounded-full bg-primary/10 p-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{t.services.aadhaar.title}</h3>
                <p className="text-muted-foreground dark:text-gray-400">{t.services.aadhaar.description}</p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center space-y-4 rounded-lg border bg-background dark:bg-gray-900 dark:border-gray-700 p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="rounded-full bg-primary/10 p-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{t.services.jobs.title}</h3>
                <p className="text-muted-foreground dark:text-gray-400">{t.services.jobs.description}</p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center space-y-4 rounded-lg border bg-background dark:bg-gray-900 dark:border-gray-700 p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="rounded-full bg-primary/10 p-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{t.services.welfare.title}</h3>
                <p className="text-muted-foreground dark:text-gray-400">{t.services.welfare.description}</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.faq.title}</h2>
              </div>
            </motion.div>

            <motion.div
              className="mx-auto max-w-3xl space-y-4 py-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {t.faq.questions.map((faq, index) => (
                <motion.div
                  key={index}
                  className="rounded-lg border bg-background dark:bg-gray-900 dark:border-gray-700 shadow-sm"
                  variants={fadeIn}
                >
                  <button
                    className="flex w-full items-center justify-between p-4 text-left"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${expandedFAQs.includes(index) ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedFAQs.includes(index) && (
                    <motion.div
                      className="border-t dark:border-gray-700 p-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p
                        className={`text-muted-foreground dark:text-gray-400 ${safeLanguage !== "english" ? "leading-8" : ""}`}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t dark:border-gray-800 py-6 md:py-0 bg-background dark:bg-gray-900 transition-colors duration-300">
        <div className="container flex flex-col md:h-24 md:flex-row md:items-center md:justify-between px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              <span className="text-xl font-bold">MigrantConnect</span>
            </div>
            <p className="text-sm text-muted-foreground dark:text-gray-400">{t.footer.rights}</p>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <Link href="#" className="text-sm text-muted-foreground dark:text-gray-400 hover:underline">
                  {t.footer.privacy}
                </Link>
                <Link href="#" className="text-sm text-muted-foreground dark:text-gray-400 hover:underline">
                  {t.footer.terms}
                </Link>
                <Link href="#" className="text-sm text-muted-foreground dark:text-gray-400 hover:underline">
                  {t.footer.contact}
                </Link>
              </div>

              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <Link
                  href="#"
                  className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
