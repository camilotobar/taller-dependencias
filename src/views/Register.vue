<template>
    <div>
        <v-card light justify="center" align="center" max-width="400">
            <v-card-title><h1>Registro</h1></v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field label="Nombre" v-model="firstName" outlined></v-text-field>
                    <v-text-field label="Apellido" v-model="lastName" outlined></v-text-field>
                    <v-text-field label="Email" type="email" v-model="email" outlined></v-text-field>
                    <v-text-field label="Contraseña" type="password" v-model="password" outlined></v-text-field>
                    <v-select :items="appDepartments" label="Dependencia" outlined></v-select>
                </v-form>
            </v-card-text>
            <v-card-actions><v-btn @click="submitForm">Submit</v-btn></v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: "Register",
        beforeMount(){
            this.getDependencies();
        },
        data() {
            return {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                department: '',
                appDepartments: [],
            }
        },
        methods: {
            getDependencies() {
                firebase.firestore().collection('dependencies').get().then((querySnapshot) => {
                    querySnapshot.forEach((i) => {
                        this.appDepartments.push(i.data().name)
                    });
                });
            },
            submitForm() {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then((response)=> {
                        firebase.firestore().collection('users').add({
                            firstName: this.firstName,
                            lastName: this.lastName,
                            email: this.email,
                            dependency: this.department,
                        });
                        this.$router.push('/dashboard');
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            },
        }
    }
</script>

<style scoped>

</style>
