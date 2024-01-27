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
    if (key === 'Space') updateCount(count + 1)
    else if (key === 'KeyM') updateCount(count - 1)
    else if (key === 'Escape') updateCount(0)
  }

  return (
    <div className="flex items-center text-9xl font-bold text-white">
      <input
        className="w-60 appearance-none bg-transparent text-right caret-transparent focus:outline-none"
        id="inline-full-name"
        value={count}
        onKeyDown={handleKeyDown}
        readOnly
      />
      <label className="ml-10" htmlFor="inline-full-name">
        ツッコミ
      </label>
    </div>
  )
}

export default App
