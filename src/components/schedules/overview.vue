<template lang="pug">
section
  h1 上演時間情報
  .caution
    p 現在公演中の東京の主要な公演の上映時間を掲載しています
    p ※劇場に直接問い合わせ、もしくはSNS上で上演時間の確認ができたものを掲載しています
    p ※掲載している上演時間はおおよその目安です。変更になる可能性があります
    p ※休憩時間は全体の上演時間に含まれます。休憩時間の記載のない公演は休憩がありません
</template>

<style lang="scss" scoped>
@import '~assets/scss/_variables';

section {
  h1 {
    text-align: center;
    color: $main-font-color;
    font-size: 1.8rem;
    margin-bottom: 30px;
  }

  .caution {
    color: $main-font-color;
    font-weight: 500;
    font-size: 0.8rem;

    p {
      margin-bottom: 8px;
    }
  }
}
</style>