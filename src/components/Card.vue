<template>
  <div class="card">
    <div class="details">
      <h2>
        <slot name="heading"></slot>
      </h2>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  padding: 20px;
  border: 1px solid var(--el-border-color-hover);
  border-radius: 5px;
  background-color: inherit;
  min-width: 268px;
}
</style>
