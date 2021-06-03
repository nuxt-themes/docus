<template>
  <AppContainer class="py-12">
    <section>
      <h1 class="pb-8 text-3xl text-center uppercase">
        Nuxt<span class="text-nuxt-lightgreen">JS</span> targets
      </h1>
      <div class="flex items-end justify-between lg:items-center">
        <div class="Home__Modes__Section">
          <h4 class="Home__Modes__Section__Title">
Server
</h4>
          <p class="Home__Modes__Section__Description">
            Heroku, Digital Ocean, OVH...
          </p>
        </div>
      </div>
      <div>
        <div class="Home__Modes__Section">
          <h4 class="Home__Modes__Section__Title">
Serverless
</h4>
          <p class="Home__Modes__Section__Description">
            Zeit, Amazon Lambda, Google Cloud Function, Azure...
          </p>
        </div>
      </div>
      <div>
        <div class="Home__Modes__Section">
          <h4 class="Home__Modes__Section__Title">
Static (JAM Stack ready)
</h4>
          <p class="Home__Modes__Section__Description">
            Netlify, GitHub Pages, Surge...
          </p>
        </div>
      </div>
    </section>
  </AppContainer>
</template>

<style lang="scss">
$grey_blue: #2f495e;
$light_green: #00c58e;
$grey: #606f7b;

.Home__Modes {
  color: $grey_blue;
  padding: 5rem 0;
  text-align: center;

  &__Section {
    padding-bottom: 4rem;
    text-align: left;
    width: 80%;

    &__Title {
      font-size: 1.35rem;
      font-weight: 700;
      margin: 0;
      padding: 0;
      padding-bottom: 2rem;
      text-transform: uppercase;
    }

    &__Description {
      color: $grey;
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.7rem;
      margin: 0;
    }
  }
}
</style>
