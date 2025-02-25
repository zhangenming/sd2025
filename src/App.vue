<script setup lang="ts">
import { allItem, resolve } from './App'
</script>

<template>
  <sdk class="grid">
    <gong v-for="(gong, g) of allItem" class="grid">
      <template v-for="(item, i) of gong">
        <item v-if="item.v !== 0">
          {{ item.v }}
        </item>
        <item
          v-else
          class="grid"
          :class="{
            'bg-orange-200': item.maybes.length === 1,
          }"
          @click="
            () => {
              if (item.maybes.length === 1) {
                resolve(g, i, item.maybes[0])
              }
              if (item.r2) {
                resolve(g, i, item.r2)
              }
            }
          "
        >
          <maybe
            v-for="maybe in item.maybes"
            :style="`grid-area: m${maybe}`"
            :class="{
              'bg-orange-400': item.r2 === maybe,
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
