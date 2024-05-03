<template>
    <v-form @submit.prevent="makeChanges" class="add-form">
        <v-text-field label="Название задачи" class="task-name" v-model.trim="title" :error-messages="errorMessage" />
        <v-text-field label="Описание задачи" v-model.trim="description" />
        <v-btn class="add-btn" type="submit"><v-icon v-if="formProps.currentIcon">{{ formProps.currentIcon }}</v-icon>
            <v-icon v-else>mdi-briefcase-plus-outline</v-icon></v-btn>
    </v-form>
</template>

<script lang="ts" setup>
import { nanoid } from 'nanoid';
import { ITask, useAppStore } from '@/stores/app';

const store = useAppStore();

const formProps = defineProps<{
    currentTask?: ITask;
    currentIcon?: string;
}>()

const currentTask = formProps?.currentTask;
const currentTitle = currentTask?.title;
const currentDescription = currentTask?.description;
const title = currentTitle ? ref(currentTitle) : ref('');
const description = currentDescription ? ref(currentDescription) : ref('');
const errorMessage = ref('');

function makeChanges() {
    if (!title.value) {
        errorMessage.value = "Пожалуйста, укажите хотя бы название";
        return;
    }
    errorMessage.value = '';
    currentTask ? store.changeTask({ ...currentTask, title: title.value, description: description.value }) :
        store.addTask({
            id: nanoid(),
            title: title.value,
            description: description.value,
            status: "unfulfilled",
            edit: false,
        })
}
</script>