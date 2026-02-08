# Laravel Jetstream React Starter Kit

A modern, production-ready starter kit combining Laravel Jetstream with React, Inertia.js, and shadcn/ui components. This template provides a solid foundation for building full-stack applications with authentication, team management, and a beautiful UI out of the box.

## Features

### Core Stack

- **Laravel 12** - Latest version of the PHP framework
- **React 19** - Modern JavaScript library for building user interfaces
- **TypeScript** - Type-safe development experience
- **Inertia.js** - The modern monolith with client-side routing
- **Vite** - Lightning-fast build tool and dev server

### UI & Styling

- **shadcn/ui** - Beautiful, accessible component library built on Radix UI
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide Icons** - Beautiful & consistent icon toolkit
- **Dark Mode Ready** - System-aware theming with next-themes

### Authentication & Security

- **Laravel Jetstream** - Robust authentication scaffolding
- **Laravel Sanctum** - SPA authentication and API tokens
- **Socialstream** - Social authentication (Google enabled by default, others configurable)
- **Two-Factor Authentication** - Enhanced security with 2FA support
- **Session Management** - Browser session control

### Features Included

- User registration and login
- Email verification
- Password reset
- Profile management
- Team creation and management
- API token management
- Social authentication (Google by default)
- Responsive sidebar navigation
- Toast notifications with Sonner

## Requirements

- PHP >= 8.2
- Composer
- Node.js >= 20
- NPM or Yarn

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/bursteri/jetstream-react-tsx.git my-app
cd my-app
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Environment Setup

Copy the example environment file and generate an application key:

```bash
cp .env.example .env
php artisan key:generate
```

### 4. Configure Database

Update your `.env` file with your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

For quick local development, you can use SQLite:

```env
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

### 5. Run Migrations

```bash
php artisan migrate
```

### 6. Install JavaScript Dependencies

```bash
npm install
```

### 7. Build Assets

For development:

```bash
npm run dev
```

For production:

```bash
npm run build
```

### 8. Start the Development Server

Using the combined dev script (recommended):

```bash
composer run dev
```

This will start:

- Laravel development server
- Vite dev server
- Queue worker
- Laravel Pail for log monitoring

Or run services individually:

```bash
# Laravel server
php artisan serve

# Vite dev server (in another terminal)
npm run dev
```

Visit `http://localhost:8000` to see your application.

## Social Authentication Setup (Optional)

### 1. Configure Google OAuth (Enabled by Default)

Add your OAuth credentials to `.env`:

```env
APP_URL=http://localhost:8000

# Google
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

### 2. Enable Additional Providers (Optional)

By default, only Google is enabled in `config/socialstream.php`.
To add providers like GitHub/Facebook:

- Add provider credentials to `config/services.php`
- Add the provider to the `providers` array in `config/socialstream.php`

## Project Structure

```
├── app/                    # Laravel application logic
├── bootstrap/              # Framework bootstrap files
├── config/                 # Configuration files
├── database/
│   ├── migrations/        # Database migrations
│   └── seeders/          # Database seeders
├── public/                # Public assets
├── resources/
│   ├── js/
│   │   ├── Components/   # React components
│   │   │   ├── ui/      # shadcn/ui components
│   │   │   └── ...      # Custom components
│   │   ├── Layouts/      # Layout components
│   │   ├── Pages/        # Inertia page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── types/        # TypeScript type definitions
│   │   └── app.tsx       # Main application entry
│   └── css/              # Stylesheets
├── routes/                # Application routes
├── storage/               # File storage
├── tests/                 # Test files
└── vendor/                # Composer dependencies
```

## Available Scripts

### Backend

```bash
# Run migrations
php artisan migrate

# Run seeders
php artisan db:seed

# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Run tests
php artisan test
```

### Frontend

```bash
# Development server
npm run dev

# Production build (includes SSR)
npm run build

# Format code
npm run format
```

### Combined Development

```bash
# Start all development services
composer run dev

# Run tests
composer run test
```

## Customization

### Adding New Pages

Create a new page component in `resources/js/Pages/`:

```tsx
// resources/js/Pages/MyPage.tsx
import { Head } from '@inertiajs/react';
import SidebarLayout from '@/Layouts/SidebarLayout';

export default function MyPage() {
    return (
        <SidebarLayout>
            <Head title="My Page" />
            <div>
                <h1>My New Page</h1>
            </div>
        </SidebarLayout>
    );
}
```

Add a route in `routes/web.php`:

```php
use Inertia\Inertia;

Route::get('/my-page', function () {
    return Inertia::render('MyPage');
})->middleware(['auth']);
```

### Adding UI Components

This starter kit uses shadcn/ui. To add new components:

```bash
# Example: Add a select component
npx shadcn@latest add select
```

Components will be added to `resources/js/Components/ui/`.

### Styling

Tailwind CSS is configured and ready to use. The configuration supports the new Tailwind CSS v4 features.

## Testing

### Backend Tests

```bash
# Run all tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Feature
```

### Frontend Tests

Set up your preferred testing framework (Jest, Vitest, etc.) for React components.

## Deployment

### Build for Production

1. Install dependencies:

```bash
composer install --optimize-autoloader --no-dev
npm ci
```

2. Build assets:

```bash
npm run build
```

3. Cache configuration:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

4. Run migrations:

```bash
php artisan migrate --force
```

### Environment Variables

Ensure these are set in production:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Use strong, unique keys
APP_KEY=base64:...

# Configure mail, cache, queue drivers appropriately
```

## Security Considerations

- Always use HTTPS in production
- Keep dependencies updated regularly
- Use strong, unique passwords
- Enable two-factor authentication
- Configure CORS properly for API access
- Set up proper file permissions
- Use environment variables for sensitive data
- Regular security audits with `npm audit` and `composer audit`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Support

If you encounter any issues or have questions, please:

- Check the [Laravel documentation](https://laravel.com/docs)
- Check the [Inertia.js documentation](https://inertiajs.com)
- Check the [React documentation](https://react.dev)
- Open an issue on GitHub

## Credits

Built with:

- [Laravel](https://laravel.com)
- [Laravel Jetstream](https://jetstream.laravel.com)
- [React](https://react.dev)
- [Inertia.js](https://inertiajs.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Socialstream](https://docs.socialstream.dev)
