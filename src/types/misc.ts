export type ID = number;

export type ItemUpdate<T> = Partial<T> & { id: ID };
export type ItemCreate<T> = Omit<T, 'id'>;