# Newsletter Frontend - React TypeScript Application

## Architecture Overview

This React application follows best practices with a modular, component-based architecture.

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button/         # Reusable button with variants
│   ├── Input/          # Form input with validation
│   ├── CheckboxGroup/  # Multi-select checkbox group
│   └── NewsletterForm/ # Main form component
├── hooks/              # Custom React hooks
│   └── useNewsletterForm.ts  # Form state management
├── services/           # API communication
│   └── subscriberService.ts  # API client
├── types/              # TypeScript definitions
│   └── index.ts        # All type definitions
└── utils/              # Utility functions
```

## Design Patterns

### 1. Component Composition
Small, focused components composed together:
- `Button` - Reusable button with variants
- `Input` - Form input with validation states
- `CheckboxGroup` - Multi-select component
- `NewsletterForm` - Composes all components

### 2. Custom Hooks
Business logic separated from UI:
- `useNewsletterForm` - Manages form state, validation, and submission
- Reusable across different components
- Encapsulates complex logic

### 3. Service Layer
API calls centralized in service layer:
- `subscriberService` - All API endpoints
- Axios interceptors for error handling
- Type-safe requests and responses

### 4. Container/Presentational Pattern
- Smart components (containers) manage state
- Presentational components focus on UI
- Clear separation of concerns

## Component Documentation

### Button Component

**Location:** `src/components/Button/Button.tsx`

**Purpose:** Reusable button with multiple variants and loading states.

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  // + all standard button HTML attributes
}
```

**Usage:**
```tsx
import { Button } from '@components/Button';

<Button 
  variant="primary" 
  size="medium"
  isLoading={isSubmitting}
  onClick={handleSubmit}
>
  Submit
</Button>
```

**Features:**
- ✅ Multiple variants (primary, secondary, danger, outline)
- ✅ Three sizes (small, medium, large)
- ✅ Loading state with spinner
- ✅ Full width option
- ✅ Accessible (keyboard navigation, focus states)
- ✅ Beautiful gradient backgrounds
- ✅ Smooth animations

### Input Component

**Location:** `src/components/Input/Input.tsx`

**Purpose:** Form input with label, error states, and helper text.

**Props:**
```typescript
interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  // + all standard input HTML attributes
}
```

**Usage:**
```tsx
import { Input } from '@components/Input';

<Input
  label="Email Address"
  type="email"
  value={email}
  onChange={handleChange}
  error={errors.email}
  helperText="We'll never share your email"
  required
/>
```

**Features:**
- ✅ Label with required indicator
- ✅ Error states with messages
- ✅ Helper text support
- ✅ Accessible (ARIA attributes)
- ✅ Focus and hover states
- ✅ Responsive design

### CheckboxGroup Component

**Location:** `src/components/CheckboxGroup/CheckboxGroup.tsx`

**Purpose:** Multi-select checkbox group with beautiful styling.

**Props:**
```typescript
interface CheckboxGroupProps {
  label: string;
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  error?: string;
  required?: boolean;
}
```

**Usage:**
```tsx
import { CheckboxGroup } from '@components/CheckboxGroup';

<CheckboxGroup
  label="Select Interests"
  options={[
    { value: 'Houses', label: '🏡 Houses' },
    { value: 'Apartments', label: '🏢 Apartments' }
  ]}
  selectedValues={interests}
  onChange={setInterests}
  error={errors.interests}
  required
/>
```

**Features:**
- ✅ Custom checkbox design
- ✅ Visual feedback on selection
- ✅ Responsive grid layout
- ✅ Accessible (ARIA roles)
- ✅ Emoji support
- ✅ Error states

### NewsletterForm Component

**Location:** `src/components/NewsletterForm/NewsletterForm.tsx`

**Purpose:** Main form component that composes all other components.

**Features:**
- ✅ Complete form with validation
- ✅ Success and error states
- ✅ Loading states during submission
- ✅ Beautiful gradient background
- ✅ Responsive design
- ✅ Accessibility compliant

## Custom Hooks

### useNewsletterForm

**Location:** `src/hooks/useNewsletterForm.ts`

**Purpose:** Manages form state, validation, and API submission.

**Returns:**
```typescript
{
  formData: NewsletterFormData;
  errors: Partial<Record<keyof NewsletterFormData, string>>;
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
  updateField: (field, value) => void;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
}
```

**Usage:**
```tsx
import { useNewsletterForm } from '@hooks/useNewsletterForm';

const MyForm = () => {
  const {
    formData,
    errors,
    isSubmitting,
    handleSubmit
  } = useNewsletterForm();

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
};
```

**Features:**
- ✅ Client-side validation
- ✅ API error handling
- ✅ Loading states
- ✅ Form reset functionality
- ✅ Type-safe field updates

## API Service

### subscriberService

**Location:** `src/services/subscriberService.ts`

**Purpose:** Centralized API communication with error handling.

**Methods:**
```typescript
subscriberService.createSubscriber(data)
subscriberService.getAllSubscribers()
subscriberService.getSubscriberById(id)
subscriberService.updateSubscriber(id, data)
subscriberService.deleteSubscriber(id)
subscriberService.deactivateSubscriber(id)
subscriberService.activateSubscriber(id)
```

**Features:**
- ✅ Axios instance with default config
- ✅ Request/response interceptors
- ✅ Type-safe API calls
- ✅ Consistent error handling
- ✅ Token support (prepared for auth)

## TypeScript Types

**Location:** `src/types/index.ts`

All types are centralized for consistency:

```typescript
// Enums
export enum SubscriberType {
  HomeBuilder = 'HomeBuilder',
  HomeBuyer = 'HomeBuyer',
}

export enum CommunicationMethod {
  Email = 'Email',
  SMS = 'SMS',
  Phone = 'Phone',
  Post = 'Post',
}

export enum Interest {
  Houses = 'Houses',
  Apartments = 'Apartments',
  SharedOwnership = 'SharedOwnership',
  Rental = 'Rental',
  LandSourcing = 'LandSourcing',
}

// DTOs
export interface CreateSubscriberDto { /* ... */ }
export interface SubscriberResponse { /* ... */ }

// Component Props
export interface ButtonProps { /* ... */ }
export interface InputProps { /* ... */ }
```

## Styling Approach

### CSS Modules Pattern
Each component has its own CSS file:
- `Button.css` - Button-specific styles
- `Input.css` - Input-specific styles
- `CheckboxGroup.css` - CheckboxGroup-specific styles

### Design System
Consistent design tokens:
- **Colors:** Gradient themes (purple, pink)
- **Spacing:** Consistent padding/margins
- **Typography:** System fonts with fallbacks
- **Shadows:** Layered depth
- **Transitions:** Smooth 0.2s ease-in-out

### Responsive Design
Mobile-first approach with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Running the Application

### Development
```bash
npm install
npm run dev
```
Open `http://localhost:3000`

### Build for Production
```bash
npm run build
```
Output in `dist/` directory

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## Environment Variables

Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Note:** Vite requires `VITE_` prefix for exposed variables.

## Path Aliases

Configured in `tsconfig.json` and `vite.config.ts`:

```typescript
import { Button } from '@components/Button';
import { useNewsletterForm } from '@hooks/useNewsletterForm';
import { subscriberService } from '@services/subscriberService';
import type { ButtonProps } from '@types/index';
```

## Accessibility

All components follow WCAG 2.1 AA standards:

- ✅ Semantic HTML
- ✅ ARIA attributes
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support
- ✅ Sufficient color contrast
- ✅ Error announcements

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Performance Optimizations

1. **Code Splitting:** Vite handles automatic code splitting
2. **Tree Shaking:** Unused code removed in production
3. **Asset Optimization:** Images and assets optimized
4. **Lazy Loading:** Components loaded on demand
5. **Memoization:** React.memo for expensive components

## Testing Recommendations

### Component Tests (React Testing Library)
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Hook Tests
```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useNewsletterForm } from './useNewsletterForm';

test('updateField updates form data', () => {
  const { result } = renderHook(() => useNewsletterForm());
  
  act(() => {
    result.current.updateField('firstName', 'John');
  });
  
  expect(result.current.formData.firstName).toBe('John');
});
```

## Common Issues & Solutions

### Issue: Import path errors
**Solution:** Check `tsconfig.json` path aliases match `vite.config.ts`

### Issue: CORS errors
**Solution:** Ensure backend CORS allows frontend origin

### Issue: TypeScript errors
**Solution:** Run `npm run build` to see all type errors

### Issue: Styles not applied
**Solution:** Ensure CSS files are imported in components

## Contributing Guidelines

1. Follow existing code structure
2. Use TypeScript strictly (no `any`)
3. Write accessible components
4. Add prop types and JSDoc comments
5. Keep components small and focused
6. Use custom hooks for logic
7. Follow naming conventions

## Future Enhancements

1. **Form Validation:** Zod or Yup schema validation
2. **State Management:** React Query for server state
3. **Routing:** React Router for multi-page app
4. **Animations:** Framer Motion for smooth animations
5. **Testing:** Jest + React Testing Library
6. **Storybook:** Component documentation
7. **i18n:** Internationalization support
