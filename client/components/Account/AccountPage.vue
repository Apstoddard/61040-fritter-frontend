<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <header>
      <h1>
        @{{ $store.state.username }}
      </h1>
      <FritterButton 
        class="backButton"
        label="Back"
        back-icon
        @click.native="$router.go(-1)"
      />
    </header>
    <article class="accountSettings">
      <p><b>Name:</b> {{ $store.state.firstName }} {{ $store.state.lastName }}</p>
      <p><b>Email:</b> {{ $store.state.email }}</p>
      <p><b>Bio:</b> {{ $store.state.bio }}</p>
      <p><b>Date Joined:</b> {{ $store.state.dateJoined }}</p>
      <ChangeUsernameForm />
      <ChangeEmailForm />
      <ChangeBioForm />
      <ChangePasswordForm />
      <h2>Account management</h2>
      <LogoutForm />
      <DeleteAccountForm />
    </article>
  </main>
</template>

<script>
import ChangeUsernameForm from '@/components/Account/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import ChangeBioForm from '@/components/Account/ChangeBioForm.vue'
import ChangeEmailForm from '@/components/Account/ChangeEmailForm.vue'
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';
import LogoutForm from '@/components/Account/LogoutForm.vue';
import FritterButton from '@/components/common/FritterButton.vue'

export default {
  name: 'AccountPage',
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    ChangeBioForm,
    ChangeEmailForm,
    DeleteAccountForm,
    LogoutForm,
    FritterButton
  }
};
</script>

<style scoped>
header {
  position: fixed;
  height: 80px;
  width: calc(100% - 24px);
  background-color: white;
  z-index: 100;
}

.accountSettings {
  margin-top: 96px;
}

h1 {
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 700;
  font-size: 72px;
  color: #000000;
  text-transform: uppercase;
  margin: 0px;
  float: left;
  line-height: 80px;
}

.backButton {
  float: right;
  margin-right: 24px;
}

p, h2 {
  font-family: Helvetica;
}
h2 {
  margin-top: 64px;
}
</style>
