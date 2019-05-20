<template>
    <section class="v-slider">
        <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
                <div class="swiper-slide v-slider__content" v-for="slide in slides" :key="slide.id">

                    <div class="v-slider__text">
                        <div class="v-slider__title" v-html="slide.text">
                            {{ slide.title }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </div>

    </section>
</template>
<script>

  export default {
    props: {
      slides: [Object,Array],
    },
    components: {},
    data() {     

      return {
        swiperOption: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
      }
    },
  }
</script>
<style>
    .v-slider{
        width: 80%;
        margin: 30px auto;
    }
    .v-slider__text{
        height: 80px;
        line-height: 80px;
    }
</style>

