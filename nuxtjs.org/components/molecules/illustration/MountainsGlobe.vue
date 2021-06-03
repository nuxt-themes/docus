<template>
  <svg id="Duotone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 112">
    <path
      class="cls-2"
      d="M39.84,31.44a2.85,2.85,0,0,0-1,.2,4.75,4.75,0,0,0-9.39,0,2.86,2.86,0,1,0-1,5.53H39.84a2.86,2.86,0,0,0,0-5.73Z"
    />
    <path
      class="cls-2 cls-2-right"
      d="M81.35,38.35a2.84,2.84,0,0,0-1,.2,4.75,4.75,0,0,0-9.39,0,2.86,2.86,0,1,0-1,5.53H81.35a2.86,2.86,0,0,0,0-5.73Z"
    />
    <path
      class="cls-3"
      d="M46.22,63.4,58.86,46.11a1.19,1.19,0,0,1,1.93,0L73.42,63.4Z"
    />
    <path
      class="cls-4"
      d="M46.22,63.4,58.86,46.11a1.19,1.19,0,0,1,1.93,0L73.42,63.4Z"
    />
    <path
      class="cls-3"
      d="M39.42,63.4,50.68,50.16a1.19,1.19,0,0,1,1.82,0L63.76,63.4Z"
    />
    <path
      class="cls-4"
      d="M39.43,63.4,50.68,50.16a1.19,1.19,0,0,1,1.82,0L63.76,63.4Z"
    />
    <line class="cls-4" x1="30.24" y1="63.4" x2="30.24" y2="57.68" />
    <polygon
      class="cls-5"
      points="35.97 53.38 31.67 48.37 34.53 48.37 30.24 43.36 25.95 48.37 28.81 48.37 24.52 53.38 28.09 53.38 24.52 57.68 30.24 57.68 35.97 57.68 32.39 53.38 35.97 53.38"
    />
    <path
      class="cls-6"
      d="M25.71,63.4a1.1,1.1,0,0,0-1.1,1.18,25,25,0,0,0,49.9,0,1.1,1.1,0,0,0-1.1-1.18Z"
    />
    <path
      class="cls-4"
      d="M25.71,63.4a1.1,1.1,0,0,0-1.1,1.18,25,25,0,0,0,49.9,0,1.1,1.1,0,0,0-1.1-1.18Z"
    />
    <path
      class="cls-7"
      d="M35.25,63.4a2.86,2.86,0,1,0,0,5.73,2.92,2.92,0,0,1,2.79,2l2.4,7.67a2.47,2.47,0,0,0,4.84-.74v-2a8.17,8.17,0,0,1,2.39-5.78A4,4,0,0,0,44.8,63.4Z"
    />
    <path
      class="cls-3"
      d="M68.89,78.58V73.92a4.08,4.08,0,0,0-4.08-4.08,3.08,3.08,0,0,0-3.08,3.08,3.08,3.08,0,0,1-2.61,3l-.76.12A7.89,7.89,0,0,0,51.73,83l-.55,4.69A24.92,24.92,0,0,0,68.89,78.58Z"
    />
    <path
      class="cls-4"
      d="M68.89,78.58V73.92a4.08,4.08,0,0,0-4.08-4.08,3.08,3.08,0,0,0-3.08,3.08,3.08,3.08,0,0,1-2.61,3l-.76.12A7.89,7.89,0,0,0,51.73,83l-.55,4.69A24.92,24.92,0,0,0,68.89,78.58Z"
    />
    <line class="cls-4" x1="43.12" y1="63.4" x2="43.12" y2="59.11" />
    <polygon
      class="cls-5"
      points="48.85 54.81 44.55 49.8 47.42 49.8 43.12 44.8 38.83 49.8 41.69 49.8 37.4 54.81 40.98 54.81 37.4 59.11 43.12 59.11 48.85 59.11 45.27 54.81 48.85 54.81"
    />
  </svg>
</template>

<style>
.cls-2,
.cls-3,
.cls-7 {
  fill: #fff;
}

.cls-2,
.cls-4,
.cls-5,
.cls-7 {
  @apply stroke-nuxt-gray;

  /* stroke:#4550e5; */
  stroke-linejoin: round;
}

.cls-4 {
  fill: none;
}

.cls-4,
.cls-5,
.cls-7 {
  stroke-linecap: round;
}

.cls-5 {
  /* fill:#d6daff; */
  @apply fill-nuxt-green;
}

.cls-6 {
  /* fill:#d6daff; */
  @apply fill-nuxt-lightgreen;
}

@keyframes cloudLeft {
  0% {
    transform: translateX(-20px);
  }

  50% {
    transform: translateX(50%);
  }

  100% {
    transform: translateX(-20px);
  }
}

@keyframes cloudRight {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(0);
  }
}

.cls-2 {
  animation: cloudLeft 25s infinite alternate linear;
  position: absolute;
}

.cls-2-right {
  animation: cloudRight 20s infinite alternate linear;
}
</style>
