import { ref, computed, type ComputedRef, reactive } from 'vue'
import { chunkH, chunkL } from './utils'

const sd =
  new URLSearchParams(location.search).get('data') ||
  '000000000009041320000803046900000700700689002004000003670302000083570200000000000' // 空是0

const sd2 = ref(sd.split('').map(Number))

export function resolve(g: number, i: number, val: number) {
  sd2.value[gi2i[g][i]] = val
}

;(window as any).c = 0
//
const it08 = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const it19 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const gihl = it08
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

function gi2hl(g: number, i: number) {
  return gihl.find((e) => e.g === g && e.i === i)!
}

function hl2gi(h: number, l: number) {
  return gihl.find((e) => e.h === h && e.l === l)!
}

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

    const maybes = computed(() => {
      if (v.value !== 0) return []
      const _ = v2m([...getG(g), ...getH(h), ...getL(l)].map((e) => e.v.value))
      return _
    })

    const r2 = computed(() => {
      const Gm = getG(g).flatMap((e) => e.maybes.value)
      const Hm = getH(h).flatMap((e) => e.maybes.value)
      const Lm = getL(l).flatMap((e) => e.maybes.value)

      return maybes.value.find((m) => {
        return (
          Gm.filter((e) => e === m).length === 1 ||
          Hm.filter((e) => e === m).length === 1 ||
          Lm.filter((e) => e === m).length === 1
        )
      })
    }) as ComputedRef<number | undefined>

    const r3 = computed(() => {
      const results: number[] = []

      const 会影响段H = allH3
        .filter((e) => e[0].h === h)
        .filter((e) => e.every((ee) => ee.l !== l))
        .map((段) => [段, getG(段[0].g)])
      const 会影响段L = allL3
        .filter((e) => e[0].l === l)
        .filter((e) => e.every((ee) => ee.h !== h))
        .map((段) => [段, getG(段[0].g)])

      const 会影响段H内部 = allH3
        .filter((e) => e[0].g === g)
        .filter((e) => e.every((ee) => ee.h !== h))
        .map((段) => [段, getH(段[0].h)])
      const 会影响段L内部 = allL3
        .filter((e) => e[0].g === g)
        .filter((e) => e.every((ee) => ee.l !== l))
        .map((段) => [段, getL(段[0].l)])

      ;[...会影响段H, ...会影响段L, ...会影响段H内部, ...会影响段L内部]
        .map((e) => e.map((e) => e.flatMap((ee) => ee.maybes.value)))
        .forEach(([l, r]) => {
          maybes.value.forEach((m) => {
            const 段里的数字数量 = l.filter((e) => e === m).length
            const lhg里的数字数量 = r.filter((e) => e === m).length

            if (段里的数字数量 === lhg里的数字数量 && 段里的数字数量 >= 2) {
              results.push(m)
            }
          })
        })

      return results
    })

    return {
      g,
      i,
      h,
      l,

      v,
      maybes,
      r2,
      c: reactive({
        v,
        maybes,
        r2,
        get r3() {
          return r3.value
        },
      }),
    }
  })
})

type Item = (typeof allItem)[number][number]

const allH3 = allItem.map(chunkH).flat()
const allL3 = allItem.map(chunkL).flat()

function v2m(v: number[]) {
  return it19.filter((i) => !v.includes(i))
}

function getH(h: number) {
  ;(window as any).c++
  return it08.map((l) => {
    const { g, i } = hl2gi(h, l)
    return allItem[g][i]
  })
}

function getL(l: number) {
  return it08.map((h) => {
    const { g, i } = hl2gi(h, l)
    return allItem[g][i]
  })
}

function getG(g: number) {
  return allItem[g]
}
