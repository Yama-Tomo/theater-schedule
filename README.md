# Theater schedule

> 演劇好きの為の上演時間情報サイト

# development

```bash
$ cp src/data/schedules-sample.yml src/data/schedules.yml
$ npm i
$ npm run dev
```

# production

nuxt generate として静的サイトとして運用することを前提としています

`nuxt generate` する前に `src/data/schedules.json` を用意する必要があります

```bash
$ touch src/data/schedules.json
$ npm run generate

dist ディレクトリ以下をサーバでホスティングしてください
```

