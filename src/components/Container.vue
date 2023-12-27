<template>
    <div class="light-modal-container">
        <slot />
    </div>
</template>
<script>
export default {
    name: 'Container',
};
</script>

<style scoped>
.light-modal-container {
    position: fixed;
    box-sizing: border-box;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;
    opacity: 1;
}
</style>