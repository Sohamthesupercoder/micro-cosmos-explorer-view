import { useState } from 'react';
import { Search, Filter, SortAsc, Grid, List, Microscope } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FilterState {
  search: string;
  category: string;
  sortBy: 'recent' | 'popular' | 'commented';
  viewMode: 'grid' | 'list';
}

interface SearchAndFilterProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalResults: number;
}

const categories = [
  'All Categories',
  'Pollen',
  'Microorganisms',
  'Plant Cells',
  'Insects',
  'Crystals',
  'Bacteria',
  'Fungi',
  'Water Samples',
  'Tissue Samples'
];

const sortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'commented', label: 'Most Discussed' }
];

export const SearchAndFilter = ({ filters, onFiltersChange, totalResults }: SearchAndFilterProps) => {
  const [activeCategory, setActiveCategory] = useState(filters.category);

  const handleCategoryChange = (category: string) => {
    const newCategory = category === 'All Categories' ? '' : category;
    setActiveCategory(newCategory);
    onFiltersChange({ ...filters, category: newCategory });
  };

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const handleViewModeChange = (viewMode: FilterState['viewMode']) => {
    onFiltersChange({ ...filters, viewMode });
  };

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search microscopic discoveries..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10 bg-card border-border/50 focus:border-primary/50 transition-colors"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = (category === 'All Categories' && !activeCategory) || 
                          category === activeCategory;
          
          return (
            <Badge
              key={category}
              variant={isActive ? "default" : "outline"}
              className={`cursor-pointer px-3 py-1 transition-all hover:scale-105 ${
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'hover:bg-secondary border-border/50'
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Badge>
          );
        })}
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Microscope className="w-4 h-4" />
          <span>{totalResults.toLocaleString()} discoveries</span>
          {filters.search && (
            <span>matching "{filters.search}"</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Sort dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <SortAsc className="w-4 h-4" />
                {sortOptions.find(opt => opt.value === filters.sortBy)?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleSortChange(option.value as FilterState['sortBy'])}
                  className={filters.sortBy === option.value ? 'bg-accent' : ''}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View mode toggle */}
          <div className="flex border border-border rounded-md overflow-hidden">
            <Button
              variant={filters.viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none border-0"
              onClick={() => handleViewModeChange('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={filters.viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none border-0"
              onClick={() => handleViewModeChange('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};