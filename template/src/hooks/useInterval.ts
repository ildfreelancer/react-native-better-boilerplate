import { useEffect, useRef } from 'react'

type IntervalFunction = () => unknown | void
export function useInterval(callback: IntervalFunction, delay: number | null) {
  const savedCallback = useRef(null)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback?.current?.()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay, savedCallback])
}

/*
How to use
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(() => {
    setCount(count + 1);
  }, isRunning ? delay : null);
*/
