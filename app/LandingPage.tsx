'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppDispatch, RootState } from './store/store';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import {
  fetchContent,
  setFilters,
  setSearchKeyword,
  loadMoreContent,
  loadMoreContentAsync,
  resetFilters,
  clearContent,
  selectDisplayedContent,
  selectHasMore,
  selectFilters,
  selectSearchKeyword,
  selectLoading,
  selectLoadingMore,
  selectError,
  setSortBy,
  setPriceRange,
  selectSortBy,
  selectPriceRange,
} from './store/contentSlice';
import SearchBar from './components/ui/SearchBar';
import Checkbox from './components/ui/Checkbox';
import Button from './components/ui/Button';
import ContentCard from './components/common/ContentCard';
import SkeletonCard from './components/common/SkeletonCard';
import SortDropdown from './components/ui/SortDropdown';
import PriceRangeSlider from './components/ui/PriceRangeSlider';

const LandingPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialized = useRef(false);
  
  const displayedContent = useSelector(selectDisplayedContent);
  const hasMore = useSelector(selectHasMore);
  const filters = useSelector(selectFilters);
  const searchKeyword = useSelector(selectSearchKeyword);
  const loading = useSelector(selectLoading);
  const loadingMore = useSelector(selectLoadingMore);
  const error = useSelector(selectError);
  const sortBy = useSelector(selectSortBy);
  const priceRange = useSelector(selectPriceRange);

  // Initialize data and URL sync (only on mount)
  useEffect(() => {
    if (isInitialized.current) return;
    
    // Parse URL parameters
    const pricingParam = searchParams.get('pricing');
    const searchParam = searchParams.get('search');
    
    if (pricingParam) {
      const pricingOptions = pricingParam.split(',').map(Number);
      const newFilters = {
        paid: pricingOptions.includes(0),
        free: pricingOptions.includes(1),
        viewOnly: pricingOptions.includes(2),
      };
      dispatch(setFilters(newFilters));
    }
    
    if (searchParam) {
      dispatch(setSearchKeyword(searchParam));
    }
    
    // Fetch initial content
    dispatch(fetchContent());
    isInitialized.current = true;
  }, [dispatch, searchParams]);

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    
    const activePricingOptions = [];
    if (filters.paid) activePricingOptions.push('0');
    if (filters.free) activePricingOptions.push('1');
    if (filters.viewOnly) activePricingOptions.push('2');
    
    if (activePricingOptions.length > 0) {
      params.set('pricing', activePricingOptions.join(','));
    }
    
    if (searchKeyword.trim()) {
      params.set('search', searchKeyword);
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '/';
    router.replace(newUrl, { scroll: false });
  }, [filters, searchKeyword, router]);

  // Load more content
  const loadMore = useCallback(() => {
    console.log('loadMore called', { hasMore, loadingMore, displayedContentLength: displayedContent.length });
    if (hasMore && !loadingMore) {
      dispatch(loadMoreContentAsync());
    }
  }, [dispatch, hasMore, loadingMore, displayedContent.length]);

  // Use custom infinite scroll hook
  const { loadMoreRef } = useInfiniteScroll({
    hasMore,
    loading: loadingMore,
    onLoadMore: loadMore,
  });

  const handleFilterChange = (filterType: keyof typeof filters, checked: boolean) => {
    dispatch(setFilters({ [filterType]: checked }));
  };

  const handleSortChange = (value: string) => {
    // Map dropdown values to slice values
    let sortValue: 'name' | 'higher' | 'lower' = 'name';
    if (value === 'higher') sortValue = 'higher';
    else if (value === 'lower') sortValue = 'lower';
    else sortValue = 'name';
    dispatch(setSortBy(sortValue));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = Number(e.target.value);
    let newRange: [number, number] = [...priceRange];
    newRange[index] = value;
    // Prevent overlap
    if (index === 0 && value > newRange[1]) newRange[0] = newRange[1];
    if (index === 1 && value < newRange[0]) newRange[1] = newRange[0];
    dispatch(setPriceRange(newRange));
  };

  const handleSearch = (keyword: string) => {
    dispatch(setSearchKeyword(keyword));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Content</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <Button onClick={() => dispatch(fetchContent())}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen" style={{ background: '#23232a' }}>
      <div className="content-container py-8">
        {/* Search Section */}
        <div className="mb-6" style={{ marginTop: 24 }}>
          <div className="search-bar">
            <SearchBar
              onSearch={handleSearch}
              className=""
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar mb-6" style={{ padding: '18px 24px 12px 24px' }}>
          <div className="flex items-center gap-6">
            <span style={{ color: '#eaeaea', fontFamily: 'AvenirNextLTProMedium', fontSize: 13, marginRight: 8 }}>Pricing Option</span>
            <Checkbox
              label="Paid"
              checked={filters.paid}
              onChange={(checked) => handleFilterChange('paid', checked)}
            />
            <Checkbox
              label="Free"
              checked={filters.free}
              onChange={(checked) => handleFilterChange('free', checked)}
            />
            <Checkbox
              label="View Only"
              checked={filters.viewOnly}
              onChange={(checked) => handleFilterChange('viewOnly', checked)}
            />
            {/* Pricing Slider */}
            <PriceRangeSlider
              min={0}
              max={999}
              value={priceRange}
              onChange={val => dispatch(setPriceRange(val))}
              disabled={!filters.paid}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="ml-auto"
              style={{ fontSize: 13, color: '#eaeaea', fontFamily: 'AvenirNextLTProRegular', padding: '4px 12px' }}
            >
              RESET
            </Button>
          </div>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center justify-end mb-4">
          <span className="sort-label">Sort by</span>
          <SortDropdown value={sortBy === 'name' ? 'featured' : sortBy} onChange={handleSortChange} />
        </div>

        {/* Content Grid */}
        <div className="mb-8">
          {loading && displayedContent.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 infinite-scroll-container">
                {displayedContent.map((item) => (
                  <ContentCard
                    key={item.id}
                    id={item.id}
                    imagePath={item.imagePath}
                    creator={item.creator}
                    title={item.title}
                    pricingOption={item.pricingOption}
                    price={item.price}
                  />
                ))}
                {/* Skeletons for infinite scroll loading */}
                {loadingMore && Array.from({ length: 4 }).map((_, idx) => (
                  <SkeletonCard key={"skeleton-" + idx} />
                ))}
              </div>

              {/* Load more trigger */}
              <div ref={loadMoreRef} className="h-32 flex justify-center items-center py-8">
                {loadingMore ? null : hasMore ? (
                  <div className="text-gray-400 text-sm">Scroll down to load more...</div>
                ) : null}
              </div>

              {!hasMore && displayedContent.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No more content to load</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
