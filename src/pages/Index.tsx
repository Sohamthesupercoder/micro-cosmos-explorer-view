import { Header } from '@/components/Header';
import { DiscoveryGrid } from '@/components/DiscoveryGrid';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 text-center space-y-6">
          <div className="inline-block">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Explore the Invisible
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A curated repository of microscopic discoveries made with Foldscope. 
            Browse, learn, and get inspired by the hidden beauty in our world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">2,400+</div>
              <div className="text-sm text-muted-foreground">Discoveries</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent">850+</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-specimen-green">120+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-float" />
          <div className="absolute top-40 right-20 w-3 h-3 bg-accent/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-discovery-purple/50 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <DiscoveryGrid />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Built with passion for scientific discovery and learning
            </p>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <span>Powered by Foldscope</span>
              <span>•</span>
              <span>Open Source</span>
              <span>•</span>
              <span>Community Driven</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
