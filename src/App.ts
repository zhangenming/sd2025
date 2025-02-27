import { ref, computed, type ComputedRef, reactive, effect } from 'vue'
import { chunkH, countLen, findSameElements, getH, getL, gi2hl, it08, v2m, 去重 } from './utils'

const sd =
  new URLSearchParams(location.search).get('data') ||
  '000680200100004030054000000080200007010040020900001060000000580090400006003078000' // 空是0

const sd2 = ref(sd.split('').map(Number))

export function resolveV(g: number, i: number, v: number | false | undefined) {
  if (!v) return
  sd2.value[gi2i[g][i]] = v
}
export function resolveM(g: number, i: number, m: number) {
  if (!m) return
  allItem[g][i].lockedMaybe.value.push(m)
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
export const allItem = it08.map((g) => {
  return it08.map((i) => {
    const { h, l } = gi2hl(g, i)
    const idx = `${g}-${i}`

    const v = computed(() => {
      return sd2.value[gi2i[g][i]]
    })

    const maybe = computed(() => {
      if (v.value !== 0) return []

      const 所有看见的数字 = [...items9G[g], ...items9H[h], ...items9L[l]].map((e) => e.v.value)
      return v2m(所有看见的数字).filter((m) => !lockedMaybe.value.includes(m))
    }) as ComputedRef<number[]>

    const lockedMaybe = ref<number[]>([])

    //
    //
    // 解题逻辑
    // 现在有个问题 sdk的解题逻辑和 vue的.value逻辑混合到了一起
    //
    //

    // 这个item只有一个m (这个item里 只能填这个m)
    const resolveBasicV1 = computed(() => {
      return maybe.value.length === 1 && maybe.value[0]
    })

    // 这个item里的maybe 其中一个m只能填在这个item (这个m 只能填到这个item)
    const resolveBasicV2 = computed(() => {
      const Gm = maybesG[g].value
      const Hm = maybesH[h].value
      const Lm = maybesL[l].value

      return maybe.value.find((m) => {
        return countLen(Gm, m) === 1 || countLen(Hm, m) === 1 || countLen(Lm, m) === 1
      })
    }) as ComputedRef<number | undefined>

    // 只看一个数
    const resolveM1 = computed(() => {
      // 会有多种方案同时排除一个m
      const results: number[] = []

      const 影响段H宫外 = items3H
        .filter(同行)
        .filter(过滤掉含有本格的items3)
        .map((段) => [getMaybesFlat_v(段), maybesG[段[0].g].value])
      const 影响段L宫外 = items3L
        .filter(同列)
        .filter(过滤掉含有本格的items3)
        .map((段) => [getMaybesFlat_v(段), maybesG[段[0].g].value])
      const 影响段H宫内 = items3H
        .filter(同宫)
        .filter(过滤掉含有本格的items3)
        .map((段) => [getMaybesFlat_v(段), maybesH[段[0].h].value])
      const 影响段L宫内 = items3L
        .filter(同宫)
        .filter(过滤掉含有本格的items3)
        .map((段) => [getMaybesFlat_v(段), maybesL[段[0].l].value])

      ;[...影响段H宫外, ...影响段L宫外, ...影响段H宫内, ...影响段L宫内].forEach(([l, r]) => {
        maybe.value.forEach((m) => {
          const 段len = countLen(l, m)
          const XLen = countLen(r, m)

          if (段len === XLen && 段len >= 2) {
            results.push(m)
          }
        })
      })

      return results

      function 过滤掉含有本格的items3(items: Item[]) {
        return items.every((e) => e.idx !== idx)
      }
    })

    //todo 宫行列的maybes
    const resolveM2 = computed(() => {
      const results: number[] = []

      const helper = (当前ghl: Item[]) =>
        findSameElements(getMaybes_v(当前ghl.filter(过滤掉本格).filter(得到m长度为2的格)))

      ;[...helper(items9G[g]), ...helper(items9H[h]), ...helper(items9L[l])].forEach((e) => {
        maybe.value.forEach((m) => {
          if (e.sameVal.includes(m)) {
            results.push(m)
          }
        })
      })

      return results
    }) as ComputedRef<number[]>

    return {
      idx,
      g,
      i,
      h,
      l,

      v,
      maybe,
      lockedMaybe,

      c: reactive({
        v,
        maybe,
        resolveBasicV1,
        resolveBasicV2,
        resolveM1,
        resolveM2,
      }),
    }

    function 过滤掉本格(item: Item) {
      return !(item.idx === idx)
    }
    function 得到含m的格(m: number) {
      return (item: Item) => item.maybe.value.includes(m)
    }
    function 得到m长度为2的格(item: Item) {
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

type Item = (typeof allItem)[number][number]

function getMaybes_v(items: Item[]) {
  return items.map((e) => e.maybe.value)
}
function getMaybesFlat_v(items: Item[]) {
  return getMaybes_v(items).flat()
}

const items9G = allItem
const items9H = it08.map(getH)
const items9L = it08.map(getL)

const items3H = items9H.map(chunkH).flat()
const items3L = items9L.map(chunkH).flat()

const maybesG = items9G.map((g) => {
  return computed(() => getMaybesFlat_v(g))
})
const maybesH = items9H.map((h) => {
  return computed(() => getMaybesFlat_v(h))
})
const maybesL = items9L.map((l) => {
  return computed(() => getMaybesFlat_v(l))
})

// 错误监测
effect(() => {
  ;[...items9G, ...items9H, ...items9L].forEach((x) => {
    // 检测ghl数字是否冲突
    const allV = x.map((e) => e.v.value).filter((e) => e !== 0)
    if (allV.length !== 去重(allV).length) {
      console.log(1, allV)
    }

    // 检测是不是某个数没有位置
    const 剩余位置 = 9 - allV.length
    const 需要位置 = 去重(getMaybesFlat_v(x)).length
    if (剩余位置 !== 需要位置) {
      console.log(2, 剩余位置, 需要位置)
    }
  })
})
