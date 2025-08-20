import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, ChevronRight, X, RefreshCw, Brain, Keyboard, BookOpen, Zap, Target, Users } from 'lucide-react';

const aiGeneratedTips = [
  // Keyboard & Navigation Tips
  {
    id: 1,
    ka: "გამოიყენეთ ⌘K კომბინაცია სწრაფი ძიებისთვის ყველა ხელსაწყოში",
    en: "Use ⌘K for lightning-fast search across all 140+ tools",
    category: "keyboard",
    priority: "high",
    icon: <Keyboard className="h-3 w-3" />
  },
  {
    id: 2,
    ka: "გამოიყენეთ 'Esc' ღილაკი ნებისმიერი მოდალის დასახურად",
    en: "Press 'Esc' to quickly close any modal or dialog",
    category: "keyboard",
    priority: "medium",
    icon: <Keyboard className="h-3 w-3" />
  },
  {
    id: 3,
    ka: "გამოიყენეთ 't' ღილაკი თემის სწრაფად შესაცვლელად",
    en: "Press 't' to instantly toggle between dark and light themes",
    category: "keyboard",
    priority: "low",
    icon: <Keyboard className="h-3 w-3" />
  },

  // AI Usage & Best Practices
  {
    id: 4,
    ka: "AI ასისტენტებს აცხადეთ კონკრეტული ინსტრუქციები და კონტექსტი",
    en: "Give AI assistants specific instructions and context for better results",
    category: "ai",
    priority: "high",
    icon: <Brain className="h-3 w-3" />
  },
  {
    id: 5,
    ka: "გამოიყენეთ 'System Prompt' დეტალური ინსტრუქციებისთვის AI-სთან",
    en: "Use 'System Prompts' to give detailed instructions to AI models",
    category: "ai",
    priority: "medium",
    icon: <Brain className="h-3 w-3" />
  },
  {
    id: 6,
    ka: "AI-ს შეუძლია კოდის, ესსეების და პრეზენტაციების შექმნა ერთდროულად",
    en: "AI can create code, essays, and presentations simultaneously",
    category: "ai",
    priority: "high",
    icon: <Brain className="h-3 w-3" />
  },
  {
    id: 7,
    ka: "AI ხელსაწყოები ოპტიმიზირებულია ქართული ენისთვის",
    en: "AI tools are specially optimized for Georgian language processing",
    category: "ai",
    priority: "medium",
    icon: <Brain className="h-3 w-3" />
  },
  {
    id: 8,
    ka: "გამოიყენეთ Claude-ი ანალიტიკური დავალებებისთვის, GPT კი კრეატიულისთვის",
    en: "Use Claude for analytical tasks, GPT for creative work",
    category: "ai",
    priority: "high",
    icon: <Brain className="h-3 w-3" />
  },

  // Study & Learning Tips
  {
    id: 9,
    ka: "შექმენით სასწავლო გეგმა AI Study Planner-ით ეფექტური სწავლისთვის",
    en: "Create a study schedule with AI Study Planner for effective learning",
    category: "study",
    priority: "high",
    icon: <BookOpen className="h-3 w-3" />
  },
  {
    id: 10,
    ka: "გამოიყენეთ Diagram Analyzer რთული კონცეფციების გასაგებად",
    en: "Use Diagram Analyzer to understand complex concepts visually",
    category: "study",
    priority: "medium",
    icon: <BookOpen className="h-3 w-3" />
  },
  {
    id: 11,
    ka: "AI Citation Generator დაგეხმარებათ სწორი ციტირების შექმნაში",
    en: "AI Citation Generator helps create perfect academic citations",
    category: "study",
    priority: "medium",
    icon: <BookOpen className="h-3 w-3" />
  },
  {
    id: 12,
    ka: "შექმენით flashcard-ები AI-ს დახმარებით უკეთესი დამახსოვრებისთვის",
    en: "Create AI-powered flashcards for better memory retention",
    category: "study",
    priority: "high",
    icon: <BookOpen className="h-3 w-3" />
  },

  // Productivity Tips
  {
    id: 13,
    ka: "შეინახეთ ხშირად გამოყენებული ხელსაწყოები ფავორიტებში",
    en: "Save frequently used tools to favorites for instant access",
    category: "productivity",
    priority: "high",
    icon: <Zap className="h-3 w-3" />
  },
  {
    id: 14,
    ka: "გამოიყენეთ Quick Actions პანელი 5 წამში ხელსაწყოების გასაშვებად",
    en: "Use Quick Actions panel to launch tools in under 5 seconds",
    category: "productivity",
    priority: "medium",
    icon: <Zap className="h-3 w-3" />
  },
  {
    id: 15,
    ka: "შექმენით სამუშაო სივრცე სპეციფიკური პროექტებისთვის",
    en: "Create dedicated workspaces for specific projects",
    category: "productivity",
    priority: "medium",
    icon: <Zap className="h-3 w-3" />
  },
  {
    id: 16,
    ka: "გამოიყენეთ ღამის რეჟიმი თვალების დასაცავად გრძელი სესიების დროს",
    en: "Use dark mode to reduce eye strain during long study sessions",
    category: "productivity",
    priority: "low",
    icon: <Zap className="h-3 w-3" />
  },

  // Advanced Features
  {
    id: 17,
    ka: "სუპერ ასისტენტები შეუძლიათ რამდენიმე ხელსაწყოს ერთდროული გამოყენება",
    en: "Super Assistants can use multiple tools simultaneously",
    category: "advanced",
    priority: "high",
    icon: <Target className="h-3 w-3" />
  },
  {
    id: 18,
    ka: "გამოიყენეთ Voice Commands ხელების გარეშე ნავიგაციისთვის",
    en: "Use Voice Commands for hands-free navigation",
    category: "advanced",
    priority: "medium",
    icon: <Target className="h-3 w-3" />
  },
  {
    id: 19,
    ka: "AI ხელსაწყოები შეუძლიათ ერთმანეთთან კომუნიკაცია შედეგების გაუმჯობესებისთვის",
    en: "AI tools can communicate with each other for enhanced results",
    category: "advanced",
    priority: "high",
    icon: <Target className="h-3 w-3" />
  },

  // Collaboration Tips
  {
    id: 20,
    ka: "გააზიარეთ AI-ის შექმნილი კონტენტი პირდაპირ სოციალურ მედიაში",
    en: "Share AI-generated content directly to social media platforms",
    category: "collaboration",
    priority: "medium",
    icon: <Users className="h-3 w-3" />
  },
  {
    id: 21,
    ka: "შექმენით გუნდური პროექტები AI ასისტენტების დახმარებით",
    en: "Create team projects with collaborative AI assistance",
    category: "collaboration",
    priority: "medium",
    icon: <Users className="h-3 w-3" />
  }
];

interface DailyTipsProps {
  language: 'ka' | 'en';
}

export const DailyTips: React.FC<DailyTipsProps> = ({ language }) => {
  const [currentTip, setCurrentTip] = useState(() => Math.floor(Math.random() * aiGeneratedTips.length));
  const [isVisible, setIsVisible] = useState(true);
  const [viewedTips, setViewedTips] = useState<number[]>([]);

  // Auto-rotate tips every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTip();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const nextTip = () => {
    setCurrentTip((prev) => {
      const nextIndex = (prev + 1) % aiGeneratedTips.length;
      setViewedTips(prevViewed => [...new Set([...prevViewed, prev])]);
      return nextIndex;
    });
  };

  const getRandomTip = () => {
    const availableTips = aiGeneratedTips.filter((_, index) => !viewedTips.includes(index));
    if (availableTips.length === 0) {
      setViewedTips([]);
      setCurrentTip(Math.floor(Math.random() * aiGeneratedTips.length));
    } else {
      const randomIndex = Math.floor(Math.random() * availableTips.length);
      const originalIndex = aiGeneratedTips.findIndex(tip => tip.id === availableTips[randomIndex].id);
      setCurrentTip(originalIndex);
    }
  };

  const closeTips = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const tip = aiGeneratedTips[currentTip];
  const text = language === 'ka' ? tip.ka : tip.en;
  
  const getCategoryText = (category: string) => {
    if (language === 'ka') {
      switch (category) {
        case 'keyboard': return 'კლავიატურა';
        case 'ai': return 'AI';
        case 'productivity': return 'პროდუქტიულობა';
        case 'study': return 'სწავლა';
        case 'advanced': return 'მოწინავე';
        case 'collaboration': return 'თანამშრომლობა';
        default: return category;
      }
    }
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'keyboard': return 'bg-blue-500/10 text-blue-700 dark:text-blue-300';
      case 'ai': return 'bg-purple-500/10 text-purple-700 dark:text-purple-300';
      case 'productivity': return 'bg-green-500/10 text-green-700 dark:text-green-300';
      case 'study': return 'bg-orange-500/10 text-orange-700 dark:text-orange-300';
      case 'advanced': return 'bg-red-500/10 text-red-700 dark:text-red-300';
      case 'collaboration': return 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300';
      default: return 'bg-gray-500/10 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <Card className="border-l-4 border-l-primary bg-gradient-to-r from-background to-muted/20 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Lightbulb className="h-4 w-4 text-primary animate-pulse" />
              {tip.icon}
            </div>
            <CardTitle className="text-sm font-medium">
              {language === 'ka' ? 'AI რჩევა' : 'AI Tip'}
            </CardTitle>
            <Badge className={`text-xs ${getCategoryColor(tip.category)}`}>
              {getCategoryText(tip.category)}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={getRandomTip} title={language === 'ka' ? 'შემთხვევითი რჩევა' : 'Random tip'}>
              <RefreshCw className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={closeTips} title={language === 'ka' ? 'დახურვა' : 'Close'}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-foreground leading-relaxed">{text}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-1">
            {aiGeneratedTips.slice(0, 8).map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  index === currentTip % 8 ? 'bg-primary scale-125' : 
                  viewedTips.includes(index) ? 'bg-primary/40' : 'bg-muted'
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-2">
              {viewedTips.length + 1}/{aiGeneratedTips.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={nextTip} className="text-xs">
              {language === 'ka' ? 'შემდეგი' : 'Next'}
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};