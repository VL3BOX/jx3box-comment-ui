<template>
  <div class="user-avatar">
    <div class="avatar">
      <el-avatar shape="square" :size="avatarSize" :src="userAvatar"></el-avatar>
    </div>
    <div class="name">
      <el-link type="primary" target="jx3box_user" :href="userHref">{{username}}</el-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["avatarSize", "userAvatar", "userHref", "username"]
};
</script>

<style scoped>
.user-avatar {
  width: 100%;
}
.user-avatar .avatar {
  text-align: center;
}
.user-avatar .name {
  text-align: center;
}
</style>