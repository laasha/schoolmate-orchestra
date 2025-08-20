import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Bookmark, TrendingUp, ChevronRight, Calculator, Globe } from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  isRecent?: boolean;
  isFavorite?: boolean;
}

interface QuickActionsProps {
  language: 'ka' | 'en';
  onActionClick: (actionId: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ language, onActionClick }) => {
  const [favorites, setFavorites] = useState<string[]>(['gpt-4', 'claude', 'math-solver']);

  const actions: QuickAction[] = [
    {
      id: 'gpt-4',
      title: language === 'ka' ? 'ChatGPT-4' : 'ChatGPT-4',
      description: language === 'ka' ? 'ყველაზე ძლიერი AI ასისტენტი' : 'Most powerful AI assistant',
      icon: <Star className="h-4 w-4" />,
      category: 'ai',
      isFavorite: true,
      isRecent: true
    },
    {
      id: 'claude',
      title: 'Claude',
      description: language === 'ka' ? 'ანალიტიკური AI ასისტენტი' : 'Analytical AI assistant',
      icon: <TrendingUp className="h-4 w-4" />,
      category: 'ai',
      isFavorite: true,
      isRecent: true
    },
    {
      id: 'math-solver',
      title: language === 'ka' ? 'მათემატიკის ამოხსნელი' : 'Math Solver',
      description: language === 'ka' ? 'მათემატიკური ამოცანების ამოხსნა' : 'Solve mathematical problems',
      icon: <Calculator className="h-4 w-4" />,
      category: 'tools',
      isFavorite: true
    },
    {
      id: 'translator',
      title: language === 'ka' ? 'თარგმანი' : 'Translator',
      description: language === 'ka' ? 'ენების თარგმანი' : 'Language translation',
      icon: <Globe className="h-4 w-4" />,
      category: 'tools',
      isRecent: true
    }
  ];

  const toggleFavorite = (actionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(actionId) 
        ? prev.filter(id => id !== actionId)
        : [...prev, actionId]
    );
  };

  const favoriteActions = actions.filter(action => favorites.includes(action.id));
  const recentActions = actions.filter(action => action.isRecent);

  return (
    <div className="space-y-6">
      {/* Favorites */}
      <Card>
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
            {favoriteActions.map((action) => (
              <div 
                key={action.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onActionClick(action.id)}
              >
                <div className="flex items-center gap-2">
                  {action.icon}
                  <div>
                    <p className="text-sm font-medium">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => toggleFavorite(action.id, e)}
                    className="h-6 w-6 p-0"
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

      {/* Recent */}
      <Card>
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
            {recentActions.slice(0, 3).map((action) => (
              <div 
                key={action.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onActionClick(action.id)}
              >
                <div className="flex items-center gap-2">
                  {action.icon}
                  <div>
                    <p className="text-sm font-medium">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};