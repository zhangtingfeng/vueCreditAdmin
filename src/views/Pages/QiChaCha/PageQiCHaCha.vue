
<template>
  <div style="height: auto">
    <iframe
      id="show-iframe"
      frameborder="0"
      scrolling="yes"
      style="background-color:transparent; position：absolute;width: 100%;
         height:100%; top: 0;left:0;bottom:0;"
      src="https://www.qcc.com/"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: "https://www.qcc.com/",
    };
  },
   mounted() {
 
    /**
     * iframe-宽高自适应显示   
     */
    const oIframe = document.getElementById('show-iframe');
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.height = (Number(deviceHeight)+100) + 'px'; //数字是页面布局高度差，其中的100可以根据自己的界面进行调整


 },
};
</script>