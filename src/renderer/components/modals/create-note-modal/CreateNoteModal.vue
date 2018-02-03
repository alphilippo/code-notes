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
          files: {},
          updatedAt: null,
          createdAt: null
        },
        files: [{
          name: '',
          language: 'text',
          content: ''
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
          this.note.files[file.name] = file;
        });

        this.note.createdAt = new Date();
        this.note.updatedAt = new Date();

        this.$store.dispatch('addNote', this.note).then(() => {
          this.$parent.close();
        });
      },
      addFile() {
        this.files.push({
          name: '',
          language: 'text',
          content: ''
        });
      },
      deleteFile(file) {
        this.files = this.files.filter(f => f !== file);
      }
    },
    computed: {
      isDisabled() {
        return (
          !/\S/.test(this.note.name) ||
          this.files.some(file => !/\S/.test(file.name) || !/\S/.test(file.language) || !/\S/.test(file.content))
        );
      },
    },
  };
</script>

<style src="./CreateNoteModal.scss" lang="scss">
</style>
