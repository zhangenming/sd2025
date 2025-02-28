import { items9G } from './App'

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
    return items9G[g][i]
  })
}

export function getL(l: number) {
  return it08.map((h) => {
    const { g, i } = hl2gi(h, l)
    return items9G[g][i]
  })
}

export function findSameElements(arr: number[][]) {
  // 用对象存储每个元素出现的索引
  const indexMap = {} as Record<string, number[]>

  // 遍历数组,记录每个元素的索引
  arr.forEach((num, idx) => {
    if (!indexMap[String(num)]) {
      indexMap[String(num)] = [idx]
    } else {
      indexMap[String(num)].push(idx)
    }
  })

  // 过滤出现次数超过1次的元素,并格式化输出
  const result = Object.entries(indexMap)
    .filter(([_, indices]) => indices.length > 1)
    .map(([val, idxs]) => ({
      sameVal: val.split(',').map(Number),
      idxs: idxs,
    }))

  return result
}
export function find元素分布<E>(arr: E[]) {
  // 用对象存储每个元素出现的索引
  const indexMap = new Map() as Map<E, number[]>

  // 遍历数组,记录每个元素的索引
  arr.forEach((e, idx) => {
    if (indexMap.get(e)) {
      indexMap.get(e)!.push(idx)
    } else {
      indexMap.set(e, [idx])
    }
  })

  return Object.groupBy(indexMap, ([k, v]) => (v as any).length as number)[2]?.map((e) => e[1])
}

export function 找到n者相同<E>(arr: E[], n: number, somerry = (a: E, b: E) => String(a) === String(b)) {
  const results = [] as E[][]

  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i]
    const find = results.find((e) => somerry(e[0], cur))
    if (find) {
      find.push(cur)
    } else {
      results.push([cur])
    }
  }

  return results.filter((e) => e.length === n).map((e) => e.map((e) => arr.indexOf(e)))
}

export function 去重<T>(arr: T[]) {
  return [...new Set(arr)]
}

export function 存在重复(arr: any[]) {
  return 去重(arr).length !== arr.length
}

// 判断数组里面的元素是否完全想等
export function 数组完全相等(arr1: any[], arr2: any[]) {
  for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}
