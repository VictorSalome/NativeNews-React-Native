export interface INewsSearchBarProps {
  isDarkMode: boolean;
  searchQuery: string;
  showSearchBar: boolean;
  setSearchQuery: (query: string) => void;
  setActualSearchTerm: (term: string) => void;
  onSearch?: () => void;
}
