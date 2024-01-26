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
import ManageOfTeacher from "@/views/ManageOfTeacher.vue";
import ViewCourseOfTeacher from "@/views/manage_of_teacher/ViewCourseOfTeacher.vue";
import BuyCourseDetail from "@/views/course/BuyCourseDetail.vue";
import PlayCourseVideo from "@/views/PlayCourseVideo.vue";
import TeacherDetail from "@/views/TeacherDetail.vue";
import LiveRoom from "@/views/LiveRoom.vue";


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
          component: BuyCourseDetail
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
          path: 'manageOfTeacher',
          component: ManageOfTeacher,
          children:[
            {
              path: 'viewCourseOfTeacher',
              component: ViewCourseOfTeacher,
            },
          ],
        },
        {
          path: 'playCourseVideo',
          component: PlayCourseVideo
        },
        {
          path: 'teacherDetail',
          component: TeacherDetail
        },
        {
          path: 'liveRoom',
          component: LiveRoom
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
