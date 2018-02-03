<template src="./CreateNoteModal.html">
</template>

<script>
import editor from '../../editor/Editor';
import languages from '../../../assets/data/languages.json';

export default {
  name: 'cn-create-note-modal',
  components: {
    editor,
  },
  data() {
    return {
      note: {
        name: '',
        description: '',
        files: {}
      },
      files: [{
        language: 'text',
        content: 'toto'
      }],
      languages
    };
  },
  mounted() {
    this.$refs.noteName.focus();
  },
  methods: {
    createNote() {
      this.files.forEach(file => {
        this.note.files[this.note.name] = file;
      });

      this.$store.dispatch('addNote', this.note).then(() => {
        this.$parent.close();
      });
    },
  },
  computed: {
    isDisabled() {
      return (
        !/\S/.test(this.note.name) ||
        !/\S/.test(this.note.language) ||
        !/\S/.test(this.note.content)
      );
    },
  },
};
</script>

<style src="./CreateNoteModal.scss" lang="scss">
</style>
