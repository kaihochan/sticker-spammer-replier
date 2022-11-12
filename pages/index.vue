<template>
  <v-app>
    <v-main class="d-flex align-center">
      <v-container class="d-flex justify-center">
        <v-card
          class="pa-6 ma-2 text-center"
          variant="outlined"
          max-width="650"
        >
          <v-card-title>
            Sticker Spammer Replier
          </v-card-title>

          <v-card-subtitle class="text-left">
            This tool is designed to deal with my sticker spamming friend, nothing more.
          </v-card-subtitle>

          <v-img 
            class="text-left mt-4"
            :src="generatedImage"
            max-height="600"
            alt="Generated image"
            contain
          >
          </v-img>

          <v-text-field
            v-model="name"
            @update:model-value="updateImage()"
            class="px-2 pt-5 pb-2 ma-2"
            variant="outlined"
            label="Insert name here"
          ></v-text-field>

          <v-file-input
            v-model="uploadedImages"
            @update:model-value="updateSticker()"
            class="px-2 pt-0 pb-2 ma-2"
            variant="outlined"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            truncate-length="15"
            label="Insert picture here"
            show-size
          ></v-file-input>

          <v-btn
            class="mr-8"
            variant="outlined"
            color="blue"
            prepend-icon="mdi-download"
            :href="generatedImage"
            download="shut-up-and-die.png"
          >
            DOWNLOAD
          </v-btn>

          <v-btn
            @click="reset()"
            class="mr-8"
            variant="outlined"
            color="red"
            prepend-icon="mdi-delete-empty"
          >
            RESET
          </v-btn>

          <v-footer 
            class="px-2 pt-5"
            color="transparent"
            padless
          >
            <v-col
              class="text-center"
              cols="12"
            >
              {{ new Date().getFullYear() }} — <strong>John K. H. Chan</strong>
            </v-col>
          </v-footer>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from 'vue'

export default {
  data() {
    return {
      generatedImage: null,
      uploadedImages: [],
      stickerURL: undefined,
      name: 'Your idiotic friend',
      rules: [
        value => !value || value.size < 10000000 || 'Sticker size should be less than 10 MB!',
      ],
    }
  },

  beforeMount() {
    this.updateImage()
  },

  methods: {
    updateImage() {
      let canvas = document.createElement('canvas')
      canvas.width = 800
      canvas.height = 600

      let context = canvas.getContext('2d')

      let template = new Image()
      template.src = 'img/template.png'

      let sticker = new Image()
      if (this.stickerURL != undefined)
        sticker.src = this.stickerURL

      template.onload = async () => {
        context.drawImage(template, 0, 0, canvas.width, canvas.height)
        context.fillStyle = "black"
        context.font = `60px sans-serif`
        context.fillText("No one:", 20, 70)
        context.fillText(`${this.name}:`, 20, 140)

        if (sticker.src != '')
          sticker.onload = async () => {
            context.drawImage(sticker, 400, 175, sticker.width/(sticker.height/150), 150)
            this.generatedImage = ref(canvas.toDataURL())
          }
        else 
          this.generatedImage = ref(canvas.toDataURL())
      }
    },

    updateSticker() {
      this.stickerURL = this.uploadedImages.length === 0 ? undefined : URL.createObjectURL(this.uploadedImages[0])
      this.updateImage()
    },

    reset() {
      this.stickerURL = undefined
      this.name = "Your idiotic friend"
      this.updateImage()
    },
  }
};
</script>