# Nkumbi - Agricultural Marketplace Platform

## Overview

Nkumbi is a modern web application built to connect farmers, buyers, and agricultural stakeholders. The platform provides features like marketplace listings, real-time market prices, weather information, crop guides, and community engagement tools.

## Technologies & Tools

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**:
  - Radix UI
  - Shadcn/ui
  - Framer Motion
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **State Management**: Redux Toolkit
- **Maps**: Leaflet
- **Charts**: Recharts
- **Form Handling**: React Hook Form with Zod validation

## Features

- 🌾 Marketplace for agricultural products
- 💰 Real-time market prices
- 🚛 Transportation services
- 👥 Buyer profiles and management
- 🌦️ Weather information
- 📱 Responsive design
- 🔒 Secure authentication
- 🌍 Interactive maps
- 📊 Data visualization
- 💬 Community features

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager
- MongoDB database
- Environment variables setup

### Installation

1. Clone the repository:

```bash
git clone https://github.com/akibrahimug/nkumbi.git
cd nkumbi
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
ENCRYPTION_KEY=
NEXT_PUBLIC_ENCRYPTION_KEY=
HUGGINGFACE_API_TOKEN=
```

4. Run the development server:

```bash
yarn dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
yarn build
yarn start
```

## Project Structure

```
nkumbi/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── components/        # Reusable components
│   ├── marketplace/       # Marketplace feature
│   ├── buyers/           # Buyer management
│   └── ...               # Other feature directories
├── contexts/              # React contexts
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── models/               # MongoDB models
├── public/              # Static assets
├── store/               # Redux store
├── styles/              # Global styles
├── types/               # TypeScript types
└── utils/               # Helper functions
```

## Development

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- Commitizen for conventional commits

### Testing

- Jest for unit testing
- React Testing Library for component testing

Run tests:

```bash
yarn test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes using Commitizen (`yarn commit`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
