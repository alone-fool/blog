<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col md="4" class="my-1">
        <b-form-group label-cols-sm="2" label="搜索" class="mb-0 text-center">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Search"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      bordered
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      @filtered="onFiltered"
      class="mt-2 text-center"
    >
      <template slot="title" slot-scope="row">
        <router-link :to="`/show/id=${row.item.id}`">{{ row.value }}</router-link>
      </template>
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click.once="remove( row.item, row.index )" class="mr-1">删除</b-button>
        <b-button size="sm" @click="edit(row.item, row.index)">编辑</b-button>
      </template>
    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
import qs from 'qs'
  export default {
    data() {
      return {
        items: [],
        fields: [
          { key: 'id', label: 'id', sortable: true, sortDirection: 'desc' },
          { key: 'title', label: '文章标题' },
          { key: 'timer', label: '发布时间' },
          { key: 'view', label: '浏览次数' },
          { key: 'actions', label: '执行操作' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        filter: null,
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      remove(item, index){
          this.items.splice(index,1);
          let id = item.id;
          this.$axios.post('/api/posts/delArticle',qs.stringify({
            id: id
          }))
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
      },
      edit(item, index){
        this.$emit('edit',item.id);
      }
    },
    created(){
      this.$axios.get('api/posts/getAllArticle')
      .then((res) =>{
        this.items = res.data;
      }).catch((err) => {
        console.log(err);
      })
    }
  }
</script>