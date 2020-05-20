<template>
  <div>
    <v-jumbotron
      :gradient="gradient"
      dark
      src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
      >
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3">Welcome to the Hub Tracker</h3>

            <p class="subheading" style="max-width: 800px">Everything you need to start a Project and get the Job done all in one place. We create a conveinent working space best for you! Every Idea need a Place and Shub get you that</p>

            <v-divider class="my-3"></v-divider>

            <div class="title mb-3">Check out our newest features!</div>

            <v-btn
              class="mx-0"
              color="primary"
              large
            >
              Get Started
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    
    <v-container>
      <div style="display: flex" class="pb-3 mt-3"><h1 class="display-1 font-weight-bold">Recent Hub Usage</h1> <v-spacer/> <v-btn color="primary" @click="addDialog = true">Add Record</v-btn><v-btn color="success" icon @click="getRecords"><v-icon>refresh</v-icon></v-btn></div>
      <div v-if="usageData.length > 0" style="min-height: 300px">
        <v-data-table
          :headers="headers"
          :items="usageData"
          :loading="true"
          class="elevation-1">
          <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
          <template v-slot:items="props">
            <td class="subheading">{{ props.item.date.split('T')[0] }}</td>
            <td class="text-xs-left subheading font-weight-bold pointer">{{ props.item.username }}</td>
            <td class="text-xs-left subheading">{{ props.item.email }}</td>
            <td class="text-xs-left subheading">{{ props.item.mobile }}</td>
            <td class="text-xs-left subheading">{{ props.item.package }}</td>
            <td class="text-xs-left subheading">&#8358;{{ props.item.amount }}</td>
          </template>
        </v-data-table>
      </div>

      <div v-else class="py-5 my-3 text-xs-center elevation-1" style="width: 100%; background: #fff">
        <v-progress-circular
          :width="5"
          size="70"
          color="red"
          indeterminate
        ></v-progress-circular>
        <p class="headline mt-4">Please wait...</p>
      </div>
    </v-container>

    <v-dialog v-model="addDialog" persistent max-width="600px">
      <v-form @submit="addRecord" ref="usageForm">
        <v-card>
          <v-card-title>
            <span class="headline">Add new Hub Usage</span>
          </v-card-title>
          <v-card-text>
              <v-container>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field label="Full Name*" v-model="record.username" :rules="$store.state.inputRules" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field type="email" v-model="record.email" :rules="$store.state.emailRules" label="Email*" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Mobile Number*" v-model="record.mobile" :rules="$store.state.mobileRules" type="number" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Address*" v-model="record.address" :rules="$store.state.inputRules" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-select
                      v-model="record.package"
                      :rules="$store.state.inputRules"
                      :items="['Co-working Space', 'Conference Rooms', 'Private Office', 'Virtual Office']"
                      menu-props="offsetY"
                      label="Hub Package Used*"
                      required
                    ></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="record.amount" label="Amount Paid*" :rules="$store.state.inputRules" type="number" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="record.date"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="record.date"
                          label="Day/Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="record.date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(record.date)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="addDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" dark type="submit" :loading="loader">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data: () => ({
      gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
      headers: [
        {
          text: 'Days/Date',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Customer Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Mobile', value: 'mobile' },
        { text: 'Package Used', value: 'package' },
        { text: 'Amount Paid', value: 'price' }
      ],
      usageData: [],
      modal: false,
      addDialog: false,
      loader: false,
      record: {
        username: "",
        email: "",
        mobile: "",
        address: "",
        package: "",
        amount: "",
        date: new Date().toISOString().substr(0, 10)
      }
    }),
    methods: {
      addRecord(e) {
        e.preventDefault()
            
        if(this.$refs.usageForm.validate()){
            this.loader = true

            let temp = JSON.parse(JSON.stringify(this.record))

            this.$axios.post(this.$baseUrl+'/activity/add', this.record)
            .then(res => {
              console.log(res);
              this.$store.dispatch('setSnackText', "Record added!")
              this.usageData.push(temp);
            })
            .catch(err => {
              console.log(err);
              this.$store.dispatch('setSnackText', "Error: Unable to complete request!")
            })
            .finally(() => {
              this.loader = false
              this.addDialog = false

              this.$refs.usageForm.reset()
              this.$refs.usageForm.resetValidation()
            })
        }
      },
      getRecords() {
        this.usageData = []

        this.$store.dispatch('setSnackText', "Connecting to server...")

        this.$axios.get(this.$baseUrl+'/activity/')
        .then(res => {
          if (res.length < 1) {
            this.$store.dispatch('setSnackText', "No record found!")
          } else {
            this.$store.dispatch('setSnackText', "Records Loaded!")
          }
          this.usageData = res.data
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch('setSnackText', "Error: Unable to complete request!")
        })
      }
    },
    created() {
      this.getRecords()
    }
  };
</script>

<style type="text/css" scoped>
  .pointer {
    cursor: pointer;
  }
  .pointer:hover {
    background: #f5f5f5;
  }
</style>