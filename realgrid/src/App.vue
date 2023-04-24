<template>
    <div>
        <UserLogin v-if="!this.$store.getters.isLogined" />
        <UserLogined v-if="this.$store.getters.isLogined" />
    </div>
</template>

<script>
import 'element-plus/dist/index.css'
import UserLogin from "@/components/UserLogin.vue";
import UserLogined from "@/components/UserLogined.vue";

export default {
    components: { UserLogin, UserLogined },

    mounted() {
        console.log("isLogined", this.$store.getters.isLogined);
    }
}
</script>

<style>
body {
    margin: 0px;
}
</style>