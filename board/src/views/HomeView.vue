<template>
<h1>Hello</h1>
</template>

<script>
import apiBoard from '@/api/board';

export default {
    mounted() {
        apiBoard.getArticle(1)
        .then(function (response) {
            console.log('getArticle', response);
        })
        .catch(function (e) {
            console.log(e);
        });

        //getArticles 데이터를 배열로 목록을 가져오는 API
        apiBoard.getArticles(0)
          .then(function (response) {
              console.log('getArticles', response);
          })
          .catch(function (e) {
            console.log(e);
          });

        apiBoard.postArticle('id','title','body')
        .then(function (response){
          console.log('postAticle', response);          
        })
        .catch(function (e) {
          console.log(e);
        });
    },
}
</script>