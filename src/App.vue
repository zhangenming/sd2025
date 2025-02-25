<script setup lang="ts">
const sd = '000079645600000000004306000170000052400125008950000036000408200000000001213560000' // 空是0
const sd2 = sd.split('').map(Number)

//
const it08 = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const it19 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const gi2hl = it08.map((gong) => {
  return it08.map((item) => {
    const h = Math.floor(gong / 3) * 3 + Math.floor(item / 3)
    const l = (gong % 3) * 3 + (item % 3)
    return {
      h,
      l,
    }
  })
})

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

const allItem = it08.map((g) => {
  return it08.map((i) => {
    const { h, l } = gi2hl[g][i]
    return {
      g,
      h,
      l,

      // dom
      get G() {
        return getG(g)
      },
      get H() {
        return getH(h)
      },
      get L() {
        return getL(l)
      },
      get ALL() {
        return [...this.H, ...this.L, ...this.G]
      },

      // maybes
      get Gm() {
        return this.G.flatMap((e) => e.maybes)
      },
      get Hm() {
        return this.H.flatMap((e) => e.maybes)
      },
      get Lm() {
        return this.L.flatMap((e) => e.maybes)
      },

      // 二选一
      v: sd2[gi2i[g][i]],
      get maybes() {
        if (this.v !== 0) return []

        return v2m(this.ALL.map((e) => e.v))
      },

      get r2() {
        return this.maybes.find((m) => {
          const g = () => this.Gm.filter((e) => e === m).length === 1
          const h = () => this.Hm.filter((e) => e === m).length === 1
          const l = () => this.Lm.filter((e) => e === m).length === 1
          return g() || h() || l()
        })
      },
    }
  })
})

const allItemFlat = allItem.flat()

console.log(allItem)

function v2m(v: number[]) {
  return it19.filter((i) => !v.includes(i))
}

function getH(h: number): {
  v: number
  g: number
  h: number
  l: number
  readonly maybes: number[]
}[] {
  return allItemFlat.filter((item) => item.h === h)
}

function getL(l: number): {
  v: number
  g: number
  h: number
  l: number
  readonly maybes: number[]
}[] {
  return allItemFlat.filter((item) => item.l === l)
}

function getG(g: number): {
  v: number
  g: number
  h: number
  l: number
  readonly maybes: number[]
}[] {
  return allItem[g]
}
</script>

<template>
  <sdk class="grid">
    <gong v-for="gong of allItem" class="grid">
      <template v-for="item of gong">
        <item v-if="item.v !== 0">
          {{ item.v }}
        </item>
        <item
          v-else
          class="grid"
          :class="{
            'bg-orange-200': item.maybes.length === 1,
          }"
        >
          <maybe
            v-for="maybe in item.maybes"
            :style="`grid-area: m${maybe}`"
            :class="{
              'bg-orange-500': item.r2 === maybe,
            }"
          >
            {{ maybe }}
          </maybe>
        </item>
      </template>
    </gong>
  </sdk>

  <sdk class="grid">
    <gong v-for="gong of allItem" class="grid">
      <template v-for="item of gong">
        <item v-if="1"> {{ item.v ? `[${item.v}]` : item.r2 }}</item>
      </template>
    </gong>
  </sdk>
</template>

<style>
* {
  box-sizing: border-box;
  font-size: 10px;
}
#app {
  color: #eee;
  padding: 5px;
  opacity: 0;
}
#app:hover {
  opacity: 1;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
    'm1 m2 m3'
    'm4 m5 m6'
    'm7 m8 m9';
  width: 100%;
  aspect-ratio: 1;
}
sdk {
  border: 3px solid currentColor;
}
gong {
  border: 2px solid currentColor;
}
item {
  border: 1px solid currentColor;
  font-size: 5vw;
}

item,
maybe {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
