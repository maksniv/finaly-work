<template>
  <div class="project-item">
    <div class="project-item__project">
      <div
        v-html="highlight(project.name)"
        class="project-item__name"
        @click="
          $router.push({
            name: 'mainTasks',
            params: { pageNumber: 1, projectId: project._id },
          })
        "
      ></div>
      <div class="project-item__wrapper">
        <div class="project-item__description">
          <span
            class="project-item__number"
            v-html="highlight(project.code)"
          >
          </span>
          <BaseAuthorItem :author="project.author">
            <BaseTimeItem
              :text="'создал(а)'"
              :time="project.dateCreated"
            ></BaseTimeItem>
          </BaseAuthorItem>
        </div>
        <div class="project-item__description">
          <BaseAuthorItem
            :author="project.authorEdited"
            v-if="project.dateEdited"
          >
            <BaseTimeItem
              :text="'изменил(а)'"
              :time="project.dateEdited"
            ></BaseTimeItem>
          </BaseAuthorItem>
        </div>
      </div>
    </div>
    <div class="project-item__wrapper-dropdown-button">
      <DropdownButton>
        <BaseMenuItemDropdownButton
          :className="'dropdown-menu__item'"
          :textMenu="'Редактировать'"
          @click.native="toggleModalEdit"
        ></BaseMenuItemDropdownButton>
        <BaseMenuItemDropdownButton
          :className="'dropdown-menu__item red'"
          :textMenu="'Удалить'"
          @click.native="toggleModalDelete"
        >
        </BaseMenuItemDropdownButton>
      </DropdownButton>
    </div>
    <BaseModal :showModal="showModalEditProject">
      <ModalProjectEdit
        :codeProject="project.code"
        :nameProject="project.name"
        :id="project._id"
        @closeModal="toggleModalEdit"
        @editProject="projectEdit"
        @createProject="projectCreate"
      ></ModalProjectEdit>
    </BaseModal>
    <BaseModal :showModal="showModalDelete">
      <ModalDelete
        :name="project.name"
        :id="project._id"
        :textModalDelete="'проект'"
        @closeModal="toggleModalDelete"
        @delete="projectDelete"
      ></ModalDelete>
    </BaseModal>
  </div>
</template>

<script>
import DropdownButton from '@/components/DropdownButton/DropdownButton.vue';
import BaseMenuItemDropdownButton from '@/UI/BaseMenuItemDropdownButton/BaseMenuItemDropdownButton.vue';
import BaseModal from '@/UI/BaseModal/BaseModal.vue';
import ModalDelete from '@/components/ModalDelete/ModalDelete.vue';
import ModalProjectEdit from '@/components/ModalProjectEdit/ModalProjectEdit.vue';
import BaseAuthorItem from '@/UI/BaseAuthorItem/BaseAuthorItem.vue';
import BaseTimeItem from '@/UI/BaseTimeItem/BaseTimeItem.vue';
import { mapActions } from 'vuex';

export default {
  name: 'ProjectItem',
  components: {
    DropdownButton,
    BaseMenuItemDropdownButton,
    BaseModal,
    ModalDelete,
    ModalProjectEdit,
    BaseAuthorItem,
    BaseTimeItem,
  },
  props: {
    project: {
      type: Object,
    },
    searchProjectValue: {
      type: String,
    },
  },
  data() {
    return {
      showModalEditProject: false,
      showModalDelete: false,
    };
  },
  methods: {
    toggleModalEdit() {
      this.showModalEditProject = !this.showModalEditProject;
    },
    toggleModalDelete() {
      this.showModalDelete = !this.showModalDelete;
    },
    ...mapActions('projectsModule', [
      'projectCreate',
      'projectDelete',
      'projectEdit',
    ]),
    highlight(content) {
      if (!this.searchProjectValue) {
        return content;
      }
      return content.replace(
        new RegExp(this.searchProjectValue, 'gi'),
        (match) => {
          return '<strong>' + match + '</strong>';
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/modules/ProjectItem/ProjectItem.scss';
</style>
