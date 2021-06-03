<template>
  <div v-if="showQuiz">
    <h2>{{ $t('quiz.title') }}</h2>
    <ul>
      <li
        v-for="(question, index) of questions"
        :key="index"
        class="list-none mb-2 font-medium"
      >
        <span>{{ index + 1 }}) {{ question.question }}</span>
        <ul class="list-none">
          <li
            v-for="(answer, i) of question.answers"
            :key="i"
            class="list-none ml-6 pb-1"
            :class="{
              'text-red-500':
                isSubmitted &&
                answer !== question.correctAnswer &&
                answers[index] === answer
            }"
          >
            <input
              :id="`answer-${index}-${i}`"
              v-model="answers[index]"
              type="radio"
              :value="answer"
              :name="`answer-${index}-${i}`"
              :disabled="isSubmitted ? 'disabled' : null"
            />

            <label :for="`answer-${index}-${i}`" class="cursor-pointer">
              {{ answer }}
              <span v-if="isSubmitted && answer === question.correctAnswer">
                ✅
              </span>
            </label>
          </li>
        </ul>
      </li>
    </ul>
    <button
      class="disabled:opacity-50 text-white bg-green-500 rounded hover:bg-green-400 py-1 px-2"
      :disabled="buttonDisabled"
      @click="showScore"
    >
      Send
    </button>
    <button
      class="text-white bg-green-500 rounded hover:bg-green-400 py-1 px-2"
      @click="resetScore"
    >
      Reset
    </button>
    <div v-if="score !== null">
{{ score }} / {{ questions.length }}
</div>
  </div>
</template>

<script>
export default {
  props: {
    questions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      score: null,
      answers: {},
      showQuiz: false
    }
  },
  computed: {
    isSubmitted() {
      const answers = Object.entries(this.answers) || []

      return this.score !== null && answers.length === this.questions.length
    },
    buttonDisabled() {
      const answers = Object.entries(this.answers) || []
      return answers.length !== this.questions.length
    }
  },
  watch: {
    $route(to, from) {
      this.score = null
      this.answers = {}
    }
  },
  methods: {
    calcScore() {
      const answers = Object.entries(this.answers) || []
      let correctAnswers = 0

      for (const [key, value] of answers) {
        const question = this.shuffleQuestions[key]
        if (value === question.correctAnswer) {
          correctAnswers += 1
        }
      }
      return correctAnswers
    },
    showScore() {
      this.score = this.calcScore()
    },
    resetScore() {
      this.score = null
      this.answers = {}
    }
  }
}
</script>

<style scoped></style>
