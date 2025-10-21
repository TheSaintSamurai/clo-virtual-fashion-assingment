
# CLO Virtual Fashion Assignment

This is a modern fashion content platform built with Next.js, React, and Redux Toolkit. It features advanced filtering, searching, sorting, infinite scroll, and pixel-perfect UI matching provided design screenshots.

## Features

- **Content Filtering:**
	- Filter by Paid, Free, and View Only options
	- Price range slider for Paid content
- **Keyword Search:**
	- Search bar with instant filtering
- **Sorting:**
	- Custom dropdown for Featured, Newest, Higher Price, Lower Price
- **Infinite Scroll:**
	- Loads more content as you scroll, with skeleton loader placeholders
- **Responsive Grid:**
	- Adapts to all screen sizes
- **Custom UI Components:**
	- Checkbox, SearchBar, SortDropdown, PriceRangeSlider, ContentCard, SkeletonCard
- **Pixel-Perfect Design:**
	- Matches provided screenshots for layout, colors, fonts, and spacing
- **Redux State Management:**
	- All filters, search, and sort persist and sync with URL
- **Unit Tests:**
	- 100% coverage for all components using Jest and React Testing Library

## Demo Setup

1. **Install dependencies:**
	 ```bash
	 npm install
	 # or
	 yarn install
	 ```

2. **Run the development server:**
	 ```bash
	 npm run dev
	 # or
	 yarn dev
	 ```

3. **Open the app:**
	 Visit [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run all unit tests:**
	 ```bash
	 npm test
	 # or
	 yarn test
	 ```

## Folder Structure

- `app/components/common/` — ContentCard, SkeletonCard
- `app/components/ui/` — Checkbox, SearchBar, SortDropdown, PriceRangeSlider
- `app/store/` — Redux slice and store
- `app/hooks/` — Custom hooks (infinite scroll)
- `app/__tests__/` — All unit tests for components
- `app/lib/` — Shared types (if needed)

## API

Content is fetched from:
```
https://closet-recruiting-api.azurewebsites.net/api/data
```

## Deployment

You can deploy this app to Vercel or any platform supporting Next.js. See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Credits

- Built with Next.js, React, Redux Toolkit
- UI matches provided CLO Virtual Fashion design screenshots

---
For any questions or demo requests, contact the project maintainer.
