<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <div class="login-logo">
            <img :src="logoEdupia" alt="Ionic logo" />
        </div>
  
        <form novalidate @submit.prevent="onLogin">
          <ion-list>
            <ion-item>
              <ion-input
                label="Username"
                labelPlacement="stacked"
                v-model="formData.username"
                name="username"
                type="text"
                :spellcheck="false"
                autocapitalize="off"
                required
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                labelPlacement="stacked"
                label="Password"
                v-model="formData.password"
                name="password"
                type="password"
                required
              ></ion-input>
            </ion-item>
          </ion-list>
  
          <ion-row responsive-sm class="ion-padding">
            <ion-col>
              <ion-button :disabled="!canSubmit" type="submit" expand="block"
                >Login</ion-button
              >
            </ion-col>
          </ion-row>
        </form>
        <ion-toast
          :is-open="showToast"
          :message="toastMessage"
          :duration="2000"
        ></ion-toast>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { computed, ref, reactive } from "vue";
  import logoEdupia from '@/images/logo/edupia.png';
  import AuthService from '@/service/AuthService';
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonTitle,
    IonRow,
    IonCol,
    IonInput,
    IonToast,
    alertController
  } from "@ionic/vue";
  
  const showToast = ref(false);
  const toastMessage = ref("");

  const formData = reactive({
    username: '',
    password: ''
});
  
const canSubmit = computed(
  () => formData.username.trim() !== "" && formData.password.trim() !== ""
);
  
const onLogin = () => {
    new AuthService().login(formData.username, formData.password)
        .catch((error) => {
            presentAlert();
        });
};

const presentAlert = async () => {
    const alert = await alertController.create({
      header: 'Đăng nhập sai',
      subHeader: 'Vui lòng thử lại',
      message: "",
      buttons: ['Đóng'],
    });

    await alert.present();
  };
  </script>

<style scoped>
.login-logo {
  padding: 20px 0;
  min-height: 200px;
  text-align: center;
}

.login-logo img {
  max-width: 150px;
}

.list {
  margin-bottom: 0;
}
</style>@/services-2/AuthService@/service/AuthService