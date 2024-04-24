<template>
  <v-container class="completed">
    <Header v-bind="headerProps" class="header" />
    <v-list class="display" select-strategy="classic">
      <Task v-bind="taskProps" v-for="task in store.done" :task="task" :key="task.id" :value="task.title"
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
const storage = useStorage("done");
onMounted(() => store.done = storage ?? store.done);

const headerProps = {
  title: "Выполненные",
  leftButton: {
    route: "/",
    icon: "mdi-briefcase-outline",
    text: "В работе",
  },
  rightButton: {
    route: "/Deleted",
    icon: "mdi-archive-check-outline",
    text: "В архив",
  },
}

const taskProps = {
  leftButtonText: "Удалить",
  rightButtonText: "В работу!",
  leftButtonClickHandler: store.removeTask,
  rightButtonClickHandler: store.addTask,
}
</script>