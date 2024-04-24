<template>
    <v-list-item>
        <v-list-item-title>{{ task.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
        <template v-slot:append>
            <v-btn class="left-btn" @click="leftButtonClickHandler(task.id, task.status)">{{ leftButtonText }}</v-btn>
            <v-btn color="secondary"
                @click="rightButtonClickHandler(task, rightButtonText === 'В работу!' ? task.status : undefined)">{{
                rightButtonText }}</v-btn>
        </template>
    </v-list-item>
</template>

<script setup lang="ts">
import { Status, ITask } from '@/stores/app';

defineProps<{
    task: ITask;
    leftButtonText: string;
    rightButtonText: string;
    leftButtonClickHandler: (taskId: string, currentStatus: Status) => void;
    rightButtonClickHandler: (task: ITask, currentStatus?: Status | undefined) => void;
}>()
</script>