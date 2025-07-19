import { useState } from 'react';
import { Heart, MessageCircle, Eye, Microscope, Calendar, User, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Discovery {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  author: string;
  date: string;
  category: string;
  applause: number;
  comments: number;
  views: number;
  magnification?: string;
  specimen?: string;
  location?: string;
  tags: string[];
}

interface DiscoveryCardProps {
  discovery: Discovery;
  onView: (id: string) => void;
}

export const DiscoveryCard = ({ discovery, onView }: DiscoveryCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [localApplause, setLocalApplause] = useState(discovery.applause);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLocalApplause(prev => isLiked ? prev - 1 : prev + 1);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card 
      className="discovery-card cursor-pointer group overflow-hidden"
      onClick={() => onView(discovery.id)}
    >
      <div className="relative">
        {/* Image with overlay gradient */}
        <div className="aspect-square overflow-hidden relative">
          <img
            src={discovery.imageUrl}
            alt={discovery.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category badge */}
          <Badge 
            variant="secondary" 
            className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm border-primary/20"
          >
            {discovery.category}
          </Badge>
          
          {/* Magnification indicator */}
          {discovery.magnification && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs">
              <Microscope className="w-3 h-3" />
              <span>{discovery.magnification}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-4 space-y-3">
          {/* Title and description */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {discovery.title}
            </h3>
            
            {discovery.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {discovery.description}
              </p>
            )}
          </div>

          {/* Specimen info */}
          {discovery.specimen && (
            <div className="flex items-center gap-1 text-xs text-accent">
              <span className="w-2 h-2 rounded-full bg-accent/60" />
              <span>{discovery.specimen}</span>
            </div>
          )}

          {/* Author and date */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-3 h-3" />
              <span>{discovery.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(discovery.date)}</span>
            </div>
          </div>

          {/* Tags */}
          {discovery.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {discovery.tags.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs px-2 py-0 h-5 border-border/50"
                >
                  {tag}
                </Badge>
              ))}
              {discovery.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0 h-5 border-border/50">
                  +{discovery.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Engagement metrics */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 gap-1.5 hover:text-red-400 transition-colors"
                onClick={handleLike}
              >
                <Heart className={`w-3 h-3 ${isLiked ? 'fill-red-400 text-red-400' : ''}`} />
                <span className="text-xs">{localApplause}</span>
              </Button>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MessageCircle className="w-3 h-3" />
                <span>{discovery.comments}</span>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="w-3 h-3" />
                <span>{discovery.views}</span>
              </div>
            </div>

            {/* Quality indicator */}
            {localApplause > 5 && (
              <Award className="w-3 h-3 text-accent animate-pulse" />
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};