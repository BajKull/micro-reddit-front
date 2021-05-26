<template>
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <g id="cross">
      <line class="cls-1" x1="7" x2="25" y1="7" y2="25" />
      <line class="cls-1" x1="7" x2="25" y1="25" y2="7" />
    </g>
  </svg>
</template>

<script>
export default {
  name: "Close",
};
</script>

<style lang="scss">
#cross {
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2px;
}
</style>
