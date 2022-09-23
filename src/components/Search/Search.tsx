import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// type of component props
type SearchProps = {
  searchValue: string;
  onChange: (searchValue: string) => void;
};

/**
 * Search input field component.
 *
 * @param {SearchProps} props - component props
 */
export function Search({ searchValue, onChange }: SearchProps) {
  return (
    <InputBase
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search' }}
      sx={{ ml: 0 }}
      value={searchValue}
      onChange={(event) => onChange(event.target.value)}
      startAdornment={<SearchIcon sx={{ mr: 2 }} />}
    />
  );
}
