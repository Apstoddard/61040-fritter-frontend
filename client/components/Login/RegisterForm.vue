<!-- Form for registering an account (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'RegisterForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users',
      method: 'POST',
      hasBody: true,
      setUsername: true,
      setFirstName: true,
      setLastName: true,
      setBio: true,
      setEmail: true,
      setDateJoined: true,
      refreshAroundMe: true,
      fields: [
        {id: 'first_name', label: 'First Name', value: ''},
        {id: 'last_name', label: 'Last Name', value: ''},
        {id: 'email', label: 'Email', value: ''},
        {id: 'username', label: 'Username', value: ''},
        {id: 'password', label: 'Password', value: ''}
      ],
      title: 'Create account',
      callback: () => {
        const message = 'Successfully created an account!';
        this.$router.push({name: 'Around Me'});
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
