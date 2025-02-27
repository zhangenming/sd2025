<script setup lang="ts">
import { ref } from 'vue'
import { allItem, resolveV, resolveM } from './App'

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
    <gong v-for="(gong, g) of allItem" class="grid">
      <template v-for="({ c }, i) of gong">
        <item v-if="c.v !== 0" :class="{ 'text-black': hoverValue === c.v }">
          {{ c.v }}
        </item>

        <item
          v-else
          class="grid"
          :class="{
            // 出错判断1
            'bg-red-600': c.maybe.length === 0,
          }"
          @click="
            () => {
              resolveV(g, i, c.resolveBasicV1)

              resolveV(g, i, c.resolveBasicV2)

              c.resolveM1.forEach((r) => {
                resolveM(g, i, r)
              })
              c.resolveM2.forEach((r) => {
                resolveM(g, i, r)
              })
            }
          "
        >
          <maybe
            v-for="maybe in c.maybe"
            :style="`grid-area: m${maybe}`"
            :class="{
              // hover
              'text-black': hoverValue === maybe,

              // 基本解
              'bg-blue-200': c.resolveBasicV1 === maybe,
              'bg-blue-400': c.resolveBasicV2 === maybe,

              // 排除解
              'bg-red-200': c.resolveM1.includes(maybe),
              'bg-red-600': c.resolveM2.includes(maybe),
            }"
          >
            {{ maybe }}
          </maybe>
        </item>
      </template>
    </gong>
  </div>

  <!-- test -->
  <div class="grid sdk">
    <gong v-for="(gong, g) of allItem" class="grid">
      <template v-for="({ c }, i) of gong">
        <item :title="c.resolveM3">
          {{ c.resolveM3 }}
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
