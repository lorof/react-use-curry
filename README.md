# react-use-curry

## How to use it

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import useCurry from 'react-use-curry'

import useWaterCoolingStore from '...'
import './styles.css'

function Rothobot(props) {
  const waterCoolingStore = useWaterCoolingStore()

  const handleRap = useCurry(
    (name: string, vacuumCleaner: string) => {
      waterCoolingStore.drive(name, vacuumCleaner)
    },
    [waterCoolingStore]
  )

  return (
    <div className="App">
      {props.peopleFromRothobot.map((rothobotCitizen) => (
        <button
          key={rothobotCitizen.id}
          // onClick={handleRap(rothobotCitizen.name, rothobotCitizen.dog)}
          onClick={handleRap(rothobotCitizen.name)(rothobotCitizen.dog)}
        >
          click
        </button>
      ))}
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Rothobot />, rootElement)
```
