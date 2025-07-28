# Fortran Inventory Management System

A modern, responsive inventory management web application built with React, TypeScript, and Vite. This system provides comprehensive inventory tracking with real-time API integration.

## 🚀 Features

- **Modern UI**: Built with React and Tailwind CSS using Fortran's brand colors (Green #A3ED58, White, Black)
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Fully responsive layout for desktop and mobile devices
- **Real-time API Integration**: Live data fetching from REST API endpoints
- **Advanced Search**: Multi-parameter search with filters for name, SKU, location, and category
- **Inventory Management**: View, edit, and delete parts with comprehensive details
- **Error Handling**: Robust error handling with user-friendly feedback
- **Loading States**: Smooth loading indicators for better UX

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Theme**: next-themes for dark/light mode
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── PartCard.tsx    # Part summary display
│   ├── PartSearchBar.tsx # Search form with filters
│   ├── PartDetailPanel.tsx # Full part information
│   └── ThemeToggle.tsx # Dark/light mode toggle
├── hooks/              # Custom React hooks
│   ├── useParts.ts     # Parts data management
│   └── use-toast.ts    # Toast notifications
├── pages/              # Page components
│   ├── SearchPage.tsx  # Main search interface
│   └── PartDetailPage.tsx # Individual part details
├── services/           # API integration
│   └── ApiService.ts   # HTTP client and API methods
├── types/              # TypeScript type definitions
│   └── part.ts         # Part-related interfaces
└── lib/                # Utility functions
    └── utils.ts        # Helper functions
```

## 🔌 API Integration

The application integrates with the following REST API endpoints:

- `GET /api/parts` - List all parts
- `GET /api/parts/{id}` - Fetch part by ID
- `POST /api/parts` - Create new part
- `PUT /api/parts/{id}` - Update existing part
- `DELETE /api/parts/{id}` - Delete part
- `GET /api/parts/search` - Search parts with filters

## ⚙️ Environment Setup

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd <PROJECT_NAME>
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
Copy `.env.example` to `.env` and configure your API settings:
```bash
cp .env.example .env
```

Edit `.env` with your API configuration:
```env
VITE_API_BASE_URL=http://localhost:3000
NODE_ENV=development
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🎨 Design System

The application uses Fortran's brand colors integrated into a comprehensive design system:

- **Primary Green**: #A3ED58 (HSL: 86, 79%, 64%)
- **White**: #FFFFFF
- **Black**: #000000
- **Semantic tokens** for consistent theming across light/dark modes
- **Responsive breakpoints** for mobile-first design

## 🧩 Component Usage

### PartCard
Displays part summary information in a card format:
```tsx
<PartCard 
  part={partData} 
  onEdit={handleEdit} 
  onDelete={handleDelete}
  showActions={true} 
/>
```

### PartSearchBar
Advanced search interface with filters:
```tsx
<PartSearchBar 
  onSearch={handleSearch} 
  isLoading={isSearching} 
/>
```

### PartDetailPanel
Full part information display:
```tsx
<PartDetailPanel 
  part={partData}
  onEdit={handleEdit}
  onDelete={handleDelete}
  showActions={true}
/>
```

## 🔄 Data Flow

1. **Search**: Users enter search criteria in PartSearchBar
2. **API Call**: Query parameters sent to search endpoint via ApiService
3. **State Management**: TanStack Query manages loading states and caching
4. **UI Update**: Results displayed in PartCard grid layout
5. **Detail View**: Click-through to PartDetailPanel for full information

## 🛡️ Error Handling

- **API Errors**: Comprehensive error catching with user-friendly messages
- **Network Issues**: Automatic retry logic with exponential backoff
- **Form Validation**: Real-time validation for create/update operations
- **Toast Notifications**: Success/error feedback for all operations

## 🚀 Deployment

The application is ready for deployment to any static hosting service. For Lovable projects:

1. Open your [Lovable Project](https://lovable.dev/projects/a9c21b38-6bee-40c8-99b4-c264df3c7e46)
2. Click **Share** → **Publish**
3. Your app will be deployed instantly

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

- **TypeScript**: Full type safety with strict configuration
- **ESLint**: Code linting with React and TypeScript rules
- **Prettier**: Code formatting (recommended)
- **Modular Architecture**: Clean separation of concerns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
