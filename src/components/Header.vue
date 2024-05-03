<template>
    <v-toolbar :title="title">
        <RouterLink :to="leftButton.route"><v-btn class="nav-btn"><v-icon>{{ leftButton.icon }}</v-icon><span>{{
            leftButton.text
                    }}</span></v-btn></RouterLink>
        <RouterLink :to="rightButton.route"><v-btn class="nav-btn"><v-icon>{{ rightButton.icon }}</v-icon><span>{{
            rightButton.text
                    }}</span></v-btn></RouterLink>
    </v-toolbar>
</template>

<script setup lang="ts">
interface NavigationButton {
    route: string
    icon: string
    text: string
}

defineProps<{
    title: string
    leftButton: NavigationButton
    rightButton: NavigationButton
}>()
</script>