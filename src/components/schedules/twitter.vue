<template lang="pug">
div(ref="twitterRoot")
  a(
    class="twitter-timeline"
    :href="twitterEmbeddedUrl"
    data-chrome="nofooter noborder noheader"
  )
    | Tweets by corolife_stage
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class extends Vue {
  @Prop(String) public twitterEmbeddedUrl!: string;

  public mounted() {
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    script.setAttribute('async', '');
    (this.$refs.twitterRoot as HTMLElement).appendChild(script);

    this.applyTwitterCss();
  }

  public applyTwitterCss() {
    setTimeout(() => {
      const iframe = document.getElementById('twitter-widget-0');
      if (iframe === null) {
        this.applyTwitterCss();
        return;
      }

      const css = document.createElement('style');
      (css as any).type = 'text/css';

      css.appendChild(document.createTextNode(this.twitterCss));

      (iframe as any).style.height = 'auto';
      (iframe as any).contentDocument.head.appendChild(css);
    }, 200);
  }

  get twitterCss(): string {
    return `
      .timeline-Widget {
        max-width: none !important;
      }

      .timeline-Body.customisable-border {
        border-top: none !important;
        margin-top: 20px !important;
      }

      .timeline-Tweet {
        padding-left: 0px !important;
        padding-right: 0px !important;
      }

      .SandboxRoot.env-bp-430 .timeline-Tweet-text,
      .SandboxRoot.env-bp-550 .timeline-Tweet-text,
      .SandboxRoot.env-bp-660 .timeline-Tweet-text,
      .SandboxRoot.env-bp-820 .timeline-Tweet-text,
      .SandboxRoot.env-bp-970 .timeline-Tweet-text
      {
        font-size: 14px !important;
        color: #636674 !important;
        line-height: 18px !important;
      }

      .timeline-Tweet-timestamp {
        color: #636674 !important;
      }

      @media(min-width:1050px) {
        .timeline-Tweet {
          padding-left: 1.5rem !important;
          padding-right: 1.5rem !important;
        }
      }
    `;
  }
}
</script>
