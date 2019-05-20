import axios from 'axios'

export const state = () => ({
  settings: {
    social: {}
  },
  navigation: [],
  page: {
    seo: {}
  },
})

export const getters = {
  settings: state => state.settings,
  navigation: state => state.navigation,
  page: state => state.page,
  lang: state => {
    return state.i18n.locale.charAt(0).toUpperCase() + state.i18n.locale.slice(1)
  }
}

export const mutations = {
  setSettings(state, payload) {
    state.settings = payload
  },
  setNavigation(state, payload) {
    state.navigation = payload
  },
  setPage(state, payload) {
    state.page = payload
  }
}

export const actions = {
  async nuxtServerInit({commit}, {app}) {

    // load only one language setting (don't need to duplicate in other languages)
    await app.flamelink.content.get('settings', { populate: true })
      .then(data => {
        commit('setSettings', data);
      })
      .then(data => {
        return app.flamelink.nav.get('navbarEn')
      })
      .then(menu => {
        commit('setNavigation', menu.items);
      })
  },
}