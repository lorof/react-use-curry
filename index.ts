import { useCallback, DependencyList } from 'react'

type Curried<A extends any[], R> = <P extends Partial<A>>(
  ...args: P
) => P extends A
  ? R
  : A extends [...SameLength<P>, ...infer S]
  ? S extends any[]
    ? Curried<S, R>
    : never
  : never

type SameLength<T extends any[]> = Extract<{ [K in keyof T]: any }, any[]>

const curry = <T extends any[], R>(fn: (...args: T) => R) => {
  return ((...fnArgs: T) => {
    let prevArgs: any[] = []

    const nextFn = (...args: T) => {
      prevArgs = prevArgs.concat(args)

      if (!fn.length) {
        return fn(...(prevArgs as T))
      }

      if (prevArgs.length >= fn.length) {
        return () => fn(...(prevArgs as T))
      }

      return nextFn
    }

    return nextFn(...fnArgs)
  }) as Curried<T, typeof fn extends (...args: undefined[]) => R ? R : () => R>
}

export const useCurry = <T extends any[], R>(
  fn: (...args: T) => R,
  deps: DependencyList
) => useCallback(curry(fn), deps)
