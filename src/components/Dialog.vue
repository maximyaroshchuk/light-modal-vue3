<template>
    <div
        ref="dialogElement"
        class="light-modal-dialog"
        :style="`width: ${width}px; height: ${height}px; top: ${top}px; left: ${left}px; background: ${backgroundColor}; color: ${contrastColor()}`"
    >
        <div
            class="light-modal-top-right-buttons"
        >
            <button
                :class="['light-modal-close-button', !closeIcon && 'light-modal-close-icon', getIconColorClass()]"
                :title="'Close'"
                @click="this.$modal.close()"
            >
                <i v-if="closeIcon" :class="closeIcon" />
            </button>
        </div>

        <div class="light-modal-content">
            <div
                :class="`light-modal-content-title ${draggableClass}`"
            >
                {{ title }}
            </div>

            <div
                ref="dialogBody"
                class="light-modal-body"
            >
                <slot name="content">
                </slot>
            </div>

            <slot name="buttons">
                <div
                    :class="`light-modal-buttons ${buttonsContainerClass}`"
                    :style="{ 'border-color': this.contrastColor() }"
                >
                    <template v-if="buttons" v-for="(button, index) in buttons" :key="index">
                        <button
                            v-bind="button.options"
                            type="button"
                            :class="button.class"
                            @click="button.click()"
                            v-html="button.text"
                        />
                    </template>
                    <button
                        type="button"
                        :style="{ color: contrastColor() }"
                        class="light-button-close"
                        @click="PluginCore.close();"
                    >
                        {{ closeButtonText }}
                    </button>
                </div>
            </slot>
        </div>

        <div v-if="resizable" class="light-modal-resizer-triangle"></div>
    </div>
</template>

<script>
import Draggable from '../utils/Draggable';
import Resizable from "../utils/Resizable";
import NormalizeContrast from "../utils/NormalizeContrast";
import PluginCore from "../PluginCore";

export default {
    name: 'Dialog',
    data() {
        return {
            top: 0,
            left: 0,
        };
    },
    props: {
        closeButtonText: {
            type: String,
        },
        backgroundColor: {
            type: String,
        },
        draggable: {
            type: Boolean,
        },
        resizable: {
            type: Boolean,
        },
        title: {
            type: String
        },
        height: {
            type: Number,
        },
        width: {
            type: Number,
        },
        closeIcon: {
            type: Boolean,
        },
        buttons: {
            type: Array,
        },
        buttonsContainerClass: {
            type: [Object, Array],
        },
    },
    mounted() {
        this.initModalPosition();
        if (this.draggable) {
            this.draggableUtility = new Draggable(this.$refs.dialogElement);
        }
        const resizerElement = document.querySelector('.light-modal-resizer-triangle');
        if (this.resizable) {
            this.resizableUtility = new Resizable(this.$refs.dialogElement, resizerElement, {
                minWidth: 150,
                minHeight: 200,
            });
        }
    },
    methods: {
        initModalPosition() {
            const updateModalPosition = () => {
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;

                this.left = (windowWidth - this.width) / 2;
                this.top = (windowHeight - this.height) / 2;
            };

            updateModalPosition();
            window.addEventListener('resize', updateModalPosition);
        },
        getIconColorClass() {
            const contrastInstance = new NormalizeContrast(this.backgroundColor);
            return contrastInstance.getContrastColor() === 'light' ? 'light-icon' : 'dark-icon';
        },
        contrastColor() {
            const contrastInstance = new NormalizeContrast(this.backgroundColor);
            return contrastInstance.getContrastColor() === 'light' ? '#000000' : '#ffffff';
        },
    },
    computed: {
        PluginCore() {
            return PluginCore
        },
        draggableClass() {
            return this.draggable ? 'draggable' : ''
        },
    }
};
</script>

<style scoped>
.light-modal-dialog {
    position: absolute;
    background: white;
    color: black;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    .light-modal-top-right-buttons {
        position: absolute;
        top: 16px;
        right: 16px;
        .light-modal-close-button {
            width: 24px;
            height: 24px;
            border: none;
            cursor: pointer;
            transition: .15s all;
            opacity: .5;

            &.dark-icon {
                filter: invert(1);
            }

            &:hover {
                opacity: .75;
            }

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                width: 24px;
                height: 24px;
            }
        }
        .light-modal-close-icon {
            background: transparent url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="red" xmlns="http://www.w3.org/2000/svg"><path d="M0.147157 0.313708L0.220157 0.229708C0.347146 0.102691 0.5155 0.0254629 0.694609 0.0120664C0.873718 -0.00133007 1.05169 0.0499944 1.19616 0.156708L1.28016 0.229708L7.75016 6.69871L14.2202 0.228708C14.2894 0.157109 14.3722 0.100012 14.4637 0.0607491C14.5552 0.0214861 14.6536 0.000843397 14.7532 2.53081e-05C14.8528 -0.000792781 14.9515 0.0182304 15.0437 0.0559845C15.1359 0.0937386 15.2196 0.149468 15.29 0.21992C15.3603 0.290373 15.416 0.374137 15.4537 0.466327C15.4913 0.558516 15.5103 0.657285 15.5093 0.756868C15.5084 0.856452 15.4877 0.954857 15.4483 1.04634C15.409 1.13783 15.3518 1.22056 15.2802 1.28971L8.81116 7.75971L15.2812 14.2297C15.408 14.3568 15.4851 14.5252 15.4983 14.7043C15.5115 14.8835 15.46 15.0614 15.3532 15.2057L15.2802 15.2897C15.1532 15.4167 14.9848 15.494 14.8057 15.5074C14.6266 15.5207 14.4486 15.4694 14.3042 15.3627L14.2202 15.2897L7.75016 8.82071L1.28016 15.2907C1.13864 15.4273 0.949154 15.5028 0.752507 15.501C0.555859 15.4992 0.367786 15.4202 0.228795 15.2811C0.0898038 15.142 0.0110156 14.9538 0.00940017 14.7572C0.00778469 14.5605 0.0834707 14.3711 0.220157 14.2297L6.68916 7.75971L0.219158 1.28971C0.0922895 1.16259 0.0152462 0.994176 0.00203351 0.81507C-0.0111792 0.635964 0.0403158 0.458063 0.147157 0.313708L0.220157 0.229708L0.147157 0.313708Z" fill="%231B2124"/></svg>') no-repeat center center;
        }
    }
    .light-modal-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 0;

        .light-modal-content-title {
            padding: 16px 16px 0 16px;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            &.draggable {
                cursor: move;
            }

            * {
                width: fit-content;
            }
        }

        .light-modal-body {
            overflow-y: auto;
            height: 100%;
            padding: 24px 16px;
        }
        .light-modal-buttons {
            display: flex;
            padding: 16px 16px 24px 16px;
            height: auto;
            flex: 0 1 auto;
            justify-content: flex-end;
            border-top: 1px solid #eee;

            .light-button-close {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 0 0.5em;
                font-size: 14px;
                border-radius: 4px;
                height: auto;
                min-height: 24px;
                transition: .15s all;
                background-color: transparent;
                border: 1px solid transparent;
                opacity: .5;

                &:hover {
                    opacity: .75;
                }
            }
        }
    }
}
.light-modal-resizer-triangle {
    position: absolute;
    width: 12px;
    height: 12px;
    bottom: 0;
    right: 0;

    &:after {
        display: block;
        position: absolute;
        content: '';
        background: transparent;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        cursor: se-resize;
        border-bottom: 10px solid #ddd;
        border-left: 10px solid transparent;
    }
}
</style>
