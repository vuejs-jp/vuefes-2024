<script setup lang="ts">
type AvatarProps = {
    src: string,
    alt: string,
}

defineProps<AvatarProps>()
</script>

<template>
    <img :src="src" :alt="alt" />
</template>

<style scoped>
img {
    width: 360px;
    height: 360px;
    object-fit: cover;
    border-radius: 12px;
}

@media (--mobile) {
    img {
        width: 168px;
        height: 168px;
    }
}
</style>
