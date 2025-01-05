# Movie Dashboard

A modern, responsive movie browsing application built with React, leveraging The Movie Database (TMDB) API for comprehensive movie information and discovery features.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your TMDB API key to .env

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Features

- **Movie Discovery**: Browse and search through an extensive movie database
- **Advanced Filtering**: Filter movies by genre, release date, and ratings
- **Responsive Design**: Optimized for all device sizes
- **Dynamic Search**: Real-time search with debouncing
- **Grid/List Views**: Toggle between different viewing layouts
- **Detailed Information**: Comprehensive movie details including cast, crew, and related content

## 🏗️ Technical Stack

- **Frontend**: React with TypeScript
- **State Management**: React Query for server state, Context API for local state
- **Styling**: Tailwind CSS for utility-first styling
- **API Integration**: Axios for API communication
- **Caching**: Custom caching layer for optimal performance
- **Testing**: Jest and React Testing Library

## 🌐 API Integration

This project uses The Movie Database (TMDB) API. You'll need to:

1. Register for an API key at [TMDB](https://www.themoviedb.org/documentation/api)
2. Add your API key to the `.env` file

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
├── features/        # Feature-specific components
├── services/        # API and business logic
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── types/          # TypeScript definitions
└── styles/         # Global styles
```

## 🔧 Configuration

Key configuration files:

- `.env`: Environment variables
- `tailwind.config.js`: Tailwind CSS configuration
- `vite.config.ts`: Vite bundler configuration

## 📚 Documentation

Detailed documentation is available in the `/docs` directory:

- [Technical Architecture](./docs/technical-architecture.md)
- [Component Documentation](./docs/components.md)
- [API Integration Guide](./docs/api-integration.md)

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/feature-name`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- All contributors and maintainers

## 📞 Support

For support, please:

1. Check the [documentation](./docs)
2. Open an issue
3. Reach out to maintainers
