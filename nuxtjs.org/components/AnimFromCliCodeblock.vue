<template>
  <div class="fromcli__container">
    <div class="fromcli__code">
      <div class="fromcli__code__wrapper">
        <div class="fromcli__code__bash">
          <p class="flex">
            <span>$&nbsp;</span
            ><span class="fromcli__yarn__createnuxtapp"
              >npx
              <span class="text-primary">create-nuxt-app</span>
              project-name</span
            >
          </p>
          <p class="fromcli__loading">> Loading...</p>
          <div class="fromcli__progressbars__install">
            <div class="fromcli__progressbar"></div>
            <div class="fromcli__progressbar"></div>
          </div>
          <p class="fromcli__question1">
            <span class="text-primary">? </span> Project name :
            <span class="text-primary">My project</span>
          </p>
          <p class="fromcli__question2">
            <span class="text-primary">? </span> Programming language :
            <span class="fromcli__question2__answer">Javascript</span>
          </p>
          <p class="fromcli__question2__answer1">> Javascript</p>
          <p class="fromcli__question2__answer2">&nbsp;&nbsp;Typescript</p>
          <p class="fromcli__question3">
            <span class="text-primary">? </span> Package manager :
            <span class="text-primary">Yarn</span>
          </p>
          <p class="fromcli__question4">
            <span class="text-primary">? </span> UI Framework :
            <span class="text-primary">Tailwind CSS</span>
          </p>
          <p class="fromcli__question5">
            <span class="text-primary">? </span> Nuxt.js modules :
            <span class="text-primary">Axios</span>
          </p>
          <p class="fromcli__question6">
            <span class="text-primary">? </span> Testing Framework :
            <span class="text-primary">Jest</span>
          </p>
          <p class="fromcli__question7">
            <span class="text-primary">? </span> Rendering mode :
            <span class="text-primary">Universal (SSR / SSG)</span>
          </p>
          <p class="fromcli__question8">
            <span class="text-primary">? </span> Deployment target :
            <span class="text-primary">Server</span>
          </p>
          <div class="fromcli__progressbars__compilation">
            <div class="fromcli__progressbar"></div>
            <div class="fromcli__progressbar"></div>
          </div>
          <p class="flex items-center fromcli__installed">
            <IconCheck class="mr-2 nui-icon-md text-primary w-4 h-4" />
            installed
          </p>
          <p class="flex">
            <span class="fromcli__seconddollar">$&nbsp;</span
            ><span class="fromcli__yarn__cd">cd <span class="text-primary">My Project</span></span>
          </p>
          <p class="flex">
            <span class="fromcli__thirddollar">$&nbsp;</span
            ><span class="fromcli__yarn__run">yarn run <span class="text-primary">dev</span></span>
          </p>
        </div>
        <div class="fromcli__code__ide">
          <div class="fromcli__code__ide__head">
            <div class="fromcli__code__ide__head__circles">
              <span class="fromcli__code__ide__head__circles__circle"></span>
              <span class="fromcli__code__ide__head__circles__circle"></span>
              <span class="fromcli__code__ide__head__circles__circle"></span>
            </div>
            <p class="fromcli__code__ide__head__file">index.vue</p>
          </div>
          <div class="fromcli__code__ide__side">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
          <div class="fromcli__code__ide__content">
            <p>
              <span>&lt;</span><span class="text-red-400">{{ 'template' }}</span
              ><span>&gt;</span>
            </p>
            <p>
              <!-- Logo component -->
              <span>&lt;</span><span class="text-red-400">Logo</span><span>/&gt;</span>
            </p>
            <p>
              <!-- Nuxt Card component -->
              <span>&lt;</span><span class="text-red-400">NuxtCard</span><span>&#47;&gt;</span>
            </p>
            <p>
              <!-- Nuxt Card component -->
              <span>&lt;</span><span class="text-red-400">NuxtCard</span><span>&#47;&gt;</span>
            </p>
            <p>
              <!-- AlertBanner component -->
              <span>&lt;</span><span class="text-red-400">AlertBanner</span><span>&#47;&gt;</span>
            </p>
            <p>
              <span>&lt;</span>&#47;<span class="text-red-400">{{ 'template' }}</span
              ><span>&gt;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="fromcli__display">
      <div class="fromcli__display_loading">
        <img loading="lazy" class="fromcli__display__logo" src="~/static/img/home/learn/master/logo.svg" />
        <div class="fromcli__display__progressbar">
          <div class="fromcli__display__progressbar__background"></div>
          <div class="fromcli__display__progressbar__progress"></div>
        </div>
      </div>
      <div class="fromcli__display__content">
        <img loading="lazy" class="fromcli__display__content__logo" src="~/static/img/home/learn/master/logo.svg" />
        <img
          loading="lazy"
          class="fromcli__display__content__content1"
          src="~/static/img/home/learn/master/cliContent1.svg"
        />
        <img
          loading="lazy"
          class="fromcli__display__content__content2"
          src="~/static/img/home/learn/master/cliContent2.svg"
        />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.fromcli__container {
  @apply absolute top-0 left-0 mt-8 grid grid-cols-12 w-full;
}

.fromcli__code {
  @apply relative -top-40 lg:top-0 dark:bg-secondary-black bg-secondary-darkest rounded-md col-span-full lg:col-span-7 p-5 overflow-hidden;
  height: 280px;
}

.fromcli__display__logo {
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
  height: 60px;
}

.fromcli__display {
  @apply absolute bg-gray-100 right-0 top-full lg:top-1/2 transform -translate-y-1/2 rounded-md w-full lg:w-1/2 opacity-0 overflow-hidden;
  height: 120%;
  animation: appear 300ms cubic-bezier(0.83, 0, 0.17, 1) forwards 3.2s,
    slideRight 300ms cubic-bezier(0.83, 0, 0.17, 1) forwards 3.2s;
}

.fromcli__display_loading {
  @apply overflow-hidden opacity-0;
  animation: appear 300ms cubic-bezier(0.83, 0, 0.17, 1) forwards 3.5s, disappear 200ms forwards 10.4s;
}

.fromcli__display__content {
  @apply absolute top-0 left-0 h-full w-full flex flex-col justify-center items-start px-16;
  & img {
    @apply opacity-0;
    transform: translateY(40px);
  }
  & img:first-child {
    @apply self-start mb-4;
    height: 36px;
    animation: slideUpContent 300ms cubic-bezier(0.83, 0, 0.17, 1) forwards 10.9s,
      appear 150ms cubic-bezier(0.83, 0, 0.17, 1) forwards 10.9s;
  }
  & img:nth-child(2) {
    @apply mb-4 w-full;
    animation: slideUpContent 300ms cubic-bezier(0.83, 0, 0.17, 1) forwards 11.1s,
      appear 150ms cubic-bezier(0.83, 0, 0.17, 1) forwards 11.1s;
  }
  & img:last-child {
    @apply w-full;
    animation: slideUpContent 300ms cubic-bezier(0.83, 0, 0.17, 1) forwards 11.3s,
      appear 150ms cubic-bezier(0.83, 0, 0.17, 1) forwards 11.3s;
  }
}

.fromcli__display__progressbar {
  @apply absolute left-1/2 transform -translate-x-1/2 bottom-8 w-1/2;
  animation: fadeOutSlideDown 500ms cubic-bezier(0.83, 0, 0.17, 1) forwards 5.3s;
}

.fromcli__display__progressbar__background {
  @apply absolute left-0 top-0 w-full bg-gray-400 rounded-full;
  height: 10px;
}

.fromcli__display__progressbar__progress {
  @apply absolute left-0 top-0 w-0 bg-primary rounded-full opacity-0;
  height: 10px;
  animation: progress cubic-bezier(0.83, 0, 0.17, 1) 1.5s forwards 3.8s;
}

.fromcli__code__bash {
  @apply opacity-100;
  animation: disappear ease 200ms forwards 10.4s;
}

.fromcli__code__wrapper {
  animation: slideUp ease 1.3s forwards 5s;
}

span[class*='fromcli__yarn'] {
  @apply inline-block overflow-hidden whitespace-nowrap w-0;
  border-right: 0.15em solid transparent;
  letter-spacing: 0.75px;
  &.fromcli__yarn__createnuxtapp {
    animation: typingVeryLong 1.5s steps(12, end) forwards, blink-caret 0.75s step-end 4 backwards;
  }
  &.fromcli__yarn__cd {
    animation: typingSmall 1s steps(12, end) forwards 7.6s, blink-caret 0.75s step-end 2 backwards 7.6s;
  }
  &.fromcli__yarn__run {
    animation: typingRunDev 1s steps(12, end) forwards 8.6s, blink-caret 0.75s step-end 3 backwards 8.6s;
  }
}

.fromcli__seconddollar {
  @apply opacity-0;
  animation: appear 150ms ease forwards 7.6s;
}

.fromcli__thirddollar {
  @apply opacity-0;
  animation: appear 150ms ease forwards 8.6s;
}

.fromcli__question1 {
  @apply opacity-0;
  animation: appear 150ms ease forwards 3.2s;
}

.fromcli__question2 {
  @apply opacity-0;
  animation: appear 150ms ease forwards 3.35s;
}

.fromcli__question2__answer {
  @apply opacity-0 text-primary;
  animation: appear 150ms ease forwards 4.2s;
}

.fromcli__question2__answer1 {
  @apply opacity-0 overflow-hidden;
  animation: appear 150ms ease forwards 3.5s, heightDisappear 150ms ease forwards 4.2s;
}

.fromcli__question2__answer2 {
  @apply opacity-0 overflow-hidden;
  animation: appear 150ms ease forwards 3.65s, heightDisappear 150ms ease forwards 4.2s;
}

.fromcli__question3,
.fromcli__question4,
.fromcli__question5,
.fromcli__question6,
.fromcli__question7,
.fromcli__question8 {
  @apply h-0 overflow-hidden;
}

.fromcli__question3 {
  animation: heightAppear 150ms ease forwards 4.6s;
}

.fromcli__question4 {
  animation: heightAppear 150ms ease forwards 4.75s;
}

.fromcli__question5 {
  animation: heightAppear 150ms ease forwards 4.9s;
}

.fromcli__question6 {
  animation: heightAppear 150ms ease forwards 5.05s;
}

.fromcli__question7 {
  animation: heightAppear 150ms ease forwards 5.2s;
}

.fromcli__question8 {
  animation: heightAppear 150ms ease forwards 5.35s;
}

.fromcli__loading {
  @apply opacity-0;
  animation: appear 150ms forwards 2.15s;
}

.fromcli__progressbars__compilation {
  @apply mt-2 w-1/2;
  & .fromcli__progressbar {
    &:nth-child(1) {
      @apply bg-green-300;
      animation-delay: 5.8s;
    }
    &:nth-child(2) {
      @apply bg-primary;
      animation-delay: 6.2s;
    }
  }
}

.fromcli__progressbars__install {
  @apply mt-2 w-1/2;
  & .fromcli__progressbar {
    &:nth-child(1) {
      @apply bg-green-300;
      animation-delay: 2.4s;
    }
    &:nth-child(2) {
      @apply bg-primary;
      animation-delay: 2.6s;
    }
  }
}

.fromcli__progressbars__dev {
  @apply mt-2 w-1/4;
  & .fromcli__progressbar {
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

.fromcli__progressbar {
  @apply rounded-full mb-2 opacity-0 w-0;
  height: 10px;
  animation: progress cubic-bezier(0.83, 0, 0.17, 1) 700ms forwards;
}

.fromcli__installed {
  @apply opacity-0;
  animation: appear 150ms forwards 7s;
}

.fromcli__code__ide {
  @apply absolute left-0 w-full pt-8 h-full opacity-0;
  top: 162px;
  animation: appear 150ms forwards ease 10.6s;
}

.fromcli__code__ide__head {
  @apply absolute h-10 w-full top-4 -left-5 border-b-2 border-gray-400;
}

.fromcli__code__ide__head__circles {
  @apply flex h-full w-full items-center pl-4;
}

.fromcli__code__ide__head__circles__circle {
  @apply h-3 w-3 rounded-full mr-2 bg-primary;
}

.fromcli__code__ide__head__file {
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-50;
}

.fromcli__code__ide__content {
  white-space: unset;
  @apply pl-12 pt-10;
  & p {
    @apply whitespace-nowrap;
    border-right: 0.15em solid transparent;
    letter-spacing: 0.75px;
  }
  & p:nth-child(2),
  & p:nth-child(3),
  & p:nth-child(4),
  & p:nth-child(5) {
    @apply ml-3;
  }
}

.fromcli__code__ide__side {
  @apply absolute w-12 -left-5 border-r-2 border-gray-400 flex flex-col items-center justify-start pt-3;
  top: 65px;
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

@keyframes typingVeryLong {
  from {
    width: 0;
  }
  to {
    width: 330px;
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
    transform: translateY(-200px);
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

@keyframes slideUpContent {
  0% {
    transform: translateY(40px);
  }
  to {
    transform: translateY(0);
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

@keyframes heightDisappear {
  0% {
    height: 26px;
  }
  to {
    height: 0;
  }
}

@keyframes slideContent {
  0% {
    @apply left-8;
  }
  100% {
    @apply left-30;
  }
}
</style>
