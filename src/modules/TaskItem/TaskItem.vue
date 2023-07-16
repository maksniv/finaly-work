<template>
  <div class="task-item">
    <div class="task-item__task">
      <div class="task-item__wrapper">
        <div
          v-html="highlight(task.name)"
          class="task-item__name"
          @click="
            $router.push({
              name: 'wiewTask',
              params: { taskId: task._id },
            })
          "
        ></div>
        <BaseAvatar :picture="task.picture" :author="task.author"></BaseAvatar>
      </div>
      <div class="task-item__wrapper">
        <div class="task-item__description">
          <span class="task-item__number">#{{ task.number }}</span>
          <BaseAuthorItem :author="task.author">
            <BaseTimeItem
              :text="'создал(а)'"
              :time="task.dateCreated"
            ></BaseTimeItem>
          </BaseAuthorItem>
          <BaseBadgeStatus :status="task.status"></BaseBadgeStatus>
        </div>
        <div class="task-item__description">
          <BaseAuthorItem :author="task.authorEditor" v-if="task.dateEdited">
            <BaseTimeItem
              :text="'изменил(а)'"
              :time="task.dateEdited"
            ></BaseTimeItem>
          </BaseAuthorItem>
        </div>
      </div>
    </div>
    <div class="task-item__wrapper-dropdown-button">
      <DropdownButton>
        <BaseMenuItemDropdownButton
          @click.native="
            $router.push({
              name: 'createTask',
              params: { taskId: task._id },
            })
          "
          :className="'dropdown-menu__item'"
          :textMenu="'Редактировать'"
        ></BaseMenuItemDropdownButton>
        <BaseMenuItemDropdownButton
          :className="'dropdown-menu__item red'"
          :textMenu="'Удалить'"
          @click.native="toggleModalDelete"
        >
        </BaseMenuItemDropdownButton>
      </DropdownButton>
    </div>
    <BaseModal :showModal="showModalDelete">
      <ModalDelete
        :name="task.name"
        :id="task._id"
        :textModalDelete="'задачу'"
        @closeModal="toggleModalDelete"
        @delete="taskDelete"
      ></ModalDelete>
    </BaseModal>
  </div>
</template>

<script>
import DropdownButton from '@/components/DropdownButton/DropdownButton.vue';
import BaseMenuItemDropdownButton from '@/UI/BaseMenuItemDropdownButton/BaseMenuItemDropdownButton.vue';
import BaseBadgeStatus from '@/UI/BaseBadgeStatus/BaseBadgeStatus.vue';
import BaseAvatar from '@/UI/BaseAvatar/BaseAvatar.vue';
import BaseModal from '@/UI/BaseModal/BaseModal.vue';
import ModalDelete from '@/components/ModalDelete/ModalDelete.vue';
import BaseAuthorItem from '@/UI/BaseAuthorItem/BaseAuthorItem.vue';
import BaseTimeItem from '@/UI/BaseTimeItem/BaseTimeItem.vue';
import { mapActions } from 'vuex';

export default {
  name: 'TaskItem',
  components: {
    DropdownButton,
    BaseAvatar,
    BaseBadgeStatus,
    BaseMenuItemDropdownButton,
    BaseModal,
    ModalDelete,
    BaseAuthorItem,
    BaseTimeItem,
  },
  props: {
    task: {
      type: Object,
    },
    searchTasksValue: {
      type: String,
    },
  },
  data() {
    return {
      showModalDelete: false,
    };
  },
  methods: {
    toggleModalDelete() {
      this.showModalDelete = !this.showModalDelete;
    },
    ...mapActions('tasksModule', ['taskDelete']),
    highlight(content) {
      if (!this.searchTasksValue) {
        return content;
      }
      return content.replace(
        new RegExp(this.searchTasksValue, 'gi'),
        (match) => {
          return '<strong>' + match + '</strong>';
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/modules/TaskItem/TaskItem.scss';
</style>
