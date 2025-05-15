import { FunctionComponent } from "react"
import { structure, generateStyles, generateStyles2 } from "./lib"

interface tournamentType {
  data: string
  structure: string
}

interface result {
  matchs: unknown[]
}

const Tournament: FunctionComponent<tournamentType> = (props) => {
  let parsedStructure: structure = { width: 0, height: 0, matchs: [] }
  let resultData: result = { matchs: [] }

  try {
    parsedStructure = JSON.parse(props.structure)
    resultData = JSON.parse(props.data)
  } catch (e) {
    console.error('JSON.parse error')
  }

  return (
    <div>
      <style>{`
      
      [class^="cell-${0}-"], [class^="cell-${parsedStructure.width + 1}-"] {
        width: 10px !important;
      }

      ${generateStyles2(parsedStructure)}
      ${generateStyles(parsedStructure, resultData)}

      `}</style>

      <div className='wrap'>
        {[...Array(parsedStructure.height)].map((_, i) => (
          <div className='row' style={{ display: 'flex' }}>
            {[...Array(parsedStructure.width + 2)].map((_, j) => (
              <div
                className={
                  `cell-${j}-${parsedStructure.height - 1 - i}`
                  } //x, y
                style={{ width: 30, height: 50, boxSizing: 'border-box' }}
              />
            ))}
          </div>
        ))}
      </div>

    </div>
  )
}

export default Tournament 