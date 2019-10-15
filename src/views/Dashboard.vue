<template>
    <div>
        <v-content>
            <v-row>
                <v-col cols="6">
                    <h1>Aplicación de Dependencias</h1>
                </v-col>
                <v-col cols="3">
                    <v-select :items="dependencies" label="Selecciona una dependencia" v-model="selectedDependecy" @change="selectDependency" outlined></v-select>
                </v-col>
                <v-col cols="3">
                    <v-btn @click="showDependencyDialog">Agregar Dependencia</v-btn>
                </v-col>
            </v-row>
            <v-divider class="my-7"></v-divider>
            <h2>Usuarios</h2>
            <v-row>
                <UsersList :users="users" :dependencies="dependencies"></UsersList>
            </v-row>
            <v-divider class="my-7"></v-divider>
            <v-row>
                <h4>Camilo Tobar - Iván Chacón</h4>
            </v-row>

            <v-overlay :value="dialog">
                <v-card class="pa-5" light>
                    <v-card-title>Agregar Dependencia</v-card-title>
                    <v-card-text>
                        <v-text-field label="Nombre de la dependencia" v-model="dependencyName" outlined></v-text-field>
                        <v-text-field label="Máximo de usuarios" type="number" v-model="dependencyMax" outlined></v-text-field>
                        <v-text-field label="Ubicación" v-model="dependencyLocation" outlined></v-text-field>
                        <v-btn class="mr -2" color="error" @click="dialog = false"> Cancelar </v-btn>
                        <v-btn class="ml-2" color="success" @click="addDependency"> Agregar </v-btn>
                    </v-card-text>
                </v-card>
            </v-overlay>
        </v-content>
    </div>
</template>

<script>
    import UsersList from "./UsersList";
    import firebase from 'firebase';

    export default {
        name: "Dashboard",
        components: {UsersList},
        created(){
            this.getUsers();
            this.getDependencies();
        },
        data() {
            return {
                users: [],
                dependencies: [],
                selectedDependecy: '',
                dependencyName: '',
                dependencyMax: 0,
                dependencyLocation: '',
                dialog: false,
            }
        },
        methods: {
            getUsers() {
                firebase.firestore().collection('users').get().then((querySnapshot)=>{
                    querySnapshot.forEach((i) => {
                        console.log(i);
                        this.users.push(i.data());
                    });
                });
            },
            getDependencies() {
                firebase.firestore().collection('dependencies').get().then((querySnapshot) => {
                    querySnapshot.forEach((i) => {
                        this.dependencies.push(i.data().name)
                    });
                });
            },
            selectDependency() {
                this.users = [];
                console.log(this.selectedDependecy);
                firebase.firestore().collection('users').where('dependency', '==', this.selectedDependecy).get().then((querySnapshot) => {
                    querySnapshot.forEach((i)=>{
                        this.users.push(i.data());
                    })
                })
            },
            showDependencyDialog() {
                this.dialog = true;
            },
            addDependency() {

                this.dialog = false;
            },
        },
    }
</script>

<style scoped>

</style>
