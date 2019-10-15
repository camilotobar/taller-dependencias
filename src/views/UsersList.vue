<template>
    <v-content>
        <v-row>
            <v-col :key="i" v-for="(user, i) in users" cols="12">
                <v-card>
                    <v-card-title>{{ user.firstName }} {{ user.lastName }}</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="10">
                                <p>Email: {{ user.email }}</p>
                                <p>Dependencia: {{ user.dependency }}</p>
                                <p>Activo: {{ user.active }}</p>
                            </v-col>
                            <v-col cols="1">
                                <v-btn @click="editUser(i)"><v-icon class="icon-btn">mdi-pencil</v-icon></v-btn>
                            </v-col>
                            <v-col cols="1">
                                <v-btn @click="removeUser(i)"><v-icon class="icon-btn">mdi-delete</v-icon></v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-overlay :value="dialog">
            <v-card class="pa-5" light>
                <v-card-title>Editar Usuario</v-card-title>
                <v-card-text>
                    <v-text-field label="Nombre" v-model="currentUser.firstName" outlined></v-text-field>
                    <v-text-field label="Apellido" type="number" v-model="currentUser.lastName" outlined></v-text-field>
                    <v-select :items="dependencies" label="Dependencia" v-model="currentUser.department" outlined></v-select>
                    <v-select :items="[true, false]" label="Activo" outlined></v-select>
                    <v-btn class="mr -2" color="error" @click="dialog = false"> Cancelar </v-btn>
                    <v-btn class="ml-2" color="success" @click="saveUserEdit"> Guardar </v-btn>
                </v-card-text>
            </v-card>
        </v-overlay>
    </v-content>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: "UsersList",
        props: {
            users: Array,
            dependencies: Array,
        },
        data(){
          return {
              dialog: false,
              currentUser: {
                  firstName: '',
                  lastName: '',
                  department: '',
                  active: false,
              }
          };
        },
        methods: {
            editUser(i) {
                this.dialog = true;
            },
            removeUser(i) {

            },
            saveUserEdit(i) {
                firebase.firestore().collection("users").where("uid", "==", payload.uid)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            console.log(doc.id, " => ", doc.data());
                            // Build doc ref from doc.id
                            firebase.firestore().collection("users").doc(doc.id).update({foo: "bar"});
                        });
                    })
            },
        },
    }
</script>

<style scoped>
    .icon-btn {
        color: white;
    }
</style>
