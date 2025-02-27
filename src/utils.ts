import { allItem } from './App'

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

// 数组含有某元素的数量
export function countLen<T>(arr: T[], value: T) {
  return arr.filter((e) => e === value).length
}

//
export const it08 = [0, 1, 2, 3, 4, 5, 6, 7, 8]
export const it19 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export const gihl = it08
  .map((g) => {
    return it08.map((i) => {
      const h = Math.floor(g / 3) * 3 + Math.floor(i / 3)
      const l = (g % 3) * 3 + (i % 3)
      return {
        g,
        i,
        h,
        l,
      }
    })
  })
  .flat()

export function gi2hl(g: number, i: number) {
  return gihl.find((e) => e.g === g && e.i === i)!
}

export function hl2gi(h: number, l: number) {
  return gihl.find((e) => e.h === h && e.l === l)!
}

export function v2m(v: number[]) {
  return it19.filter((i) => !v.includes(i))
}

export function getH(h: number) {
  ;(window as any).c++
  return it08.map((l) => {
    const { g, i } = hl2gi(h, l)
    return allItem[g][i]
  })
}

export function getL(l: number) {
  return it08.map((h) => {
    const { g, i } = hl2gi(h, l)
    return allItem[g][i]
  })
}

export function getG(g: number) {
  return allItem[g]
}
