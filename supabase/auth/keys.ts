export const keys = {
  all: ['auth'] as const,
  session: () => [...keys.all, 'session'] as const,
  setupUser: () => [...keys.all, 'setupUser'] as const,
} as const;