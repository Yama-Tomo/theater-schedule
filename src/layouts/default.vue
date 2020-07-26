<template lang="pug">
.container
  nuxt
  Footer
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import Footer from '~/layouts/footer.vue';

@Component({
  components: {
    Footer,
  },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
@import '~assets/scss/_variables';

.container {
  height: 100%;
  display: flex;
  flex-direction: column;

  /deep/ .content {
    flex: 1;
  }
}

@media (min-width: $desktop) and (max-width: $widescreen) {
  .container {
    width: 1050px;
    max-width: 1050px;
  }
}
</style>
