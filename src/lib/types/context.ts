import type { Invalidator, Subscriber, Unsubscriber } from 'svelte/motion';

export type Context<T> = {
  set: (value: T) => void;
  update: (fn: (value: T) => T) => void;
  subscribe: (run: Subscriber<T>, invalidate?: Invalidator<T> | undefined) => Unsubscriber;
};
