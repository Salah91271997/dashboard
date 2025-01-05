# Movie Dashboard

A modern, responsive movie browsing application built with Angular, leveraging The Movie Database (TMDB) API for comprehensive movie information and discovery features.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your TMDB API key to .env

# Start development server
npm start

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

- **Frontend**: Angular with TypeScript
- **State Management**: RXJS for state management
- **Styling**: bootstrap 5 and PrimeNg
- **API Integration**: HttpClient for API communication
- **Caching**: Custom caching layer for optimal performance

## 🌐 API Integration

This project uses The Movie Database (TMDB) API. You'll need to:

1. Register for an API key at [TMDB](https://www.themoviedb.org/documentation/api)
2. Add your API key to the `.env` file

## 📁 Project Structure

```
src/
├── app/             # Main application module
├── components/      # Reusable UI components
├── features/        # Feature-specific components
├── services/        # API and business logic
├── pipes/           # Custom Angular pipes
├── directives/      # Custom Angular directives
├── models/          # TypeScript models
└── styles/          # Global styles
```

## 🔧 Configuration

Key configuration files:

- `.env`: Environment variables
- `tailwind.config.js`: Tailwind CSS configuration
- `angular.json`: Angular CLI configuration

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

## Live

https://sensational-taiyaki-2477fd.netlify.app/
