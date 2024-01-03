<template>
    <HelloWorld msg="The ray-modal-v3 website is coming soon!" />
    <button @click="openModal">Open Modal</button>
    <l-modal :title="'Some title'" :buttons="button">
        <template v-slot:content>
            Some content
        </template>
    </l-modal>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
    data() {
        return {
            buttons: [
                {
                    text: 'Some btn text',
                    class: 'btn btn-danger'
                }
            ]
        }
    },
    components: {
        HelloWorld
    },
    methods: {
        openModal() {
            this.$modal.open();
        }
    },
}
</script>
