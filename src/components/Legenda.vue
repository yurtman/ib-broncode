<template>
  <n-data-table
    :columns="columns"
    :data="data.values"
    :pagination="false"
    :bordered="false"
  />
</template>

<script>
export default {
  props: ["data"],
  data: function () {
    return {
      columns: data.columns,
    };
  },
};
</script>
