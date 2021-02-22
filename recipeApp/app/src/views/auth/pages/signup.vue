<template>
  <v-img
    :src="background"
    gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
  >
    <v-container id="section-top">
      <v-row v-for="(item, i) in messages" :key="i" no-gutters>
        <v-col cols="12" md="4">
          <v-alert
            icon="mdi-information"
            color="red"
            type="error"
            v-text="item"
            dense
          ></v-alert>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-card class="pa-1" elevation="2">
            <v-card-text>
              <div
                class="text--left text-body-1 black--text mb-16"
                v-text="$t('signupIns')"
              ></div>
              <v-row>
                <v-col cols="12" md="6">
                  <div
                    class="text-body-2 black--text mb-2"
                    v-text="$t('username')"
                  ></div>
                  <v-text-field
                    :placeholder="$t('username')"
                    v-model="username"
                    outlined
                    dense
                    :error-messages="usernameErrors"
                    autocomplete="off"
                    spellcheck="off"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <div
                    class="text-body-2 black--text mb-2"
                    v-text="$t('email')"
                  ></div>
                  <v-text-field
                    :placeholder="$t('email')"
                    v-model="email"
                    outlined
                    dense
                    :error-messages="emailErrors"
                    autocomplete="off"
                    spellcheck="off"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <div
                    class="text-body-2 black--text mb-2"
                    v-text="$t('password')"
                  ></div>
                  <v-text-field
                    :placeholder="$t('password')"
                    v-model="password"
                    type="password"
                    outlined
                    dense
                    :error-messages="passwordErrors"
                    autocomplete="off"
                    spellcheck="off"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <div
                    class="text-body-2 black--text mb-2"
                    v-text="$t('passwordConfirm')"
                  ></div>
                  <v-text-field
                    :placeholder="$t('passwordConfirm')"
                    v-model="confirm"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @change="$v.confirm.$touch()"
                    @blur="$v.confirm.$touch()"
                    outlined
                    dense
                    :error-messages="confirmErrors"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="d-flex flex-column justify-center">
              <v-btn color="primary" v-text="$t('signup')" @click="signup">
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<script>
import { required, sameAs, email } from "vuelidate/lib/validators";
import api from "@/services/api/auth/auth.api.js";

export default {
  name: "signup",

  data() {
    return {
      messages: [],
      showPassword: false,
      background: require("@/assets/signup.jpg"),
      //
      username: null,
      email: null,
      password: null,
      confirm: null,
    };
  },

  validations: {
    username: { required },
    email: { required, email },
    password: { required },
    confirm: {
      sameAsPassword: sameAs("password"),
      required,
    },
  },

  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push(this.$t("required"));
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push(this.$t("required"));
      !this.$v.email.email && errors.push(this.$t("emailNotValid"));
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push(this.$t("required"));
      return errors;
    },
    confirmErrors() {
      const errors = [];
      if (!this.$v.confirm.$dirty) return errors;
      !this.$v.confirm.required && errors.push(this.$t("required"));
      !this.$v.confirm.sameAsPassword &&
        errors.push(this.$t("passwordConfirmRule"));
      return errors;
    },
  },

  methods: {
    signup() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$notify({
          text: this.$t("checkInputs"),
          type: "warning",
        });
        return;
      }
      let data = {
        user_name: this.username,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm,
      };
      api
        .signup(data)
        .then(() => this.$router.push({ name: "signin" }))
        .catch((res) => {
          this.messages = Array.isArray(res.data.message)
            ? res.data.message
            : [res.data.message];
          this.$vuetify.goTo("#section-top");
        });
    },
  },
};
</script>

<style></style>
