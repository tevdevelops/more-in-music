import navigateOnClick from '~/directives/navigateOnClick'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('navigate-on-click', navigateOnClick)
})
