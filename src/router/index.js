import Vue from 'vue'
import Router from 'vue-router'
import Cookies from "js-cookie"
import Login from '@/views/Login'
import Registe from '@/views/Registe'
import testregiste from '@/views/Registe'
import pdfPlay from '@/views/Pdf_Mp4/pdf'
import NotFound from '@/views/Error/404'
import Home from '@/views/Home'
import Intro from '@/views/Intro/Intro'
import Generator from '@/views/Generator/Generator'
import api from '@/http/api'
import store from '@/store'

import utils from '@/assets/js/utils'

import { getIFramePath, getIFrameUrl } from '@/utils/iframe'

Vue.use(Router)

const white_url = ['/404', '/registe', '/testregiste', '/pdfPlay'];

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        {
          path: '',
          name: '首页',
          component: Intro,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 0
          }
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    },
    {
      path: '/registe',
      name: '注册',
      component: Registe
    },
    {
      path: '/testregiste',
      name: '注册',
      component: testregiste
    },
    {
      path: '/pdfPlay',
      name: '注册1',
      component: pdfPlay
    }
  ]
})


const asyncRoutes = [
  {
    icon: 'el-icon-s-operation',
    name: "展会管理",
    id: 13,
    children: [
      {
        icon: 'el-icon-setting',
        name: "信息登记审核",
        url: "/Pages/MessageInfoManage",
        id: 1,
      },
      {
        icon: 'el-icon-info',
        name: "信息登记记录",
        url: "/Pages/MessageInfoLog",
        id: 2
      },

      {
        icon: 'el-icon-data-analysis',
        name: "扫码器别名管理",
        url: "/Pages/PdaInfo",
        id: 3
      },
      {
        icon: 'el-icon-share',
        name: "展会报名信息",
        url: "/Pages/Activity/RegistrationInformation",
        id: 5
      },
      {
        icon: 'el-icon-share',
        name: "展厅分类信息",
        url: "/Pages/Activity/ShowroomType",
        id: 17
      },
      {
        icon: 'el-icon-share',
        name: "展厅视频信息",
        url: "/Pages/Activity/ShowroomVideo",
        id: 18
      },
    ]
  },
  {
    icon: 'el-icon-s-open',
    name: "服务管理",
    id: 14,
    children: [
      {
        icon: 'el-icon-s-opportunity',
        name: "酒店管理",
        url: "/Pages/Activity/HotelManage",
        id: 6
      },
      {
        icon: 'el-icon-s-custom',
        name: "物流管理",
        url: "/Pages/Activity/Logistics",
        id: 7
      },
      {
        icon: 'el-icon-platform-eleme',
        name: "餐饮服务列表",
        url: "/Pages/CateringService",
        id: 19
      },
      {
        icon: 'el-icon-platform-eleme',
        name: "轮播图管理",
        url: "/Pages/CarouselFigure",
        id: 14
      },
    ]
  },
  {
    icon: 'el-icon-s-home',
    name: "活动管理",
    id: 15,
    children: [

      {
        icon: 'el-icon-folder-opened',
        name: "活动列表管理",
        url: "/Pages/Activity/Activity",
        id: 4
      },

    ]
  },
  {
    icon: 'el-icon-s-shop',
    name: "商家管理",
    id: 16,
    children: [
      {
        icon: 'el-icon-s-promotion',
        name: "商家信息",
        url: "/Pages/ShopList",
        id: 9
      },
      {

        icon: 'el-icon-video-camera-solid',
        name: "商品列表",
        url: "/Pages/ProductInfo",
        id: 11
      },
      {
        icon: 'el-icon-eleme',
        name: "商家审核列表",
        url: "/Pages/ShopReviewed",
        id: 12

      },

    ]
  },

  {
    icon: 'el-icon-s-release',
    name: "资讯信息",
    url: "/Pages/UserNews",
    id: 8
  },

  {
    icon: 'el-icon-s-ticket',
    name: "消息推送列表",
    url: "/Pages/SysNews",
    id: 10
  },
  {
    icon: 'el-icon-platform-eleme',
    name: "商品分类名称",
    url: "/Pages/ProductType",
    id: 20
  },
  {
    icon: 'el-icon-platform-eleme',
    name: "餐饮服务列表",
    url: "/Pages/CateringService",
    id: 22
  },
  {
    icon: 'el-icon-platform-eleme',
    name: "动态列表",
    url: "/Pages/Activity/UserDynamic",
    id: 21
  },
  {
    icon: 'el-icon-platform-eleme',
    name: "会员管理",
    url: "/Pages/Activity/Member",
    id: 14
  },
  {
    icon: 'el-icon-s-opportunity',
    name: "店铺门牌管理",
    url: "/Pages/ShopDoorPlate",
    id: 26
  },
  {
    icon: 'el-icon-eleme',
    name: "店铺门牌号审核",
    url: "/Pages/ShopNumberReviewed",
    id: 28
  },

]
router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let token = localStorage.getItem('token');
  let userId = localStorage.getItem('id')

  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if (token) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {

    var isFilter = true;
    $.each(white_url, function (key, val) {
      if (val == to.path) {
        isFilter = false;
        return;
      }
    })

    if (!token && isFilter) {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({ path: '/login' })
    } else {

      if (isFilter) {
        // 加载动态菜单和路由
        //addDynamicMenuAndRoutes(userId, to, from)
        createThread().then(val => {
          addDynamicMenuAndRoutes(userId, to, from)
        });
      }
      next()
    }
  }
})




/**
* 加载动态菜单和路由
*/
function addDynamicMenuAndRoutes(userId, to, from) {

  // 处理IFrame嵌套页面
  handleIFrameUrl(to.path)

  if (store.state.app.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在.')
    return
  }

  // 保存加载状态
  store.commit('menuRouteLoaded', true)

  // let dynamicRoutes = addDynamicRoutes(asyncRoutes);
  // // 处理静态组件绑定路由
  // handleStaticComponent(router, dynamicRoutes)
  // router.addRoutes(router.options.routes)
  // console.log(dynamicRoutes)
  // // 保存菜单树
  // store.commit('setNavTree', asyncRoutes)

  utils.request.findNavTree({ userid: userId }, function (response) {
    var code = response.code;
    if (code == 200) {
      console.log(response.data)
      //添加动态路由
      let dynamicRoutes = addDynamicRoutes(response.data)
      // 处理静态组件绑定路由
      handleStaticComponent(router, dynamicRoutes)
      router.addRoutes(router.options.routes)
      console.log(dynamicRoutes)
      // 保存菜单树
      store.commit('setNavTree', response.data)
    } else {
      // 保存加载状态
      store.commit('menuRouteLoaded', false)
    }
  });

  utils.request.findPermissions({ userid: userId }, function (response) {
    var code = response.code;
    if (code == 200) {

      // 保存用户权限标识集合
      store.commit('setPerms', response.data)


    }
  });

}

function createThread() {
  // 你的逻辑代码
  return Promise.resolve()
}






/**
 * 处理路由到本地直接指定页面组件的情况
 * 比如'代码生成'是要求直接绑定到'Generator'页面组件
 */
function handleStaticComponent(router, dynamicRoutes) {
  for (let j = 0; j < dynamicRoutes.length; j++) {
    if (dynamicRoutes[j].name == '代码生成') {
      dynamicRoutes[j].component = Generator
      break
    }
  }
  router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
}

/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path
  let length = store.state.iframe.iframeUrls.length
  for (let i = 0; i < length; i++) {
    let iframe = store.state.iframe.iframeUrls[i]
    if (path != null && path.endsWith(iframe.path)) {
      url = iframe.url
      store.commit('setIFrameUrl', url)
      break
    }
  }
}

/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
function addDynamicRoutes(menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id
        }
      }
      let path = getIFramePath(menuList[i].url)
      if (path) {
        // 如果是嵌套页面, 通过iframe展示
        route['path'] = path
        route['component'] = resolve => require([`@/views/IFrame/IFrame`], resolve)
        // 存储嵌套页面路由路径和访问URL
        let url = getIFrameUrl(menuList[i].url)
        let iFrameUrl = { 'path': path, 'url': url }
        store.commit('addIFrameUrl', iFrameUrl)
      } else {
        try {
          // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
          // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
          let array = menuList[i].url.split('/')
          let url = ''
          for (let i = 0; i < array.length; i++) {
            url += array[i].substring(0, 1).toUpperCase() + array[i].substring(1) + '/'
          }
          url = url.substring(0, url.length - 1)
          route['component'] = resolve => require([`@/views/${url}`], resolve)
        } catch (e) { }
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    //console.log('动态路由加载...')
    //console.log(routes)
    //console.log('动态路由加载完成.')
  }
  return routes
}

export default router
