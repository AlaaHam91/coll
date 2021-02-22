<template>
  <div style="min-height: 20rem;">
    <v-container>
      <div style="min-height: 60vh;">
        <v-row class="mx-1">
          <v-col cols="12" md="3" v-for="(item, i) in items" :key="i">
            <v-card width="100%" min-height="5rem">
              <v-card-text
                class="d-flex justify-center align-center flex-column "
              >
                <template>
                  <v-icon v-html="iconType(item.type)"> </v-icon>
                </template>
                <div
                  class="text-caption  text-truncate"
                  style="max-width: 130px;"
                  v-text="item.name"
                ></div>
              </v-card-text>
              <v-card-actions class="d-flex justify-end mx-4">
                <v-btn
                  v-if="item.organizePermission"
                  :loading="deleteLoading && deletedIndex === item.id"
                  color="error"
                  icon
                  small
                  @click="deleteItem(item)"
                >
                  <v-icon> mdi-close-circle</v-icon>
                </v-btn>
                <v-btn
                  v-if="item.type == 'file'"
                  :disabled="downloaded && downloadedIndex === item.id"
                  icon
                  small
                  @click="downloadItem(item)"
                >
                  <v-icon> mdi-download-outline</v-icon>
                </v-btn>
                <v-btn
                  v-if="item.organizePermission"
                  icon
                  small
                  @click="updateItem(item)"
                >
                  <v-icon> mdi-pencil</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import api from "@/services/recipe/recipe.api";
export default {
  name: "recipes",
  data() {
    return {
      items: [],
      loading: false,
    };
  },

  methods: {
    load(payload = null) {
      this.loading = true;
      api
        .index(payload)
        .then((res) => {
          this.items = res;
        }).catch(()=>{})
        .finally(() => (this.loading = false));
    },
  },
  created() {
    this.load();
  },
};
</script>

<style></style>
