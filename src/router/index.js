import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import QuizPage from "../pages/QuizPage/QuizPage.vue";
import QuestionPage from "../pages/QuestionPage/QuestionPage.vue";
import QuizResult from "../pages/QuizPage/components/QuizResult.vue";
import ExampleEquip from "../pages/QuestionPage/components/ExampleEquip.vue";
import FlagDescription from "../pages/QuestionPage/components/FlagDescription.vue";
import Constructor from "../pages/QuizPage/components/Constructor.vue";

const routes = [
    {
        path: '/',
        name: MainPage,
        component: MainPage
    },
    {
        path: '/quiz/:id', 
        component: QuizPage,
        props: true
    },
    { 
        path: '/quiz/:id/question/:qid',
        component: QuestionPage,
        props: true
    },
    {
        path: '/quiz/:id/result',
        name: 'QuizResult',
        component: QuizResult,
        props: (route) => ({
          correct: Number(route.query.correct),
          total: Number(route.query.total),
          nextTourId: Number(route.query.nextTourId)
        })
    },
    {
        path: '/example-equip',
        component: ExampleEquip
    },
    {
        path: '/description',
        component: FlagDescription
    },
    {
        path: '/constructor/:id',
        component: Constructor
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;