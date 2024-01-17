<template>
    <Container v-if="show">
        <Dialog
            ref="dialog"
            :name="name"
            :title="title"
            :draggable="draggable"
            :resizable="resizable"
            :width="width"
            :height="height"
            :background-color="background"
            :buttons="buttons"
            :close-button-text="dcbText"
            :top-close-icon-container-class="tcicClass"
            :close-icon-class="tciClass"
            :buttons-container-class="bbcClass"
            @before-open="executeCallback"
            @after-open="executeCallback"
            @before-close="executeCallback"
            @after-close="executeCallback"
            @on-submit="executeCallback"
        >
            <template v-slot:content>
                <slot name="content"></slot>
            </template>
        </Dialog>
    </Container>
</template>
<script>
import Dialog from '../components/Dialog.vue';
import Container from '../components/Container.vue';
import pluginCore from '../PluginCore';

export default {
    name: 'LightModal',
    data() {
      return {
          show: pluginCore.modals[this.$props.name] || false,
      }
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        bbcClass: {
            type: [Array, Object],
            default() {
                return [];
            },
        },
        tcicClass: {
            type: String,
        },
        tciClass: {
            type: String,
        },
        dcbText: {
            type: String,
            default: 'Close'
        },
        buttons: {
            type: Array,
        },
        background: {
            type: String,
            default: '#ffffff'
        },
        title: {
            type: String
        },
        draggable: {
            type: Boolean,
            default: false,
        },
        resizable: {
            type: Boolean,
            default: false,
        },
        height: {
            type: Number,
            default: 350,
        },
        width: {
            type: Number,
            default: 400,
        },
    },
    components: {
        Container,
        Dialog,
    },
    created() {
        window.addEventListener('modal-open', this.open);
        window.addEventListener('modal-close', this.close);
    },
    methods: {
        open(event) {
            const name = event.detail.name;

            if (name === this.name) {
                this.$emit("before-open");
                this.show = true;
                this.$emit("after-open");
            }
        },
        close(event) {
            const name = event.detail.name;

            if (name === this.name) {
                const forms = this.$refs.dialog?.$el?.querySelectorAll('form');

                if (forms && forms.length > 0) {
                    let isValid = true;

                    forms.forEach((form) => {
                        if (!form.checkValidity()) {
                            form.reportValidity();
                            isValid = false;
                        }
                    });

                    if (isValid) {
                        forms.forEach((form) => {
                            form.submit();
                        });

                        this.show = false;
                        this.$emit("on-submit");
                    }
                } else {
                    this.$emit("before-close");
                    this.show = false;
                    this.$emit("after-close");
                }
            }
        },
        executeCallback(callback) {
            if (callback && typeof callback === 'function') {
                callback();
            }
        },
    },
    computed: {
        pluginCore() {
            return pluginCore;
        },
    },
    destroyed() {
        window.removeEventListener('modal-open', this.open);
        window.removeEventListener('modal-close', this.close);
    },
};
</script>