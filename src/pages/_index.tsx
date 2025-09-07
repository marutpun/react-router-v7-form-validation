import type { Route } from './+types/_index';
import { Form } from 'react-router';
import * as z from 'zod/v4';

const registerFormSchema = z.object({
  usernme: z
    .string()
    .min(6, { error: 'Username must be at least 6 characters long' })
    .max(30, { error: 'Username cannot exceed 30 characters' }),
  password: z
    .string()
    .min(6, { error: 'Password must be at least 6 characters long' })
    .max(30, { error: 'Password cannot exceed 30 characters' }),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export default function IndexPage({}: Route.ComponentProps) {
  return (
    <div className="container">
      <h1>React Router v7 - Form Validation</h1>
      <p>client-side and server-side form validation with Zod and React Hooks Form</p>
      <h2>Register Form</h2>
      <Form method="POST">
        <fieldset>
          <legend>Account Details</legend>
          <label>
            Username
            <input type="text" name="fullName" required />
          </label>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
        </fieldset>
        <button type="submit">Register</button>
      </Form>
    </div>
  );
}
