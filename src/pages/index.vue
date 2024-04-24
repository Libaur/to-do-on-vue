<template>
  <v-container class="at-work">
    <Header v-bind="headerProps" class="header" />
    <v-form @submit.prevent="addTask" class="add-form">
      <v-text-field label="Название задачи" class="task-name" v-model.trim="taskTitle" :error-messages="taskTitleError"/>
      <v-text-field label="Описание задачи" v-model.trim="taskDescription" />
      <v-btn class="add-btn" type="submit"><v-icon>mdi-briefcase-plus-outline</v-icon></v-btn>
    </v-form>
    <v-list class="display" select-strategy="classic">
      <Task v-bind="taskProps" v-for="task in store.unfulfilled" :task="task" :key="task.id" :value="task.title"
        variant="tonal" />
    </v-list>
  </v-container>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
import Task from '@/components/Task.vue';
import { useAppStore } from '@/stores/app';
import { useStorage } from '@/utils';
import { ref } from 'vue';
import { nanoid } from 'nanoid';

const store = useAppStore();
const storage = useStorage("unfulfilled");
onMounted(() => store.unfulfilled = storage ?? store.unfulfilled);

const headerProps = {
  title: "В работе",
  leftButton: {
    route: "/Done",
    icon: "mdi-check-all",
    text: "Выполненные",
  },
  rightButton: {
    route: "/Deleted",
    icon: "mdi-archive-check-outline",
    text: "В архив",
  },
}

const taskProps = {
  leftButtonText: "Удалить",
  rightButtonText: "Готово!",
  leftButtonClickHandler: store.removeTask,
  rightButtonClickHandler: store.completeTask,
}

const taskTitle = ref('');
const taskDescription = ref('');
const taskTitleError = ref('');

function addTask() {
  if (!taskTitle.value) {
    taskTitleError.value = "Пожалуйста, укажите хотя бы название";
    return;
  }
  taskTitleError.value = '';
  store.addTask({
    id: nanoid(),
    title: taskTitle.value,
    description: taskDescription.value,
    status: "unfulfilled"
  })
  taskTitle.value = '';
  taskDescription.value = '';
}
</script>