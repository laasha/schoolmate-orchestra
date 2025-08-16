import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  BookOpen, 
  Calculator, 
  PenTool, 
  Presentation, 
  Microscope, 
  Globe, 
  Palette, 
  GraduationCap,
  Filter,
  Star,
  ChevronRight,
  Sparkles,
  Zap,
  Brain,
  Eye,
  FileText,
  BarChart3,
  Target,
  Users,
  Settings,
  Sun,
  Moon,
  Command,
  User,
  LogIn,
  LogOut,
  Save,
  Download,
  Upload,
  Camera,
  Mic,
  Volume2,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  Menu,
  Home,
  Wrench,
  HelpCircle,
  Shield,
  Clock,
  Heart,
  TrendingUp,
  Award,
  Lightbulb,
  Code,
  Image,
  Languages,
  Music,
  Video,
  Database,
  Cloud,
  Lock,
  Unlock,
  Share2,
  Copy,
  Edit,
  Trash2,
  Plus,
  Minus,
  Play,
  Pause,
  Square,
  SkipForward,
  SkipBack,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  MoreHorizontal,
  MoreVertical,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// ==================== CORE CONFIGURATION ====================

interface AppConfig {
  isDemoMode: boolean;
  theme: 'light' | 'dark' | 'system';
  language: 'ka' | 'en';
  user: {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
    isAuthenticated: boolean;
  } | null;
}

interface AITool {
  id: string;
  name: string;
  nameKa: string;
  description: string;
  descriptionKa: string;
  category: string;
  categoryKa: string;
  tags: string[];
  isFree: boolean;
  isK12Recommended: boolean;
  hasGeorgianUI: boolean;
  link: string;
  rating?: number;
  usageCount?: number;
}

interface AssistantResult {
  id: string;
  type: string;
  timestamp: number;
  input: any;
  output: {
    summary: string;
    content: any;
    sources: string[];
    nextSteps: string[];
    confidence: number;
    reflectionNotes?: string;
    verificationStatus?: 'verified' | 'unverified' | 'conflicted';
  };
}

// ==================== MOCK DATA ====================

const AI_TOOLS: AITool[] = [
  // Research & Analysis (20 tools)
  { id: '1', name: 'ChatGPT', nameKa: 'ჩატჯითპი', description: 'Advanced AI assistant for research and writing', descriptionKa: 'განვითარებული AI ასისტენტი კვლევისა და წერისთვის', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['research', 'writing', 'analysis'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://chat.openai.com' },
  { id: '2', name: 'Claude', nameKa: 'კლოდ', description: 'AI assistant specialized in analysis and reasoning', descriptionKa: 'AI ასისტენტი სპეციალიზირებული ანალიზსა და მსჯელობაში', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['analysis', 'reasoning', 'research'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://claude.ai' },
  { id: '3', name: 'Perplexity', nameKa: 'პერპლექსითი', description: 'AI search engine with real-time data', descriptionKa: 'AI საძიებო სისტემა რეალურ დროში მონაცემებით', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['search', 'research', 'real-time'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://perplexity.ai' },
  { id: '4', name: 'Consensus', nameKa: 'კონსენსუსი', description: 'Academic paper search using AI', descriptionKa: 'აკადემიური ნაშრომების ძიება AI-ის გამოყენებით', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['academic', 'papers', 'research'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://consensus.app' },
  { id: '5', name: 'Semantic Scholar', nameKa: 'სემანტიკური მეცნიერი', description: 'AI-powered academic search engine', descriptionKa: 'AI-ით უზრუნველყოფილი აკადემიური საძიებო სისტემა', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['academic', 'research', 'papers'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://semanticscholar.org' },
  { id: '6', name: 'Research Rabbit', nameKa: 'კვლევითი კურდღელი', description: 'Visual paper discovery and mapping', descriptionKa: 'ნაშრომების ვიზუალური აღმოჩენა და რუკა', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['papers', 'visualization', 'mapping'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://researchrabbitapp.com' },
  { id: '7', name: 'Elicit', nameKa: 'ელისითი', description: 'AI research assistant for literature reviews', descriptionKa: 'AI კვლევითი ასისტენტი ლიტერატურის მიმოხილვისთვის', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['literature', 'review', 'research'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://elicit.org' },
  { id: '8', name: 'Scite', nameKa: 'საიტი', description: 'Citation analysis with AI insights', descriptionKa: 'ციტირების ანალიზი AI შეხედულებებით', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['citations', 'analysis', 'research'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://scite.ai' },
  { id: '9', name: 'Connected Papers', nameKa: 'დაკავშირებული ნაშრომები', description: 'Visual graph of related academic papers', descriptionKa: 'დაკავშირებული აკადემიური ნაშრომების ვიზუალური გრაფიკი', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['papers', 'visualization', 'connections'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://connectedpapers.com' },
  { id: '10', name: 'Inciteful', nameKa: 'წამახალისებელი', description: 'Academic citation network analysis', descriptionKa: 'აკადემიური ციტირების ქსელის ანალიზი', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['citations', 'network', 'analysis'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://inciteful.xyz' },
  { id: '11', name: 'Sourcely', nameKa: 'წყაროზე', description: 'AI-powered source finding for research', descriptionKa: 'AI-ით უზრუნველყოფილი წყაროების მოძიება კვლევისთვის', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['sources', 'research', 'finding'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://sourcely.net' },
  { id: '12', name: 'Scholarcy', nameKa: 'სკოლარსი', description: 'AI research paper summarizer', descriptionKa: 'AI კვლევითი ნაშრომების შემაჯამებელი', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['summarization', 'papers', 'research'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://scholarcy.com' },
  { id: '13', name: 'Litmaps', nameKa: 'ლიტმაპები', description: 'Literature mapping and discovery', descriptionKa: 'ლიტერატურის რუკა და აღმოჩენა', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['literature', 'mapping', 'discovery'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://litmaps.co' },
  { id: '14', name: 'Explainpaper', nameKa: 'ნაშრომის ახსნა', description: 'AI explanations for research papers', descriptionKa: 'AI ახსნები კვლევითი ნაშრომებისთვის', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['explanation', 'papers', 'understanding'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://explainpaper.com' },
  { id: '15', name: 'SciSpace', nameKa: 'საისეისი', description: 'AI research and paper analysis platform', descriptionKa: 'AI კვლევისა და ნაშრომების ანალიზის პლატფორმა', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['research', 'analysis', 'platform'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://typeset.io' },
  { id: '16', name: 'Lateral', nameKa: 'გვერდითი', description: 'AI-powered research assistant', descriptionKa: 'AI-ით უზრუნველყოფილი კვლევითი ასისტენტი', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['research', 'assistant', 'discovery'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://lateral.io' },
  { id: '17', name: 'Iris.ai', nameKa: 'აირისი', description: 'AI research workspace', descriptionKa: 'AI კვლევითი სამუშაო გარემო', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['workspace', 'research', 'analysis'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://iris.ai' },
  { id: '18', name: 'Zeta Alpha', nameKa: 'ზეტა ალფა', description: 'AI-powered research discovery', descriptionKa: 'AI-ით უზრუნველყოფილი კვლევითი აღმოჩენა', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['discovery', 'research', 'AI'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://zetaalpha.com' },
  { id: '19', name: 'Yewno', nameKa: 'იევნო', description: 'Knowledge discovery platform', descriptionKa: 'ცოდნის აღმოჩენის პლატფორმა', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['knowledge', 'discovery', 'research'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://yewno.com' },
  { id: '20', name: 'OpenRead', nameKa: 'ღია კითხვა', description: 'AI-enhanced paper reading', descriptionKa: 'AI-ით გაუმჯობესებული ნაშრომების კითხვა', category: 'Research & Analysis', categoryKa: 'კვლევა და ანალიზი', tags: ['reading', 'papers', 'enhancement'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://openread.academy' },

  // Writing & Essays (20 tools)
  { id: '21', name: 'Grammarly', nameKa: 'გრამარლი', description: 'AI writing assistant and grammar checker', descriptionKa: 'AI წერის ასისტენტი და გრამატიკის შემმოწმებელი', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['grammar', 'writing', 'assistance'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://grammarly.com' },
  { id: '22', name: 'Notion AI', nameKa: 'ნოშენ AI', description: 'AI-powered note-taking and writing', descriptionKa: 'AI-ით უზრუნველყოფილი ჩანაწერებისა და წერის სისტემა', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['notes', 'writing', 'productivity'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://notion.so' },
  { id: '23', name: 'Jasper', nameKa: 'ჯასპერი', description: 'AI content creation platform', descriptionKa: 'AI კონტენტის შექმნის პლატფორმა', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['content', 'creation', 'writing'], isFree: false, isK12Recommended: false, hasGeorgianUI: false, link: 'https://jasper.ai' },
  { id: '24', name: 'Copy.ai', nameKa: 'კოპი.აი', description: 'AI copywriting and content generator', descriptionKa: 'AI კოპირაიტინგისა და კონტენტის გენერატორი', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['copywriting', 'content', 'generation'], isFree: true, isK12Recommended: false, hasGeorgianUI: false, link: 'https://copy.ai' },
  { id: '25', name: 'Writesonic', nameKa: 'რაითსონიკი', description: 'AI writing assistant for various content types', descriptionKa: 'AI წერის ასისტენტი სხვადასხვა კონტენტის ტიპებისთვის', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['writing', 'content', 'assistant'], isFree: true, isK12Recommended: false, hasGeorgianUI: false, link: 'https://writesonic.com' },
  { id: '26', name: 'QuillBot', nameKa: 'კვილბოტი', description: 'AI paraphrasing and writing enhancement', descriptionKa: 'AI პარაფრაზირებისა და წერის გაუმჯობესების ინსტრუმენტი', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['paraphrasing', 'enhancement', 'writing'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://quillbot.com' },
  { id: '27', name: 'Hemingway Editor', nameKa: 'ჰემინგუეის რედაქტორი', description: 'Writing clarity and readability analyzer', descriptionKa: 'წერის სიცხადისა და წასაკითხობის ანალიზატორი', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['clarity', 'readability', 'editing'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://hemingwayapp.com' },
  { id: '28', name: 'ProWritingAid', nameKa: 'პრო წერის დახმარება', description: 'Comprehensive writing analysis tool', descriptionKa: 'წერის სრული ანალიზის ინსტრუმენტი', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['analysis', 'writing', 'improvement'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://prowritingaid.com' },
  { id: '29', name: 'Wordtune', nameKa: 'ვორდტუნი', description: 'AI writing companion for rewriting', descriptionKa: 'AI წერის თანამგზავრი გადაწერისთვის', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['rewriting', 'improvement', 'AI'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://wordtune.com' },
  { id: '30', name: 'Rytr', nameKa: 'რაითრი', description: 'AI writing assistant for various formats', descriptionKa: 'AI წერის ასისტენტი სხვადასხვა ფორმატისთვის', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['writing', 'formats', 'assistant'], isFree: true, isK12Recommended: false, hasGeorgianUI: false, link: 'https://rytr.me' },
  { id: '31', name: 'Jenni AI', nameKa: 'ჯენი AI', description: 'AI writing assistant for academic writing', descriptionKa: 'AI წერის ასისტენტი აკადემიური წერისთვის', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['academic', 'writing', 'research'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://jenni.ai' },
  { id: '32', name: 'Paperpal', nameKa: 'პეიპერფალი', description: 'AI writing assistant for researchers', descriptionKa: 'AI წერის ასისტენტი მკვლევარებისთვის', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['research', 'academic', 'writing'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://paperpal.com' },
  { id: '33', name: 'Othersideai', nameKa: 'მეორე მხარე AI', description: 'AI email and document writing', descriptionKa: 'AI ელფოსტისა და დოკუმენტების წერა', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['email', 'documents', 'writing'], isFree: true, isK12Recommended: false, hasGeorgianUI: false, link: 'https://othersideai.com' },
  { id: '34', name: 'Lex', nameKa: 'ლექსი', description: 'AI-powered word processor', descriptionKa: 'AI-ით უზრუნველყოფილი ტექსტის პროცესორი', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['processor', 'writing', 'AI'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://lex.page' },
  { id: '35', name: 'Sudowrite', nameKa: 'სუდორაითი', description: 'AI creative writing assistant', descriptionKa: 'AI კრეატიული წერის ასისტენტი', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['creative', 'writing', 'fiction'], isFree: false, isK12Recommended: false, hasGeorgianUI: false, link: 'https://sudowrite.com' },
  { id: '36', name: 'Shortly AI', nameKa: 'შორთლი AI', description: 'AI writing partner for long-form content', descriptionKa: 'AI წერის პარტნიორი გრძელი კონტენტისთვის', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['long-form', 'writing', 'partner'], isFree: false, isK12Recommended: false, hasGeorgianUI: false, link: 'https://shortlyai.com' },
  { id: '37', name: 'Compose AI', nameKa: 'კომპოზ AI', description: 'AI writing automation tool', descriptionKa: 'AI წერის ავტომატიზაციის ინსტრუმენტი', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['automation', 'writing', 'productivity'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://compose.ai' },
  { id: '38', name: 'Textio', nameKa: 'ტექსტიო', description: 'Augmented writing platform', descriptionKa: 'გაფართოებული წერის პლატფორმა', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['augmented', 'writing', 'improvement'], isFree: false, isK12Recommended: false, hasGeorgianUI: false, link: 'https://textio.com' },
  { id: '39', name: 'Outwrite', nameKa: 'აუტრაითი', description: 'AI writing assistant and editor', descriptionKa: 'AI წერის ასისტენტი და რედაქტორი', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['editing', 'writing', 'assistant'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://outwrite.com' },
  { id: '40', name: 'Writer', nameKa: 'მწერალი', description: 'AI writing platform for teams', descriptionKa: 'AI წერის პლატფორმა გუნდებისთვის', category: 'Writing & Essays', categoryKa: 'წერა და ესეები', tags: ['teams', 'writing', 'collaboration'], isFree: false, isK12Recommended: false, hasGeorgianUI: false, link: 'https://writer.com' },

  // Presentation & Visualization (20 tools)
  { id: '41', name: 'Gamma', nameKa: 'გამა', description: 'AI-powered presentation maker', descriptionKa: 'AI-ით უზრუნველყოფილი პრეზენტაციების შექმნის ინსტრუმენტი', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['presentations', 'AI', 'design'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://gamma.app' },
  { id: '42', name: 'Beautiful.ai', nameKa: 'ლამაზი.აი', description: 'Smart presentation software', descriptionKa: 'ჭკვიანი პრეზენტაციების პროგრამა', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['presentations', 'smart', 'design'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://beautiful.ai' },
  { id: '43', name: 'Tome', nameKa: 'ტომი', description: 'AI storytelling and presentation tool', descriptionKa: 'AI მოთხრობისა და პრეზენტაციის ინსტრუმენტი', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['storytelling', 'presentations', 'AI'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://tome.app' },
  { id: '44', name: 'Pitch', nameKa: 'პიჩი', description: 'Collaborative presentation platform', descriptionKa: 'თანამშრომლობითი პრეზენტაციების პლატფორმა', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['collaboration', 'presentations', 'teams'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://pitch.com' },
  { id: '45', name: 'Canva', nameKa: 'კანვა', description: 'Design platform with AI features', descriptionKa: 'დიზაინის პლატფორმა AI ფუნქციებით', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['design', 'AI', 'graphics'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://canva.com' },
  { id: '46', name: 'Figma', nameKa: 'ფიგმა', description: 'Collaborative design tool with AI plugins', descriptionKa: 'თანამშრომლობითი დიზაინის ინსტრუმენტი AI პლაგინებით', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['design', 'collaboration', 'AI'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://figma.com' },
  { id: '47', name: 'Miro', nameKa: 'მირო', description: 'Visual collaboration platform', descriptionKa: 'ვიზუალური თანამშრომლობის პლატფორმა', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['collaboration', 'visual', 'brainstorming'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://miro.com' },
  { id: '48', name: 'Genially', nameKa: 'გენიალური', description: 'Interactive content creation platform', descriptionKa: 'ინტერაქტიული კონტენტის შექმნის პლატფორმა', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['interactive', 'content', 'engagement'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://genial.ly' },
  { id: '49', name: 'Prezi', nameKa: 'პრეზი', description: 'Dynamic presentation software', descriptionKa: 'დინამიური პრეზენტაციების პროგრამა', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['dynamic', 'presentations', 'zoom'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://prezi.com' },
  { id: '50', name: 'Mentimeter', nameKa: 'მენტიმეტრი', description: 'Interactive presentation and polling', descriptionKa: 'ინტერაქტიული პრეზენტაციები და კენჭისყრა', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['interactive', 'polling', 'engagement'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://mentimeter.com' },
  { id: '51', name: 'Visme', nameKa: 'ვიზმი', description: 'All-in-one visual content tool', descriptionKa: 'ყველაფრის-ერთში ვიზუალური კონტენტის ინსტრუმენტი', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['visual', 'content', 'design'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://visme.co' },
  { id: '52', name: 'Piktochart', nameKa: 'პიქტოჩარტი', description: 'Infographic and chart maker', descriptionKa: 'ინფოგრაფიკისა და ცხრილების შექმნის ინსტრუმენტი', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['infographics', 'charts', 'data'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://piktochart.com' },
  { id: '53', name: 'Easel.ly', nameKa: 'იზელი', description: 'Simple infographic design tool', descriptionKa: 'მარტივი ინფოგრაფიკის დიზაინის ინსტრუმენტი', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['infographics', 'simple', 'design'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://easel.ly' },
  { id: '54', name: 'Lucidchart', nameKa: 'ლუსიდჩარტი', description: 'Intelligent diagramming application', descriptionKa: 'ინტელექტუალური დიაგრამების აპლიკაცია', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['diagrams', 'intelligent', 'flowcharts'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://lucidchart.com' },
  { id: '55', name: 'Mindmeister', nameKa: 'გონების ოსტატი', description: 'Online mind mapping tool', descriptionKa: 'ონლაინ გონების რუკების ინსტრუმენტი', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['mind-mapping', 'brainstorming', 'collaboration'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://mindmeister.com' },
  { id: '56', name: 'Conceptboard', nameKa: 'კონცეფტუალური დაფა', description: 'Visual collaboration workspace', descriptionKa: 'ვიზუალური თანამშრომლობის სამუშაო სივრცე', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['collaboration', 'visual', 'workspace'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://conceptboard.com' },
  { id: '57', name: 'Creately', nameKa: 'კრეატივი', description: 'Visual workspace for innovation', descriptionKa: 'ვიზუალური სამუშაო სივრცე ინოვაციისთვის', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['visual', 'innovation', 'collaboration'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://creately.com' },
  { id: '58', name: 'Whimsical', nameKa: 'ვიმსიკალი', description: 'Visual workspace for thinking', descriptionKa: 'ვიზუალური სამუშაო სივრცე ფიქრისთვის', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['visual', 'thinking', 'diagrams'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://whimsical.com' },
  { id: '59', name: 'Excalidraw', nameKa: 'ექსკალიდროუ', description: 'Virtual collaborative whiteboard', descriptionKa: 'ვირტუალური თანამშრომლობითი დაფა', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['whiteboard', 'collaborative', 'sketching'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://excalidraw.com' },
  { id: '60', name: 'Chartio', nameKa: 'ჩარტიო', description: 'Data visualization platform', descriptionKa: 'მონაცემების ვიზუალიზაციის პლატფორმა', category: 'Presentation & Visualization', categoryKa: 'პრეზენტაცია და ვიზუალიზაცია', tags: ['data', 'visualization', 'analytics'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://chartio.com' },

  // STEM Tools (20 tools)
  { id: '61', name: 'Wolfram Alpha', nameKa: 'ვოლფრამ ალფა', description: 'Computational knowledge engine', descriptionKa: 'გამოთვლითი ცოდნის ძრავა', category: 'STEM', categoryKa: 'STEM', tags: ['computation', 'math', 'science'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://wolframalpha.com' },
  { id: '62', name: 'Desmos', nameKa: 'დესმოსი', description: 'Advanced graphing calculator', descriptionKa: 'განვითარებული გრაფიკული კალკულატორი', category: 'STEM', categoryKa: 'STEM', tags: ['graphing', 'calculator', 'math'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://desmos.com' },
  { id: '63', name: 'GeoGebra', nameKa: 'გეოგებრა', description: 'Dynamic mathematics software', descriptionKa: 'დინამიური მათემატიკის პროგრამა', category: 'STEM', categoryKa: 'STEM', tags: ['mathematics', 'geometry', 'dynamic'], isFree: true, isK12Recommended: true, hasGeorgianUI: true, link: 'https://geogebra.org' },
  { id: '64', name: 'PhET Simulations', nameKa: 'PhET სიმულაციები', description: 'Interactive science simulations', descriptionKa: 'ინტერაქტიული მეცნიერული სიმულაციები', category: 'STEM', categoryKa: 'STEM', tags: ['simulations', 'science', 'interactive'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://phet.colorado.edu' },
  { id: '65', name: 'Symbolab', nameKa: 'სიმბოლაბი', description: 'Step-by-step math solver', descriptionKa: 'ნაბიჯ-ნაბიჯ მათემატიკური ამომხსნელი', category: 'STEM', categoryKa: 'STEM', tags: ['math', 'solver', 'step-by-step'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://symbolab.com' },
  { id: '66', name: 'Photomath', nameKa: 'ფოტომათი', description: 'Camera-based math problem solver', descriptionKa: 'კამერაზე დაფუძნებული მათემატიკური ამოცანების ამომხსნელი', category: 'STEM', categoryKa: 'STEM', tags: ['camera', 'math', 'solver'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://photomath.net' },
  { id: '67', name: 'Khan Academy', nameKa: 'ხან აკადემია', description: 'Free online courses and practice', descriptionKa: 'უფასო ონლაინ კურსები და პრაქტიკა', category: 'STEM', categoryKa: 'STEM', tags: ['courses', 'practice', 'education'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://khanacademy.org' },
  { id: '68', name: 'Brilliant', nameKa: 'ბრილიანტი', description: 'Interactive STEM learning platform', descriptionKa: 'ინტერაქტიული STEM სწავლების პლატფორმა', category: 'STEM', categoryKa: 'STEM', tags: ['interactive', 'STEM', 'learning'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://brilliant.org' },
  { id: '69', name: 'Mathway', nameKa: 'მათვეი', description: 'Math problem solver with steps', descriptionKa: 'მათემატიკური ამოცანების ამომხსნელი ნაბიჯებით', category: 'STEM', categoryKa: 'STEM', tags: ['math', 'solver', 'steps'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://mathway.com' },
  { id: '70', name: 'Socratic by Google', nameKa: 'სოკრატე გუგლისგან', description: 'AI-powered homework helper', descriptionKa: 'AI-ით უზრუნველყოფილი საშინაო დავალების მეხმარე', category: 'STEM', categoryKa: 'STEM', tags: ['homework', 'AI', 'helper'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://socratic.org' },
  { id: '71', name: 'Maple Calculator', nameKa: 'მეიპლ კალკულატორი', description: 'Advanced math calculator app', descriptionKa: 'განვითარებული მათემატიკური კალკულატორის აპი', category: 'STEM', categoryKa: 'STEM', tags: ['calculator', 'advanced', 'math'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://maplesoft.com/products/maple/maplecalculator' },
  { id: '72', name: 'Microsoft Math Solver', nameKa: 'მაიკროსოფტ მათ ამომხსნელი', description: 'Math problem solver by Microsoft', descriptionKa: 'მათემატიკური ამოცანების ამომხსნელი მაიკროსოფტისგან', category: 'STEM', categoryKa: 'STEM', tags: ['math', 'solver', 'Microsoft'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://math.microsoft.com' },
  { id: '73', name: 'Cymath', nameKa: 'საიმათი', description: 'Math problem solver with steps', descriptionKa: 'მათემატიკური ამოცანების ამომხსნელი ნაბიჯებით', category: 'STEM', categoryKa: 'STEM', tags: ['math', 'solver', 'steps'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://cymath.com' },
  { id: '74', name: 'Labster', nameKa: 'ლაბსტერი', description: 'Virtual lab simulations', descriptionKa: 'ვირტუალური ლაბორატორიის სიმულაციები', category: 'STEM', categoryKa: 'STEM', tags: ['lab', 'simulations', 'virtual'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://labster.com' },
  { id: '75', name: 'ChemSketch', nameKa: 'ქემსკეჩი', description: 'Chemical structure drawing tool', descriptionKa: 'ქიმიური სტრუქტურების ხატვის ინსტრუმენტი', category: 'STEM', categoryKa: 'STEM', tags: ['chemistry', 'structure', 'drawing'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://acdlabs.com/resources/free-chemistry-software-apps/chemsketch' },
  { id: '76', name: 'Stellarium', nameKa: 'სტელარიუმი', description: 'Open source planetarium software', descriptionKa: 'ღია კოდის პლანეტარიუმის პროგრამა', category: 'STEM', categoryKa: 'STEM', tags: ['astronomy', 'planetarium', 'stars'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://stellarium.org' },
  { id: '77', name: 'Scratch for Physics', nameKa: 'სკრეჩი ფიზიკისთვის', description: 'Visual physics simulations', descriptionKa: 'ვიზუალური ფიზიკის სიმულაციები', category: 'STEM', categoryKa: 'STEM', tags: ['physics', 'visual', 'simulations'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://scratch.mit.edu' },
  { id: '78', name: 'Algodoo', nameKa: 'ალგოდუ', description: '2D physics sandbox', descriptionKa: '2D ფიზიკის ქვიშაყუთი', category: 'STEM', categoryKa: 'STEM', tags: ['physics', '2D', 'sandbox'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://algodoo.com' },
  { id: '79', name: 'Circuit Simulator', nameKa: 'წრედის სიმულატორი', description: 'Electronic circuit simulation', descriptionKa: 'ელექტრონული წრედის სიმულაცია', category: 'STEM', categoryKa: 'STEM', tags: ['electronics', 'circuit', 'simulation'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://falstad.com/circuit' },
  { id: '80', name: 'Tinkercad', nameKa: 'ტინკერკადი', description: '3D design and electronics simulator', descriptionKa: '3D დიზაინისა და ელექტრონიკის სიმულატორი', category: 'STEM', categoryKa: 'STEM', tags: ['3D', 'design', 'electronics'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://tinkercad.com' },

  // Language Learning (20 tools)
  { id: '81', name: 'Duolingo', nameKa: 'დუოლინგო', description: 'Popular language learning app', descriptionKa: 'პოპულარული ენების სწავლების აპი', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['languages', 'learning', 'gamified'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://duolingo.com' },
  { id: '82', name: 'Babbel', nameKa: 'ბაბელი', description: 'Practical language learning platform', descriptionKa: 'პრაქტიკული ენების სწავლების პლატფორმა', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['practical', 'languages', 'conversation'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://babbel.com' },
  { id: '83', name: 'Busuu', nameKa: 'ბუსუ', description: 'Social language learning community', descriptionKa: 'სოციალური ენების სწავლების საზოგადოება', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['social', 'community', 'languages'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://busuu.com' },
  { id: '84', name: 'Memrise', nameKa: 'მემრაისი', description: 'Memory-based language learning', descriptionKa: 'მეხსიერებაზე დაფუძნებული ენების სწავლება', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['memory', 'languages', 'flashcards'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://memrise.com' },
  { id: '85', name: 'Anki', nameKa: 'ანკი', description: 'Spaced repetition flashcard system', descriptionKa: 'შორეული განმეორების ფლეშ ბარათების სისტემა', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['flashcards', 'spaced-repetition', 'memory'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://ankiweb.net' },
  { id: '86', name: 'Quizlet', nameKa: 'კვიზლეტი', description: 'Study tools and flashcards', descriptionKa: 'სასწავლო ინსტრუმენტები და ფლეშ ბარათები', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['flashcards', 'study', 'vocabulary'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://quizlet.com' },
  { id: '87', name: 'HelloTalk', nameKa: 'ჰელოუტოკი', description: 'Language exchange community', descriptionKa: 'ენების გაცვლის საზოგადოება', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['exchange', 'community', 'conversation'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://hellotalk.com' },
  { id: '88', name: 'Tandem', nameKa: 'ტანდემი', description: 'Language exchange platform', descriptionKa: 'ენების გაცვლის პლატფორმა', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['exchange', 'conversation', 'native'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://tandem.net' },
  { id: '89', name: 'Speaky', nameKa: 'სპიკი', description: 'Free language exchange community', descriptionKa: 'უფასო ენების გაცვლის საზოგადოება', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['free', 'exchange', 'community'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://speaky.com' },
  { id: '90', name: 'Lingoda', nameKa: 'ლინგოდა', description: 'Online language school', descriptionKa: 'ონლაინ ენების სკოლა', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['school', 'classes', 'structured'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://lingoda.com' },
  { id: '91', name: 'Italki', nameKa: 'აიტალკი', description: 'Online language tutoring platform', descriptionKa: 'ონლაინ ენების რეპეტიტორის პლატფორმა', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['tutoring', 'one-on-one', 'teachers'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://italki.com' },
  { id: '92', name: 'Preply', nameKa: 'პრეპლი', description: 'Online tutoring marketplace', descriptionKa: 'ონლაინ რეპეტიტორობის ბაზრობა', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['tutoring', 'marketplace', 'personalized'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://preply.com' },
  { id: '93', name: 'Rosetta Stone', nameKa: 'როზეტის ქვა', description: 'Immersive language learning method', descriptionKa: 'ენების სწავლების იმერსიული მეთოდი', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['immersive', 'method', 'established'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://rosettastone.com' },
  { id: '94', name: 'Mondly', nameKa: 'მონდლი', description: 'AI-powered language learning', descriptionKa: 'AI-ით უზრუნველყოფილი ენების სწავლება', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['AI', 'interactive', 'AR/VR'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://mondly.com' },
  { id: '95', name: 'Speechling', nameKa: 'სპიჩლინგი', description: 'Pronunciation training platform', descriptionKa: 'გამოთქმის ვარჯიშის პლატფორმა', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['pronunciation', 'speaking', 'feedback'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://speechling.com' },
  { id: '96', name: 'ELSA Speak', nameKa: 'ელსა სპიკი', description: 'AI English pronunciation coach', descriptionKa: 'AI ინგლისური გამოთქმის მწრთნელი', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['pronunciation', 'English', 'AI'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://elsaspeak.com' },
  { id: '97', name: 'Lingvist', nameKa: 'ლინგვისტი', description: 'AI-adaptive vocabulary learning', descriptionKa: 'AI-ადაპტიური ლექსიკის სწავლება', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['vocabulary', 'adaptive', 'AI'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://lingvist.com' },
  { id: '98', name: 'FluentU', nameKa: 'ფლუენტიუ', description: 'Real-world video language learning', descriptionKa: 'რეალური ვიდეოებით ენების სწავლება', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['video', 'real-world', 'immersive'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://fluentu.com' },
  { id: '99', name: 'Yabla', nameKa: 'იაბლა', description: 'Video-based language immersion', descriptionKa: 'ვიდეოზე დაფუძნებული ენური იმერსია', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['video', 'immersion', 'authentic'], isFree: false, isK12Recommended: true, hasGeorgianUI: false, link: 'https://yabla.com' },
  { id: '100', name: 'LingQ', nameKa: 'ლინგქიუ', description: 'Reading-based language learning', descriptionKa: 'კითხვაზე დაფუძნებული ენების სწავლება', category: 'Language Learning', categoryKa: 'ენების შესწავლა', tags: ['reading', 'input', 'stories'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://lingq.com' },

  // Art & Creativity (20 tools)
  { id: '101', name: 'DALL-E 2', nameKa: 'დალ-ი 2', description: 'AI image generation from text', descriptionKa: 'AI სურათების გენერაცია ტექსტიდან', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['AI', 'image', 'generation'], isFree: false, isK12Recommended: false, hasGeorgianUI: false, link: 'https://openai.com/dall-e-2' },
  { id: '102', name: 'Midjourney', nameKa: 'მიდჯორნი', description: 'AI art generation platform', descriptionKa: 'AI ხელოვნების გენერაციის პლატფორმა', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['AI', 'art', 'generation'], isFree: false, isK12Recommended: false, hasGeorgianUI: false, link: 'https://midjourney.com' },
  { id: '103', name: 'Stable Diffusion', nameKa: 'სტაბილური დიფუზია', description: 'Open source AI image generation', descriptionKa: 'ღია კოდის AI სურათების გენერაცია', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['AI', 'open-source', 'generation'], isFree: true, isK12Recommended: false, hasGeorgianUI: false, link: 'https://stablediffusionweb.com' },
  { id: '104', name: 'Adobe Firefly', nameKa: 'ადობე ფაირფლაი', description: 'Creative generative AI by Adobe', descriptionKa: 'კრეატიული გენერაციული AI ადობესგან', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['Adobe', 'creative', 'AI'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://firefly.adobe.com' },
  { id: '105', name: 'Runway ML', nameKa: 'რანვეი ML', description: 'Creative AI video and image tools', descriptionKa: 'კრეატიული AI ვიდეოსა და სურათების ინსტრუმენტები', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['video', 'AI', 'creative'], isFree: true, isK12Recommended: false, hasGeorgianUI: false, link: 'https://runwayml.com' },
  { id: '106', name: 'Artbreeder', nameKa: 'არტბრიდერი', description: 'Collaborative AI art creation', descriptionKa: 'თანამშრომლობითი AI ხელოვნების შექმნა', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['collaborative', 'AI', 'breeding'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://artbreeder.com' },
  { id: '107', name: 'DeepArt', nameKa: 'ღრმა ხელოვნება', description: 'Neural style transfer for images', descriptionKa: 'ნეირონული სტილის გადატანა სურათებისთვის', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['style-transfer', 'neural', 'art'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://deepart.io' },
  { id: '108', name: 'NightCafe', nameKa: 'ღამის კაფე', description: 'AI art generator community', descriptionKa: 'AI ხელოვნების გენერატორის საზოგადოება', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['community', 'AI', 'art'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://nightcafe.studio' },
  { id: '109', name: 'Crayon (DALL-E mini)', nameKa: 'ფერადი (დალ-ი მინი)', description: 'Free AI image generation', descriptionKa: 'უფასო AI სურათების გენერაცია', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['free', 'AI', 'generation'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://huggingface.co/spaces/dalle-mini/dalle-mini' },
  { id: '110', name: 'Pixray', nameKa: 'პიქსრეი', description: 'Open source AI art generation', descriptionKa: 'ღია კოდის AI ხელოვნების გენერაცია', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['open-source', 'AI', 'art'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://pixray.gob.cl' },
  { id: '111', name: 'Disco Diffusion', nameKa: 'დისკო დიფუზია', description: 'AI art generation with Disco Diffusion', descriptionKa: 'AI ხელოვნების გენერაცია დისკო დიფუზიით', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['AI', 'art', 'diffusion'], isFree: true, isK12Recommended: false, hasGeorgianUI: false, link: 'https://colab.research.google.com/github/alembics/disco-diffusion' },
  { id: '112', name: 'StarryAI', nameKa: 'ვარსკვლავოვანი AI', description: 'AI art creation app', descriptionKa: 'AI ხელოვნების შექმნის აპი', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['app', 'AI', 'art'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://starryai.com' },
  { id: '113', name: 'Wonder', nameKa: 'სასწაული', description: 'AI art generator app', descriptionKa: 'AI ხელოვნების გენერატორის აპი', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['app', 'AI', 'art'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://wonder-ai.com' },
  { id: '114', name: 'Deep Dream Generator', nameKa: 'ღრმა ოცნების გენერატორი', description: 'Neural network image processing', descriptionKa: 'ნეირონული ქსელის სურათების დამუშავება', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['neural', 'dreams', 'processing'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://deepdreamgenerator.com' },
  { id: '115', name: 'Wombo Dream', nameKa: 'ვომბო ოცნება', description: 'AI-powered art creation', descriptionKa: 'AI-ით უზრუნველყოფილი ხელოვნების შექმნა', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['AI', 'art', 'mobile'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://dream.ai' },
  { id: '116', name: 'Craiyon', nameKa: 'კრაიონი', description: 'Free AI image generator', descriptionKa: 'უფასო AI სურათების გენერატორი', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['free', 'AI', 'generator'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://craiyon.com' },
  { id: '117', name: 'Leonardo AI', nameKa: 'ლეონარდო AI', description: 'AI art and asset generation', descriptionKa: 'AI ხელოვნებისა და ასეტების გენერაცია', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['AI', 'assets', 'generation'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://leonardo.ai' },
  { id: '118', name: 'BlueWillow', nameKa: 'ლურჯი ტოტი', description: 'Free AI image generation', descriptionKa: 'უფასო AI სურათების გენერაცია', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['free', 'AI', 'Discord'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://bluewillow.ai' },
  { id: '119', name: 'Lexica', nameKa: 'ლექსიკა', description: 'Stable Diffusion search engine', descriptionKa: 'სტაბილური დიფუზიის საძიებო სისტემა', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['search', 'Stable Diffusion', 'prompts'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://lexica.art' },
  { id: '120', name: 'Playgroundai', nameKa: 'სათამაშო მოედანი AI', description: 'AI image generation playground', descriptionKa: 'AI სურათების გენერაციის სათამაშო მოედანი', category: 'Art & Creativity', categoryKa: 'ხელოვნება და კრეატიულობა', tags: ['playground', 'AI', 'generation'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://playgroundai.com' },

  // Teacher Assistant (20 tools)
  { id: '121', name: 'ClassDojo', nameKa: 'კლასდოჟო', description: 'Classroom management and communication', descriptionKa: 'კლასის მართვა და კომუნიკაცია', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['classroom', 'management', 'communication'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://classdojo.com' },
  { id: '122', name: 'Kahoot!', nameKa: 'კაჰუტი!', description: 'Interactive learning platform', descriptionKa: 'ინტერაქტიული სწავლების პლატფორმა', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['interactive', 'quizzes', 'games'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://kahoot.com' },
  { id: '123', name: 'Quizizz', nameKa: 'კვიზიზი', description: 'Gamified assessment platform', descriptionKa: 'გათამაშებული შეფასების პლატფორმა', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['gamified', 'assessment', 'quizzes'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://quizizz.com' },
  { id: '124', name: 'Padlet', nameKa: 'პადლეტი', description: 'Virtual bulletin board for collaboration', descriptionKa: 'ვირტუალური განცხადებების დაფა თანამშრომლობისთვის', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['collaboration', 'bulletin', 'virtual'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://padlet.com' },
  { id: '125', name: 'Flipgrid', nameKa: 'ფლიპგრიდი', description: 'Video discussion platform', descriptionKa: 'ვიდეო დისკუსიების პლატფორმა', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['video', 'discussion', 'engagement'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://flipgrid.com' },
  { id: '126', name: 'Nearpod', nameKa: 'ნიარპოდი', description: 'Interactive lesson platform', descriptionKa: 'ინტერაქტიული გაკვეთილების პლატფორმა', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['interactive', 'lessons', 'engagement'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://nearpod.com' },
  { id: '127', name: 'Pear Deck', nameKa: 'მსხლის დეკი', description: 'Interactive presentation tool', descriptionKa: 'ინტერაქტიული პრეზენტაციების ინსტრუმენტი', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['interactive', 'presentations', 'real-time'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://peardeck.com' },
  { id: '128', name: 'Seesaw', nameKa: 'საწყალი', description: 'Student portfolio platform', descriptionKa: 'მოსწავლის პორტფოლიოს პლატფორმა', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['portfolio', 'student', 'showcase'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://seesaw.me' },
  { id: '129', name: 'Edmodo', nameKa: 'ედმოდო', description: 'Educational social network', descriptionKa: 'განათლებითი სოციალური ქსელი', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['social', 'network', 'education'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://edmodo.com' },
  { id: '130', name: 'Remind', nameKa: 'შეხსენება', description: 'Communication platform for education', descriptionKa: 'კომუნიკაციის პლატფორმა განათლებისთვის', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['communication', 'reminders', 'parents'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://remind.com' },
  { id: '131', name: 'Plickers', nameKa: 'პლიკერები', description: 'Paper-based response system', descriptionKa: 'ქაღალდზე დაფუძნებული პასუხების სისტემა', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['paper', 'responses', 'assessment'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://plickers.com' },
  { id: '132', name: 'Socrative', nameKa: 'სოკრატივი', description: 'Student response system', descriptionKa: 'მოსწავლის პასუხების სისტემა', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['responses', 'assessment', 'real-time'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://socrative.com' },
  { id: '133', name: 'Poll Everywhere', nameKa: 'კენჭისყრა ყველგან', description: 'Live polling and Q&A platform', descriptionKa: 'ცოცხალი კენჭისყრისა და კითხვა-პასუხის პლატფორმა', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['polling', 'Q&A', 'live'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://polleverywhere.com' },
  { id: '134', name: 'Formative', nameKa: 'ფორმატივი', description: 'Real-time assessment platform', descriptionKa: 'რეალურ დროში შეფასების პლატფორმა', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['assessment', 'real-time', 'feedback'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://formative.com' },
  { id: '135', name: 'Edpuzzle', nameKa: 'ედპაზლი', description: 'Interactive video lessons', descriptionKa: 'ინტერაქტიული ვიდეო გაკვეთილები', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['video', 'interactive', 'lessons'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://edpuzzle.com' },
  { id: '136', name: 'Screencastify', nameKa: 'სკრინკასტიფაი', description: 'Screen recording for education', descriptionKa: 'ეკრანის ჩაწერა განათლებისთვის', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['screen', 'recording', 'video'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://screencastify.com' },
  { id: '137', name: 'Loom', nameKa: 'ლუმი', description: 'Quick video messaging', descriptionKa: 'სწრაფი ვიდეო შეტყობინებები', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['video', 'messaging', 'feedback'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://loom.com' },
  { id: '138', name: 'Flipsnack', nameKa: 'ფლიპსნაკი', description: 'Digital flipbook creator', descriptionKa: 'ციფრული ფლიპბუქის შემქმნელი', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['flipbook', 'digital', 'interactive'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://flipsnack.com' },
  { id: '139', name: 'Book Creator', nameKa: 'წიგნის შემქმნელი', description: 'Digital book creation tool', descriptionKa: 'ციფრული წიგნების შექმნის ინსტრუმენტი', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['books', 'creation', 'digital'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://bookcreator.com' },
  { id: '140', name: 'ThingLink', nameKa: 'რამის ბმული', description: 'Interactive media platform', descriptionKa: 'ინტერაქტიული მედიის პლატფორმა', category: 'Teacher Assistant', categoryKa: 'მასწავლებლის ასისტენტი', tags: ['interactive', 'media', 'hotspots'], isFree: true, isK12Recommended: true, hasGeorgianUI: false, link: 'https://thinglink.com' }
];

const SUPER_ASSISTANTS = [
  {
    id: 'diagram-analyzer',
    name: 'დიაგრამის ანალიზატორი',
    nameEn: 'Diagram Analyzer',
    description: 'ატვირთეთ დიაგრამა და მიიღეთ დეტალური ანალიზი',
    descriptionEn: 'Upload a diagram and get detailed analysis',
    icon: Eye,
    category: 'vision'
  },
  {
    id: 'math-solver',
    name: 'მათემატიკის ამომხსნელი',
    nameEn: 'Math Problem Solver',
    description: 'ამოხსენით მათემატიკური ამოცანები ნაბიჯ-ნაბიჯ',
    descriptionEn: 'Solve math problems step by step',
    icon: Calculator,
    category: 'vision'
  },
  {
    id: 'essay-analyzer',
    name: 'ესეს ანალიზატორი',
    nameEn: 'Essay Analyzer',
    description: 'გაანალიზეთ ესეების სტრუქტურა და შინაარსი',
    descriptionEn: 'Analyze essay structure and content',
    icon: FileText,
    category: 'text'
  },
  {
    id: 'presentation-generator',
    name: 'პრეზენტაციის გენერატორი',
    nameEn: 'Presentation Generator',
    description: 'შექმენით პრეზენტაციის მონახაზი თემით',
    descriptionEn: 'Create presentation outline by topic',
    icon: Presentation,
    category: 'planning'
  },
  {
    id: 'concept-explainer',
    name: 'კონცეფციის განმარტველი',
    nameEn: 'AI Concept Explainer',
    description: 'ახსენით რთული კონცეფციები სხვადასხვა ასაკისთვის',
    descriptionEn: 'Explain complex concepts for different ages',
    icon: Brain,
    category: 'explanation'
  },
  {
    id: 'ib-planner',
    name: 'IB Unit დაგეგმვა',
    nameEn: 'IB Unit Planner',
    description: 'შექმენით IB პროგრამის განყოფილების გეგმა',
    descriptionEn: 'Create IB program unit plans',
    icon: Target,
    category: 'planning'
  },
  {
    id: 'ee-mentor',
    name: 'EE მენტორი',
    nameEn: 'EE Mentor',
    description: 'დახმარება Extended Essay-ის დაგეგმვაში',
    descriptionEn: 'Help with Extended Essay planning',
    icon: GraduationCap,
    category: 'research'
  },
  {
    id: 'learning-objectives',
    name: 'სასწავლო მიზნების გენერატორი',
    nameEn: 'Learning Objectives Generator',
    description: 'შექმენით SMART სასწავლო მიზნები',
    descriptionEn: 'Create SMART learning objectives',
    icon: Lightbulb,
    category: 'planning'
  }
];

// Mock demo responses for when no API key is available
const DEMO_RESPONSES = {
  'diagram-analyzer': {
    summary: 'დემო ანალიზი: სურათი შეიცავს მარტივ ბლოკ-დიაგრამას',
    content: {
      components: ['მთავარი ბლოკი', 'მეორადი ელემენტები', 'კავშირების ხაზები'],
      misconceptions: ['ყველა ელემენტი არ არის მკაფიოდ განსაზღვრული'],
      next_tasks: ['დაამატეთ ეტიკეტები', 'გააუმჯობესეთ ვიზუალური იერარქია']
    },
    sources: ['Demo ანალიზი'],
    nextSteps: ['შეამოწმეთ რეალური API კავშირი უფრო დეტალური ანალიზისთვის'],
    confidence: 0.7,
    verificationStatus: 'unverified' as const
  },
  'math-solver': {
    summary: 'დემო: ალგებრული განტოლება ამოხსნილია',
    content: {
      steps: ['x + 5 = 10', 'x = 10 - 5', 'x = 5'],
      explanation: 'ორივე მხარეს გამოვაკელით 5',
      verification: 'შემოწმება: 5 + 5 = 10 ✓'
    },
    sources: ['მათემატიკის სახელმძღვანელო'],
    nextSteps: ['სცადეთ მეტი რთული ამოცანები', 'შეამოწმეთ სხვა მეთოდები'],
    confidence: 0.9,
    verificationStatus: 'verified' as const
  }
};

const Index = () => {
  // ==================== STATE MANAGEMENT ====================
  const [config, setConfig] = useState<AppConfig>({
    isDemoMode: true,
    theme: 'light',
    language: 'ka',
    user: null
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState('');
  const [selectedAssistant, setSelectedAssistant] = useState<string | null>(null);
  const [assistantResults, setAssistantResults] = useState<AssistantResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<AssistantResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [socraticMode, setSocraticMode] = useState(false);

  const { toast } = useToast();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);

  // ==================== CATEGORIES ====================
  const categories = [
    { value: '', label: 'ყველა', labelEn: 'All', icon: Home },
    { value: 'Research & Analysis', label: 'კვლევა და ანალიზი', labelEn: 'Research & Analysis', icon: Microscope },
    { value: 'Writing & Essays', label: 'წერა და ესეები', labelEn: 'Writing & Essays', icon: PenTool },
    { value: 'Presentation & Visualization', label: 'პრეზენტაცია და ვიზუალიზაცია', labelEn: 'Presentation & Visualization', icon: Presentation },
    { value: 'STEM', label: 'STEM', labelEn: 'STEM', icon: Calculator },
    { value: 'Language Learning', label: 'ენების შესწავლა', labelEn: 'Language Learning', icon: Languages },
    { value: 'Art & Creativity', label: 'ხელოვნება და კრეატიულობა', labelEn: 'Art & Creativity', icon: Palette },
    { value: 'Teacher Assistant', label: 'მასწავლებლის ასისტენტი', labelEn: 'Teacher Assistant', icon: Users }
  ];

  const filters = [
    { value: 'free', label: 'მხოლოდ უფასო', labelEn: 'Free Only' },
    { value: 'k12', label: 'K-12 რეკომენდირებული', labelEn: 'K-12 Recommended' },
    { value: 'georgian', label: 'ქართულ ენაზე', labelEn: 'Georgian UI' }
  ];

  // ==================== COMPUTED VALUES ====================
  const filteredTools = useMemo(() => {
    let filtered = AI_TOOLS;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.nameKa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.descriptionKa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    // Additional filters
    if (selectedFilters.includes('free')) {
      filtered = filtered.filter(tool => tool.isFree);
    }
    if (selectedFilters.includes('k12')) {
      filtered = filtered.filter(tool => tool.isK12Recommended);
    }
    if (selectedFilters.includes('georgian')) {
      filtered = filtered.filter(tool => tool.hasGeorgianUI);
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedFilters]);

  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * 20;
    return filteredTools.slice(startIndex, startIndex + 20);
  }, [filteredTools, currentPage]);

  const totalPages = Math.ceil(filteredTools.length / 20);

  // ==================== AI ORCHESTRATION ====================
  const orchestrateAI = async (task: string, input: any, assistantType: string) => {
    setIsProcessing(true);
    
    try {
      // Mock response for demo mode
      if (config.isDemoMode) {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const demoResponse = DEMO_RESPONSES[assistantType as keyof typeof DEMO_RESPONSES] || {
          summary: 'დემო პასუხი - API კავშირი არ არის კონფიგურირებული',
          content: { message: 'ეს არის დემო პასუხი. რეალური ფუნქციონალობისთვის დააკონფიგურეთ API keys.' },
          sources: ['Demo Mode'],
          nextSteps: ['დააკონფიგურეთ API კავშირები'],
          confidence: 0.5,
          verificationStatus: 'unverified' as const
        };

        const result: AssistantResult = {
          id: Date.now().toString(),
          type: assistantType,
          timestamp: Date.now(),
          input,
          output: demoResponse
        };

        setAssistantResults(prev => [result, ...prev]);
        setHistory(prev => [result, ...prev]);
        
        toast({
          title: "დასრულდა",
          description: "დემო რეჟიმში პასუხი მზადაა",
        });

        return result;
      }

      // Real AI processing would go here
      // This is where you'd integrate with actual AI APIs
      throw new Error('API კავშირი არ არის კონფიგურირებული');

    } catch (error) {
      toast({
        title: "შეცდომა",
        description: error instanceof Error ? error.message : "შიდა შეცდომა",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // ==================== EVENT HANDLERS ====================
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
    setCurrentPage(1);
  };

  const handleFavoriteToggle = (toolId: string) => {
    setFavorites(prev => 
      prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  const handleThemeToggle = () => {
    const newTheme = config.theme === 'light' ? 'dark' : 'light';
    setConfig(prev => ({ ...prev, theme: newTheme }));
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // ==================== KEYBOARD SHORTCUTS ====================
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette (Ctrl/Cmd + K)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      
      // Search focus (/)
      if (e.key === '/' && !isCommandPaletteOpen) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      
      // Theme toggle (t)
      if (e.key === 't' && !isCommandPaletteOpen) {
        e.preventDefault();
        handleThemeToggle();
      }
      
      // Close modals (Escape)
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setSelectedAssistant(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, config.theme]);

  // ==================== COMPONENT RENDER ====================
  const text = (key: string, ka: string, en: string) => config.language === 'ka' ? ka : en;

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300 ${config.theme}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold">NFS-AI Portal</h1>
                <p className="text-xs text-muted-foreground">Newton Free School</p>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" size="sm">
              <Wrench className="h-4 w-4 mr-2" />
              {text('tools', 'ხელსაწყოები', 'Tools')}
            </Button>
            <Button variant="ghost" size="sm">
              <Brain className="h-4 w-4 mr-2" />
              {text('assistants', 'AI ასისტენტები', 'AI Assistants')}
            </Button>
            <Button variant="ghost" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              {text('policy', 'პოლიტიკა', 'Policy')}
            </Button>
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4 mr-2" />
              {text('classroom', 'კლასრუმი', 'Classroom')}
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hidden md:flex"
            >
              <Command className="h-4 w-4 mr-2" />
              <span className="text-xs bg-muted px-2 py-1 rounded">⌘K</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleThemeToggle}
            >
              {config.theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {config.user ? (
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                {config.user.name}
              </Button>
            ) : (
              <Button variant="ghost" size="sm">
                <LogIn className="h-4 w-4 mr-2" />
                {text('login', 'შესვლა', 'Login')}
              </Button>
            )}

            {config.isDemoMode && (
              <Badge variant="secondary" className="text-xs">
                Demo
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Hero Section */}
        <section className="text-center py-12 mb-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-6">
              {text('hero-title', 'AI-ით გაძლიერებული სწავლება', 'AI-Powered Learning')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {text('hero-desc', 'აღმოაჩინეთ 140+ AI ხელსაწყო და 8 სუპერასისტენტი თქვენი სასწავლო მოგზაურობისთვის', 'Discover 140+ AI tools and 8 super assistants for your learning journey')}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button size="lg" className="gap-2">
                <Zap className="h-5 w-5" />
                {text('start', 'დაიწყეთ ახლავე', 'Start Now')}
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <HelpCircle className="h-5 w-5" />
                {text('guide', 'გზამკვლევი', 'Guide')}
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">140+</div>
                <div className="text-sm text-muted-foreground">{text('tools', 'ხელსაწყო', 'Tools')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">{text('assistants', 'ასისტენტი', 'Assistants')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">60+</div>
                <div className="text-sm text-muted-foreground">{text('free', 'უფასო', 'Free')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">{text('k12', 'K-12', 'K-12')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Super Assistants Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {text('super-assistants', 'სუპერასისტენტები', 'Super Assistants')}
              </h2>
              <p className="text-muted-foreground">
                {text('super-desc', 'AGI-ს ტიპის ჭკვიანი ასისტენტები კონკრეტული ამოცანებისთვის', 'AGI-type intelligent assistants for specific tasks')}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowHistory(true)}
              className="gap-2"
            >
              <Clock className="h-4 w-4" />
              {text('history', 'ისტორია', 'History')}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUPER_ASSISTANTS.map((assistant) => {
              console.log('Assistant icon:', assistant.icon, 'for', assistant.id);
              const Icon = assistant.icon;
              return (
                <Card key={assistant.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {assistant.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {config.language === 'ka' ? assistant.name : assistant.nameEn}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {config.language === 'ka' ? assistant.description : assistant.descriptionEn}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button 
                      className="w-full gap-2"
                      onClick={() => setSelectedAssistant(assistant.id)}
                    >
                      <Sparkles className="h-4 w-4" />
                      {text('open', 'გახსნა', 'Open')}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Search and Filters */}
        <section className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  placeholder={text('search-placeholder', 'მოძებნეთ AI ხელსაწყო...', 'Search AI tools...')}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFavorites(true)}
              className="gap-2"
            >
              <Heart className="h-4 w-4" />
              {text('favorites', 'რჩეულები', 'Favorites')} ({favorites.length})
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => {
              console.log('Category icon:', category.icon, 'for', category.value);
              const Icon = category.icon;
              return (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(category.value)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {config.language === 'ka' ? category.label : category.labelEn}
                </Button>
              );
            })}
          </div>

          {/* Additional Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.value}
                variant={selectedFilters.includes(filter.value) ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterToggle(filter.value)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                {config.language === 'ka' ? filter.label : filter.labelEn}
              </Button>
            ))}
          </div>
        </section>

        {/* Tools Grid */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                {text('tools-catalog', 'AI ხელსაწყოების კატალოგი', 'AI Tools Catalog')}
              </h2>
              <p className="text-muted-foreground">
                {text('tools-count', `${filteredTools.length} ხელსაწყო ნაპოვნია`, `${filteredTools.length} tools found`)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-lg transition-all duration-200 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight mb-1">
                        {config.language === 'ka' ? tool.nameKa : tool.name}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {config.language === 'ka' ? tool.categoryKa : tool.category}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFavoriteToggle(tool.id)}
                      className="p-1 h-auto"
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(tool.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>
                  <CardDescription className="text-sm">
                    {config.language === 'ka' ? tool.descriptionKa : tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {tool.isFree && (
                      <Badge variant="outline" className="text-xs text-green-600">
                        {text('free', 'უფასო', 'Free')}
                      </Badge>
                    )}
                    {tool.isK12Recommended && (
                      <Badge variant="outline" className="text-xs text-blue-600">
                        K-12
                      </Badge>
                    )}
                    {tool.hasGeorgianUI && (
                      <Badge variant="outline" className="text-xs text-orange-600">
                        ქართ.
                      </Badge>
                    )}
                  </div>
                  <Button 
                    className="w-full gap-2"
                    onClick={() => window.open(tool.link, '_blank')}
                  >
                    <ChevronRight className="h-4 w-4" />
                    {text('open', 'გახსნა', 'Open')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="text-sm text-muted-foreground">
                {text('page', 'გვერდი', 'Page')} {currentPage} {text('of', '-დან', 'of')} {totalPages}
              </span>
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </section>
      </main>

      {/* Command Palette */}
      <Dialog open={isCommandPaletteOpen} onOpenChange={setIsCommandPaletteOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{text('command-palette', 'სწრაფი მოძებნა', 'Quick Search')}</DialogTitle>
            <DialogDescription>
              {text('command-desc', 'მოძებნეთ ხელსაწყოები, ასისტენტები ან ბრძანებები', 'Search for tools, assistants, or commands')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={commandInputRef}
              placeholder={text('command-search', 'ჩაწერეთ საძიებო სიტყვა...', 'Type to search...')}
              value={commandSearch}
              onChange={(e) => setCommandSearch(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            {/* Quick Commands */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                {text('quick-commands', 'სწრაფი ბრძანებები', 'Quick Commands')}
              </h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Brain className="h-4 w-4" />
                  {text('explain-concept', 'ახსენი კონცეფცია', 'Explain concept')}
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Calculator className="h-4 w-4" />
                  {text('solve-math', 'ამოხსენი მათემატიკური ამოცანა', 'Solve math problem')}
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Target className="h-4 w-4" />
                  {text('plan-lesson', 'დაგეგმე გაკვეთილი', 'Plan lesson')}
                </Button>
              </div>
            </div>

            {/* Recent Assistants */}
            {assistantResults.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                  {text('recent', 'უახლესი', 'Recent')}
                </h3>
                <div className="space-y-1">
                  {assistantResults.slice(0, 3).map((result) => (
                    <Button key={result.id} variant="ghost" className="w-full justify-start gap-2">
                      <Clock className="h-4 w-4" />
                      {result.output.summary.slice(0, 50)}...
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Assistant Modal */}
      {selectedAssistant && (
        <Dialog open={!!selectedAssistant} onOpenChange={() => setSelectedAssistant(null)}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {(() => {
                  const assistant = SUPER_ASSISTANTS.find(a => a.id === selectedAssistant);
                  if (!assistant) return null;
                  const Icon = assistant.icon;
                  return (
                    <>
                      <Icon className="h-5 w-5" />
                      {config.language === 'ka' ? assistant.name : assistant.nameEn}
                    </>
                  );
                })()}
              </DialogTitle>
              <DialogDescription>
                {(() => {
                  const assistant = SUPER_ASSISTANTS.find(a => a.id === selectedAssistant);
                  return assistant ? (config.language === 'ka' ? assistant.description : assistant.descriptionEn) : '';
                })()}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="input" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="input">{text('input', 'შეყვანა', 'Input')}</TabsTrigger>
                <TabsTrigger value="results">{text('results', 'შედეგები', 'Results')}</TabsTrigger>
                <TabsTrigger value="settings">{text('settings', 'პარამეტრები', 'Settings')}</TabsTrigger>
              </TabsList>

              <TabsContent value="input" className="space-y-4">
                {/* Socratic Mode Toggle */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="socratic-mode" className="text-base font-medium">
                      {text('socratic-mode', 'სოკრატესული რეჟიმი', 'Socratic Mode')}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {text('socratic-desc', 'მოდი ერთად ვიმუშავოთ - კითხვებით გაძღოლა', 'Let\'s work together - guided by questions')}
                    </p>
                  </div>
                  <Switch
                    id="socratic-mode"
                    checked={socraticMode}
                    onCheckedChange={setSocraticMode}
                  />
                </div>

                {/* Dynamic Input Form based on assistant type */}
                {selectedAssistant === 'diagram-analyzer' && (
                  <div className="space-y-4">
                    <div>
                      <Label>{text('upload-image', 'ატვირთეთ სურათი', 'Upload Image')}</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {text('drag-drop', 'გადმოათრიეთ ან დააწკაპუნეთ ასარჩევად', 'Drag & drop or click to select')}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG (max 5MB)</p>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="diagram-question">{text('question', 'რა გინდა გაიგო?', 'What do you want to know?')}</Label>
                      <Textarea 
                        id="diagram-question"
                        placeholder={text('diagram-placeholder', 'მაგ: რა კომპონენტებისგან შედგება ეს დიაგრამა?', 'e.g. What components make up this diagram?')}
                      />
                    </div>
                  </div>
                )}

                {selectedAssistant === 'math-solver' && (
                  <div className="space-y-4">
                    <div>
                      <Label>{text('upload-or-type', 'ატვირთეთ ან ჩაწერეთ', 'Upload or Type')}</Label>
                      <Tabs defaultValue="type">
                        <TabsList>
                          <TabsTrigger value="type">{text('type', 'ჩაწერა', 'Type')}</TabsTrigger>
                          <TabsTrigger value="upload">{text('upload', 'ატვირთვა', 'Upload')}</TabsTrigger>
                          <TabsTrigger value="camera">{text('camera', 'კამერა', 'Camera')}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="type">
                          <Textarea placeholder={text('math-placeholder', 'ჩაწერეთ მათემატიკური ამოცანა...', 'Enter math problem...')} />
                        </TabsContent>
                        <TabsContent value="upload">
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              {text('upload-math', 'ატვირთეთ ხელნაწერი ამოცანა', 'Upload handwritten problem')}
                            </p>
                          </div>
                        </TabsContent>
                        <TabsContent value="camera">
                          <Button className="w-full gap-2">
                            <Camera className="h-4 w-4" />
                            {text('take-photo', 'გადაიღეთ ფოტო', 'Take Photo')}
                          </Button>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                )}

                {selectedAssistant === 'essay-analyzer' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="essay-text">{text('essay-text', 'ესეს ტექსტი', 'Essay Text')}</Label>
                      <Textarea 
                        id="essay-text"
                        placeholder={text('paste-essay', 'ჩასვით ესეს ტექსტი...', 'Paste essay text...')}
                        className="min-h-32"
                      />
                    </div>
                    <div>
                      <Label htmlFor="essay-level">{text('grade-level', 'კლასის დონე', 'Grade Level')}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={text('select-grade', 'აირჩიეთ კლასი', 'Select grade')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="elementary">1-6 კლასი</SelectItem>
                          <SelectItem value="middle">7-9 კლასი</SelectItem>
                          <SelectItem value="high">10-12 კლასი</SelectItem>
                          <SelectItem value="ib">IB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={() => orchestrateAI('analysis', {}, selectedAssistant)}
                  disabled={isProcessing}
                  className="w-full gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      {text('processing', 'მუშავდება...', 'Processing...')}
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      {text('generate', 'გენერაცია', 'Generate')}
                    </>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="results" className="space-y-4">
                {assistantResults.filter(r => r.type === selectedAssistant).length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>{text('no-results', 'ჯერ არ არის შედეგები', 'No results yet')}</p>
                    <p className="text-sm">{text('start-analysis', 'დაიწყეთ ანალიზი შეყვანის ტაბში', 'Start analysis in the Input tab')}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {assistantResults
                      .filter(r => r.type === selectedAssistant)
                      .map((result) => (
                        <Card key={result.id}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{result.output.summary}</CardTitle>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant={result.output.verificationStatus === 'verified' ? 'default' : 'secondary'}
                                  className="text-xs"
                                >
                                  {result.output.verificationStatus === 'verified' ? (
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                  ) : result.output.verificationStatus === 'conflicted' ? (
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                  ) : (
                                    <Info className="h-3 w-3 mr-1" />
                                  )}
                                  {result.output.verificationStatus}
                                </Badge>
                                <div className="text-xs text-muted-foreground">
                                  {Math.round(result.output.confidence * 100)}%
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {/* Main Content */}
                              <div>
                                <h4 className="font-medium mb-2">{text('analysis', 'ანალიზი', 'Analysis')}</h4>
                                <div className="bg-muted/50 p-4 rounded-lg">
                                  {typeof result.output.content === 'object' ? (
                                    <pre className="text-sm whitespace-pre-wrap">
                                      {JSON.stringify(result.output.content, null, 2)}
                                    </pre>
                                  ) : (
                                    <p className="text-sm">{result.output.content}</p>
                                  )}
                                </div>
                              </div>

                              {/* Sources */}
                              {result.output.sources.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-2">{text('sources', 'წყაროები', 'Sources')}</h4>
                                  <ul className="text-sm space-y-1">
                                    {result.output.sources.map((source, idx) => (
                                      <li key={idx} className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                                        {source}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Next Steps */}
                              {result.output.nextSteps.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-2">{text('next-steps', 'შემდეგი ნაბიჯები', 'Next Steps')}</h4>
                                  <ul className="text-sm space-y-1">
                                    {result.output.nextSteps.map((step, idx) => (
                                      <li key={idx} className="flex items-center gap-2">
                                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                        {step}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Reflection Notes */}
                              {result.output.reflectionNotes && (
                                <div>
                                  <h4 className="font-medium mb-2">{text('reflection', 'რეფლექსია', 'Reflection')}</h4>
                                  <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                                    {result.output.reflectionNotes}
                                  </p>
                                </div>
                              )}

                              {/* Actions */}
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="gap-2">
                                  <Copy className="h-3 w-3" />
                                  {text('copy', 'კოპირება', 'Copy')}
                                </Button>
                                <Button variant="outline" size="sm" className="gap-2">
                                  <Download className="h-3 w-3" />
                                  {text('export', 'ექსპორტი', 'Export')}
                                </Button>
                                <Button variant="outline" size="sm" className="gap-2">
                                  <Share2 className="h-3 w-3" />
                                  {text('share', 'გაზიარება', 'Share')}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>{text('confidence-threshold', 'სანდოობის ზღვარი', 'Confidence Threshold')}</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm">0%</span>
                      <div className="flex-1">
                        <input type="range" min="0" max="100" defaultValue="70" className="w-full" />
                      </div>
                      <span className="text-sm">100%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{text('auto-verify', 'ავტომატური გადამოწმება', 'Auto Verification')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {text('verify-desc', 'ავტომატურად გადაამოწმებს ფაქტები ვებძიებით', 'Automatically verify facts with web search')}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{text('detailed-sources', 'დეტალური წყაროები', 'Detailed Sources')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {text('sources-desc', 'მოითხოვს ციტირების ლინკები', 'Requires citation links')}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <Label>{text('output-language', 'პასუხის ენა', 'Response Language')}</Label>
                    <Select defaultValue={config.language}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ka">ქართული</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="auto">ავტომატური</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="w-96">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                <div>
                  <h3 className="font-medium">{text('ai-working', 'AI მუშაობს', 'AI Working')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {text('processing-desc', 'ანალიზი და გენერაცია მიმდინარეობს...', 'Analysis and generation in progress...')}
                  </p>
                </div>
                <Progress value={60} className="w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;