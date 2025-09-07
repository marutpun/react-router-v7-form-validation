import { Form, href, redirect } from 'react-router';
import type { Route } from './+types/_index';
import * as z from 'zod/v4';

const registerFormSchema = z.object({
  username: z
    .string()
    .min(6, { error: 'Username must be minimum 6 characters' })
    .max(30, { error: 'Username must not exceed 30 characters' }),
  password: z
    .string()
    .min(6, { error: 'Password must be minimum 6 characters' })
    .max(30, { error: 'Password must not exceed 30 characters' }),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export default function IndexPage({ actionData }: Route.ComponentProps) {
  const { success, error } = actionData || {};

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
            <input
              type="text"
              name="username"
              required
              aria-describedby={error?.fieldErrors.username ? 'feedback-username' : undefined}
            />
          </label>
          {error?.fieldErrors.username && <p id="feedback-username">{error?.fieldErrors.username}</p>}
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              aria-describedby={error?.fieldErrors.password ? 'feedback-password' : undefined}
            />
          </label>
          {error?.fieldErrors.password && <p id="feedback-password">{error?.fieldErrors.password}</p>}
        </fieldset>
        <button type="submit">Register</button>
      </Form>
    </div>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);
  const validatedForm = registerFormSchema.safeParse(formValues);

  if (!validatedForm.success) {
    return {
      success: false,
      error: z.flattenError(validatedForm.error),
    };
  }

  return redirect(href('/dashboard'));
}
