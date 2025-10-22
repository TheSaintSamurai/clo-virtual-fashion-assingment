import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
export interface ContentItem {
  id: string;
  creator: string;
  title: string;
  pricingOption: number; // 0: PAID, 1: FREE, 2: VIEW_ONLY
  imagePath: string;
  price: number;
}

export interface Filters {
  paid: boolean;
  free: boolean;
  viewOnly: boolean;
}

interface ContentState {
  allContent: ContentItem[];
  filteredContent: ContentItem[];
  displayedContent: ContentItem[];
  currentPage: number;
  itemsPerPage: number;
  filters: Filters;
  searchKeyword: string;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  sortBy: 'name' | 'higher' | 'lower';
  priceRange: [number, number];
}

const initialState: ContentState = {
  allContent: [],
  filteredContent: [],
  displayedContent: [],
  currentPage: 1,
  itemsPerPage: 16,
  filters: {
    paid: false,
    free: false,
    viewOnly: false,
  },
  searchKeyword: '',
  loading: false,
  loadingMore: false,
  hasMore: true,
  error: null,
  sortBy: 'name',
  priceRange: [0, 999],
};

// Async thunk for fetching content
export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://closet-recruiting-api.azurewebsites.net/api/data');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch content');
    }
  }
);

export const loadMoreContentAsync = createAsyncThunk(
  'content/loadMoreContentAsync',
  async (_, { getState, dispatch }) => {
    const state = getState() as { content: ContentState };
    const { displayedContent, filteredContent, itemsPerPage } = state.content;
    
    const startIndex = displayedContent.length;
    const endIndex = startIndex + itemsPerPage;
    return filteredContent.slice(startIndex, endIndex);
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
      state.displayedContent = [];
      state.hasMore = true;
      // Apply filters to create filtered content
      applyFiltersAndSearch(state);
    },
    setSortBy: (state, action: PayloadAction<'name' | 'higher' | 'lower'>) => {
      state.sortBy = action.payload;
      applyFiltersAndSearch(state);
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
      applyFiltersAndSearch(state);
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
      state.currentPage = 1;
      state.displayedContent = [];
      state.hasMore = true;
      // Apply filters to create filtered content
      applyFiltersAndSearch(state);
    },
    loadMoreContent: (state) => {
      state.loadingMore = true;
      const startIndex = state.displayedContent.length;
      const endIndex = startIndex + state.itemsPerPage;
      const nextBatch = state.filteredContent.slice(startIndex, endIndex);
      
      // Only add items if there are more to load
      if (nextBatch.length > 0) {
        state.displayedContent = state.displayedContent.concat(nextBatch);
        state.currentPage += 1;
      }
      
      // Update hasMore based on current filtered content
      state.hasMore = state.displayedContent.length < state.filteredContent.length;
      state.loadingMore = false;
    },
    resetFilters: (state) => {
      state.filters = {
        paid: false,
        free: false,
        viewOnly: false,
      };
      state.searchKeyword = '';
      state.currentPage = 1;
      state.displayedContent = [];
      state.hasMore = true;
      // Apply filters to create filtered content
      applyFiltersAndSearch(state);
    },
    clearContent: (state) => {
      state.displayedContent = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.allContent = action.payload;
        state.error = null;
        // Apply filters to create filtered content
        applyFiltersAndSearch(state);
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadMoreContentAsync.pending, (state) => {
        state.loadingMore = true;
      })
      .addCase(loadMoreContentAsync.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          state.displayedContent = state.displayedContent.concat(action.payload);
          state.currentPage += 1;
        }
        state.hasMore = state.displayedContent.length < state.filteredContent.length;
        state.loadingMore = false;
      })
      .addCase(loadMoreContentAsync.rejected, (state) => {
        state.loadingMore = false;
      });
  },
});

// Helper function to apply filters and search
function applyFiltersAndSearch(state: ContentState) {
  let filtered = state.allContent;

  // Apply search filter
  if (state.searchKeyword.trim()) {
    const keyword = state.searchKeyword.toLowerCase();
    filtered = filtered.filter(
      item =>
        item.creator.toLowerCase().includes(keyword) ||
        item.title.toLowerCase().includes(keyword)
    );
  }

  // Apply pricing filters
  const hasActiveFilters = state.filters.paid || state.filters.free || state.filters.viewOnly;
  if (hasActiveFilters) {
    filtered = filtered.filter(item => {
      if (state.filters.paid && item.pricingOption === 0) return true;
      if (state.filters.free && item.pricingOption === 1) return true;
      if (state.filters.viewOnly && item.pricingOption === 2) return true;
      return false;
    });
  }

  // Apply price range filter if Paid is selected
  if (state.filters.paid) {
    filtered = filtered.filter(item => {
      if (item.pricingOption === 0) {
        return item.price >= state.priceRange[0] && item.price <= state.priceRange[1];
      }
      return true;
    });
  }

  // Apply sorting
  if (state.sortBy === 'name') {
    // No sorting, just show all items as filtered
    filtered = filtered.slice();
  } else if (state.sortBy === 'higher') {
    // Priced > View Only > Free, then by price descending within Priced
    filtered = filtered.slice().sort((a, b) => {
      // PricingOption: 0 = PAID, 1 = FREE, 2 = VIEW_ONLY
      const getRank = (item: ContentItem) => {
        if (item.pricingOption === 0) return 0; // PAID
        if (item.pricingOption === 2) return 1; // VIEW_ONLY
        return 2; // FREE
      };
      const rankA = getRank(a);
      const rankB = getRank(b);
      if (rankA !== rankB) return rankA - rankB;
      // If both are PAID, sort by price descending
      if (rankA === 0) return (b.price || 0) - (a.price || 0);
      // Otherwise, keep original order
      return 0;
    });
  } else if (state.sortBy === 'lower') {
    // Free > View Only > Priced, then by price ascending within Priced
    filtered = filtered.slice().sort((a, b) => {
      const getRank = (item: ContentItem) => {
        if (item.pricingOption === 1) return 0; // FREE
        if (item.pricingOption === 2) return 1; // VIEW_ONLY
        return 2; // PAID
      };
      const rankA = getRank(a);
      const rankB = getRank(b);
      if (rankA !== rankB) return rankA - rankB;
      // If both are PAID, sort by price ascending
      if (rankA === 2) return (a.price || 0) - (b.price || 0);
      // Otherwise, keep original order
      return 0;
    });
  }

  state.filteredContent = filtered;
  // Load first batch
  const firstBatch = filtered.slice(0, state.itemsPerPage);
  state.displayedContent = firstBatch;
  state.currentPage = 1;
  state.hasMore = filtered.length > state.itemsPerPage;
}

// Helper function to update filtered content without resetting displayed content
function updateFilteredContent(state: ContentState) {
  let filtered = state.allContent;

  // Apply search filter
  if (state.searchKeyword.trim()) {
    const keyword = state.searchKeyword.toLowerCase();
    filtered = filtered.filter(
      item =>
        item.creator.toLowerCase().includes(keyword) ||
        item.title.toLowerCase().includes(keyword)
    );
  }

  // Apply pricing filters
  const hasActiveFilters = state.filters.paid || state.filters.free || state.filters.viewOnly;
  if (hasActiveFilters) {
    filtered = filtered.filter(item => {
      if (state.filters.paid && item.pricingOption === 0) return true;
      if (state.filters.free && item.pricingOption === 1) return true;
      if (state.filters.viewOnly && item.pricingOption === 2) return true;
      return false;
    });
  }

  state.filteredContent = filtered;
  state.hasMore = state.displayedContent.length < filtered.length;
}

export const {
  setFilters,
  setSearchKeyword,
  loadMoreContent,
  resetFilters,
  clearContent,
  setSortBy,
  setPriceRange,
} = contentSlice.actions;

// Selectors
export const selectAllContent = (state: { content: ContentState }) => state.content.allContent;
export const selectFilteredContent = (state: { content: ContentState }) => state.content.filteredContent;
export const selectDisplayedContent = (state: { content: ContentState }) => state.content.displayedContent;
export const selectCurrentPage = (state: { content: ContentState }) => state.content.currentPage;
export const selectItemsPerPage = (state: { content: ContentState }) => state.content.itemsPerPage;
export const selectFilters = (state: { content: ContentState }) => state.content.filters;
export const selectSearchKeyword = (state: { content: ContentState }) => state.content.searchKeyword;
export const selectLoading = (state: { content: ContentState }) => state.content.loading;
export const selectLoadingMore = (state: { content: ContentState }) => state.content.loadingMore;
export const selectHasMore = (state: { content: ContentState }) => state.content.hasMore;
export const selectError = (state: { content: ContentState }) => state.content.error;
export const selectSortBy = (state: { content: ContentState }) => state.content.sortBy;
export const selectPriceRange = (state: { content: ContentState }) => state.content.priceRange;

export default contentSlice.reducer;
