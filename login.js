import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.2/vue.esm-browser.min.js";

// 宣告 url
const url = "https://vue3-course-api.hexschool.io/v2";
const signinAPI = `${url}/admin/signin`;
// 宣告資料要 post 出去的資料結構
const userInfo = {
    username: "",
    password: ""
};
const app = createApp({
    data() {
        return {
            userInfo
        }
    },
    methods: {
        signin() {
            axios.post(signinAPI, this.userInfo)
                .then((response) => {
                    // 使用解構的方式，從 response.data 裡面拿出 token 和 expired
                    const { token, expired } = response.data;
                    // 把鑰匙和有效期限儲存到 cookie 裡面
                    document.cookie = `adminToken =${token}; expires=${new Date(expired)};`;
                    window.location = "products.html";
                })
                .catch((error) => {
                    alert(error.data.message);
                })
        }
    },
});
app.mount("#app");