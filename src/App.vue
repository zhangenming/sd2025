<script setup lang="ts">
import { allItem, resolveV, resolveM } from './App'
</script>

<template>
  <sdk class="grid">
    <gong v-for="(gong, g) of allItem" class="grid">
      <template v-for="({ c }, i) of gong">
        <item v-if="c.v !== 0">
          {{ c.v }}
        </item>
        <item
          v-else
          class="grid"
          :class="{
            'bg-orange-200': c.maybes.length === 1,
          }"
          @click="
            () => {
              if (c.maybes.length === 1) {
                resolveV(g, i, c.maybes[0])
              }
              if (c.r2) {
                resolveV(g, i, c.r2)
              }

              c.r3.forEach((r) => {
                resolveM(g, i, r)
              })
            }
          "
        >
          <maybe
            v-for="maybe in c.maybes"
            :style="`grid-area: m${maybe}`"
            :class="{
              // 'bg-orange-400': c.r2 === maybe,
              'bg-red-400': c.r3.includes(maybe),
            }"
          >
            {{ maybe }}
          </maybe>
        </item>
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
