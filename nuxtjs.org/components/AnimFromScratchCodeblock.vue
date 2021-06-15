<template>
  <div class="fromscratch__container">
    <div class="fromscratch__code">
      <div class="fromscratch__code__wrapper">
        <div class="fromscratch__code__bash">
          <p class="flex">
            <span>$&nbsp;</span
            ><span class="fromscratch__yarn__addnuxt">yarn add <span class="text-green">nuxt</span></span>
          </p>
          <p class="fromscratch__loading">> Loading...</p>
          <div class="fromscratch__progressbars__install">
            <div class="fromscratch__progressbar"></div>
            <div class="fromscratch__progressbar"></div>
            <div class="fromscratch__progressbar"></div>
          </div>
          <p class="flex">
            <span class="fromscratch__seconddollar">$&nbsp;</span
            ><span class="fromscratch__yarn__rundev">yarn run dev</span>
          </p>
          <div class="fromscratch__progressbars__dev">
            <div class="fromscratch__progressbar"></div>
            <div class="fromscratch__progressbar"></div>
            <div class="fromscratch__progressbar"></div>
          </div>
          <p class="flex items-center fromscratch__compiled">
            <IconCheck class="mr-2 nui-icon-md text-green w-4 h-4" />
            compiled
          </p>
        </div>
        <div class="fromscratch__code__ide">
          <div class="fromscratch__code__ide__head">
            <div class="fromscratch__code__ide__head__circles">
              <span class="fromscratch__code__ide__head__circles__circle"></span>
              <span class="fromscratch__code__ide__head__circles__circle"></span>
              <span class="fromscratch__code__ide__head__circles__circle"></span>
            </div>
            <p class="fromscratch__code__ide__head__file">index.vue</p>
          </div>
          <div class="fromscratch__code__ide__side">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
          <div class="fromscratch__code__ide__content">
            <p>
              <!-- Template tag open -->
              <span>&lt;</span><span class="text-red-400">template</span><span>&gt;</span>
            </p>
            <p>
              <!-- Sidebar component -->
              <span>&lt;</span><span class="text-red-400">Sidebar</span><span>/&gt;</span>
            </p>
            <p>
              <!-- Hello world h1 -->
              <span>&lt;</span>
              <span class="text-red-400">h1</span>
              <span>&gt;</span>
              Hello world !
              <span>&lt;</span>
              &#47;
              <span class="text-red-400">h1</span>
              <span>&gt;</span>
            </p>
            <p>
              <!-- Template tag open -->
              <span>&lt;</span>
              &#47;
              <span class="text-red-400">template</span>
              <span>&gt;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="fromscratch__display">
      <div class="fromscratch__display_loading">
        <img loading="lazy" class="fromscratch__display__logo" src="~/static/img/home/learn/master/logo.svg" />
        <div class="fromscratch__display__progressbar">
          <div class="fromscratch__display__progressbar__background"></div>
          <div class="fromscratch__display__progressbar__progress"></div>
        </div>
      </div>
      <div class="fromscratch__display__content">
        <img loading="lazy" src="~/static/img/home/learn/master/sidebar.svg" />
        <p>Hello world !</p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.fromscratch__container {
  @apply absolute top-0 left-0 mt-8 grid grid-cols-12 w-full;
}

.fromscratch__code {
  @apply relative -top-40 lg:top-0 bg-gray-600 rounded-md col-span-full lg:col-span-7 p-5 overflow-hidden;
}

.fromscratch__display__logo {
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
  height: 60px;
}

.fromscratch__display {
  top: 95%;
  @apply absolute bg-gray-100 right-0 lg:top-1/2 transform -translate-y-1/2 rounded-md w-full lg:w-1/2 opacity-0 overflow-hidden;
  height: 120%;
  animation: appear 300ms cubic-bezier(0.83, 0, 0.17, 1) forwards 3.2s,
    slideRight 300ms cubic-bezier(0.83, 0, 0.17, 1) forwards 3.2s;
}
.fromscratch__display_loading {
  @apply overflow-hidden opacity-0;
  animation: appear 300ms cubic-bezier(0.83, 0, 0.17, 1) forwards 3.5s, disappear 200ms forwards 7.7s;
}

.fromscratch__display__content {
  @apply absolute top-0 left-0 h-full w-full;
  & img {
    @apply absolute top-0 h-full bg-;
    left: -150px;
    animation: slideSidebarRight 600ms cubic-bezier(0.83, 0, 0.17, 1) forwards 9s;
  }
  & p {
    @apply absolute top-4 left-6 font-bold text-display-5 text-gray-600 opacity-0;
    animation: appear 300ms cubic-bezier(0.83, 0, 0.17, 1) forwards 8.1s,
      slideContent 600ms cubic-bezier(0.83, 0, 0.17, 1) forwards 9s;
  }
}

.fromscratch__display__progressbar {
  @apply absolute left-1/2 transform -translate-x-1/2 bottom-8 w-1/2;
  animation: fadeOutSlideDown 500ms cubic-bezier(0.83, 0, 0.17, 1) forwards 5.3s;
}

.fromscratch__display__progressbar__background {
  @apply absolute left-0 top-0 w-full bg-gray-400 rounded-full;
  height: 10px;
}

.fromscratch__display__progressbar__progress {
  @apply absolute left-0 top-0 w-0 bg-primary rounded-full opacity-0;
  height: 10px;
  animation: progress cubic-bezier(0.83, 0, 0.17, 1) 1.5s forwards 3.8s;
}

.fromscratch__code__bash {
  @apply opacity-100;
  animation: disappear ease 200ms forwards 6.7s;
}

.fromscratch__code__wrapper {
  animation: slideUp cubic-bezier(0.83, 0, 0.17, 1) 1s forwards 5.5s;
}

span[class*='fromscratch__yarn'] {
  @apply inline-block overflow-hidden whitespace-nowrap w-0;
  border-right: 0.15em solid transparent;
  letter-spacing: 0.75px;
  &.fromscratch__yarn__addnuxt {
    animation: typingSmall 1.5s steps(12, end) forwards, blink-caret 0.75s step-end 4 backwards;
  }
  &.fromscratch__yarn__rundev {
    animation: typingRunDev 1.5s steps(12, end) forwards 3.2s, blink-caret 0.75s step-end 4 backwards 3.2s;
  }
}

.fromscratch__seconddollar {
  @apply opacity-0;
  animation: appear 150ms ease forwards 3.2s;
}

.fromscratch__loading {
  @apply opacity-0;
  animation: appear 150ms forwards 2.15s;
}

.fromscratch__progressbars__install {
  @apply mt-2 w-1/2;
  & .fromscratch__progressbar {
    &:nth-child(1) {
      @apply bg-green-300;
      animation-delay: 2.4s;
    }
    &:nth-child(2) {
      @apply bg-primary;
      animation-delay: 2.6s;
    }
    &:nth-child(3) {
      @apply bg-green-500;
      animation-delay: 2.8s;
    }
  }
}

.fromscratch__progressbars__dev {
  @apply mt-2 w-1/4;
  & .fromscratch__progressbar {
    &:nth-child(1) {
      @apply bg-green-300;
      animation-delay: 4.8s;
    }
    &:nth-child(2) {
      @apply bg-primary;
      animation-delay: 5s;
    }
    &:nth-child(3) {
      @apply bg-green-500;
      animation-delay: 5.2s;
    }
  }
}

.fromscratch__progressbar {
  @apply rounded-full mb-2 opacity-0 w-0;
  height: 10px;
  animation: progress cubic-bezier(0.83, 0, 0.17, 1) 700ms forwards;
}

.fromscratch__compiled {
  @apply opacity-0;
  animation: appear 150ms forwards 5.7s;
}

.fromscratch__code__ide {
  @apply absolute top-0 left-0 w-full pt-8 h-full opacity-0;
  animation: appear 150ms forwards ease 7s;
}

.fromscratch__code__ide__head {
  width: 112%;
  @apply absolute h-10 lg:w-full top-6 -left-5 border-b-2 border-stone-lightest;
}

.fromscratch__code__ide__head__circles {
  @apply flex h-full w-full items-center pl-4;
}

.fromscratch__code__ide__head__circles__circle {
  @apply rounded-full mr-2 bg-primary;
  height: 12px;
  width: 12px;
}

.fromscratch__code__ide__head__file {
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-bg-gray-400;
}

.fromscratch__code__ide__content {
  white-space: unset;
  @apply pl-12 pt-12;
  & p {
    @apply overflow-hidden whitespace-nowrap w-0;
    border-right: 0.15em solid transparent;
    letter-spacing: 0.75px;
  }
  & p:nth-child(2),
  & p:nth-child(3) {
    @apply ml-3;
  }
  & p:nth-child(1) {
    animation: typingSmall 400ms steps(12, end) forwards 7.3s;
  }
  & p:nth-child(3) {
    animation: typingLong 400ms steps(12, end) forwards 7.7s;
  }
  & p:nth-child(4) {
    animation: typingSmall 400ms steps(12, end) forwards 8.1s;
  }
  & p:nth-child(2) {
    height: 0;
    animation: typingSmall 400ms steps(12, end) forwards 9s, heightAppear 100ms ease forwards 9s;
  }
}

.fromscratch__code__ide__side {
  @apply absolute w-12 -left-5 border-r-2 border-gray-400 flex flex-col items-center justify-start pt-3;
  top: 70px;
  height: 103%;
}

@keyframes typingSmall {
  from {
    width: 0;
  }
  to {
    width: 130px;
  }
}

@keyframes typingRunDev {
  from {
    width: 0;
  }
  to {
    width: 120px;
  }
}

@keyframes typingLong {
  from {
    width: 0;
  }
  to {
    width: 280px;
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #00dc82;
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes progress {
  0% {
    width: 0;
  }
  15% {
    opacity: 1;
  }
  to {
    opacity: 1;
    width: 100%;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(0);
  }
  to {
    transform: translateY(-46px);
  }
}

@keyframes slideRight {
  0% {
    transform: translateX(-100px) translateY(-50%);
  }
  to {
    transform: translateX(0) translateY(-50%);
  }
}

@keyframes fadeOutSlideDown {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(40px);
  }
}

@keyframes disappear {
  0% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes growUp {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes slideSidebarRight {
  0% {
    left: -150px;
  }
  100% {
    @apply left-0;
  }
}

@keyframes heightAppear {
  0% {
    height: 0;
  }
  to {
    height: 26px;
  }
}

@keyframes slideContent {
  0% {
    @apply left-8;
  }
  100% {
    @apply left-28;
  }
}
</style>
