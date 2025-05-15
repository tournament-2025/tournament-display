export interface structure {
  width: number;
  height: number;
  matchs: {
    upper: {
      x: [number, number][];
      y: [number, number][];
    };
    lower: {
      x: [number, number][];
      y: [number, number][];
    };
  }[];
}

const createStyle = (d: [number, number][], direction: "x" | "y", color: string) => {
  return d.map(([row, col]) => {
    switch (direction) {
      case 'x':
        return `
            .cell-${row}-${col} {
              border-right: 3px solid ${color}; 
            }
            /* .cell-${row + 1}-${col} {
              border-left: 1px solid ${color};
            } */
          `;
      case 'y':
        return `
            .cell-${row + 1}-${col - 1} {
              border-top: 3px solid ${color}; 
            }
            /* .cell-${row + 1}-${col} {
              border-bottom: 1px solid ${color};
            } */
          `;
      default:
        return '';
    }
  }).join('\n');
}

// @ts-expect-error idk
export const generateStyles = (parsedStructure: structure, result): string =>
  parsedStructure.matchs
    .map((match, i) => {
      const judge = judgeResult(result.matchs[i])
      const upper = createStyle(match.upper.x, 'x', 'red') + '\n' + createStyle(match.upper.y, 'y', 'red')
      const lower = createStyle(match.lower.x, 'x', 'red') + '\n' + createStyle(match.lower.y, 'y', 'red')
      return judge == 'u' ? upper : lower
    })
    .join('\n');

// @ts-expect-error idk
const judgeResult = (result) => {
  return result.upper > result.lower ? 'u' : 'l'
}

const allXY = (data: structure) => {
  const allX = data.matchs.flatMap(m => [...m.upper.x, ...m.lower.x])
  const allY = data.matchs.flatMap(m => [...m.upper.y, ...m.lower.y])
  return { x: allX, y: allY }
}

export const generateStyles2 = (parsedStructure: structure): string => {
  const XYall = allXY(parsedStructure)
  const x = createStyle(XYall.x, 'x', 'gray')
  const y = createStyle(XYall.y, 'y', 'gray')
  return x + '\n' + y
}