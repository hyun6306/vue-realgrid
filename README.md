# vue-realgrid

`vue-realgrid`는 RealGrid Js 라이브러리를 Vue.js에서 사용하기 위한 Helper 패키지 입니다.

## 목차

- [RealGridJS 설치]()
  - [sample `index.html`]()
  - [sample `main.js` vue code]()
- [RealGrid 컴포넌트 이용하기]()
- 샘플코드
  - [sample 1](samples/sample1) : `script` 태그를 이용해 RelaGrid를 import 하고 Vue instance에서 RealGrid를 생성하는 방법을 알아 봅니다.
  - [sample 2](samples/sample2) : `vue-realgrid` 패키지를 설치하고 `RealGrid Vue Component`를 이용해 RealGrid를 생성하는 방법을 알아 봅니다.

## RealGridJS 설치

리얼그리드 도움말의 [RealGridJS 설치하기](http://help.realgrid.com/tutorial/a1/) 에 보면 RealGrid를 설치하는 방법이 정리되어 있습니다.

Vue.js 에서 RealGrid를 사용하기 위해 동일한 방법으로 페이지에 `<script>` 태그를 사용하여 RealGrid 라이브러리 파일을 import 합니다.

### sample `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <script type="text/javascript" src="./realgridjs-lic.js"></script>
    <script type="text/javascript" src="./lib/realgridjs_eval.1.1.29.min.js"></script>
    <script type="text/javascript" src="./lib/realgridjs-api.1.1.29.js"></script>
    <title>sample1</title>
  </head>
  <body>
    <div id="app">
      <realgrid></realgrid>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="main.js"></script>
  </body>
</html>
```

위와 같이 RealGrid 파일들이 모두 import 되면 전역적 컨텍스트에 `RealGridJS` 라는 이름의 객체가 정의됩니다. 그러므로 JavaScript 코드의 어디에서든 RealGrid를 생성 할 수 있습니다.

아래 Vue 코드와 같이 `RealGridJS` 객체를 이용해 RealGrid를 직접 생성 할 수 있습니다. [sample1 참조](samples/sample1)

### sample `main.js` vue code

``` js
Vue.component('realgrid', {
    template: `
    <div>
        <div id="realgrid" style="width: 100%; height: 200px;"></div>
    </div>
    `,
    mounted() {
        RealGridJS.setRootContext("/lib");
        this.dataProvider = new RealGridJS.LocalDataProvider();
        this.gridView = new RealGridJS.GridView("realgrid");
        this.gridView.setDataSource(this.dataProvider);
    },
    data() {
        return {
            dataProvider: null,
            gridView: null,
        }
    }
})

var app = new Vue({
    el: '#app',
});
```

## RealGrid 컴포넌트 이용하기

위와 같이 직접 RealGridJS 객체를 컨트롤 할 수도 있지만 편의를 위해 작성된 Vue.js 용 RealGrid Helper component 를 설치 하여 사용할 수도 있습니다.

``` bash
npm install --save @realgrid/vue-realgrid
```


