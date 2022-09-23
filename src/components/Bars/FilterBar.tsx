import { Grid } from '@mui/material';

import { ModelSortDirection } from '@/API';
import { Checkbox } from '@/components/Controls/Checkbox';
import { Switch } from '@/components/Controls/Switch';

// type of filter options
export type FilterOptions = {
  isDone: boolean;
  isDue: boolean;
  sortByDate: ModelSortDirection;
};

// type of component props
type FilterProps = {
  filterOptions: FilterOptions;
  onChange: (filterData: FilterOptions) => void;
};

/**
 * Component to provide filter options
 * for todo list.
 *
 * Includes:
 *  - checkbox to filter for 'done' todos
 *  - checkbox to filter for 'due' todos
 *  - switch to sort by date (asc & desc)
 *
 * @param {FilterProps} props - component props
 */
export function FilterBar({ filterOptions, onChange }: FilterProps) {
  const { isDone, isDue, sortByDate } = filterOptions;

  return (
    <Grid
      container
      alignItems="center"
      rowSpacing={1}
      columnSpacing={{ md: 5 }}>
      <Grid item xs={12} md="auto">
        <Checkbox
          label="Include done todos"
          checked={isDone}
          onChange={(event) => {
            onChange({ ...filterOptions, isDone: event.target.checked });
          }}
        />
      </Grid>

      <Grid item xs={12} md="auto">
        <Checkbox
          label="Only due"
          checked={isDue}
          onChange={(event) =>
            onChange({ ...filterOptions, isDue: event.target.checked })
          }
        />
      </Grid>

      <Grid item xs={12} md="auto">
        <Switch
          label="Newest first"
          checked={sortByDate === ModelSortDirection.DESC}
          onChange={(evt) =>
            onChange({
              ...filterOptions,
              sortByDate: evt.target.checked
                ? ModelSortDirection.DESC
                : ModelSortDirection.ASC,
            })
          }
        />
      </Grid>
    </Grid>
  );
}
