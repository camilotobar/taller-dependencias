<template>
    <div>
        <v-card light elevation="5" max-width="400" justify="center" align="center">
            <v-card-title><h1>Inicio de Sesión</h1></v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field label="Email" type="email" v-model="email" outlined></v-text-field>
                    <v-text-field label="Password" type="password" v-model="password" outlined></v-text-field>
                    <router-link to="/register">¿No tienes cuenta? Regístrate.</router-link>
                </v-form>
            </v-card-text>
            <v-card-actions><v-btn @click="submitForm">Login</v-btn></v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: "Login",
        data() {
          return {
              email: '',
              password: '',
              dialog: false,
              dialogMessage: '',
          }
        },
        methods: {
            submitForm() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
                    this.$router.push('/dashboard');
                }).catch((error) => {
                    this.dialog = true;
                    this.dialogMessage = `Ocurrió un error: ${error.message}`;
                });
            },
        }
    }
</script>

<style scoped>

</style>
