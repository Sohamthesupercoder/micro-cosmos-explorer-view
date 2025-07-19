import { useState, useMemo } from 'react';
import { DiscoveryCard } from './DiscoveryCard';
import { SearchAndFilter } from './SearchAndFilter';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';

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

interface FilterState {
  search: string;
  category: string;
  sortBy: 'recent' | 'popular' | 'commented';
  viewMode: 'grid' | 'list';
}

// Mock data based on the microcosmos site
const mockDiscoveries: Discovery[] = [
  {
    id: '1',
    title: 'Guess the pink thingy!',
    description: 'An interesting microscopic specimen with unique pink coloration',
    imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=400&fit=crop',
    author: 'Dr. Sarah Chen',
    date: '2024-07-04',
    category: 'Microorganisms',
    applause: 12,
    comments: 3,
    views: 145,
    magnification: '400x',
    specimen: 'Unknown organism',
    tags: ['mysterious', 'pink', 'cellular']
  },
  {
    id: '2',
    title: 'Mosquito larvae in dog dribble',
    description: 'Fascinating aquatic life cycle observation in unexpected environment',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=400&fit=crop',
    author: 'Mike Rodriguez',
    date: '2024-07-03',
    category: 'Insects',
    applause: 8,
    comments: 5,
    views: 89,
    magnification: '100x',
    specimen: 'Mosquito larvae',
    tags: ['larvae', 'aquatic', 'lifecycle']
  },
  {
    id: '3',
    title: 'A Living Fossil Under My Foldscope: Ginkgo biloba',
    description: 'Ancient tree species pollen structure revealed through microscopy',
    imageUrl: 'https://images.unsplash.com/photo-1504618223053-559bdef9dd5a?w=400&h=400&fit=crop',
    author: 'Prof. Elena Novak',
    date: '2024-07-01',
    category: 'Pollen',
    applause: 15,
    comments: 7,
    views: 234,
    magnification: '600x',
    specimen: 'Ginkgo pollen',
    tags: ['ancient', 'pollen', 'botanical', 'fossil']
  },
  {
    id: '4',
    title: 'Pineapple Surface Crystals',
    description: 'Microscopic crystal structures found on fresh pineapple skin',
    imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop',
    author: 'Anna Petrov',
    date: '2024-06-28',
    category: 'Crystals',
    applause: 22,
    comments: 9,
    views: 178,
    magnification: '200x',
    specimen: 'Fruit crystals',
    tags: ['crystals', 'fruit', 'surface']
  },
  {
    id: '5',
    title: 'Oregano Pollen Grains',
    description: 'Detailed structure of herb pollen with distinctive morphology',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=400&fit=crop',
    author: 'James Wilson',
    date: '2024-06-25',
    category: 'Pollen',
    applause: 6,
    comments: 2,
    views: 67,
    magnification: '800x',
    specimen: 'Oregano pollen',
    tags: ['herbs', 'pollen', 'culinary']
  },
  {
    id: '6',
    title: 'Winter Savory Pollen Structure',
    description: 'Seasonal herb pollen showing unique winter adaptation features',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    author: 'Lisa Zhang',
    date: '2024-06-20',
    category: 'Pollen',
    applause: 9,
    comments: 4,
    views: 92,
    magnification: '500x',
    specimen: 'Winter savory',
    tags: ['seasonal', 'adaptation', 'herbs']
  },
  {
    id: '7',
    title: 'Bacterial Colony Formation',
    description: 'Early stage bacterial colony showing cooperative behavior',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
    author: 'Dr. Robert Kim',
    date: '2024-06-18',
    category: 'Bacteria',
    applause: 18,
    comments: 12,
    views: 267,
    magnification: '1000x',
    specimen: 'E. coli',
    tags: ['bacteria', 'colony', 'cooperation']
  },
  {
    id: '8',
    title: 'Pond Water Diatoms',
    description: 'Beautiful geometric patterns in freshwater algae',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    author: 'Maria Santos',
    date: '2024-06-15',
    category: 'Water Samples',
    applause: 25,
    comments: 8,
    views: 312,
    magnification: '400x',
    specimen: 'Diatoms',
    tags: ['diatoms', 'geometric', 'algae', 'freshwater']
  }
];

export const DiscoveryGrid = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    sortBy: 'recent',
    viewMode: 'grid'
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Filter and sort discoveries
  const filteredDiscoveries = useMemo(() => {
    let filtered = mockDiscoveries;

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(discovery =>
        discovery.title.toLowerCase().includes(searchLower) ||
        discovery.description?.toLowerCase().includes(searchLower) ||
        discovery.author.toLowerCase().includes(searchLower) ||
        discovery.specimen?.toLowerCase().includes(searchLower) ||
        discovery.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(discovery => 
        discovery.category === filters.category
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.applause - a.applause);
        break;
      case 'commented':
        filtered.sort((a, b) => b.comments - a.comments);
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }

    return filtered;
  }, [filters]);

  const handleViewDiscovery = (id: string) => {
    console.log('Viewing discovery:', id);
    // Here you would typically navigate to a detailed view
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle scroll to show/hide scroll-to-top button
  useState(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div className="space-y-8">
      <SearchAndFilter
        filters={filters}
        onFiltersChange={setFilters}
        totalResults={filteredDiscoveries.length}
      />

      {/* Grid */}
      <div className={`
        ${filters.viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
          : 'space-y-4'
        }
      `}>
        {filteredDiscoveries.map((discovery, index) => (
          <div
            key={discovery.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <DiscoveryCard
              discovery={discovery}
              onView={handleViewDiscovery}
            />
          </div>
        ))}
      </div>

      {/* No results state */}
      {filteredDiscoveries.length === 0 && (
        <div className="text-center py-16 space-y-4">
          <div className="text-6xl opacity-20">🔬</div>
          <h3 className="text-xl font-semibold">No discoveries found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Try adjusting your search terms or filters to find more microscopic wonders.
          </p>
        </div>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg glow-effect z-50"
          size="icon"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};