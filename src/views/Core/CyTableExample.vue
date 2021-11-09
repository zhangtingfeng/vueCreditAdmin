<template>
  <div>
    <!--表格栏-->
    <el-table
      :data="content"
      :highlight-current-row="highlightCurrentRow"
      @selection-change="selectionChange"
      @current-change="handleCurrentChange"
      v-loading="loading"
      :element-loading-text="$t('action.loading')"
      :border="border"
      :stripe="stripe"
      :max-height="countHeight(maxHeight)"
      :size="size"
      :align="align"
      style="width: 100%"
      ref="multipleTable"
      :header-cell-style="{
        color: '#FFF',
        'background-color': 'rgb(20, 136, 154)',
      }"
      :span-method="arraySpanMethod"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        type="selection"
        width="50"
        v-if="showBatchDelete"
        fixed="left"
      ></el-table-column>
      <el-table-column
        type="index"
        width="50"
        v-if="showIndex"
        fixed="left"
      ></el-table-column>

      <template v-for="(column, index) in columns">
        <el-table-column
          header-align="center"
          align="center"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
          :fixed="countfixed(index)"
          :key="column.prop"
          :type="column.type"
          :formatter="column.formatter"
          :sortable="column.sortable == null ? true : column.sortable"
          :show-overflow-tooltip="
            column.showOverflowTooltip == null ? false : true
          "
        >
          <template slot-scope="scope">
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <div
                  v-html="
                    column.formatter(
                      scope.row,
                      column,
                      scope.row[column.prop],
                      scope.index
                    )
                  "
                ></div>
              </template>
              <template v-else>
                <template v-if="column.showImg">
                  <img :src="scope.row[column.prop]" width="30" height="30" />
                </template>
                <template v-else>
                  <span>{{ scope.row[column.prop] }}</span>
                </template>
              </template>
            </template>
            <template v-else>
              <expand-dom
                :column="column"
                :row="scope.row"
                :render="column.render"
                :index="index"
              ></expand-dom>
            </template>
          </template>
        </el-table-column>
      </template>

      <el-table-column
        :label="$t('action.operation')"
        :width="operationWidth == null ? 280 : operationWidth"
        fixed="right"
        v-if="showOperation"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <kt-button
            icon="fa fa-address-book"
            v-if="scope.row['AddGuoup']==1"
             :label="
              handleAddToExsitingLable == null
                ? $t('Add')
                : handleAddToExsitingLable
            "
            :show="showAddToExsitingOperation"
            :perms="handleAddToExsitingString"
            :size="size"
            :disabled="scope.row.disabled"
            @click="handleAddToExsiting(scope.$index, scope.row)"
          />
          <kt-button
            icon="fa fa-edit"
            :label="permsEditLable == null ? $t('action.edit') : permsEditLable"
            :show="showEditOperation"
            :perms="permsEdit"
            :size="size"
            :disabled="scope.row.disabled"
            @click="handleEdit(scope.$index, scope.row)"
          />
          <kt-button
            v-if="!scope.row['AddGuoup']==1"
            icon="fa fa-trash"
            :label="$t('action.delete')"
            :show="showDeleteOperation"
            :perms="permsDelete"
            :size="size"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          />
          <kt-button
            icon="fa fa-search"
            :label="
              permsDetailLable == null ? $t('action.detail') : permsDetailLable
            "
            :show="showDetailOperation"
            :size="size"
            type="success"
            @click="handleDetail(scope.$index, scope.row)"
          />
          <kt-button
            icon="el-icon-money"
            :label="permsCheckLable == null ? '审核' : permsCheckLable"
            :show="showReviewedOperation"
            :size="size"
            type="success"
            :perms="permsDetail"
            @click="handleReviewed(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <!--分页栏-->
    <div class="toolbar" style="padding: 10px">
      <kt-button
        :label="$t('action.batchDelete')"
        :perms="permsDelete"
        :size="size"
        type="danger"
        @click="handleBatchDelete()"
        :disabled="this.selections.length === 0"
        style="float: left"
        v-if="showBatchDelete & showOperation"
      />
      <el-pagination
        layout="total, prev, pager, next, jumper,sizes"
        @current-change="refreshPageRequest"
        :current-page="pageRequest.pageNum"
        :page-size="pageRequest.pageSize"
        :total="totalSize"
        style="float: right"
        :page-sizes="[5, 10, 15, 20, 30, 40, 80, 160]"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import KtButton from "@/views/Core/KtButton";
import { exportExcel } from "@/utils/excel";
import { formatDate } from "@/utils/datetime";

export default {
  name: "CyTable",
  components: {
    KtButton,
  },
  props: {
    columns: Array, // 表格列配置
    data: Object, // 表格分页数据
    permsEdit: String, // 编辑权限标识
    permsDelete: String, // 删除权限标识
    permsDetail: String, // 删除权限标识
    permsEditLable: String,
    handleAddToExsitingString: String,
    handleAddToExsitingLable: String,

    operationWidth: Number,
    permsDetailLable: String,
    permsCheckLable: String,
    size: {
      // 尺寸样式
      type: String,
      default: "mini",
    },
    align: {
      // 文本对齐方式
      type: String,
      default: "left",
    },
    maxHeight: {
      // 表格最大高度
      type: Number,
      default: 900,
    },
    height: {
      // 表格最大高度
      type: Number,
      default: 500,
    },
    showOperation: {
      // 是否显示操作组件
      type: Boolean,
      default: true,
    },
    border: {
      // 是否显示边框
      type: Boolean,
      default: false,
    },
    stripe: {
      // 是否显示偶数行灰色
      type: Boolean,
      default: false,
    },
    highlightCurrentRow: {
      // // 是否高亮当前行
      type: Boolean,
      default: true,
    },
    showOverflowTooltip: {
      // 是否单行显示
      type: Boolean,
      default: true,
    },
    showBatchDelete: {
      // 是否显示操作组件
      type: Boolean,
      default: true,
    },
    showDeleteOperation: {
      // 是否显示操作组件
      type: Boolean,
      default: true,
    },
    showReviewedOperation: {
      // 是否显示操作组件
      type: Boolean,
      default: false,
    },
    showEditOperation: {
      // 是否显示操作组件
      type: Boolean,
      default: true,
    },
    showAddToExsitingOperation: {
      // 是否显示操作组件
      type: Boolean,
      default: true,
    },
    showDetailOperation: {
      // 是否显示操作组件
      type: Boolean,
      default: false,
    },
    showIndex: {
      // 是否显示操作组件
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      letAddlineNumberSta: [],
      totalSize: 0,
      content: [],
      // 分页信息
      pageRequest: {
        pageNum: 1,
        pageSize: 15,
      },
      sums: [],
      loading: false, // 加载标识
      selections: [], // 列表选中列
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      //debugger;
      if (row["AddGuoup"] == 1) {
        return "warning-row";
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      //debugger;
      let letlsit = this.letAddlineNumberSta;
      return;
      if (columnIndex === 0) {
        if (row.rowspan != 1) {
          return {
            rowspan: row.rowspan,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },

    // 分页查询
    findPage: function (filters) {
      //this.loading = true
      var this_ = this;
      if (filters == undefined || filters == null) {
        filters = {};
      }
      filters.start = this.pageRequest.pageNum;
      filters.limit = this.pageRequest.pageSize;
      // debugger;
      let letTserviceURL = filters.serviceURL;
      if (letTserviceURL != null) {
        this.utils.request.requestPostUrl(
          filters,
          letTserviceURL,
          function (res) {
            this_.returnMainData(this_, res);
          },
          filters.tsevice
        );
      } else {
        this.utils.request.queryCmnQueryPage(
          filters,
          function (res) {
            this_.returnMainData(this_, res);
          },
          filters.tsevice
        );
      }
    },
    returnMainData(this_, res) {
      if (res.code != 200) return;
      if (res.data.rows == null) {
        res.data.rows = [];
      }

      let letGroupList = res.data.rows;
      let letSelect = [];
      letGroupList.forEach((row) => {
        if (letSelect.indexOf(row["chinese_group_company"]) < 0) {
          letSelect.push(row["chinese_group_company"]);
        }
      });
      let LetNewList = [];

      letSelect.forEach((rowSelect) => {
        let aletCurList = letGroupList.filter(
          (itmer) => itmer["chinese_group_company"] == rowSelect
        ); //管理员
        let letSumtotal_limit = 0;
        let letSumtotal_limit_Balance = 0;
        let letSumopen_account = 0;
        let letSumopen_account_Balance = 0;
        let letSumoa_tenor = 0;
        let letSumprepayment = 0;
        let letSumprepayment_Balance = 0;
        let letSumprepayment_tenor = 0;
        let letSumperformance_deposit = 0;
        let letSumperformance_deposit_Balance = 0;
        let letSumperformance_deposit_tenor = 0;
        let letSumfpmtm = 0;
        let letSumfpmtm_Balance = 0;
        let letSumfpmtm_tenor = 0;

        aletCurList.map(function (item, index) {
          letSumtotal_limit += parseFloat(item["total_limit"]);
          letSumtotal_limit_Balance += parseFloat(item["total_limit_Balance"]);
          letSumopen_account += parseFloat(item["open_account"]);
          letSumopen_account_Balance += parseFloat(item["open_account_Balance"]);
          letSumoa_tenor += parseFloat(item["oa_tenor"]);
          letSumprepayment += parseFloat(item["prepayment"]);
          letSumprepayment_Balance += parseFloat(item["prepayment_Balance"]);
          letSumprepayment_tenor += parseFloat(item["prepayment_tenor"]);
          letSumperformance_deposit += parseFloat(item["performance_deposit"]);
          letSumperformance_deposit_Balance +=
            parseFloat(item["performance_deposit_Balance"]);
          letSumperformance_deposit_tenor += parseFloat(item["performance_deposit_tenor"]);
          letSumfpmtm += parseFloat(item["fpmtm"]);
          letSumfpmtm_Balance += parseFloat(item["fpmtm_Balance"]);
          letSumfpmtm_tenor += parseFloat(item["fpmtm_tenor"]);
        });
        //debugger;
        let AddStaticList = {
          AddGuoup: 1,
          chinese_group_company: rowSelect,
          total_limit: letSumtotal_limit,
          total_limit_Balance: letSumtotal_limit_Balance,
          open_account: letSumopen_account,
          open_account_Balance: letSumopen_account_Balance,
          oa_tenor: letSumoa_tenor,
          prepayment: letSumprepayment,
          prepayment_Balance: letSumprepayment_Balance,
          prepayment_tenor: letSumprepayment_tenor,
          performance_deposit: letSumperformance_deposit,
          prepayment_Balance: letSumperformance_deposit_Balance,
          prepayment_tenor: letSumprepayment_tenor,
          performance_deposit: letSumperformance_deposit,
          performance_deposit_Balance: letSumperformance_deposit_Balance,
          performance_deposit_tenor: letSumperformance_deposit_tenor,
          fpmtm: letSumfpmtm,
          fpmtm_Balance: letSumfpmtm_Balance,
          fpmtm_tenor: letSumfpmtm_tenor,
        };

        //debugger;
        this_.letAddlineNumberSta.push(LetNewList.length);
        LetNewList = LetNewList.concat(AddStaticList);
        LetNewList = LetNewList.concat(aletCurList);
        //debugger;
      });
      //debugger;
      this_.content = LetNewList;
      this_.totalSize = Number(res.data.total);
    },
    toggleSelection(rows) {
      console.log(rows);
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 分页查询
    findPageBeforeRestPages: function (filters) {
      var this_ = this;
      if (filters == undefined || filters == null) {
        filters = {};
      }
      
      filters.start = 1;
      filters.limit = this.pageRequest.pageSize;
      let letTserviceURL = filters.serviceURL;
      if (letTserviceURL != null) {
        this.utils.request.requestPostUrl(
          filters,
          letTserviceURL,
          function (res) {
            //debugger;
            this_.returnMainData(this_, res);
            //debugger;
            /*if (res.code != 200) return;
            if (res.data.rows == null) {
              res.data.rows = [];
            }
            this_.content = res.data.rows;

            this_.totalSize = Number(res.data.total ? res.data.total : 0);*/
          },
          filters.tsevice
        );
      } else {
        this.utils.request.queryCmnQueryPage(
          filters,
          function (res) {
            if (res.code != 200) return;
            if (res.data.rows == null) {
              res.data.rows = [];
            }
            this_.content = res.data.rows;

            this_.totalSize = Number(res.data.total ? res.data.total : 0);
          },
          filters.tsevice
        );
      }
    },

    //excle导出
    exportData(filters, filterColumns, fileName) {
      if (filters == undefined || filters == null) {
        filters = {};
      }
      filters.start = null;
      filters.limit = null;
      this.utils.request.queryCmnQueryPage(
        filters,
        (res) => {
          if (fileName == undefined || fileName == null) {
            fileName = "excel-list";
          }

          fileName = fileName + "_" + formatDate(new Date(), "yyyyMMdd");

          if (res.data.rows == null || res.data.rows.length == 0) {
            this.$message({ message: "暂无需要导出的数据 ", type: "error" });
            return;
          }

          exportExcel(res.data.rows, filterColumns, fileName);
        },
        filters.tsevice
      );
    },
    init: function () {
      this.$emit("findPage");
    },
    // 选择切换
    selectionChange: function (selections) {
      this.selections = selections;
      this.$emit("selectionChange", { selections: selections });
    },
    // 选择切换
    handleCurrentChange: function (val) {
      this.$emit("handleCurrentChange", { val: val });
    },
    // 换页刷新
    refreshPageRequest: function (pageNum) {
      this.pageRequest.pageNum = pageNum;
      this.init();
    },
    // 换页刷新
    handleSizeChange: function (pageSize) {
      this.pageRequest.pageSize = pageSize;
      this.pageRequest.pageNum = 1;
      this.init();
    },
    // 编辑
    handleAddToExsiting: function (index, row) {
      this.$emit("handleAddToExsiting", { index: index, row: row });
    },
    // 编辑
    handleEdit: function (index, row) {
      this.$emit("handleEdit", { index: index, row: row });
    },
    // 删除
    handleDelete: function (index, row) {
      this.delete(row.id);
    },
    // 批量删除
    handleBatchDelete: function () {
      let ids = this.selections.map((item) => item.id).toString();
      this.delete(ids);
    },
    handleDetail: function (index, row) {
      this.$emit("handleDetail", { index: index, row: row });
    },
    //审核按钮
    handleReviewed: function (index, row) {
      this.$emit("handleReviewed", { index: index, row: row });
    },

    // 删除操作
    delete: function (ids) {
      this.$confirm("Are you sure to delete the selected record?", "Tip", {
        type: "warning",
      })
        .then(() => {
          let params = [];
          let idArray = (ids + "").split(",");
          for (var i = 0; i < idArray.length; i++) {
            params.push({ id: idArray[i] });
          }
          //this.loading = true
          let callback = (res) => {
            if (res.code == 200) {
              this.$message({
                message: "successfully deleted",
                type: "success",
              });
              this.init();
            } else {
              this.$message({
                message: "operation failed, " + res.msg,
                type: "error",
              });
            }
            this.loading = false;
          };
          this.$emit("handleDelete", { params: params, callback: callback });
        })
        .catch(() => {});
    },
    countfixed(index) {
      if (index <= 1) {
        return true;
      } else {
        return false;
      }
    },
    resetForm() {
      this.pageRequest = {
        pageNum: 1,
        pageSize: 10,
      };
    },
    countHeight(height) {
      var winHeight =
        document.body.clientHeight || document.documentElement.clientHeight;
      if (height > winHeight * 0.7) {
        height = winHeight * 0.7;
      }
      return height;
    },
    countIdDisabled() {
      return true;
    },
  },
  mounted() {
    this.refreshPageRequest(1);
  },
};
</script>

<
<style scoped>
  /deep/ .el-table .sort-caret.ascending {
    border-bottom-color: #FFF;
    top: 5px;
  }

  /deep/ .el-table .sort-caret.descending {
    border-top-color: #FFF;
    bottom: 7px;
  }

  /deep/ .el-table .ascending .sort-caret.ascending {
    border-bottom-color: rgb(20, 136, 154);
  }

  /deep/ .el-table .descending .sort-caret.descending {
    border-top-color: rgb(20, 136, 154);
  }


  /**/
  /deep/ .el-table__body .el-table__row.hover-row td{
         /* background: #f7f7fb !important*/
    }  
  
  /deep/ .el-table__body .el-table__row.hover-row td{
         color: rgb(255, 255, 255); background-color: rgb(20, 136, 154);
    }


   /deep/ .el-table--striped .el-table__body tr.el-table__row--striped.current-row td {
        color: rgb(255, 255, 255);
       background-color: rgb(64, 158, 255);
  }
    /*
 /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
        color: rgb(255, 255, 255);
       background-color: #ffdd40;
  }
 */

  /deep/ .el-table__body .warning-row {
          background-color: #c1c1d2 !important
    }  

</style>

