<template>
  <v-container class="at-work">
    <Header v-bind="headerProps" class="header" />
    <Form />
    <v-list class="display" select-strategy="classic">
      <Task v-bind="taskProps" v-for="task in store.unfulfilled" :task="task" :key="task.id" :value="task.title"
        variant="tonal" />
    </v-list>
  </v-container>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
import Form from '@/components/Form.vue';
import Task from '@/components/Task.vue';
import { ITask, useAppStore } from '@/stores/app';
import { useStorage } from '@/utils';

const store = useAppStore();
const storage = useStorage("unfulfilled");
onMounted(() => store.unfulfilled = storage ?? store.unfulfilled);

const handleTaskEditable = (task: ITask) => console.log(task.title);

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
  leftButtonHandler: store.removeTask,
  rightButtonHandler: store.completeTask,
  editButtonHandler: handleTaskEditable
}
</script>