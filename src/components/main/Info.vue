<script setup lang="ts">
import Fire from "../icons/Fire.vue";
import LeftInfo from "./LeftInfo.vue";
import RightInfo from "./RightInfo.vue";
</script>

<template>
  <div
    class="flex flex-col gap-5 w-full h-full items-center lg:flex-row lg:w-4/6"
  >
    <LeftInfo />

    <div
      class="fire-icon w-full items-center h-full flex lg:flex-col justify-center lg:items-center gap-5"
    >
      <Fire color="#FFF" />
    </div>

    <RightInfo />
  </div>
</template>

<style>
.fire-icon::before {
  content: "";
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgb(255, 255, 255) 100%
  );
  display: block;
  height: 2px;
  width: 40%;
  margin: 0px auto;
}

.fire-icon::after {
  content: "";
  background: linear-gradient(
    90deg,
    rgb(255, 255, 255) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  display: block;
  width: 40%;
  height: 2px;
}

@media only screen and (min-width: 1024px) {
  .fire-icon::before {
    content: "";
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgb(255, 255, 255) 100%
    );
    display: block;
    height: 10rem;
    width: 2px;
    margin: 0px auto;
  }

  .fire-icon::after {
    content: "";
    background: linear-gradient(
      180deg,
      rgb(255, 255, 255) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    display: block;
    width: 2px;
    height: 10rem;
  }
}
</style>
