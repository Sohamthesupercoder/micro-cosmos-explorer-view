import { useState } from 'react';
import { Microscope, Menu, X, Github, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Microscope className="w-8 h-8 text-primary animate-float" />
              <div className="absolute inset-0 animate-glow-pulse opacity-50">
                <Microscope className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Microcosmos
              </h1>
              <p className="text-xs text-muted-foreground">Discovery Repository</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" size="sm">
              Explore
            </Button>
            <Button variant="ghost" size="sm">
              Submit
            </Button>
            <Button variant="ghost" size="sm">
              Learn
            </Button>
            <Button variant="ghost" size="sm">
              Community
            </Button>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="hidden sm:flex items-center gap-1 border-accent/30">
              <Heart className="w-3 h-3 text-red-400" />
              <span className="text-xs">2.4k discoveries</span>
            </Badge>
            
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4 space-y-2 animate-fade-in-up">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Explore
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Submit Discovery
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Learn
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Community
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};