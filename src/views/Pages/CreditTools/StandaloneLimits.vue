
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
            label="Add to new group"
            type="primary"
            @click="addNewGroup"
          />
          <kt-button
            icon="fa fa-search"
            label="Query"
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
    <!--表格内容栏          https://testupload.edu.eggsoft.cn/A2.txt  https://testupload.edu.eggsoft.cn/A2.txt-->
    <cy-table
      :max-height="1000"
      :data="pageResult"
      :operationWidth="140"
      :showBatchDelete=false
      :columns="filterColumns"
      @findPage="findPage"
      @selectionChange="selectionChange"
      @handleDelete="handleDelete"
      @handleAddToExsiting="handleAddToExsiting"
      @handleEdit="handleDetail"
      ref="CyTable"
    ></cy-table>
    <!--新增编辑界面-->
    <el-dialog
      :title="
        operation ? 'New Standlone Limit Detail' : 'Edit Standlone Limit Detail'
      "
      width="70%"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="dataForm"
        :rules="dataFormRules"
        ref="dataForm"
        :inline="true"
        :size="size"
        class="form editform"
      >
        <!--one                         line  -->
        <el-row>
          <el-col :span="11">
            <el-form-item
              class="editformText"
              label="Chinese Group Name"
              prop="chinese_group_company"
            ></el-form-item>

            <el-select
              filterable
              v-model="dataForm.chinese_group_company"
              placeholder="Chinese Group Name"
              @change="selectchangechinese_group_company"
            >
              <el-option
                v-for="(item, index) in cpmappingdetailsList"
                :key="index"
                :label="item.chinese_group_company"
                :value="item.chinese_group_company"
              >
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="11" style="margin-left: 4%">
            <el-form-item
              class="editformText"
              label="SRD Group Name"
              prop="srd_group_company"
            ></el-form-item>

            <el-select
              filterable
              v-model="dataForm.srd_group_company"
              placeholder="SRD Group Name"
              @change="selectchangesrd_group_company"
            >
              <el-option
                v-for="(item, index) in cpmappingdetailsList"
                :key="index"
                :label="item.srd_counterparty_name"
                :value="item.srd_counterparty_name"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col :span="11">
            <el-form-item
              class="editformText"
              label="Chinese Counterparty Name"
              prop="chinese_counterparty_name"
            ></el-form-item>

            <el-select
              filterable
              v-model="dataForm.chinese_counterparty_name"
              placeholder="Chinese Counterparty Name"
              @change="selectchangechinese_counterparty_name"
            >
              <el-option
                v-for="(item, index) in cpmappingdetailsList"
                :key="index"
                :label="item.chinese_group_company"
                :value="item.chinese_group_company"
              >
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="11" style="margin-left: 4%">
            <el-form-item
              class="editformText"
              label="SRD Counterparty Name"
              prop="srd_counterparty_name"
            ></el-form-item>

            <el-select
              filterable
              v-model="dataForm.srd_counterparty_name"
              placeholder="SRD Counterparty Name"
              @change="selectchangesrd_counterparty_name"
            >
              <el-option
                v-for="(item, index) in cpmappingdetailsList"
                :key="index"
                :label="item.srd_counterparty_name"
                :value="item.srd_counterparty_name"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col :span="11">
            <div class="editformText">Level</div>
            <el-select
              filterable
              v-model="dataForm.cr_level"
              placeholder="Level"
            >
              <el-option label="Group" value="Group"></el-option>
              <el-option label="Sub" value="Sub"></el-option>
            </el-select>
          </el-col>

          <el-col :span="11" style="margin-left: 4%">
            <div class="editformText">TRR</div>
            <el-input v-model="dataForm.trr" placeholder="TRR"> </el-input>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col :span="11">
            <div class="editformText">TotalLimit</div>
            <el-input
              v-model="dataForm.total_limit"
              placeholder="TotalLimit"
              @focus="provingFormatFocus"
              @blur="provingFormatBlur"
            >
            </el-input>
          </el-col>

          <el-col :span="11" style="margin-left: 4%">
            <div class="editformText">Total Limit Balance (USD)</div>
            <el-input
              v-model="dataForm_AutoCount.total_limit_Balance"
              placeholder="Total Limit Balance (USD)"
              @focus="provingFormatFocus"
              @blur="provingFormatBlur"
            >
            </el-input>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col :span="11">
            <div class="editformText">Open Account (USD)</div>
            <el-input
              @focus="provingFormatFocus"
              @blur="provingFormatBlur"
              v-model="dataForm.open_account"
              placeholder="Open Account (USD)"
            >
            </el-input>
          </el-col>

          <el-col :span="11" style="margin-left: 4%">
            <div class="editformText">Open Account Balance (USD)</div>
            <el-input
              v-model="dataForm_AutoCount.open_account_Balance"
              placeholder="Open Account Balance (USD)"
              @focus="provingFormatFocus"
              @blur="provingFormatBlur"
            >
            </el-input>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col :span="11">
            <div class="editformText">OA Tenor</div>
            <el-input
              @focus="provingFormatFocus"
              @blur="provingFormatBlur"
              v-model="dataForm.oa_tenor"
              placeholder="OA Tenor"
            >
            </el-input>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col :span="11">
            <div class="editformText">Prepayment (USD)</div>
            <el-input
              @focus="provingFormatFocus"
              @blur="provingFormatBlur"
              v-model="dataForm.prepayment"
              placeholder="Prepayment (USD)"
            >
            </el-input>
          </el-col>

          <el-col :span="11" style="margin-left: 4%">
            <div class="editformText">Prepayment Balance (USD)</div>
            <el-input
              v-model="dataForm_AutoCount.prepayment_Balance"
              placeholder="Prepayment Balance (USD)"
              @focus="provingFormatFocus"
              @blur="provingFormatBlur"
            >
            </el-input>
          </el-col> </el-row
        ><!--one                         line  -->
        <el-row>
          <el-col :span="11">
            <div class="editformText">Prepayment Tenor</div>
            <el-input
              @focus="provingFormatFocus"
              @blur="provingFormatBlur"
              v-model="dataForm.prepayment_tenor"
              placeholder="Prepayment Tenor"
            >
            </el-input>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col :span="11">
            <div class="editformText">Performance Deposit (USD)</div>
            <el-input
              @focus="provingFormatFocus"
              @blur="provingFormatBlur"
              v-model="dataForm.performance_deposit"
              placeholder="Performance Deposit (USD)"
            >
            </el-input>
          </el-col>

          <el-col :span="11" style="margin-left: 4%">
            <div class="editformText">Performance Deposit Balance (USD)</div>
            <el-input
              v-model="dataForm_AutoCount.performance_deposit_Balance"
              placeholder="Performance Deposit Balance (USD)"
              @focus="provingFormatFocus"
              @blur="provingFormatBlur"
            >
            </el-input>
          </el-col> </el-row
        ><!--one                         line  -->
        <el-row>
          <el-col :span="11">
            <div class="editformText">Performance Deposit Tenor</div>
            <el-input
              @focus="provingFormatFocus"
              @blur="provingFormatBlur"
              v-model="dataForm.performance_deposit_tenor"
              placeholder="Performance Deposit Tenor"
            >
            </el-input>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col :span="11">
            <div class="editformText">FPMTM (USD)</div>
            <el-input
              v-model="dataForm.fpmtm"
              @focus="provingFormatFocus"
              @blur="provingFormatBlur"
              placeholder="FPMTM (USD)"
            >
            </el-input>
          </el-col>

          <el-col :span="11" style="margin-left: 4%">
            <div class="editformText">FPMTM Balance (USD)</div>
            <el-input
              v-model="dataForm_AutoCount.fpmtm_Balance"
              placeholder="FPMTM Balance (USD)"
              @focus="provingFormatFocus"
              @blur="provingFormatBlur"
            >
            </el-input>
          </el-col> </el-row
        ><!--one                         line  -->
        <el-row>
          <el-col :span="11">
            <div class="editformText">FPMTM Tenor</div>
            <el-input
              
              v-model="dataForm.fpmtm_tenor"
              placeholder="FPMTM Tenor"
              @focus="provingFormatFocus"
              @blur="provingFormatBlur"
            >
            </el-input>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col :span="11">
            <div class="editformText">Expiry Date</div>
            <!--            <el-input v-model="dataForm.expiry_date" placeholder="Expiry Date">
              
            </el-input>-->

            <el-date-picker
              v-model="dataForm.expiry_date"
              type="date"
              placeholder="Expiry Date"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>

          <el-col :span="11" style="margin-left: 4%">
            <div class="editformText">Expried</div>
            <el-input
              v-model="dataForm_AutoCount.Expried"
              placeholder="Expried"
              :disabled="dataForm_AutoCount.disableExpried"
            >
            </el-input>
          </el-col> </el-row
        ><!--one                         line  -->
        <el-row>
          <el-col :span="11">
            <div class="editformText">Credit Status</div>
            <el-select
              filterable
              v-model="dataForm.credit_status"
              placeholder="Credit Status"
            >
              <el-option label="Active" value="Active"></el-option>
              <el-option label="Inactive" value="Inactive"></el-option>
              <el-option label="Suspended" value="Suspended"></el-option>
            </el-select>
          </el-col>

          <el-col :span="11" style="margin-left: 4%">
            <div class="editformText">Regular</div>
            <el-select
              filterable
              v-model="dataForm.regular"
              placeholder="Regular"
            >
              <el-option label="Regular" value="Regular"></el-option>
              <el-option label="Irregular" value="Irregular"></el-option>
            </el-select>
          </el-col> </el-row
        ><!--one                         line  -->
        <el-row>
          <el-col :span="11">
            <div class="editformText">Overdue</div>
            <el-select
              filterable
              v-model="dataForm_AutoCount.Overdue"
              placeholder="Overdue"
              :disabled="dataForm_AutoCount.disableOverdue"
            >
              <el-option label="Y" value="Y"></el-option>
              <el-option label="N" value="N"></el-option>
            </el-select>
          </el-col>

          <el-col :span="11" style="margin-left: 4%">
            <div class="editformText">Limit Excess</div>
            <el-select
              filterable
              v-model="dataForm_AutoCount.Limit_Excess"
              placeholder="Limit Excess"
              :disabled="dataForm_AutoCount.disableLimitExcess"
            >
              <el-option label="Y" value="Y"></el-option>
              <el-option label="N" value="N"></el-option>
            </el-select>
          </el-col> </el-row
        ><!--one                         line  -->
        <el-row>
          <el-col :span="11">
            <el-form-item
              class="editformText"
              label="Product"
              prop="product"
            ></el-form-item>

            <el-select
              filterable
              v-model="dataForm.product"
              placeholder="Limit Excess"
            >
              <el-option label="All" value="All"></el-option>
              <el-option label="Coal" value="Coal"></el-option>
              <el-option label="Concs" value="Concs"></el-option>
              <el-option label="Ferrous" value="Ferrous"></el-option>
              <el-option label="Refined" value="Refined"></el-option>
              <el-option label="Others" value="Others"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <!--one                         line  -->
        <el-row>
          <el-col :span="23">
            <el-form-item class="editformText" label="comments" prop="comments">
            </el-form-item>
            <el-input
              v-model="dataForm.comments"
              placeholder="Comment"
            ></el-input>
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
  </div>
</template>

<script>
import PopupTreeInput from "@/components/PopupTreeInput";
import KtTable from "@/views/Core/KtTable";
import TreeSelect from "@riophae/vue-treeselect";
import KtButton from "@/views/Core/KtButton";
import TableColumnFilterDialog from "@/views/Core/TableColumnFilterDialog";
import { format, formatDate, ThousandFilterZero } from "@/utils/datetime";
import CyTable from "@/views/Core/CyTableExample";
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
          value: "Chinese Group Name1",
          label: "Chinese Group Name1",
        },
        {
          value: "Chinese Group Name2",
          label: "Chinese Group Name3",
        },
        {
          value: "Chinese Group Name3",
          label: "Chinese Group Name3",
        },
        {
          value: "Chinese Group Name4",
          label: "Chinese Group Name5",
        },
        {
          value: "Chinese Group Name5",
          label: "Chinese Group Name5",
        },
      ],
      value: "",
      dataStatusForm: {},
      dialogVisibleReviw: false,

      cpmappingdetailsList: [],
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
        serviceAddURL: "qichacha-service/CreditLimit_StandaloneLimitsView/add",
        serviceDeleteURL:
          "qichacha-service/CreditLimit_StandaloneLimitsView/delete",
      },
      dataForm: {
        cr_level: "Group",
        trr: null,
        total_limit: "0",
        open_account: "0",
        oa_tenor: "0",
        prepayment: "0",
        prepayment_tenor: "0",
        performance_deposit: "0",
        performance_deposit_tenor: "0",
        fpmtm: "0",
        fpmtm_tenor: "0",
        expiry_date: formatDate(new Date(), "yyyy-MM-dd"),
        credit_status: "Active",
        product: "ALL",
        comments: null,
        chinese_counterparty_name: null,
        srd_counterparty_name: null,
        chinese_group_company: null,
        srd_group_company: null,
      },
      dataForm_AutoCount: {
        disableOverdue: false,
        disableLimitExcess: false,
        disableExpried: false,
      },
      dataFormRules: {
        chinese_counterparty_name: [
          {
            required: true,
            message: "please input chinese counterparty name",
            trigger: "change",
          },
        ],
        srd_counterparty_name: [
          {
            required: true,
            message: "please input srd counterparty name",
            trigger: "change",
          },
        ],
        chinese_group_company: [
          {
            required: true,
            message: "please input chinese group company",
            trigger: "change",
          },
        ],
        srd_group_company: [
          {
            required: true,
            message: "please input srd group company",
            trigger: "change",
          },
        ],
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
    provingFormatShow______(str) {
      //debugger;
      var this_ = this;
      this_.dataForm[str] = this_.dataForm[str].replace(/,/g, ""); //取消字符串中出现的所有逗号
      //e = str.replace(/,/g, "");//取消字符串中出现的所有逗号
    },
    provingFormatBlur(e) {
      debugger;
      e.target.value = e.target.value.replace(/[^\.\d]/g, "");
      // this.dataForm.trr = this.dataForm.trr.replace(".", "");
      e.target.value = ThousandFilterZero(e.target.value, 2, ".", ",");
    },

    provingFormatFocus(e) {
      debugger;
      e.target.value = e.target.value.replace(/[^\.\d]/g, "");
      // this.dataForm.trr = this.dataForm.trr.replace(".", "");
      //e.target.value = ss1.replace('$','').replace('￥','').replace('，','').replace(/,/g,'');
    },

    provingFormatShow(e) {
      debugger;
      e.target.value = e.target.value.replace(/[^\.\d]/g, "");
      // this.dataForm.trr = this.dataForm.trr.replace(".", "");
      e.target.value = ThousandFilterZero(e.target.value, 2, ".", ",");
    },
    selectchangechinese_group_company(item) {
      // debugger;
      let LetList = this.cpmappingdetailsList.filter(
        (itmer) => itmer.chinese_group_company == item
      ); //管理员
      if (LetList.length > 0) {
        this.dataForm.srd_group_company = LetList[0].srd_counterparty_name;
      }
    },
    selectchangesrd_group_company(item) {
      // debugger;
      let LetList = this.cpmappingdetailsList.filter(
        (itmer) => itmer.srd_counterparty_name == item
      ); //管理员
      if (LetList.length > 0) {
        this.dataForm.chinese_group_company = LetList[0].srd_counterparty_name;
      }
    },
    selectchangechinese_counterparty_name(item) {
      // debugger;
      let LetList = this.cpmappingdetailsList.filter(
        (itmer) => itmer.chinese_group_company == item
      ); //管理员
      if (LetList.length > 0) {
        this.dataForm.srd_counterparty_name = LetList[0].srd_counterparty_name;
      }
    },
    selectchangesrd_counterparty_name(item) {
      //debugger;
      let LetList = this.cpmappingdetailsList.filter(
        (itmer) => itmer.srd_counterparty_name == item
      ); //管理员
      if (LetList.length > 0) {
        this.dataForm.chinese_counterparty_name =
          LetList[0].chinese_group_company;
      }
    },

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
    addNewGroup: function (params) {
      let this_ = this;
      this.dialogVisible = true;
      this.operation = true;
      if (this.$refs["dataForm"]) {
        this.$refs["dataForm"].resetFields();
      }
      this_.dataForm_AutoCount.disableOverdue = true;
      this_.dataForm_AutoCount.disableLimitExcess = true;
      this_.dataForm_AutoCount.disableExpried = true;
      /*this.dataForm.status = 0;
      if (this.login_shop_id) {
        this.dataForm.shop_id = this.login_shop_id;
      }
      this.dataForm.parentName = "";
*/
      //  this.picList = [];
      // this.imgsList = [];
    },
    // 显示编辑界面
    handleDetail: function (params) {
      //debugger;
      this.dialogVisible = true;
      this.operation = true;
      this.$nextTick(() => {
        let this_ = this;
        params.row.parentName = params.row.type;
        this.dataForm = Object.assign({}, params.row);
      });
    },
    //保存修改
    submitForm: function () {
      var this_ = this;
      //debugger;
      this_.$refs.dataForm.validate((valid) => {
        if (valid) {
          debugger;
          let params = {};

          //this_.provingFormatShow______("total_limit");
          //this_.provingFormatShow______("open_account");
          //this_.provingFormatShow______("oa_tenor");
          //this_.provingFormatShow______("prepayment");
          //this_.provingFormatShow______("prepayment_tenor");
          //this_.provingFormatShow______("performance_deposit");
          //this_.provingFormatShow______("performance_deposit_tenor");
          //this_.provingFormatShow______("fpmtm");
          //this_.provingFormatShow______("fpmtm_tenor");

          //debugger;
          let paramsdata = Object.assign({}, this_.dataForm);
          params.data = JSON.stringify(paramsdata);

          // params.imgs = this.imgsList.map(item => item.url).toString();

          this_.editLoading = true;

          this_.utils.request.requestPostUrl(
            params,
            this.filters.serviceAddURL,
            function (res) {
              this_.editLoading = false;

              if (res.code == 200) {
                this_.$message({ message: "success", type: "success" });
                this_.findPage();
                this_.dialogVisible = false;
              } else if (res.code == 401) {
                this_.$message({ message: "Error, " + res.msg, type: "error" });
                /*  Message.error({
                  //弹窗使用方法
                  showClose: true,
                  duration: 2000, //警告的消息3秒钟后消失
                  message: res.msg,
                });*/
              }
            }
          );

          // this_.utils.request.editInfo(params, this_.editInfoBack);
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
      debugger;
      let params = {};
      for (var i = 0; i < data.params.length; i++) {
        ids = ids + data.params[i].id + ",";
      }
      //data.t = "standalone/creditlimit/408";
      params.ids = ids;
      let this_ = this;
      //this_.editLoading = true;

      this_.utils.request.requestPostUrl(
        params,
        this.filters.serviceDeleteURL,
        function (res) {
          this_.editLoading = false;

          if (res.code == 200) {
            this_.$message({ message: "success", type: "success" });
            this_.findPage();
            this_.dialogVisible = false;
          } else if (res.code == 401) {
            this_.$message({ message: "Error, " + res.msg, type: "error" });
            /*  Message.error({
                  //弹窗使用方法
                  showClose: true,
                  duration: 2000, //警告的消息3秒钟后消失
                  message: res.msg,
                });*/
          }
        }
      );

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
    // 显示新增界面
    handleAddToExsiting: function (params) {
      debugger;
      this.dialogVisible = true;
      this.operation = false;
      this.$nextTick(() => {
        let this_ = this;
        params.row.parentName = params.row.type;
        let letData = Object.assign({}, params.row);
        this_.dataForm.chinese_group_company = letData.chinese_group_company;
        this_.dataForm.srd_group_company = letData.srd_group_company;
      });
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
    async findcreditwsGetType() {
      var this_ = this;
      this.utils.request.querycreditwsGetList(
        "counterpartymappingdetails",
        function (res) {
          //
          if ((res.code = 200)) {
            this_.cpmappingdetailsList = res.data.cpmappingdetails;
            //Object.assign( this_.cpmappingdetailsListFull,cpmappingdetailsList);//js之数组克隆/.es6新增方法-Object.assign
          }
          //debugger;
          //
        }
      );
    },
    toThousandFilterZero: function (row, column, cellValue, index) {
      return ThousandFilterZero(cellValue, 2, ".", ",");
    },
    // 时间格式化
    expiry_dateFormat: function (row, column, cellValue, index) {
      if (cellValue==undefined) return '';
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
    await this.findcreditwsGetType();
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

/deep/ .form .el-date-editor {
  width: 100%;
}

/deep/ .form .editformText {
  width: 100%;
}
/deep/ .form .el-form-item__error {
  width: 400px;
}

/deep/ .form .el-form-item {
  margin-bottom: 0px;
}

/deep/ .el-button--mini,
.el-button--mini.is-round {
  padding: 7px 3px;
}

/deep/ .form .el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 12px;
  color: #606266;
  line-height: 14px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
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