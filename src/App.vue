<script setup lang="ts">
import { ref } from 'vue'
import { items9G, resolveV, resolveM } from './App'

const hoverValue = ref(0)
</script>

<template>
  <div
    class="grid sdk"
    @mouseover="
      (e: any) => {
        if (e.target.innerText.length === 1) {
          hoverValue = Number(e.target.innerText)
        }
      }
    "
  >
    <gong v-for="(gong, g) of items9G" class="grid">
      <template v-for="({ v, maybe }, i) of gong">
        <item v-if="v.value !== 0" :class="{ 'text-black': hoverValue === v.value }">
          {{ v.value }}
        </item>

        <item
          v-else
          class="grid"
          :class="{
            // 出错判断1
            'bg-red-600': maybe.value.length === 0,
          }"
          @click="
            () => {
              // resolveM1.value.forEach((r) => {
              //   resolveM(g, i, r)
              // })
              // resolveM2.value.forEach((r) => {
              //   resolveM(g, i, r)
              // })
            }
          "
        >
          <maybe
            v-for="mb of maybe.value"
            :style="`grid-area: m${mb.m}`"
            :class="{
              // hover
              'text-black': hoverValue === mb.m,

              // 基本解
              'bg-blue-200': mb.b1,
              'bg-blue-400': mb.b2(),

              // // 排除解
              'bg-red-200': mb.m1(),
              // 'bg-red-600': mb.m2(),
            }"
            @click="
              () => {
                // if (mb.b1 || mb.b2()) {
                //   resolveV(g, i, mb.m)
                // }
                // if (mb.m1() || mb.m2()) {
                //   resolveM(g, i, mb.m)
                // }
                console.log(mb.m2())
              }
            "
          >
            {{ mb.m }}
          </maybe>
        </item>
      </template>
    </gong>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  font-size: 10px;
}
#app {
  color: #eee;
  padding: 5px;
  padding-top: 30px;
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
.sdk {
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
