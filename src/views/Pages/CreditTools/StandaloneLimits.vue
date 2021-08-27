
<template>
  <div class="page-container">
    <!--工具栏-->
    <div
      class="toolbar"
      style="float: left; padding-top: 10px; padding-left: 15px"
    >
      <el-form
        :inline="true"
        :model="filters"
        :size="size"
        ref="filters"
        class="form"
      >
        <el-form-item prop="id">
          <el-input
            auto-complete="off"
            placeholder="id"
            v-model="filters.id"
          ></el-input>
        </el-form-item>
        <el-form-item prop="chinese_group_company">
          <el-input
            auto-complete="off"
            placeholder="ChineseGroupName"
            v-model="filters.chinese_group_company"
          ></el-input>
        </el-form-item>

        <el-form-item prop="srd_counterparty_name">
          <el-input
            auto-complete="off"
            placeholder="SrdGroupName"
            v-model="filters.srd_counterparty_name"
          ></el-input>
        </el-form-item>

        <el-form-item prop="chinese_counterparty_name">
          <el-input
            auto-complete="on"
            placeholder="ChineseCounterpartyName"
            v-model="filters.chinese_counterparty_name"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <kt-button
            icon="el-icon-s-check"
            label="新增"
            type="primary"
            @click="addQuiz"
          />
          <kt-button
            icon="fa fa-search"
            label="查询"
            type="primary"
            @click="$refs.CyTable.findPageBeforeRestPages(filters)"
          />
        </el-form-item>
        <el-form-item>
          <kt-button
            icon="el-icon-refresh"
            :label="$t('action.reset')"
            type="primary"
            @click="resetForm('filters')"
          />
        </el-form-item>
        <!-- <el-form-item>
          <kt-button
            icon="el-icon-refresh"
            label="审核"
            type="primary"
            @click="review"
            perms="pages:activity:checked"
          />
        </el-form-item>
       <el-form-item>-->
        <!--<kt-button label="新增" type="primary" @click="handleAdd" />-->
        <!--</el-form-item>-->
      </el-form>
    </div>
    <div
      class="toolbar"
      style="float: right; padding-top: 10px; padding-right: 15px"
    >
      <el-form :inline="true" :size="size">
        <el-form-item>
          <el-button-group>
            <el-tooltip content="刷新" placement="top">
              <el-button
                icon="fa fa-refresh"
                @click="$refs.CyTable.findPageBeforeRestPages(filters)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="列显示" placement="top">
              <el-button
                icon="fa fa-filter"
                @click="displayFilterColumnsDialog"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="导出" placement="top">
              <el-button
                icon="fa fa-file-excel-o"
                @click="downloadExcel"
                id="downloadExcel"
              ></el-button>
            </el-tooltip>
          </el-button-group>
        </el-form-item>
      </el-form>
      <!--表格显示列界面-->
      <table-column-filter-dialog
        ref="tableColumnFilterDialog"
        @handleFilterColumns="handleFilterColumns"
        :columns="columns"
      ></table-column-filter-dialog>
    </div>
    <!--表格内容栏-->
    <cy-table
      :max-height="1000"
      :data="pageResult"
      :operationWidth="174"
      :columns="filterColumns"
      @findPage="findPage"
      @selectionChange="selectionChange"
      @handleDelete="handleDelete"
      @handleEdit="handleDetail"
      ref="CyTable"
    ></cy-table>
    <!--新增编辑界面-->
    <el-dialog
      title="Standlone Limit Detail"
      width="70%"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="dataForm"
        label-width="80px"
        :rules="dataFormRules"
        ref="dataForm"
        :inline="true"
        :size="size"
        class="form editform"
      >
        <!--one                         line  -->
        <el-row>
          <el-col span="11">
            <div class="editformText">Chinese Group Name</div>
            <el-select v-model="value" placeholder="Chinese Group Name">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>

          <el-col span="11" style="margin-left: 4%">
            <div class="editformText">SRD Group Name</div>
            <el-select v-model="value" placeholder="SRD Group Name">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col span="11">
            <div class="editformText">Chinese Counterparty Name</div>
            <el-select v-model="value" placeholder="Chinese Counterparty Name">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>

          <el-col span="11" style="margin-left: 4%">
            <div class="editformText">SRD Counterparty Name</div>
            <el-select v-model="value" placeholder="SRD Counterparty Name">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col span="11">
            <div class="editformText">Level</div>
            <el-select v-model="value" placeholder="Level">
              <el-option label="Group" value="Group"></el-option>
              <el-option label="Sub" value="Sub"></el-option>
            </el-select>
          </el-col>

          <el-col span="11" style="margin-left: 4%">
            <div class="editformText">TRR</div>
            <el-input v-model="value" placeholder="TRR"> </el-input>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col span="11">
            <div class="editformText">TotalLimit</div>
            <el-input v-model="value" placeholder="TotalLimit"> </el-input>
          </el-col>

          <el-col span="11" style="margin-left: 4%">
            <div class="editformText">Total Limit Balance (USD)</div>
            <el-input v-model="value" placeholder="Total Limit Balance (USD)">
            </el-input>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col span="11">
            <div class="editformText">Open Account (USD)</div>
            <el-input v-model="value" placeholder="Open Account (USD)">
            </el-input>
          </el-col>

          <el-col span="11" style="margin-left: 4%">
            <div class="editformText">Open Account Balance (USD)</div>
            <el-input v-model="value" placeholder="Open Account Balance (USD)">
            </el-input>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col span="11">
            <div class="editformText">OA Tenor</div>
            <el-input v-model="value" placeholder="OA Tenor"> </el-input>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col span="11">
            <div class="editformText">Prepayment (USD)</div>
            <el-input v-model="value" placeholder="Prepayment (USD)">
            </el-input>
          </el-col>

          <el-col span="11" style="margin-left: 4%">
            <div class="editformText">Prepayment Balance (USD)</div>
            <el-input v-model="value" placeholder="Prepayment Balance (USD)">
            </el-input>
          </el-col> </el-row
        ><!--one                         line  -->
        <el-row>
          <el-col span="11">
            <div class="editformText">Prepayment Tenor</div>
            <el-input v-model="value" placeholder="Prepayment Tenor">
            </el-input>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col span="11">
            <div class="editformText">Performance Deposit (USD)</div>
            <el-input v-model="value" placeholder="Performance Deposit (USD)">
            </el-input>
          </el-col>

          <el-col span="11" style="margin-left: 4%">
            <div class="editformText">Performance Deposit (USD)</div>
            <el-input v-model="value" placeholder="Performance Deposit (USD)">
            </el-input>
          </el-col> </el-row
        ><!--one                         line  -->
        <el-row>
          <el-col span="11">
            <div class="editformText">Performance Deposit Tenor</div>
            <el-input v-model="value" placeholder="Performance Deposit Tenor">
            </el-input>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col span="11">
            <div class="editformText">FPMTM (USD)</div>
            <el-input v-model="value" placeholder="FPMTM (USD)"> </el-input>
          </el-col>

          <el-col span="11" style="margin-left: 4%">
            <div class="editformText">FPMTM Balance (USD)</div>
            <el-input v-model="value" placeholder="FPMTM Balance (USD)">
            </el-input>
          </el-col> </el-row
        ><!--one                         line  -->
        <el-row>
          <el-col span="11">
            <div class="editformText">FPMTM Tenor</div>
            <el-input v-model="value" placeholder="FPMTM Tenor"> </el-input>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col span="11">
            <div class="editformText">Expiry Date</div>
            <el-input v-model="value" placeholder="Expiry Date"> </el-input>
          </el-col>

          <el-col span="11" style="margin-left: 4%">
            <div class="editformText">Expried</div>
            <el-input v-model="value" placeholder="Expried"> </el-input>
          </el-col> </el-row
        ><!--one                         line  -->
        <el-row>
          <el-col span="11">
            <div class="editformText">Credit Status</div>
            <el-select v-model="value" placeholder="Credit Status">
              <el-option label="Active" value="Active"></el-option>
              <el-option label="Inactive" value="Inactive"></el-option>
              <el-option label="Suspended" value="Suspended"></el-option>
            </el-select>
          </el-col>

          <el-col span="11" style="margin-left: 4%">
            <div class="editformText">Regular</div>
            <el-select v-model="value" placeholder="Regular">
              <el-option label="Regular" value="Regular"></el-option>
              <el-option label="Irregular" value="Irregular"></el-option>
            </el-select>
          </el-col> </el-row
        ><!--one                         line  -->
        <el-row>
          <el-col span="11">
            <div class="editformText">Overdue</div>
            <el-select v-model="value" placeholder="Overdue">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>

          <el-col span="11" style="margin-left: 4%">
            <div class="editformText">Limit Excess</div>
            <el-select v-model="value" placeholder="Limit Excess">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col> </el-row
        ><!--one                         line  -->
        <el-row>
          <el-col span="11">
            <div class="editformText">Product</div>
              <el-option label="All" value="All"></el-option>
              <el-option label="Coal" value="Coal"></el-option>
              <el-option label="Concs" value="Concs"></el-option>
              <el-option label="Ferrous" value="Ferrous"></el-option>
              <el-option label="Refined" value="Refined"></el-option>
              <el-option label="Others" value="Others"></el-option>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col span="23">
            <div class="editformText">Comment</div>
            <el-input placeholder="Comment"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button :size="size" @click="cleanDataForm">{{
          $t("action.cancel")
        }}</el-button>
        <el-button
          :size="size"
          type="primary"
          @click.native="submitForm"
          :loading="editLoading"
          >{{ $t("action.submit") }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogVisibleImageList"
      title="图片"
      @closed="beforeClose"
    >
      <div style="max-height: 500px; overflow: auto">
        <div
          v-for="(file, index) in filelist"
          :key="index"
          :tabindex="index"
          style="width: 100%"
        >
          <img style="max-height: 500px" :src="file" alt />
        </div>
      </div>
    </el-dialog>

    <el-upload
      :action="imgUpload"
      :on-success="handleSuccess"
      :show-file-list="false"
      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
      :max-size="2048"
    >
      <el-button
        v-show="false"
        size="small"
        type="primary"
        id="uploadButton"
      ></el-button>
    </el-upload>

    <el-dialog :visible.sync="dialogVisibleReviw" title="审核" width="30%">
      <el-form
        :model="dataStatusForm"
        label-width="120px"
        ref="dataStatusForm"
        label-position="right"
        inline
      >
        <el-row>
          <el-form-item label="请选择" prop="status">
            <el-select v-model="dataStatusForm.status" style="width: 300px">
              <el-option
                v-for="item in Roptions"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click.native="submitStatus">提交</el-button>
        <el-button @click="dialogVisibleReviw = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PopupTreeInput from "@/components/PopupTreeInput";
import KtTable from "@/views/Core/KtTable";
import TreeSelect from "@riophae/vue-treeselect";
import KtButton from "@/views/Core/KtButton";
import TableColumnFilterDialog from "@/views/Core/TableColumnFilterDialog";
import { format, formatDate, ThousandFilterZero } from "@/utils/datetime";
import CyTable from "@/views/Core/CyTable";
import ImgUpload from "@/views/Core/ImgUpload";
import { exportExcel } from "@/utils/excel";

export default {
  components: {
    PopupTreeInput,
    KtTable,
    CyTable,
    KtButton,
    TableColumnFilterDialog,
    ImgUpload,
    TreeSelect,
  },
  data() {
    return {
      options: [
        {
          value: "Chinese Group Name",
          label: "Chinese Group Name",
        },
        {
          value: "Chinese Group Name",
          label: "Chinese Group Name",
        },
        {
          value: "Chinese Group Name",
          label: "Chinese Group Name",
        },
        {
          value: "Chinese Group Name",
          label: "Chinese Group Name",
        },
        {
          value: "Chinese Group Name",
          label: "Chinese Group Name",
        },
      ],
      value: "",
      dataStatusForm: {},
      dialogVisibleReviw: false,
      statusOptions: [
        { key: "0", value: "审核中" },
        { key: "1", value: "审核通过" },
        { key: "2", value: "审核失败" },
      ],
      Roptions: [
        { key: 1, value: "审核通过" },
        { key: 2, value: "审核不通过" },
      ],
      //  imgsList: [],
      picList: [],
      imageSizeLimit: 10, //图片上传个数控制
      imageAccept: ".jpg,.jpeg,.png,.JPG,.JPEG", //图片上传格式
      imgUpload: this.utils.getUpLoadHost(),
      typeOptions: [], //所属分类
      shopOptions: [], //店铺集合
      disabled: false,
      dialogVisibleImg: false,
      size: "small",
      loading: false,
      filters: {
        serviceURL:
          "qichacha-service/CreditLimit_StandaloneLimitsView/queryList",
      },
      dataForm: {
        id: "",
        Title: "",
        quizMemo: "",
        InvestMemo: "",
        Type_TestOrLearing: "",
        Picture: "",
        ReportNeedMoney: "",
        TestNeedMoney: "",
        quizStatus: "",
      },
      dataFormRules: {
        Title: [{ required: true, message: "请输入方案名称", trigger: "blur" }],

        quizStatus: [
          {
            required: true,
            message: "请选择方案状态,处于停用状态还是使用状态",
            trigger: "change",
          },
        ],
        Picture: [{ required: true, message: "请上传主图", trigger: "blur" }],
      },
      columns: [],
      filterColumns: [],
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResult: {},
      checked: [],
      operation: false, // true:新增, false:编辑
      dialogVisible: false, // 新增编辑界面是否显示
      editLoading: false,
      checkpage: false,
      deptData: [],
      dialogVisibleImageList: false,
      filelist: [],
      popupQuestionTypeData: [],
      popupQuizData: [],
      popupTreeProps: {
        label: "name",
        children: "children",
      },
      editorOption: {
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
              ["blockquote", "code-block"], //引用，代码块
              [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
              [{ list: "ordered" }, { list: "bullet" }], //列表
              [{ script: "sub" }, { script: "super" }], // 上下标
              [{ indent: "-1" }, { indent: "+1" }], // 缩进
              [{ direction: "rtl" }], // 文本方向
              [{ size: ["small", false, "large", "huge"] }], // 字体大小
              [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
              [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
              [{ font: [] }], //字体
              [{ align: [] }], //对齐方式b
              ["clean"], //清除字体样式
              ["image"], //上传图片、上传视频
            ], // 工具栏
            handlers: {
              image: function (value) {
                if (value) {
                  // 调用iview图片上传
                  $("#uploadButton").click();
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
        },
        theme: "snow",
      },
      login_shop_id: "",
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  methods: {
    handleSuccess(res) {
      // 获取富文本组件实例
      //debugger;
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (res.data.imgUrl) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址

        quill.insertEmbed(length, "image", res.data.imgUrl);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        // 提示信息，需引入Message
        Message.error("图片插入失败");
      }
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange(e) {}, // 内容改变事件
    saveHtml: function (event) {},
    handlePictureCardPreview(data) {
      // debugger;
      var url = data.url;
      this.filelist = [];
      this.filelist.push(url);
      this.dialogVisibleImageList = true;
    },

    handleImgUploadRemove(data) {
      //debugger;
      var index = data.index;
      this.picList.splice(index, 1);
    },
    handleImgUploadChange(data) {
      // debugger;
      this.picList = data.filelist;
      if (this.picList > this.imageSizeLimit) {
        ////限制数量
        this.picList = [this.picList[this.picList.length - 1]];
      }
    },

    /*   handleImgImgUploadRemove(data) {
                   //debugger;
                   var index = data.index;
                   this.imgsList.splice(index, 1);
               },
               handleImgImgUploadChange(data) {
                  // debugger;
                   this.imgsList = data.filelist;
               },
   */
    //取消按钮
    cleanDataForm() {
      let this_ = this;
      this.dialogVisible = false;
      if (this.$refs["dataForm"]) {
        this.$refs["dataForm"].resetFields();
      }
      console.log(this.dataForm);

      this.picList = [];
      // this.imgsList = [];
    },
    addQuiz: function (params) {
      let this_ = this;
      this.dialogVisible = true;
      this.operation = false;
      if (this.$refs["dataForm"]) {
        this.$refs["dataForm"].resetFields();
      }
      this.dataForm.status = 0;
      /*
      if (this.login_shop_id) {
        this.dataForm.shop_id = this.login_shop_id;
      }
      this.dataForm.parentName = "";
*/
      this.picList = [];
      // this.imgsList = [];
    },
    // 显示编辑界面
    handleDetail: function (params) {
      //debugger;
      this.dialogVisible = true;
      this.operation = false;
      this.$nextTick(() => {
        let this_ = this;
        params.row.parentName = params.row.type;
        this.dataForm = Object.assign({}, params.row);
        this.picList = [];
        // this.imgsList = [];

        if (params.row.Picture) {
          $.each(params.row.Picture.split(","), function (key, val) {
            let param = {};
            if (this_.utils.isNull(val)) {
            } else {
              param.url = val;
              this_.picList.push(param);
            }
          });
        }
      });
    },
    //保存修改
    submitForm: function () {
      var this_ = this;

      this_.$refs.dataForm.validate((valid) => {
        if (valid) {
          let params = Object.assign({}, this_.dataForm);
          params.t = "invest_quiz3";

          // params.imgs = this.imgsList.map(item => item.url).toString();
          params.Picture = this.picList.map((item) => item.url).toString();

          if (!params.Picture) {
            this.$message({ message: "请选择主图", type: "error" });
            return;
          }

          params.status = "0";

          this_.editLoading = true;
          this_.utils.request.editInfo(params, this_.editInfoBack);
        }
      });
    },
    // 新增修改回调
    editInfoBack: function (data) {
      this.editLoading = false;
      if (data.code == 200) {
        this.$message({ message: "操作成功", type: "success" });
        this.findPage();
        this.dialogVisible = false;
      } else {
        this.$message({ message: "操作失败, " + data.msg, type: "error" });
      }
    },
    findPage: function (data) {
      /*
      //debugger;
      let login_shop_id = localStorage.getItem("login_shop_id");
      if (login_shop_id) {
        this.login_shop_id = login_shop_id;
      }
      if (this.login_shop_id) {
       // this.filters.shop_id = this.login_shop_id;
      }*/
      this.$refs.CyTable.findPage(this.filters);
    },

    //列表下载
    downloadExcel() {
      this.$confirm("确定下载列表文件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //debugger;
          let filename = "standalone limits";
          this.exportData(this.filters, this.filterColumns, filename);
        })
        .catch(() => {});
    },
    //excle导出
    exportData(filters, filterColumns, fileName) {
      //debugger;
      if (filters == undefined || filters == null) {
        filters = {};
      }
      debugger;
      ///filters.removeAttribute('start');
      //filters.removeAttribute('limit');
      filters.start = undefined;
      filters.limit = undefined;
      debugger;
      this.utils.request.requestPostUrl(
        filters,
        this.filters.serviceURL,
        function (res) {
          if ((res.code = 200)) {
            if (fileName == undefined || fileName == null) {
              fileName = "excel-list";
            }

            fileName = fileName + "_" + formatDate(new Date(), "yyyyMMdd");

            if (res.data.rows == null || res.data.rows.length == 0) {
              this.$message({ message: "暂无需要导出的数据 ", type: "error" });
              return;
            }
            exportExcel(res.data.rows, filterColumns, fileName);
          }
          //this_.returnMainData(this_, res);
        },
        filters.tsevice
      );
    },
    // 批量删除
    handleDelete: function (data) {
      var ids = "";
      for (var i = 0; i < data.params.length; i++) {
        ids = ids + data.params[i].id + ",";
      }

      data.t = "invest_quiz4";
      data.ids = ids;
      this.utils.request.batchDeleteInfo(data, this.deleteInfoBack);
    },
    deleteInfoBack: function () {
      this.findPage();
      this.dialogVisible = false;
      this.operation = false;
    },
    // 显示查询
    queryInfo: function () {
      debugger;
      this.findPage(this.filters);
    },
    selectionChange: function (params) {
      console.log(params);
      this.checked = params.selections;
    },
    // 显示新增界面
    handleAdd: function () {
      this.dialogVisible = true;
      this.operation = true;
      if (this.$refs["dataForm"]) {
        this.$refs["dataForm"].resetFields();
      }
    },
    // 处理表格列过滤显示
    handleFilterColumns: function (data) {
      this.filterColumns = data.filterColumns;
      this.$refs.tableColumnFilterDialog.setDialogVisible(false);
    },

    // 处理表格列过滤显示
    displayFilterColumnsDialog: function () {
      this.$refs.tableColumnFilterDialog.setDialogVisible(true);
    },

    // 时间格式化
    dateFormat: function (row, column, cellValue, index) {
      return format(row[column.property]);
    },

    /*
            // 处理表格列过滤显示 <dxg:GridColumn FieldName="ID" IsSmart="True" EditFormVisible="False"/>
            <dxg:GridColumn FieldName="ChineseGroupName" IsSmart="True" GroupIndex="0"/>
            <dxg:GridColumn FieldName="SrdGroupName" IsSmart="True"/>
            <dxg:GridColumn FieldName="ChineseCounterpartyName" IsSmart="True" Fixed="Left"/>
            <dxg:GridColumn FieldName="SrdCounterpartyName" IsSmart="True"/>
            <dxg:GridColumn FieldName="Level" IsSmart="True" SortIndex="0" SortOrder="Ascending"/>
            <dxg:GridColumn FieldName="Product" IsSmart="True" SortIndex="1" SortOrder="Ascending"/> */
    initColumns: function () {
      this.columns = [
        { prop: "id", label: "ID", minWidth: 60 },
        {
          prop: "chinese_group_company",
          label: "Chinese Group Name",
          minWidth: 220,
        },
        {
          prop: "chinese_counterparty_name",
          label: "Chinese Counterparty Name",
          minWidth: 220,
        },
        { prop: "srd_group_company", label: "Srd Group Name", minWidth: 220 },

        {
          prop: "srd_counterparty_name",
          label: "Srd Counterparty Name",
          minWidth: 220,
        },
        { prop: "cr_level", label: "Level", minWidth: 120 },
        { prop: "product", label: "Product", minWidth: 120 },
        { prop: "trr", label: "TRR", minWidth: 120 },
        {
          prop: "total_limit",
          label: "Total Limit (USD)",
          minWidth: 220,
          formatter: this.toThousandFilterZero,
        },
        {
          prop: "total_limit_used",
          label: "Total Limit Used (USD)",
          minWidth: 220,
          formatter: this.toThousandFilterZero,
        },
        {
          prop: "TotalLimitBalance",
          label: "Total Limit Balance (USD)",
          minWidth: 220,
          formatter: this.toThousandFilterZero,
        },
        {
          prop: "open_account",
          label: "Open Account (USD)",
          minWidth: 220,
          formatter: this.toThousandFilterZero,
        },
        {
          prop: "oa_used_limit",
          label: "OA Used (USD)",
          minWidth: 220,
          formatter: this.toThousandFilterZero,
        },
        {
          prop: "OABalance",
          label: "OA Balance (USD)",
          minWidth: 220,
          formatter: this.toThousandFilterZero,
        },
        { prop: "oa_tenor", label: "OATenor", minWidth: 220 },
        {
          prop: "prepayment",
          label: "Prepayment (USD)",
          minWidth: 220,
          formatter: this.toThousandFilterZero,
        },
        {
          prop: "prepayment_used_limit",
          label: "Prepayment Used (USD)",
          minWidth: 220,
          formatter: this.toThousandFilterZero,
        },
        {
          prop: "PrepaymentBalance",
          label: "Prepayment Balance (USD)",
          minWidth: 220,
          formatter: this.toThousandFilterZero,
        },
        { prop: "prepayment_tenor", label: "PrepaymentTenor", minWidth: 220 },
        {
          prop: "performance_deposit",
          label: "Performance Deposit (USD)",
          minWidth: 220,
          formatter: this.toThousandFilterZero,
        },
        {
          prop: "performance_deposit_used_limit",
          label: "Performance Deposit Used (USD)",
          minWidth: 220,
          formatter: this.toThousandFilterZero,
        },
        {
          prop: "PerformanceDepositBalance",
          label: "Performance Deposit Balance (USD)",
          minWidth: 220,
          formatter: this.toThousandFilterZero,
        },
        {
          prop: "performance_deposit_tenor",
          label: "PerformanceDepositTenor",
          minWidth: 220,
        },
        {
          prop: "fpmtm",
          label: "FPMTM (USD)",
          minWidth: 220,
          formatter: this.toThousandFilterZero,
        },
        {
          prop: "fpmtm_used_limit",
          label: "FPMTM Used (USD)",
          minWidth: 220,
          formatter: this.toThousandFilterZero,
        },
        {
          prop: "FPMTMBalance",
          label: "FPMTM Balance (USD)",
          minWidth: 220,
          formatter: this.toThousandFilterZero,
        },
        { prop: "fpmtm_tenor", label: "FPMTMTenor", minWidth: 220 },
        {
          prop: "expiry_date",
          label: "ExpiryDate",
          minWidth: 220,
          formatter: this.expiry_dateFormat,
        },
        { prop: "expired", label: "Expired", minWidth: 120 },
        { prop: "regular", label: "Regular", minWidth: 120 },
        { prop: "overdue", label: "Overdue", minWidth: 120 },
        { prop: "limit_excess", label: "LimitExcess", minWidth: 120 },
        { prop: "credit_status", label: "CreditStatus", minWidth: 120 },
        { prop: "comments", label: "Comment", minWidth: 120 },
      ];
      var temp = [];
      $.each(this.columns, function (key, val) {
        temp.push(val);
      });
      this.filterColumns = temp;
    },

    showPhto(row, column, cellValue, index) {
      if (cellValue != null && "" != cellValue) {
        return (
          '<i class="el-icon-zoom-in"><div style="display:none">' +
          cellValue +
          "</div></i>"
        );
      }
    },

    resetForm(formName) {
      //debugger;
      (this.filters = {
        serviceURL: this.filters.serviceURL,
      }),
        this.$refs.CyTable.resetForm();
      this.findPage();
    },
    showStatus(row, column, cellValue, index) {
      // debugger;
      for (let ddd = 0; ddd < this.popupQuizData.length; ddd++) {
        // debugger;
        if (this.popupQuizData[ddd].val == cellValue) {
          return this.popupQuizData[ddd].dicName;
        }
      }
      /* if (cellValue == 0) {
                     return "审核中";
                 } else if (cellValue == 1) {
                     return "审核成功";
                 }*/
      return "";
    },
    /*
    // 所属题库初始化
    querypageList() {
      var that = this;
      let query = {};
      //  debugger;
      

      //                this.utils.request.querypageList({t: "invest_quiz"}, function (data) {

      //              });
    },*/

    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePicRemove(file, fileList) {
      if (picFileList && picFileListt.length == 0) {
        this.dataForm.Picture = "";
      }
    },
    handleImgsRemove(file, fileList) {
      if (imgsFileList && imgsFileList.length == 0) {
        this.dataForm.imgs = "";
      }
    },
    beforeClose() {
      this.filelist = [];
    },
    async findDicType() {
      var this_ = this;

      this.utils.request.queryDicList("trainOrtest", function (res) {
        if ((res.code = 200)) {
          this_.popupQuestionTypeData = res.data;
        }
        //debugger;
        //
      });

      this.utils.request.queryDicList("quizStatusType", function (res) {
        if ((res.code = 200)) {
          this_.popupQuizData = res.data;
        }
        //debugger;
        //
      });
    },
    toThousandFilterZero: function (row, column, cellValue, index) {
      return ThousandFilterZero(cellValue, 2, ".", ",");
    },
    // 时间格式化
    expiry_dateFormat: function (row, column, cellValue, index) {
      let letdate = new Date(Date.parse(cellValue.replace(/-/g, "/")));

      let letRetrundata = cellValue.split(" ")[0];

      var time1 = Date.parse(new Date());
      //debugger;
      var nDays = parseInt((letdate.getTime() - time1) / 1000 / 3600 / 24);
      if (nDays < 30) {
        letRetrundata = letRetrundata + " (" + nDays + " days)";
      }
      return letRetrundata;
    },
    review(data) {
      if (this.checked.length < 1) {
        this.$message({ message: "审核数据不能为空", type: "error" });
        return;
      }
      this.dialogVisibleReviw = true;
    },
  },
  async mounted() {
    await this.findDicType();
    //debugger;
    this.initColumns();
    //this.querypageList();

    $(document).on(
      "click",
      ".el-icon-zoom-in",
      function (e) {
        let urlList = $(e.target).find("div").html();
        this.filelist = urlList.split(",");
        this.dialogVisibleImageList = true;
      }.bind(this)
    );
  },
};
</script>
<style>
.el-col {
  border-radius: 4px;
}
.el-row {
  padding-top: 10px;
}
.el-select {
  width: 100%;
}

.bg-purple-dark {
  background: #99a9bf;
}

.editformText {
  font-size: 12px;
}

.bg-purple {
  background: #d3dce6;
  font-size: 18px;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
<style scoped>
/deep/ .form .el-input__inner {
  width: 100%;
}

/deep/ .form .el-input__inner {
  height: 30px;
  line-height: 30px;
}

/deep/ .el-icon-zoom-in {
  cursor: pointer;
}

/deep/ .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
}

.textarea >>> .el-textarea__inner {
  font-family: "Microsoft" !important;
  font-size: 20px !important;
  width: 640px;
}
</style>



<!--
<dxg:GridColumn FieldName="ID" IsSmart="True" EditFormVisible="False"/>
            <dxg:GridColumn FieldName="ChineseGroupName" IsSmart="True" GroupIndex="0"/>
            <dxg:GridColumn FieldName="SrdGroupName" IsSmart="True"/>
            <dxg:GridColumn FieldName="ChineseCounterpartyName" IsSmart="True" Fixed="Left"/>
            <dxg:GridColumn FieldName="SrdCounterpartyName" IsSmart="True"/>
            <dxg:GridColumn FieldName="Level" IsSmart="True" SortIndex="0" SortOrder="Ascending"/>
            <dxg:GridColumn FieldName="Product" IsSmart="True" SortIndex="1" SortOrder="Ascending"/>
            <dxg:GridColumn FieldName="TRR" IsSmart="True"/>
            <dxg:GridColumn FieldName="TotalLimit" Header="Total Limit (USD)" IsSmart="True" EditSettings="{StaticResource RightAlignmentDecimalEditSettings}"/>
            <dxg:GridColumn FieldName="TotalLimitUsed" Header="Total Limit Used (USD)" IsSmart="True" EditSettings="{StaticResource RightAlignmentDecimalEditSettings}"/>
            <dxg:GridColumn FieldName="TotalLimitBalance" Header="Total Limit Balance (USD)" IsSmart="True" EditSettings="{StaticResource RightAlignmentDecimalEditSettings}"/>   TotalLimitBalance = _totalLimit - TotalLimitUsed;
            <dxg:GridColumn FieldName="OpenAccount" Header="Open Account (USD)" IsSmart="True" EditSettings="{StaticResource RightAlignmentDecimalEditSettings}"/>
            <dxg:GridColumn FieldName="OAUsed" Header="OA Used (USD)" IsSmart="True" EditSettings="{StaticResource RightAlignmentDecimalEditSettings}"/>
            <dxg:GridColumn FieldName="OABalance" Header="OA Balance (USD)" IsSmart="True" EditSettings="{StaticResource RightAlignmentDecimalEditSettings}"/>      _openAccount - OAUsed;
            <dxg:GridColumn FieldName="OATenor" IsSmart="True" EditSettings="{StaticResource RightAlignmentIntEditSettings}"/>
            <dxg:GridColumn FieldName="Prepayment" Header="Prepayment (USD)" IsSmart="True" EditSettings="{StaticResource RightAlignmentDecimalEditSettings}"/>
            <dxg:GridColumn FieldName="PrepaymentUsed" Header="Prepayment Used (USD)" IsSmart="True" EditSettings="{StaticResource RightAlignmentDecimalEditSettings}"/>
            <dxg:GridColumn FieldName="PrepaymentBalance" Header="Prepayment Balance (USD)" IsSmart="True" EditSettings="{StaticResource RightAlignmentDecimalEditSettings}"/>  dest.Prepayment - dest.PrepaymentUsed;
            <dxg:GridColumn FieldName="PrepaymentTenor" IsSmart="True" EditSettings="{StaticResource RightAlignmentIntEditSettings}"/>
            <dxg:GridColumn FieldName="PerformanceDeposit" Header="Performance Deposit (USD)" IsSmart="True" EditSettings="{StaticResource RightAlignmentDecimalEditSettings}"/>
            <dxg:GridColumn FieldName="PerformanceDepositUsed" Header="Performance Deposit Used (USD)" IsSmart="True" EditSettings="{StaticResource RightAlignmentDecimalEditSettings}"/>
            <dxg:GridColumn FieldName="PerformanceDepositBalance" Header="Performance Deposit Balance (USD)" IsSmart="True" EditSettings="{StaticResource RightAlignmentDecimalEditSettings}"/>   dest.PerformanceDeposit - dest.PerformanceDepositUsed;
            <dxg:GridColumn FieldName="PerformanceDepositTenor" IsSmart="True" EditSettings="{StaticResource RightAlignmentIntEditSettings}"/>
            <dxg:GridColumn FieldName="FPMTM" Header="FPMTM (USD)" IsSmart="True" EditSettings="{StaticResource RightAlignmentDecimalEditSettings}"/>
            <dxg:GridColumn FieldName="FPMTMUsed" Header="FPMTM Used (USD)" IsSmart="True" EditSettings="{StaticResource RightAlignmentDecimalEditSettings}"/>
            <dxg:GridColumn FieldName="FPMTMBalance" Header="FPMTM Balance (USD)" IsSmart="True" EditSettings="{StaticResource RightAlignmentDecimalEditSettings}"/>        dest.FPMTM - dest.FPMTMUsed
            <dxg:GridColumn FieldName="FPMTMTenor" IsSmart="True"  EditSettings="{StaticResource RightAlignmentIntEditSettings}"/>
            <dxg:GridColumn FieldName="ExpiryDate" IsSmart="True" Width="200"/>
            <dxg:GridColumn FieldName="Expired" IsSmart="True"/>
            <dxg:GridColumn FieldName="Regular" IsSmart="True"/>
            <dxg:GridColumn FieldName="Overdue" IsSmart="True"/>
            <dxg:GridColumn FieldName="LimitExcess" IsSmart="True"/>
            <dxg:GridColumn FieldName="CreditStatus" IsSmart="True"/>
            <dxg:GridColumn FieldName="Comment" IsSmart="True"/>
            <dxg:GridColumn FieldName="IsLocked" IsSmart="True" Visible="False"/>
            <dxg:GridColumn FieldName="LockedBy" IsSmart="True" Visible="False"/>
            <dxg:GridColumn FieldName="IsDeleted" IsSmart="True" Visible="False"/>
            <dxg:GridColumn FieldName="IsReadOnly" IsSmart="True" Visible="False"/>
            <dxg:GridColumn FieldName="Expression" IsSmart="True" Visible="False"/>
            <dxg:GridColumn FieldName="Format" IsSmart="True" Visible="False"/>
            <dxg:GridColumn FieldName="FieldName" IsSmart="True" Visible="False"/>
			
			
			{
                "limit_excess": "N",
                "chinese_counterparty_name": "xyz456",
                "prepayment_tenor": "3",
                "fpmtm": "40000",
                "isdeleted": "N",
                "prepayment": "20000",
                "performance_deposit_tenor": "4",
                "expired": "Y",
                "overdue": "N",
                "oa_used_limit": "978.79",
                "srd_group_company": "xyz123",
                "oa_tenor": "2",
                "regular": "Regular",
                "open_account": "10000",
                "product": "ALL",
                "comments": "By Onkar for Product",
                "expiry_date": "2019-03-15 00:00:00.0",
                "islocked": "N",
                "cr_level": "Sub",
                "total_limit": "100000",
                "performance_deposit": "30000",
                "credit_status": "Active",
                "performance_deposit_used_limit": "0",
                "total_limit_used": "995.11",
                "lockedby": "",
                "trr": "B+",
                "prepayment_used_limit": "16.31",
                "s_no": "212",
                "srd_counterparty_name": "xyz456",
                "fpmtm_used_limit": "0",
                "chinese_group_company": "xyz123",
                "fpmtm_tenor": "5"
            },
			
			
			
			[JsonProperty("cr_level")]
        public string Level { get; set; }

        [JsonProperty("trr")]
        public string TRR { get; set; }

        [JsonProperty("total_limit")]
        public string TotalLimit { get; set; }

        [JsonProperty("total_limit_used", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TotalLimitUsed { get; set; }

        [JsonProperty("open_account")]
        public string OpenAccount { get; set; }

        [JsonProperty("oa_used_limit", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string OAUsed { get; set; }

        [JsonProperty("oa_tenor")]
        public string OATenor { get; set; }

        [JsonProperty("prepayment")]
        public string Prepayment { get; set; }

        [JsonProperty("prepayment_used_limit", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string PrepaymentUsed { get; set; }

        [JsonProperty("prepayment_tenor")]
        public string PrepaymentTenor { get; set; }

        [JsonProperty("performance_deposit")]
        public string PerformanceDeposit { get; set; }

        [JsonProperty("performance_deposit_used_limit", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string PerformanceDepositUsed { get; set; }

        [JsonProperty("performance_deposit_tenor")]
        public string PerformanceDepositTenor { get; set; }

        [JsonProperty("fpmtm")]
        public string FPMTM { get; set; }

        [JsonProperty("fpmtm_used_limit", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string FPMTMUsed { get; set; }

        [JsonProperty("fpmtm_tenor")]
        public string FPMTMTenor { get; set; }

        [JsonProperty("expiry_date")]
        public string ExpiryDate { get; set; }

        [JsonProperty("expired", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Expired { get; set; }

        [JsonProperty("regular", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Regular { get; set; }

        [JsonProperty("overdue", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Overdue { get; set; }

        [JsonProperty("limit_excess", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string LimitExcess { get; set; }

        [JsonProperty("credit_status")]
        public string CreditStatus { get; set; }

        [JsonProperty("product")]
        public string Product { get; set; }

        [JsonProperty("comments")]
        public string Comment { get; set; }

        [JsonProperty("islocked", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string IsLocked { get; set; }

        [JsonProperty("lockedby", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string LockedBy { get; set; }

        [JsonProperty("isdeleted", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string IsDeleted { get; set; }
		
		
		
		[JsonProperty("cr_level")]
        public string Level { get; set; }

        [JsonProperty("trr")]
        public string TRR { get; set; }

        [JsonProperty("total_limit")]
        public string TotalLimit { get; set; }

        [JsonProperty("total_limit_used", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TotalLimitUsed { get; set; }

        [JsonProperty("open_account")]
        public string OpenAccount { get; set; }

        [JsonProperty("oa_used_limit", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string OAUsed { get; set; }

        [JsonProperty("oa_tenor")]
        public string OATenor { get; set; }

        [JsonProperty("prepayment")]
        public string Prepayment { get; set; }

        [JsonProperty("prepayment_used_limit", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string PrepaymentUsed { get; set; }

        [JsonProperty("prepayment_tenor")]
        public string PrepaymentTenor { get; set; }

        [JsonProperty("performance_deposit")]
        public string PerformanceDeposit { get; set; }

        [JsonProperty("performance_deposit_used_limit", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string PerformanceDepositUsed { get; set; }

        [JsonProperty("performance_deposit_tenor")]
        public string PerformanceDepositTenor { get; set; }

        [JsonProperty("fpmtm")]
        public string FPMTM { get; set; }

        [JsonProperty("fpmtm_used_limit", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string FPMTMUsed { get; set; }

        [JsonProperty("fpmtm_tenor")]
        public string FPMTMTenor { get; set; }

        [JsonProperty("expiry_date")]
        public string ExpiryDate { get; set; }

        [JsonProperty("expired", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Expired { get; set; }

        [JsonProperty("regular", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Regular { get; set; }

        [JsonProperty("overdue", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Overdue { get; set; }

        [JsonProperty("limit_excess", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string LimitExcess { get; set; }

        [JsonProperty("credit_status")]
        public string CreditStatus { get; set; }

        [JsonProperty("product")]
        public string Product { get; set; }

        [JsonProperty("comments")]
        public string Comment { get; set; }

        [JsonProperty("islocked", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string IsLocked { get; set; }

        [JsonProperty("lockedby", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string LockedBy { get; set; }

        [JsonProperty("isdeleted", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string IsDeleted { get; set; }
    }

-->