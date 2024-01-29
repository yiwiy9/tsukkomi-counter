import { FC, KeyboardEvent } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CounterState = {
  count: number
  updateCount: (count: number) => void
}

const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      updateCount: (count) => set(() => ({ count: count })),
    }),
    { name: 'tsukkomi-storage' },
  ),
)

const App: FC = () => {
  const { count, updateCount } = useCounterStore()

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const key = e.code
    if (key === 'Space' || key === 'KeyN') updateCount(count + 1)
    else if (key === 'KeyB') updateCount(count + 10)
    else if (key === 'KeyV') updateCount(count + 100)
    else if (key === 'KeyM') updateCount(count - 1)
    else if (key === 'Comma') updateCount(count - 10)
    else if (key === 'Period') updateCount(count - 100)
    else if (key === 'Escape') updateCount(0)
  }

  return (
    <div className="flex items-center text-9xl font-bold text-white">
      <input
        className="w-80 appearance-none bg-transparent text-right caret-transparent focus:outline-none"
        id="inline-full-name"
        value={count}
        onKeyDown={handleKeyDown}
        readOnly
      />
      <label className="ml-5" htmlFor="inline-full-name">
        ツッコミ
      </label>
    </div>
  )
}

export default App
