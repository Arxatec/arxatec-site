# Arxatec Website

Arxatec is a modern, multilingual website built with Astro, featuring a clean and professional design. The site supports multiple languages and includes various sections such as blog, pricing, support, and legal pages.

## 🌟 Features

- **Multilingual Support**: Available in multiple languages (English, Spanish, and more)
- **Responsive Design**: Optimized for all devices
- **Modern Architecture**: Built with Astro for optimal performance
- **Comprehensive Sections**:
  - Blog
  - Pricing
  - Support
  - Privacy Policy
  - Terms of Service
  - 404 Error Page

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── pages/     # Page-specific components
│   └── shared/    # Shared components across pages
├── i18n/          # Internationalization files
├── layouts/       # Layout templates
├── pages/         # Main pages and routes
│   ├── blog/      # Blog section
│   ├── en/        # English pages
│   ├── es/        # Spanish pages
│   ├── pricing/   # Pricing information
│   ├── privacy/   # Privacy policy
│   ├── support/   # Support section
│   └── terms/     # Terms of service
├── styles/        # Global styles and CSS
└── utils/         # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:
```bash
npm run dev
```
The site will be available at `localhost:4321`

### Building for Production

To build the production version:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## 🛠️ Available Scripts

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🌐 Internationalization

The website uses a robust i18n system with:
- Language-specific routes
- UI translations in multiple languages
- Automatic language detection
- Easy-to-maintain translation files

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, please visit the [Support Section](https://arxatec.com/support) or contact our team.

---

Built with ❤️ by the Arxatec Team

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
