<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-row>
          <v-col cols="1"></v-col>
          <v-col cols="10">
            <router-view/>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
      </v-content>
    </v-app>
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

  h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 25px;
  }
  * {
    font-family: 'Montserrat', sans-serif;
    font-size: 17px;
  }
  button {
    color: black !important;
    border: 1px solid black !important;
  }
</style>
