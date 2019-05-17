<template>
    <section class="container">
        <div>
            <logo/>
            <h1 class="title" v-html="page.seo.metaTitle"></h1>

            <div class="links">
                <nuxt-link
                        v-for="item in navigation"
                        :key="item.id"
                        :to="item.url"
                        class="button--green"
                        exact
                >
                    {{ item.title }}
                </nuxt-link>
            </div>

            <v-slider :slides="page.slider"></v-slider>
        </div>
    </section>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import VSlider from '~/components/VSlider.vue'
  import {mapGetters} from 'vuex'

  export default {
    head() {
      return {
        title: this.page.seo.metaTitle,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.page.seo.description
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.page.seo.keywords
          }
        ]
      }
    },
    components: {
      Logo,
      VSlider
    },
    async asyncData({app, store}) {
      try {
        let pageKey = 'slider' + store.getters.lang;
        const page = await app.flamelink.content.get(pageKey, { populate: true });
        store.commit('setPage', page);

        return {}
      } catch (err) {
        console.log('error', err);
        return {};
      }
    },
    computed: {
      ...mapGetters([
        'page',
        'navigation',
        'capitalize'
      ]),
    }

  }
</script>

<style lang="less">
    @import '~assets/less/variables';

    .container {
        margin: 0 auto;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .title {
        font-family: @familyDefault;
        display: block;
        font-weight: 300;
        font-size: 80px;
        color: @bright-primary;
        letter-spacing: 1px;
    }

    .subtitle {
        font-weight: 300;
        font-size: 42px;
        color: @bright-secondary;
        word-spacing: 5px;
        padding-bottom: 15px;
    }

    .links {
        padding-top: 15px;
    }
</style>
