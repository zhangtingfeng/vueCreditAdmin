<template>
  <tree-table
    :data="data"
    :columns="columns"
    v-on:parnet-click="handleClick"
    border
  />
</template>
<script>
import treeTable from "./TreeTable";
export default {
  name: "LoginForm",
  data() {
    return {
      columns: [
        {
          text: "机构名称",
          value: "departmentName",
          align: "left",
        },
        {
          text: "机构类型",
          value: "departmentType",
        },
        {
          text: "机构描述",
          value: "description",
        },
        {
          text: "修改时间",
          value: "modifyTime",
        },
      ],
      data: [
        {
          id: 1,
          parentId: 0,
          departmentName: "测试1",
          departmentType: 0,
          description: "",
          modifyTime: "0",
          children: [
            {
              id: 2,
              parentId: 1,
              departmentName: "测试2",
              departmentType: 22,
              description: "男",
              modifyTime: "2019-10-10",
            },
          ],
        },
        {
          id: 3,
          parentId: 0,
          departmentName: "测试3",
          departmentType: 23,
          description: "女",
          modifyTime: "2019-10-10",
          children: [
            {
              id: 4,
              parentId: 3,
              departmentName: "测试4",
              departmentType: 22,
              description: "男",
              modifyTime: "2019-10-10",
            },
            {
              id: 5,
              parentId: 3,
              departmentName: "测试5",
              departmentType: 25,
              description: "男",
              modifyTime: "2019-10-10",
            },
            {
              id: 6,
              parentId: 3,
              departmentName: "测试6",
              departmentType: 26,
              description: "女",
              modifyTime: "2019-10-10",
              children: [
                {
                  id: 7,
                  parentId: 6,
                  departmentName: "测试7",
                  departmentType: 27,
                  description: "男",
                  modifyTime: "2019-10-10",
                },
              ],
            },
          ],
        },
        {
          id: 18,
          parentId: 0,
          departmentName: "测试8",
          departmentType: 18,
          description: "男",
        },
      ],
    };
  },
  components: { treeTable },
  computed: {},
  mounted() {},
  methods: {
    // 表格后面的点击事件
    handleClick(row, type) {
      console.log(row, type);
    },
  },
};
</script>
