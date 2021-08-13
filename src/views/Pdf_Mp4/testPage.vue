<template>
  <div class="onlineHelp cg-box">
    <div class="tools">
      <div class="page">第 {{ pageNum }} /{{ pageTotalNum }}页</div>
      <el-input
        v-model.number="goPageNum"
        style="width: 70px; margin-right: 8px"
      ></el-input>
      <el-button type="success" @click.stop="goPage"> 前往</el-button>
      <el-button type="primary" @click.stop="prePage"> 上一页</el-button>
      <el-button type="primary" @click.stop="nextPage"> 下一页</el-button>
    </div>
    <div class="pdf-box">
      <pdf
        ref="pdf"
        :src="url"
        :page="pageNum"
        @progress="loadedRatio = $event"
        @page-loaded="pageLoaded($event)"
        @num-pages="pageTotalNum = $event"
        @error="pdfError($event)"
        @link-clicked="page = $event"
      >
      </pdf>
    </div>
  </div>
</template>
<script>
import pdf from "vue-pdf";
export default {
  name: "onlineHelp",
  components: {
    pdf,
  },
  data() {
    return {
      url: "/Konowledge/学沟通/沟通书籍/沟通力-人际关系.pdf",
      pageNum: 1,
      pageTotalNum: 1,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0,
      goPageNum: 1,
    };
  },
  methods: {
    // 上一页函数，
    prePage() {
      var page = this.pageNum;
      page = page > 1 ? page - 1 : this.pageTotalNum;
      this.pageNum = page;
    },
    // 下一页函数
    nextPage() {
      var page = this.pageNum;
      page = page < this.pageTotalNum ? page + 1 : 1;
      this.pageNum = page;
    },
    // 前往页数
    goPage() {
      if (
        !this.goPageNum ||
        /\D/.test(this.goPageNum) ||
        this.goPageNum < 1 ||
        this.goPageNum > this.pageTotalNum
      ) {
        this.$message.warning("输入页码有误");
        return;
      }
      this.pageNum = this.goPageNum;
    },
    // 页面加载回调函数，其中e为当前页数
    pageLoaded(e) {
      this.curPageNum = e;
    },
    // 其他的一些回调函数。
    pdfError(error) {
      console.error(error);
    },
  },
};
</script>

<style lang="scss">
.onlineHelp {
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  .tools {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 999;
    .page {
      display: inline-block;
      margin-right: 10px;
    }
  }
  .pdf-box {
    height: 100%;
    overflow: auto;
    width: 90%;
  }
}
</style>