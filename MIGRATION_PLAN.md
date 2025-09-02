# Migration Plan: Inertia Vue Jetstream to Inertia React with shadcn/ui

## Phase 1: Setup and Dependencies
1. **Update package.json dependencies**
   - Remove Vue packages: @inertiajs/vue3, @vitejs/plugin-vue, vue, @vue/server-renderer
   - Add React packages: react, react-dom, @types/react, @types/react-dom
   - Add shadcn/ui dependencies: class-variance-authority, clsx, tailwind-merge, lucide-react
   - Add Radix UI primitives as needed (installed per component)

2. **Setup shadcn/ui**
   - Initialize shadcn config (components.json)
   - Create lib/utils.ts for cn() helper
   - Set up components directory structure

3. **Update build configuration**
   - Update vite.config.js to use React plugin
   - Configure path aliases for @/components, @/lib

## Phase 2: Component Migration Strategy

### Components to replace with shadcn/ui:
- TextInput.vue → shadcn Input
- PrimaryButton.vue → shadcn Button (default variant)
- DangerButton.vue → shadcn Button (destructive variant)
- SecondaryButton.vue → shadcn Button (secondary variant)
- Checkbox.vue → shadcn Checkbox
- Dropdown.vue → shadcn DropdownMenu
- Modal.vue → shadcn Dialog
- DialogModal.vue → shadcn Dialog
- ConfirmationModal.vue → shadcn AlertDialog
- InputLabel.vue → shadcn Label
- InputError.vue → Custom component using shadcn styles
- ActionMessage.vue → shadcn Alert or Toast
- Banner.vue → shadcn Alert

### Custom Jetstream components to convert:
- ApplicationLogo.vue → React component
- AuthenticationCard.vue → React component with shadcn Card
- FormSection.vue → React component with shadcn Card
- ActionSection.vue → React component with shadcn Card
- SectionBorder.vue → React component
- Welcome.vue → React component
- NavLink.vue → React component
- DropdownLink.vue → shadcn DropdownMenuItem

### Socialstream components:
- Keep as custom React components

## Phase 3: Core Application Files
4. **Convert main application files**
   - resources/js/app.js → React with Inertia
   - resources/js/ssr.js → React SSR setup
   - Add TypeScript support with app.tsx and ssr.tsx

## Phase 4: Layout Migration
5. **Convert Layouts**
   - AppLayout.vue → React with shadcn navigation components
   - GuestLayout.vue → React with shadcn Card for auth forms

## Phase 5: Pages Migration
6. **Auth Pages (with shadcn forms)**
   - Login.vue → React with shadcn Form, Input, Button
   - Register.vue → React with shadcn Form components
   - ForgotPassword.vue → React with shadcn components
   - ResetPassword.vue → React with shadcn components
   - VerifyEmail.vue → React with shadcn Alert

7. **Profile Pages**
   - UpdateProfileInformation → shadcn Form, Input, Button
   - UpdatePasswordForm → shadcn Form, Input, Button
   - TwoFactorAuthenticationForm → shadcn Card, Button, Alert
   - LogoutOtherBrowserSessions → shadcn Dialog, Button
   - DeleteUserForm → shadcn AlertDialog, Input, Button

8. **API & Teams Pages**
   - API Token Management → shadcn Table, Dialog, Button
   - Teams pages → shadcn Card, Form components

## Phase 6: State & Form Handling
9. **Implement React patterns**
   - Use React Hook Form for form handling
   - Implement useForm hook from @inertiajs/react
   - Set up Ziggy route helpers for React
   - Add proper TypeScript types

## Phase 7: Testing & Refinement
10. **Test and refine**
    - Test authentication flows
    - Test form submissions with Inertia
    - Verify two-factor authentication
    - Test team management (if applicable)
    - Ensure responsive design works
    - Fix any TypeScript errors

## Benefits of using shadcn/ui:
- Reduces custom component code by ~60%
- Provides accessible, well-tested components
- Consistent design system
- Easy customization with Tailwind
- Smaller bundle size (only import what you use)
- Better TypeScript support

## Implementation Order (Incremental Approach):
1. Basic setup (dependencies, vite config)
2. Core app.js and ssr.js conversion
3. Welcome page
4. Dashboard page
5. Authentication pages (Login, Register)
6. Profile pages
7. Remaining pages