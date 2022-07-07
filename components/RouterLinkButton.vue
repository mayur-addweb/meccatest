<template>
  <router-link :to="to ? to : null">
    <div class="btn">
      <slot />
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      required: false,
    }
  }
};
</script>

<style scoped>
.btn {
  width: 244px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: #2c354e;
  color: #ffffff;
  box-shadow: 0 2px 0 0 #f6b119;
  border-radius: 2 px;
  padding: 2 px 19 px 1 px;
  -webkit-appearance: none;
  transition: all 0.3s ease-in-out;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  font-size: 1rem;
  line-height: 1.5;
}

a {
  color: #ffffff;
  display: inline-block;
  text-decoration: none;
  z-index: 2;
}
</style>
