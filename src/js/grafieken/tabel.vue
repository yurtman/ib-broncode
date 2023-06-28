<template>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
    />
  </template>

  <script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    setup () {
      return {
        data,
        columns: createColumns(columns),
        pagination: false
      }
    }
  })
  </script>