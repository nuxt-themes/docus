<template>
  <div>
    <div
      v-if="src"
      class="cursor-pointer"
      data-cy="modal-image"
      @click="showModal = true"
    >
      <img :src="src" :alt="alt" />
    </div>
    <button
      v-else
      data-cy="modal-button"
      class="
        no-underline
        mt-4
        font-medium
        text-sm
        px-4
        py-2
        shadow
        uppercase
        rounded
        hover:shadow-md
        sm:mr-4
        py-3
        px-6
        text-base
        mb-4
        primary
        bg-primary-base
        text-white
        hover:bg-primary-light
      "
      @click="showModal = true"
    >
      {{ $t('codeSandbox.open') }}
    </button>

    <transition name="modal">
      <div v-if="showModal" class="modal-mask" keep-alive data-cy="modal-open">
        <div class="modal-wrapper">
          <div class="modal-container flex flex-col">
            <div class="w-full flex justify-end">
              <button
                class="m-2 w-auto"
                data-cy="modal-close"
                @click="showModal = false"
              >
                <SvgIcon name="xmark-circle" class="svg" />
              </button>
            </div>
            <div class="modal-body flex-1" :class="{ 'overflow-scroll': src }">
              <img v-if="src" :src="src" :alt="alt" />
              <slot v-else />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: false,
      default: ''
    },
    alt: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  head() {
    return this.open
      ? {
          bodyAttrs: {
            class: ['overflow-hidden']
          }
        }
      : undefined
  },
  computed: {
    open() {
      return this.showModal
    }
  }
}
</script>

<style scoped>
.svg {
  width: 20px;
  color: black;
}

.modal-mask {
  backdrop-filter: blur(18px);
  background-color: rgba(0, 0, 0, 0.4);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9998;
}

.modal-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  height: calc(100vh - 80px);
  margin: 40px;
  padding: 20px 30px;
  transition: all 0.3s ease;
  width: calc(100vw - 80px);
}
@media (max-width: 678px) {
  .modal-container {
    border-radius: 0;
    height: 100vh;
    margin: 0;
    padding: 0;
    width: 100%;
  }
}

.modal-body {
  display: flex;
  margin: 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
