<template>
  <v-container class="completed">
    <Header v-bind="headerProps" class="header" />
    <v-list class="display" select-strategy="classic">
      <Task v-bind="taskProps" v-for="task in store.deleted" :task="task" :key="task.id" :value="task.title"
        variant="tonal" />
    </v-list>
  </v-container>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
import Task from '@/components/Task.vue';
import { useAppStore } from '@/stores/app';
import { useStorage } from '@/utils';
import { onMounted } from 'vue';

const store = useAppStore();
const storage = useStorage("deleted");
onMounted(() => store.deleted = storage ?? store.deleted);

const headerProps = {
  title: "Архив",
  leftButton: {
    route: "/",
    icon: "mdi-briefcase-outline",
    text: "В работе",
  },
  rightButton: {
    route: "/Done",
    icon: "mdi-check-all",
    text: "Выполненные",
  },
}

const taskProps = {
  leftButtonText: "Удалить",
  rightButtonText: "В работу!",
  leftButtonHandler: store.removeTask,
  rightButtonHandler: store.addTask,
}
</script>