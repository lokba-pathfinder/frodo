export interface PropsWithClassName {
  className?: string;
}

export const isObjectType = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;
