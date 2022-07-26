import {createStore} from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
    {
        id: 100,
        title: "test survey",
        slug: "test-survey",
        status: "draft",
        image: "https://michaelahlincolnonline.com/wp-content/uploads/2020/10/ce-travel.jpg",
        description: "travel every where",
        created_at: "2022-06-20 18:00:00",
        updated_at: "2022-06-20 18:00:00",
        expire_at: "2022-06-25 18:00:00",
        questions: [
            {
                id: 1,
                type: 'select',
                question: "where are you from?",
                description: null,
                data: {
                    options: [
                        { uuid: "11111111-1111-1111-111111111111", text: "Russia"},
                        { uuid: "22222222-2222-2222-222222222222", text: "USA"}
                    ]
                },
            },
            {
                id: 2,
                type: "textarea",
                question: "tell about your dreams",
                description: null,
                data: {},
            }
        ],
    },
    {
        id: 200,
        title: 'laravel 8',
        slug: 'laravel-8',
        status: 'active',
        image: "https://laravel.demiart.ru/wp-content/uploads/2020/09/laravel-8.png",
        description: "php framework",
        created_at: "2022-06-21 18:00:00",
        updated_at: "2022-06-21 18:00:00",
        expire_at: "2022-06-26 18:00:00",
        questions: [],
    }
];

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN')
        },
        surveys: [...tmpSurveys],
    },
    getters: {},
    actions: {
        register({commit}, user){
            return axiosClient.post('/register', user)
            .then(({data}) => {
                commit('setUser', data);
                return data;
            })
        },
        login({commit}, user){
            return axiosClient.post('/login', user)
            .then(({data}) => {
                commit('setUser', data);
                return data;
            })
        },
        logout({commit}){
            return axiosClient.post('/logout')
            .then(response => {
                commit('logout');
                return response;
            })
        }
    },
    mutations: {
        logout: (state)=>{
            state.user.data= {},
            state.user.token = null;
        },
        setUser: (state, userData)=>{
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token)
        }
    },
    modules: {}
})

export default store;