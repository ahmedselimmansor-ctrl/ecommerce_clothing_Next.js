'use server';

import bcrypt from 'bcryptjs';
import { prisma } from '@/core/lib/prisma';
import { registerSchema, signInSchema, RegisterInput, SignInInput } from '../domain/user.schema';
import { signIn, signOut } from '../infrastructure/auth';

export async function registerUserAction(input: RegisterInput) {
  const validated = registerSchema.safeParse(input);
  if (!validated.success) {
    return { error: 'Invalid input fields.', details: validated.error.flatten().fieldErrors };
  }

  const { name, email, password } = validated.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: 'Email already registered.' };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return { success: true };
  } catch (error) {
    return { error: 'An error occurred during registration. Please try again.' };
  }
}

export async function loginUserAction(input: SignInInput) {
  const validated = signInSchema.safeParse(input);
  if (!validated.success) {
    return { error: 'Invalid input fields.' };
  }

  const { email, password } = validated.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error: any) {
    return { error: 'Invalid email or password.' };
  }
}

export async function logoutAction() {
  await signOut({ redirect: true, redirectTo: '/' });
}
