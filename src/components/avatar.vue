<template>
  <div style="width: 100%;">
    <div style="text-align: center;">
      <el-avatar shape="square" :size="avatarSize" :src="userAvatar"></el-avatar>
    </div>
    <div style="text-align: center;">
      <el-link type="primary" target="jx3box_user" :href="userHref">{{username}}</el-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["avatarSize", "userAvatar", "userHref", "username"]
};
</script>