import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Bookmark, TrendingUp, ChevronRight, Calculator, Globe, Brain, FileText, PresentationIcon, Code, Palette, Music } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface QuickAction {
  id: string;
  title: string;
  titleKa: string;
  description: string;
  descriptionKa: string;
  icon: React.ReactNode;
  category: string;
  isRecent?: boolean;
  isFavorite?: boolean;
  url?: string;
}

interface QuickActionsProps {
  language: 'ka' | 'en';
  onActionClick: (actionId: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ language, onActionClick }) => {
  const [favorites, setFavorites] = useState<string[]>(['gpt-4', 'claude', 'math-solver', 'translator']);
  const [recentActions, setRecentActions] = useState<string[]>(['gpt-4', 'claude', 'translator', 'code-helper']);

  const allActions: QuickAction[] = [
    {
      id: 'gpt-4',
      title: 'ChatGPT-4',
      titleKa: 'ChatGPT-4',
      description: 'Most powerful AI assistant',
      descriptionKa: 'ყველაზე ძლიერი AI ასისტენტი',
      icon: <Brain className="h-4 w-4" />,
      category: 'ai',
      url: 'https://chat.openai.com'
    },
    {
      id: 'claude',
      title: 'Claude',
      titleKa: 'Claude',
      description: 'Analytical AI assistant',
      descriptionKa: 'ანალიტიკური AI ასისტენტი',
      icon: <TrendingUp className="h-4 w-4" />,
      category: 'ai',
      url: 'https://claude.ai'
    },
    {
      id: 'math-solver',
      title: 'Math Solver',
      titleKa: 'მათემატიკის ამოხსნელი',
      description: 'Solve mathematical problems',
      descriptionKa: 'მათემატიკური ამოცანების ამოხსნა',
      icon: <Calculator className="h-4 w-4" />,
      category: 'tools'
    },
    {
      id: 'translator',
      title: 'Translator',
      titleKa: 'თარგმანი',
      description: 'Language translation',
      descriptionKa: 'ენების თარგმანი',
      icon: <Globe className="h-4 w-4" />,
      category: 'tools'
    },
    {
      id: 'essay-writer',
      title: 'Essay Writer',
      titleKa: 'ესსეის დამწერი',
      description: 'AI-powered essay writing',
      descriptionKa: 'AI-ით შექმნილი ესსეები',
      icon: <FileText className="h-4 w-4" />,
      category: 'writing'
    },
    {
      id: 'presentation-maker',
      title: 'Presentation Maker',
      titleKa: 'პრეზენტაციის შემქმნელი',
      description: 'Create stunning presentations',
      descriptionKa: 'შექმენით მშვენიერი პრეზენტაციები',
      icon: <PresentationIcon className="h-4 w-4" />,
      category: 'productivity'
    },
    {
      id: 'code-helper',
      title: 'Code Helper',
      titleKa: 'კოდის დამხმარე',
      description: 'Programming assistance',
      descriptionKa: 'პროგრამირების დახმარება',
      icon: <Code className="h-4 w-4" />,
      category: 'coding'
    },
    {
      id: 'art-generator',
      title: 'Art Generator',
      titleKa: 'ხელოვნების გენერატორი',
      description: 'Create AI artwork',
      descriptionKa: 'შექმენით AI ნამუშევრები',
      icon: <Palette className="h-4 w-4" />,
      category: 'creative'
    }
  ];

  // Add favorites and recent status to actions
  const actions = allActions.map(action => ({
    ...action,
    isFavorite: favorites.includes(action.id),
    isRecent: recentActions.includes(action.id)
  }));

  const toggleFavorite = (actionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const actionTitle = actions.find(a => a.id === actionId)?.title;
    
    setFavorites(prev => {
      const isRemoving = prev.includes(actionId);
      const newFavorites = isRemoving 
        ? prev.filter(id => id !== actionId)
        : [...prev, actionId];
      
      toast({
        title: isRemoving 
          ? (language === 'ka' ? 'ამოღებულია ფავორიტებიდან' : 'Removed from favorites')
          : (language === 'ka' ? 'დამატებულია ფავორიტებში' : 'Added to favorites'),
        description: `${actionTitle}`,
        duration: 2000,
      });
      
      return newFavorites;
    });
  };

  const handleActionClick = (action: QuickAction) => {
    // Add to recent actions
    setRecentActions(prev => {
      const filtered = prev.filter(id => id !== action.id);
      return [action.id, ...filtered.slice(0, 6)]; // Keep max 7 recent items
    });

    // Show success toast
    toast({
      title: language === 'ka' ? 'ხელსაწყო გაშვებულია' : 'Tool Launched',
      description: language === 'ka' ? action.titleKa : action.title,
      duration: 2000,
    });

    // Handle the click
    if (action.url) {
      window.open(action.url, '_blank');
    }
    onActionClick(action.id);
  };

  const favoriteActions = actions.filter(action => action.isFavorite);
  const recentActionsData = actions.filter(action => action.isRecent).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Favorites */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">
              {language === 'ka' ? 'ფავორიტები' : 'Favorites'}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {favoriteActions.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid gap-2">
            {favoriteActions.slice(0, 3).map((action) => (
              <div 
                key={action.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors group"
                onClick={() => handleActionClick(action)}
              >
                <div className="flex items-center gap-2 flex-1">
                  {action.icon}
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {language === 'ka' ? action.titleKa : action.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'ka' ? action.descriptionKa : action.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => toggleFavorite(action.id, e)}
                    className="h-6 w-6 p-0"
                    title={language === 'ka' ? 'ფავორიტებიდან ამოღება' : 'Remove from favorites'}
                  >
                    <Star className="h-3 w-3 fill-primary text-primary" />
                  </Button>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
            ))}
            {favoriteActions.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">
                {language === 'ka' ? 'ჯერ არ გაქვთ ფავორიტები' : 'No favorites yet'}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">
              {language === 'ka' ? 'ბოლოს გამოყენებული' : 'Recently Used'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid gap-2">
            {recentActionsData.slice(0, 3).map((action) => (
              <div 
                key={action.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors group"
                onClick={() => handleActionClick(action)}
              >
                <div className="flex items-center gap-2 flex-1">
                  {action.icon}
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {language === 'ka' ? action.titleKa : action.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'ka' ? action.descriptionKa : action.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => toggleFavorite(action.id, e)}
                    className="h-6 w-6 p-0"
                    title={favorites.includes(action.id) 
                      ? (language === 'ka' ? 'ფავორიტებიდან ამოღება' : 'Remove from favorites')
                      : (language === 'ka' ? 'ფავორიტებში დამატება' : 'Add to favorites')
                    }
                  >
                    <Star className={`h-3 w-3 ${favorites.includes(action.id) ? 'fill-primary text-primary' : ''}`} />
                  </Button>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};