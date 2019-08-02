<template>
  <div class="container">
    <div class="card">
      <div class="card-title">
        <h3>Chat Group</h3>
        <hr />
      </div>
      <b-card v-for="msg in messages" :key="msg.message">
        <p>{{msg.message}}</p>
        <p>{{msg.user}}</p>
      </b-card>
    </div>
    <div class="card mt-3 p-3" v-if="activeChat">
      <form @submit.prevent="sendMessage">
        <div class="row">
          <div class="form-group col">
            <label for="message">Message:</label>
            <input type="text" v-model="message" class="form-control" />
          </div>
        </div>
        <div class="row">
          <div class="col text-center">
            <button type="submit" class="btn btn-success">Enviar mensagem</button>
          </div>
        </div>
      </form>
    </div>
    <div v-else>
      <div class="form-group col">
        <label for="user">Nome de usuário:</label>
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
