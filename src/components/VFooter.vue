<template>
    <footer>
        <p>{{ $t('footer.copyright') }}</p>
    </footer>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
      ]),
    },
  }
</script>

<style lang="less" scoped>
    @import '~assets/less/variables';

    p {
        text-align: center;
        margin: 20px;
    }
</style>
