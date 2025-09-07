import type { Route } from './+types/_index';

export default function IndexPage({}: Route.ComponentProps) {
  return (
    <div className="container">
      <h1>React Router v7 - Form Validation</h1>
      <p>client-side and server-side form validation with Zod and React Hooks Form</p>
    </div>
  );
}
