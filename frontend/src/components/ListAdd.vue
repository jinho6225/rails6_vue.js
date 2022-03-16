<template>
    <div>
        <b-form-textarea
        id="textarea"
        v-model="text"
        placeholder="Enter todo..."        
        ></b-form-textarea>
        <b-button variant="success" @click="listAdd">Add list</b-button>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        text: null
      }
    },
    methods: {
        listAdd() {
            if (this.text === null) {
                alert('please enter todo')
            } 
            else {
                this.$emit("listAdd", this.text)
            }
        }
    }
  }
</script>