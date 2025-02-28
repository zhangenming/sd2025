import { ref, computed, type ComputedRef, effect } from 'vue'
import { chunkH, getH, getL, gi2hl, it08, v2m, 去重, 存在重复, 找到n者相同, 数组完全相等 } from './utils'

const sd =
  new URLSearchParams(location.search).get('data') ||
  '000680200100004030054000000080200007010040020900001060000000580090400006003078000' // 空是0

const sd2 = ref(sd.split('').map(Number))

export function resolveV(g: number, i: number, v: number) {
  sd2.value[gi2i[g][i]] = v
  // items9G[g][i].lockedMaybe.value = [1, 2, 3, 4, 5, 6, 7, 8, 9]
}
export function resolveM(g: number, i: number, m: number) {
  items9G[g][i].lockedMaybe.value.push(m)
}

;(window as any).c = 0

const gi2i = [
  [0, 1, 2, 9, 10, 11, 18, 19, 20],
  [3, 4, 5, 12, 13, 14, 21, 22, 23],
  [6, 7, 8, 15, 16, 17, 24, 25, 26],
  [0 + 27, 1 + 27, 2 + 27, 9 + 27, 10 + 27, 11 + 27, 18 + 27, 19 + 27, 20 + 27],
  [3 + 27, 4 + 27, 5 + 27, 12 + 27, 13 + 27, 14 + 27, 21 + 27, 22 + 27, 23 + 27],
  [6 + 27, 7 + 27, 8 + 27, 15 + 27, 16 + 27, 17 + 27, 24 + 27, 25 + 27, 26 + 27],
  [0 + 54, 1 + 54, 2 + 54, 9 + 54, 10 + 54, 11 + 54, 18 + 54, 19 + 54, 20 + 54],
  [3 + 54, 4 + 54, 5 + 54, 12 + 54, 13 + 54, 14 + 54, 21 + 54, 22 + 54, 23 + 54],
  [6 + 54, 7 + 54, 8 + 54, 15 + 54, 16 + 54, 17 + 54, 24 + 54, 25 + 54, 26 + 54],
]
export const items9G = it08.map((g) => {
  return it08.map((i) => {
    const { h, l } = gi2hl(g, i)
    const idx = `${h}-${l}`

    const v = computed(() => {
      return sd2.value[gi2i[g][i]]
    })

    const maybe = computed(() => {
      if (v.value) return []

      const 当前g = getItems(9, 'g', g)
      const 当前h = getItems(9, 'h', h)
      const 当前l = getItems(9, 'l', l)

      const 影响段H宫外_2 = items3H.filter(同行).filter(去掉含有本格的items3)
      const 影响段L宫外_2 = items3L.filter(同列).filter(去掉含有本格的items3)
      const 影响段H宫内_2 = items3H.filter(同宫).filter(去掉含有本格的items3)
      const 影响段L宫内_2 = items3L.filter(同宫).filter(去掉含有本格的items3)

      const 所有看见的数字 = [...当前g, ...当前h, ...当前l].map((e) => e.v.value)
      const maybe = v2m(所有看见的数字).filter((m) => !lockedMaybe.value.includes(m))

      return maybe.map((m) => {
        return {
          m,
          b1: maybe.length === 1,
          b2: () => {
            return helper(当前g) || helper(当前h) || helper(当前l)

            function helper(items: Item[]) {
              return items.filter(得到含m的格_v(m)).length === 1
            }
          },

          //
          //
          //
          m1() {
            return (
              helper(影响段H宫外_2, 'g') ||
              helper(影响段L宫外_2, 'g') ||
              helper(影响段H宫内_2, 'h') ||
              helper(影响段L宫内_2, 'l')
            )
            function helper(items3_2: Item[][], k: 'h' | 'l' | 'g') {
              return items3_2.some((l) => {
                const r = getItems(9, k, l[0][k])
                const L = l.filter(得到含m的格_v(m)).length
                const R = r.filter(得到含m的格_v(m)).length
                return (L === 2 && R === 2) || (L === 3 && R === 3)
              })
            }
          },

          //
          m2() {
            let 数对g = [] as { 数字: number; idx: string[] }[]
            当前h
              // .filter(去掉本格)
              .forEach((item, i) => {
                item.maybe.value.forEach(({ m }) => {
                  const t = 数对g.find((e) => e.数字 === m)
                  if (t) {
                    t.idx.push(item.idx)
                  } else {
                    数对g.push({ 数字: m, idx: [item.idx] })
                  }
                })
              })

            const n = 2

            const 数对g2 = 数对g.filter((e) => e.idx.length === n)

            const 数对g3 = 数对g2.map((e) => e.idx)

            const 相同对s = 找到n者相同(数对g3, n)

            相同对s.forEach((l, r) => {})

            return [数对g2, 数对g3, 相同对s]
          },
          m22() {
            return helper(当前g) || helper(当前h) || helper(当前l)

            function helper(items: Item[]) {
              return items
                .filter(去掉本格)
                .filter((item) => item.maybe.value.length === 2)
                .some((item, idx, arr) => {
                  return arr
                    .find((item2, idx2) => {
                      return (
                        idx2 > idx &&
                        数组完全相等(
                          item.maybe.value.map((e) => e.m),
                          item2.maybe.value.map((e) => e.m)
                        )
                      )
                    })
                    ?.maybe.value.map((mb) => mb.m)
                    .includes(m)
                })
            }
          },
        }
      })
    }) as ComputedRef<
      {
        m: number
        b1: boolean
        b2(): boolean
        m1(): boolean
        m2(): any
      }[]
    >

    const lockedMaybe = ref<number[]>([])

    return {
      idx,
      g,
      i,
      h,
      l,

      v,
      maybe,
      lockedMaybe,
    }

    function 去掉本格(item: Item) {
      return !(item.idx === idx)
    }
    function 去掉含有本格的items3(items: Item[]) {
      return items.every((e) => e.idx !== idx)
    }
    function 得到含m的格_v(m: number) {
      return (item: Item) => item.maybe.value.map((e) => e.m).includes(m)
    }
    function 得到m长度为2的格_v(item: Item) {
      return item.maybe.value.length === 2
    }

    function 同行(items: Item[]) {
      return items[0].h === h
    }
    function 同列(items: Item[]) {
      return items[0].l === l
    }
    function 同宫(items: Item[]) {
      return items[0].g === g
    }
  })
})

type Item = (typeof items9G)[number][number]

const items9H = it08.map(getH)
const items9L = it08.map(getL)

const items3H = items9H.map(chunkH).flat()
const items3L = items9L.map(chunkH).flat()

function getItems(type: 3 | 9, ghl: 'g' | 'h' | 'l', n: number): Item[] {
  if (type === 3) {
    if (ghl === 'g') {
      return items3H[n] //todo
    }
    if (ghl === 'h') {
      return items3H[n]
    }
    return items3L[n]
  } else {
    if (ghl === 'g') {
      return items9G[n]
    }
    if (ghl === 'h') {
      return items9H[n]
    }
    return items9L[n]
  }
}

const maybesG = items9G.map((g) => {
  return computed(() => getMaybesFlat_v(g))
})
const maybesH = items9H.map((h) => {
  return computed(() => getMaybesFlat_v(h))
})
const maybesL = items9L.map((l) => {
  return computed(() => getMaybesFlat_v(l))
})

function getMaybes_v(items: Item[]) {
  return items.map((e) => e.maybe.value.map((e) => e.m))
}
function getMaybesFlat_v(items: Item[]) {
  return getMaybes_v(items).flat()
}

// 错误监测
effect(() => {
  ;[...items9G, ...items9H, ...items9L].forEach((x) => {
    // 检测ghl数字是否冲突
    const allV = x.map((e) => e.v.value).filter((e) => e !== 0)
    if (存在重复(allV)) {
      console.log(1, allV)
    }

    // 检测是不是某个数没有位置
    const 剩余位置 = 9 - allV.length
    const 需要位置 = 去重(getMaybesFlat_v(x)).length
    if (剩余位置 !== 需要位置) {
      console.log(2, 剩余位置, 需要位置)
      const q = items9G.indexOf(x)
      if (q !== -1) {
        console.log('g', q)
      }

      const q2 = items9H.indexOf(x)
      if (q2 !== -1) {
        console.log('h', q2)
      }
      const q3 = items9L.indexOf(x)
      if (q3 !== -1) {
        console.log('l', q3)
      }
    }
  })
})
