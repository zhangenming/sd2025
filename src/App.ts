import { ref, computed, type ComputedRef, reactive, effect } from 'vue'
import { chunkH, chunkL, countLen, findSameElements, getH, getL, gi2hl, it08, v2m } from './utils'

const sd =
  new URLSearchParams(location.search).get('data') ||
  '000000000009041320000803046900000700700689002004000003670302000083570200000000000' // 空是0

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

    const v = computed(() => {
      return sd2.value[gi2i[g][i]]
    })

    const maybe = computed(() => {
      if (v.value !== 0) return []
      const 所有看见的数字 = [...allG[g], ...allH[h], ...allL[l]].map((e) => e.v.value)
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
      // todo fix
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

      const 会影响段H = allH3
        .filter((e) => e[0].h === h)
        .filter((e) => e.every((ee) => ee.l !== l))
        .map((段) => [段, allG[段[0].g]])
      const 会影响段L = allL3
        .filter((e) => e[0].l === l)
        .filter((e) => e.every((ee) => ee.h !== h))
        .map((段) => [段, allG[段[0].g]])

      const 会影响段H内部 = allH3
        .filter((e) => e[0].g === g)
        .filter((e) => e.every((ee) => ee.h !== h))
        .map((段) => [段, allH[段[0].h]])
      const 会影响段L内部 = allL3
        .filter((e) => e[0].g === g)
        .filter((e) => e.every((ee) => ee.l !== l))
        .map((段) => [段, allL[段[0].l]])

      ;[...会影响段H, ...会影响段L, ...会影响段H内部, ...会影响段L内部]
        .map((e) => e.map(getMaybes_v))
        .forEach(([l, r]) => {
          maybe.value.forEach((m) => {
            const 段len = countLen(l, m)
            const lhgLen = countLen(r, m)

            if (段len === lhgLen && 段len >= 2) {
              results.push(m)
            }
          })
        })

      return results
    })

    //todo 宫行列的maybes
    const resolveM2 = computed(() => {
      const results: number[] = []

      const itemsG = findSameElements(
        allG[g]
          .filter(过滤掉本格)
          .filter(得到m长度为2的格)
          .map((e) => e.maybe.value)
      )

      const itemsH = findSameElements(
        allH[h]
          .filter(过滤掉本格)
          .filter(得到m长度为2的格)
          .map((e) => e.maybe.value)
      )

      const itemsL = findSameElements(
        allL[l]
          .filter(过滤掉本格)
          .filter(得到m长度为2的格)
          .map((e) => e.maybe.value)
      )

      ;[...itemsG, ...itemsH, ...itemsL].forEach((e) => {
        maybe.value.forEach((m) => {
          if (e.sameVal.includes(m)) {
            results.push(m)
          }
        })
      })

      return results
    }) as ComputedRef<number[]>

    return {
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
      return !(item.g === g && item.i === i)
    }
    function 得到含m的格(m: number) {
      return (item: Item) => item.maybe.value.includes(m)
    }
    function 得到m长度为2的格(item: Item) {
      return item.maybe.value.length === 2
    }
  })
})

type Item = (typeof allItem)[number][number]

function getMaybes_v(items: Item[]) {
  return items.map((e) => e.maybe.value).flat()
}

const allH3 = allItem.map(chunkH).flat()
const allL3 = allItem.map(chunkL).flat()

const allG = allItem
const allH = it08.map(getH)
const allL = it08.map(getL)

const maybesG = allG.map((g) => {
  return computed(() => getMaybes_v(g))
})
const maybesH = allH.map((h) => {
  return computed(() => getMaybes_v(h))
})
const maybesL = allL.map((l) => {
  return computed(() => getMaybes_v(l))
})

effect(() => {
  maybesG.forEach((g) => {})
})
