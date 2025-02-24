<script setup lang="ts">
import { str2sd } from './utils'

const sd = '000079645600000000004306000170000052400125008950000036000408200000000001213560000'

const idx = [
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
</script>

<template>
  <sdk class="grid">
    <box v-for="box of idx" class="grid">
      <template v-for="item of box">
        <item v-if="sd[item] !== '0'">
          {{ sd[item] }}
        </item>
        <item v-else class="grid">
          <maybe v-for="maybe in 9">
            {{ maybe }}
          </maybe>
        </item>
      </template>
    </box>
  </sdk>
</template>

<style>
* {
  box-sizing: border-box;
  font-size: 10px;
}
#app {
  padding: 5px;
}
sdk {
  color: white;
  color: #eee;
  border: 3px solid currentColor;
}
sdk:hover {
  color: #eee;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  aspect-ratio: 1;
}
box {
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
