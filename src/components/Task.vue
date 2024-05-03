<template>
    <v-list-item v-if="!task.edit" @mouseover="isEditButtonShow = true" @mouseleave="isEditButtonShow = false">
        <v-list-item-title>{{ task.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
        <template v-slot:append>
            <v-btn class="edit-btn" @click="store.editTask(task.id)"
                v-show="isEditButtonShow && rightButtonText === 'Готово!'" :icon="clipboardEdit" size="x-small"></v-btn>
            <v-btn class="left-btn" @click="leftButtonHandler(task.id, task.status)">{{ leftButtonText }}</v-btn>
            <v-btn color="secondary"
                @click="rightButtonHandler(task, rightButtonText === 'В работу!' ? task.status : undefined)">{{
                    rightButtonText }}</v-btn>
        </template>
    </v-list-item>
    <Form v-if="task.edit" :current-task="task" :current-icon="clipboardEdit" />
</template>

<script setup lang="ts">
import Form from './Form.vue';
import { Status, ITask, useAppStore } from '@/stores/app';

const store = useAppStore();

const isEditButtonShow = ref(false);
const clipboardEdit = "mdi-clipboard-edit-outline";

defineProps<{
    task: ITask;
    leftButtonText: string;
    rightButtonText: string;
    leftButtonHandler: (taskId: string, currentStatus: Status) => void;
    rightButtonHandler: (task: ITask, currentStatus?: Status | undefined) => void;
}>()
</script>