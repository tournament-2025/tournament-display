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

  const handleClick = (e: React.MouseEvent<HTMLInputElement>, x: number, y: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const posx = e.clientX - rect.left; // クリック位置のX座標（左からの距離）
    const posy = e.clientY - rect.top;  // クリック位置のY座標（上からの距離）
    let lineX = 0
    let lineY = 0

    const distances = {
      top: posy,
      bottom: rect.height - posy,
      left: posx,
      right: rect.width - posx,
    }
  
    const closest = Object.entries(distances).reduce((a, b) => (a[1] < b[1] ? a : b))[0]  

    switch (closest) {
      case "top":
      case "bottom":
        lineX = x - 1
        lineY = posy < rect.height / 2 ? y + 1 : y
        break;
      case "left":
      case "right":
        lineX = posx < rect.width / 2 ? x - 1 : x
        lineY = y
        break;    
    }

    console.log(`${lineX}-${lineY}`);
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
                style={{ width: 60, height: 100, boxSizing: 'border-box' }}
                onClick={(e: React.MouseEvent<HTMLInputElement>) => handleClick(e, j, parsedStructure.height - 1 - i)}
              />
            ))}
          </div>
        ))}
      </div>

    </div>
  )
}

export default Tournament 