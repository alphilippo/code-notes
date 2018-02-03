<template src="./UpdateNoteModal.html">

</template>

<script>
import editor from '../../editor/Editor';
import languages from '../../../assets/data/languages.json';

export default {
  name: 'cb-update-note-modal',
  components: {
    editor,
  },
  props: {
    note: Object,
  },
  data() {
    return {
      code: '',
      noteUpdated: {
        name: '',
        description: '',
        language: '',
        content: '',
        // tags: []
      },
      languages
    };
  },
  mounted() {
    this.$refs.noteName.focus();
    this.code = Object.assign(this.note.content, {});
    this.noteUpdated = { ...this.note };
  },
  methods: {
    updateNote() {
      this.noteUpdated.content = this.code;
      this.$store.dispatch('updateNote', this.noteUpdated).then(() => {
        this.$store.dispatch('loadNotes');
        this.$parent.close();
      });
    },
  },
  computed: {
    isDisabled() {
      return (
        !/\S/.test(this.noteUpdated.name) ||
        !/\S/.test(this.noteUpdated.language) ||
        !/\S/.test(this.code)
      );
    },
  },
};
</script>

<style src="./UpdateNoteModal.scss" lang="scss">
</style>
