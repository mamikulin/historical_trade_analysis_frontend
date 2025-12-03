import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  searchQuery: string;
  productionCenter?: string;
  isActive?: boolean;
}

const initialState: FiltersState = {
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setProductionCenter: (state, action: PayloadAction<string | undefined>) => {
      state.productionCenter = action.payload;
    },
    setIsActive: (state, action: PayloadAction<boolean | undefined>) => {
      state.isActive = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.productionCenter = undefined;
      state.isActive = undefined;
    },
  },
});

export const { setSearchQuery, setProductionCenter, setIsActive, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
