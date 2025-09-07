export interface INewsHeaderProps {
  isDarkMode: boolean;
  onPress: () => void;
  showSearchBar: boolean;
  setShowSearchBar: (value: React.SetStateAction<boolean>) => void;
}
