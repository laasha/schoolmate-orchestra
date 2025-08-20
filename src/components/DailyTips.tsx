import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, ChevronRight, X, RefreshCw } from 'lucide-react';

const tips = [
  {
    id: 1,
    ka: "გამოიყენეთ ⌘K კომბინაცია სწრაფი ძიებისთვის",
    en: "Use ⌘K for quick search across all tools",
    category: "keyboard",
    priority: "high"
  },
  {
    id: 2,
    ka: "AI ასისტენტები უკეთ მუშაობენ კონკრეტული კითხვებისას",
    en: "AI Assistants work better with specific questions",
    category: "ai",
    priority: "medium"
  },
  {
    id: 3,
    ka: "შეინახეთ ხშირად გამოყენებული ხელსაწყოები ფავორიტებში",
    en: "Save frequently used tools to favorites for quick access",
    category: "productivity",
    priority: "high"
  },
  {
    id: 4,
    ka: "გამოიყენეთ 't' ღილაკი თემის სწრაფად შესაცვლელად",
    en: "Press 't' to quickly toggle between light and dark themes",
    category: "keyboard",
    priority: "low"
  },
  {
    id: 5,
    ka: "AI ხელსაწყოები უკეთ მუშაობენ ქართულ ტექსტზე",
    en: "AI tools are optimized for Georgian language content",
    category: "ai",
    priority: "medium"
  }
];

interface DailyTipsProps {
  language: 'ka' | 'en';
}

export const DailyTips: React.FC<DailyTipsProps> = ({ language }) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const closeTips = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const tip = tips[currentTip];
  const text = language === 'ka' ? tip.ka : tip.en;
  const categoryText = language === 'ka' ? 
    (tip.category === 'keyboard' ? 'კლავიატურა' : 
     tip.category === 'ai' ? 'AI' : 'პროდუქტიულობა') :
    tip.category;

  return (
    <Card className="border-l-4 border-l-primary bg-gradient-to-r from-background to-muted/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">
              {language === 'ka' ? 'დღის რჩევა' : 'Tip of the Day'}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {categoryText}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={nextTip}>
              <RefreshCw className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={closeTips}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-foreground">{text}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-1">
            {tips.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  index === currentTip ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={nextTip} className="text-xs">
            {language === 'ka' ? 'შემდეგი' : 'Next'}
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};