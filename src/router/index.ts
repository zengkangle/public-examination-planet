import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Base from "@/views/Base.vue";
import Course from "@/views/Course.vue";
import Live from "@/views/Live.vue";
import Talk from "@/views/Talk.vue";
import Teacher from "@/views/Teacher.vue";
import Starter from "@/views/Starter.vue";
import Login from "@/views/starter/Login.vue";
import BuyCourse from "@/views/course/BuyCourse.vue";
import MyCourse from "@/views/course/MyCourse.vue";
import Register from "@/views/starter/register.vue";
import WrittenTestOfBuy from "@/views/course/buy_course/WrittenTestOfBuy.vue";
import PublicInstitutionOfBuy from "@/views/course/buy_course/PublicInstitutionOfBuy.vue";
import InterviewOfBuy from "@/views/course/buy_course/InterviewOfBuy.vue";
import WrittenTestOfMine from "@/views/course/my_course/WrittenTestOfMine.vue";
import InterviewOfMine from "@/views/course/my_course/InterviewOfMine.vue";
import PublicInstitutionOfMine from "@/views/course/my_course/PublicInstitutionOfMine.vue";
import Manage from "@/views/Manage.vue";
import BuyCourseDetail from "@/views/course/BuyCourseDetail.vue";
import PlayCourseVideo from "@/views/PlayCourseVideo.vue";
import TeacherDetail from "@/views/TeacherDetail.vue";
import LiveRoom from "@/views/LiveRoom.vue";
import Knowledge from "@/views/Knowledge.vue";
import AddArticleOfAdminManage from "@/views/manage/AddArticleOfAdminManage.vue";
import CheckOfAdminManage from "@/views/manage/CheckOfAdminManage.vue";
import CourseOfAdminManage from "@/views/manage/CourseOfAdminManage.vue";
import CreateCourseOfManage from "@/views/manage/CreateCourseOfManage.vue";
import MyLiveOfManage from "@/views/manage/MyLiveOfManage.vue";
import SearchCheckOfManage from "@/views/manage/SearchCheckOfManage.vue";
import TeacherOfAdminManage from "@/views/manage/TeacherOfAdminManage.vue";
import UserInformationOfManage from "@/views/manage/UserInformationOfManage.vue";
import UserOfAdminManage from "@/views/manage/UserOfAdminManage.vue";
import MyCourseOfManage from "@/views/manage/MyCourseOfManage.vue";
import MyOrderOfManage from "@/views/manage/MyOrderOfManage.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/base/home',
    },
    {
      path: '/base',
      component: Base,
      children: [
        {
          path: 'home',
          component: Home,
        },
        {
          path: 'course',
          component: Course,
          children:[
            {
              path: 'buyCourse',
              component: BuyCourse,
              children: [
                {
                  path: 'writtenTestOfBuy',
                  component: WrittenTestOfBuy
                },
                {
                  path: 'interviewOfBuy',
                  component: InterviewOfBuy
                },
                {
                  path: 'publicInstitutionOfBuy',
                  component: PublicInstitutionOfBuy
                },
              ],
            },
            {
              path: 'myCourse',
              component: MyCourse,
              children: [
                {
                  path: 'writtenTestOfMine',
                  component: WrittenTestOfMine
                },
                {
                  path: 'interviewOfMine',
                  component: InterviewOfMine
                },
                {
                  path: 'publicInstitutionOfMine',
                  component: PublicInstitutionOfMine
                },
              ],
            },
          ],
        },
        {
          path: 'buyCourseDetail',
          component: BuyCourseDetail,
          props(route){
            return route.query
          }
        },
        {
          path: 'live',
          component: Live,
        },
        {
          path: 'talk',
          component: Talk,
        },
        {
          path: 'teacher',
          component: Teacher,
        },
        {
          path: 'manage',
          component: Manage,
          children:[
            {
              path: 'addArticleOfAdminManage',
              component: AddArticleOfAdminManage,
            },
            {
              path: 'checkOfAdminManage',
              component: CheckOfAdminManage,
            },
            {
              path: 'courseOfAdminManage',
              component: CourseOfAdminManage,
            },
            {
              path: 'createCourseOfManage',
              component: CreateCourseOfManage,
            },
            {
              path: 'myCourseOfManage',
              component: MyCourseOfManage,
            },
            {
              path: 'myLiveOfManage',
              component: MyLiveOfManage,
            },
            {
              path: 'myOrderOfManage',
              component: MyOrderOfManage,
            },
            {
              path: 'searchCheckOfManage',
              component: SearchCheckOfManage,
            },
            {
              path: 'teacherOfAdminManage',
              component: TeacherOfAdminManage,
            },
            {
              path: 'userInformationOfManage',
              component: UserInformationOfManage,
            },
            {
              path: 'userOfAdminManage',
              component: UserOfAdminManage,
            },
          ],
        },
        {
          path: 'playCourseVideo',
          component: PlayCourseVideo,
          props(route){
            return route.query
          }
        },
        {
          path: 'teacherDetail',
          component: TeacherDetail,
          props(route){
            return route.query
          }
        },
        {
          path: 'liveRoom',
          component: LiveRoom
        },
        {
          path: 'knowledge',
          component: Knowledge
        },
      ]
    },
    {
      path:'/starter',
      component: Starter,
      children:[
        {
          path: 'login',
          component: Login,
        },
        {
          path: 'register',
          component: Register,
        },
      ],
    },
  ]
})

export default router
