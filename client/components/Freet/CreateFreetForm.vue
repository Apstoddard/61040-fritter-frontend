<!-- Form for creating freets (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateFreetForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/freets',
      method: 'POST',
      hasBody: true,
      title: 'Create a freet',
      refreshFreets: true,
      fields: [
        {id: 'content', label: 'Content', value: ''},
        {id: 'circles', label: 'Circles', value: '', options: [{...this.$store.state.aroundMeCircle, title: "Around Me"}, ...this.$store.state.myCirclesCircles]}
      ],
      callback: () => {
        const message = 'Successfully created a freet!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
