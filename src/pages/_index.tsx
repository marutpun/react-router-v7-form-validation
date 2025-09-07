import { Form, href, redirect, useSubmit } from 'react-router';
import type { Route } from './+types/_index';
import * as z from 'zod/v4';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors: clientError },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const _handleRegisterForm: SubmitHandler<RegisterFormSchema> = (formValues) => {
    submit(formValues, { method: 'POST' });
  };

  return (
    <div className="container">
      <h1>React Router v7 - Form Validation</h1>
      <p>client-side and server-side form validation with Zod and React Hooks Form</p>
      <h2>Register Form</h2>
      <Form method="POST" onSubmit={handleSubmit(_handleRegisterForm)}>
        <fieldset>
          <legend>Account Details</legend>
          <label>
            Username
            <input
              type="text"
              {...register('username')}
              required
              aria-describedby={
                clientError.username?.message || error?.fieldErrors.username ? 'feedback-username' : undefined
              }
            />
          </label>
          {(error?.fieldErrors.username || clientError.username?.message) && (
            <p id="feedback-username">{error?.fieldErrors.username || clientError.username?.message}</p>
          )}
          <label>
            Password
            <input
              type="password"
              {...register('password')}
              required
              aria-describedby={
                clientError.password?.message || error?.fieldErrors.password ? 'feedback-password' : undefined
              }
            />
          </label>
          {(error?.fieldErrors.password || clientError.password?.message) && (
            <p id="feedback-password">{error?.fieldErrors.password || clientError.password?.message}</p>
          )}
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
