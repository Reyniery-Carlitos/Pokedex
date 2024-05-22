<script setup lang="ts">
import Fire from "../icons/Fire.vue";
import LeftInfo from "./LeftInfo.vue";
import RightInfo from "./RightInfo.vue";
</script>

<template>
  <div class="flex h-full items-center">
    <LeftInfo />

    <div class="fire-icon h-full flex flex-col justify-center gap-5">
      <Fire color="#FFF" />
    </div>

    <RightInfo />
  </div>
</template>

<style>
.fire-icon::before {
  content: "";
  flex-direction: column;
  background: linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgb(255, 255, 255) 100%
  );
  display: block;
  width: 1px;
  height: 40%;
  margin: 0px auto;
}

.fire-icon::after {
  content: "";
  flex-direction: column;
  background: linear-gradient(
    rgb(255, 255, 255) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  display: block;
  width: 1px;
  height: 40%;
  margin: 0px auto;
}
</style>
