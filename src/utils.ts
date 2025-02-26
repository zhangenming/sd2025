export function str2sd(sd: string) {
  const SD: number[][] = []
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (j === 0) {
        SD.push([])
      }
      SD[i].push(Number(sd[i * 9 + j]))
    }
  }
  return SD
}

export function chunkH<T>(arr: T[]) {
  const result = Array(3)
    .fill(0)
    .map(() => []) as T[][]

  for (let i = 0; i < arr.length; i++) {
    const x = Math.floor(i / 3)
    const y = i % 3
    result[x][y] = arr[i]
  }
  return result
}

export function chunkL<T>(arr: T[]) {
  const result = Array(3)
    .fill(0)
    .map(() => []) as T[][]

  for (let i = 0; i < arr.length; i++) {
    const x = Math.floor(i / 3)
    const y = i % 3
    result[y][x] = arr[i]
  }
  return result
}
