<template src="./NotesList.html">
</template>

<script>
import Vuex from 'vuex';
import NoteCard from './note-card/NoteCard';
import CreateNoteModal from '../modals/create-note-modal/CreateNoteModal';

export default {
  name: 'cb-notes-list',
  components: {
    'cb-note-card': NoteCard,
    'cb-create-note-modal': CreateNoteModal,
  },
  data() {
    return {
      searchField: '',
      createNoteModalActive: false,
    };
  },
  mounted() {},
  methods: {},
  computed: {
    ...Vuex.mapGetters(['notes', 'noteById', 'languageSelected']),
    notesFiltered() {
      const notesFiltered = this.notes.filter(item =>
        this.searchField
          .split(' ')
          .every(
            el =>
              item.name.toLowerCase().indexOf(el.toLowerCase()) > -1 ||
              item.description.toLowerCase().indexOf(el.toLowerCase()) > -1 ||
              item.language.toLowerCase().indexOf(el.toLowerCase()) > -1
          )
      );

      if (this.languageSelected !== 'all') {
        return notesFiltered.filter(
          note => note.language === this.languageSelected
        );
      }

      return notesFiltered;
    },
  },
  beforeRouteEnter(route, redirect, next) {
    next(vm => {
      vm.$store.dispatch('loadNotes');
    });
  },
};
</script>

<style src="./NotesList.scss" lang="scss">
</style>
