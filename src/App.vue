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
            'bg-orange-200': c.maybe.length === 1,
          }"
          @click="
            () => {
              resolveV(g, i, c.resolveBasicV1)

              resolveV(g, i, c.resolveBasicV2)

              c.resolveM1.forEach((r) => {
                resolveM(g, i, r)
              })
            }
          "
        >
          <maybe
            v-for="maybe in c.maybe"
            :style="`grid-area: m${maybe}`"
            :class="{
              'text-black': hoverValue === maybe,
              'bg-orange-400': c.resolveBasicV2 === maybe,
              'bg-red-400': c.resolveM1.includes(maybe),
            }"
          >
            {{ maybe }}
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
