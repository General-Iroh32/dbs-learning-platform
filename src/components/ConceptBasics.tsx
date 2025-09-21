import React from 'react';
import { 
  Box, 
  List, 
  Link, 
  SortAsc, 
  Columns, 
  Filter, 
  Merge, 
  X, 
  Key, 
  ListOrdered, 
  FileText, 
  Network, 
  TreePine, 
  Hash, 
  Shield, 
  CheckSquare, 
  Zap, 
  GitBranch,
  Database,
  Table,
  Circle,
  HelpCircle,
  SortDesc,
  Copy,
  GitMerge,
  CheckCircle,
  Layers,
  Edit,
  Minus,
  ArrowLeft,
  ArrowRight,
  ArrowLeftRight,
  ArrowLeftCircle,
  ArrowRightCircle,
  Divide,
  RefreshCw,
  AlertTriangle,
  Workflow
} from 'lucide-react';
import type { ConceptCard } from '../types';

interface ConceptBasicsProps {
  concepts: ConceptCard[];
  title: string;
  description: string;
}

const iconMap = {
  Box,
  List,
  Link,
  SortAsc,
  Columns,
  Filter,
  Merge,
  X,
  Key,
  ListOrdered,
  FileText,
  Network,
  TreePine,
  Hash,
  Shield,
  CheckSquare,
  Zap,
  GitBranch,
  Database,
  Table,
  Circle,
  HelpCircle,
  SortDesc,
  Copy,
  GitMerge,
  CheckCircle,
  Layers,
  Edit,
  Minus,
  ArrowLeft,
  ArrowRight,
  ArrowLeftRight,
  ArrowLeftCircle,
  ArrowRightCircle,
  Divide,
  RefreshCw,
  AlertTriangle,
  Workflow
};

export const ConceptBasics: React.FC<ConceptBasicsProps> = ({ 
  concepts, 
  title, 
  description 
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-8">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {concepts.map((concept, index) => {
          const IconComponent = iconMap[concept.icon as keyof typeof iconMap];
          return (
            <div key={index} className="concept-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <IconComponent className="mr-2 text-blue-500" />
                {concept.title}
              </h3>
              <p className="text-gray-700">{concept.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
