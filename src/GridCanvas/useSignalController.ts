export type Signal<T> = {
  readonly value: T;
  subscribe: (fn: (value: T) => void) => () => void;
};

export type SignalController<T> = {
  signal: Signal<T>;
  update: (value: T) => void;
  dispose: () => void;
};

export const useSignalController = <T>(value: T): SignalController<T> => {
  const subscribers = new Set<(value: T) => void>();
  let disposed = false;
  let updating = false;

  const subscribe = (fn: (value: T) => void) => {
    if (disposed) {
      throw new Error("Signal is disposed");
    }

    subscribers.add(fn);

    return () => {
      subscribers.delete(fn);
    };
  };

  const update = (next: T) => {
    if (disposed) {
      throw new Error("Signal is disposed");
    }

    if (updating) {
      throw new Error("Signal is already updating");
    }

    if (value == next) {
      return;
    }

    updating = true;
    value = next;

    const subs = Array.from(subscribers);
    for (const fn of subs) {
      fn(value);
    }

    updating = false;
  };

  const signal: Signal<T> = {
    get value() {
      return value;
    },
    subscribe
  };

  const dispose = () => {
    disposed = true;
    subscribers.clear();
  };

  return {
    signal,
    update,
    dispose
  };
};
