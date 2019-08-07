<template>
  <div class="container">
    <div class="text-center">
      <h3 class="mt-3">Real-time chat application with NodeJs, Socket.io and Vue.js demo</h3>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <b-card
          no-body
          class="mt-3 pb-0 primary"
          v-for="msg in messages"
          :key="msg.message"
          :header="msg.message"
        >
          <b-card-text>
            <p class="mb-0 pl-3">
              <em>
                <small>User: {{msg.user}}</small>
              </em>
            </p>
          </b-card-text>
        </b-card>
      </div>
    </div>
    <div class="mt-3" v-if="activeChat">
      <form @submit.prevent="sendMessage">
        <div class="row">
          <div class="input-group m-3">
            <input
              type="text"
              class="form-control"
              v-model="message"
              placeholder="Type your message"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <div class="input-group-append">
              <button class="btn btn-primary" type="submit" id="button-addon2">Send</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="card p-5" v-else>
      <div class="form-group col">
        <label for="user">Username</label>
        <input type="text" v-model="user" class="form-control" />
      </div>
      <div class="from-group col">
        <button class="btn btn-success" @click="initChat()">Entrar no chat</button>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
export default {
  data () {
    return {
      user: '',
      message: '',
      messages: '',
      activeChat: false,
      socket: io('localhost:3001')
    }
  },
  mounted () {
    this.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
    });
  },
  methods: {
    sendMessage (e) {
      e.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message
      });
      this.message = ''
    },
    initChat () {
      if (this.user)
        this.activeChat = true
      else
        alert('Digite um nome de usuário')
    }
  },
}
</script>

<style>
</style>
