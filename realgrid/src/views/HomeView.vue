<template>
  <div>
    <UserLogin v-if="!this.$store.getters.isLogined" />
    <UserMain v-if="this.$store.getters.isLogined" />
  </div>
</template>

<script>
// @ is an alias to /src
import UserMain from "@/components/UserMain.vue";
import UserLogin from '@/components/UserLogin.vue'

export default {
  components: {
    UserLogin,
    UserMain,
  }
}
</script>
