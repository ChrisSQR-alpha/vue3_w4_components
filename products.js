import Pagination from "./components/Pagination.js";
import ProductModal from "./components/ProductModal.js";
import DeleteProductModal from "./components/DeleteProductModal.js";

console.clear();
// let productModal = null;
// let delProductModal = null;
const app = Vue.createApp({
    data() {
        return {
            apiPath: "chrissqr",
            apiUrl: `https://vue3-course-api.hexschool.io/v2`,
            products: [],
            pagination:{},
            isNew: false,
            tempData: {
                imagesUrl: [],
            },
        };
    },
    // 在根元件裡面註冊子元件
    components:{
        Pagination,
        ProductModal,
        DeleteProductModal,
    },
    methods: {
        signinCheck() {
            axios.post(`${this.apiUrl}/api/user/check`)
                .then((response) => {
                    // 驗證完登入狀態之後，馬上要執行取得產品列表的行為
                    this.getProductsList();
                })
                .catch((error) => {
                    alert(error.data?.message);
                    window.location = "login.html";
                })
        },
        getProductsList(page = 1) {
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`)
                .then((response) => {
                    // 第四週的API除了可以拿到 products 的資料還可以拿到 pagination 的資料
                    // 可以利用解構的形式把它們取出來
                    // 再存成根元件 app data 對應屬性的值
                    const {products, pagination} = response.data;
                    this.products = products;
                    this.pagination = pagination;
                })
                .catch((error) => {
                    alert(error.response.data.message);
                    window.location = "login.html";
                });
        },
        openModal(isNew, item) {   // item 這個參數是為了走 edit 和 delete 這兩條路徑的時候，知道是哪一筆商品資料要被編輯或刪除 
            // 走新增資料這條路
            // 資料狀態 this.isNew 要修改為 true
            // 資料狀態 this.tempData 要清空，並讓內部結構 imagesUrl 重置為空陣列
            // 呼叫 Bootstrap 方法，開啟 productModal 實例
            if (isNew === "new") {
                this.isNew = true;
                this.tempData = {
                    imagesUrl: []
                };
                // productModal.show();
                this.$refs.pModal.openModal();
            }
            else if (isNew === "edit") {
                this.isNew = false;
                this.tempData = { ...item };  //這邊必須要對 item 進行淺複製，再讓 this.tempData 指向淺複製出來的儲存記憶體位置
                // productModal.show();
                this.$refs.pModal.openModal();
            }
            else if (isNew === "delete") {
                this.isNew = false;
                this.tempData = { ...item };
                this.$refs.dpModal.openModal();
            }
        },
        // createImages() {
        //     this.tempData.imagesUrl = [],
        //         this.tempData.imagesUrl.push('')
        // },
        deleteProduct() {
            // 要新增商品資料，使用 delete api  [delete] 網域/v2/api/{api_path}/admin/product/{id}
            // api 的行為是，將指定 id 傳出去給 server，server 會依照 id 刪除指定物件資料
            // api 文件指示的需求：
            // (1) api_path，${this.apiPath}
            // (2) id，${this.tempData.id}
            //  delete 之後，需要重新 get 商品列表並渲染列表，因為前面已寫方法，直接 getData()
            // 也要關閉 刪除商品的 modal，使用 Bootstrap 方法 hide()
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempData.id}`;
            let http = "delete";

            axios[http](url)
                .then((response) => {
                    alert(response.data.message);
                    this.getProductsList();
                    // delProductModal.hide();
                    this.$refs.dpModal.closeModal();
                })
                .catch((error) => {
                    alert(error.response.data.message)
                })
        }
    },
    mounted() {
        // 在 mounted() 生命週期內，使用token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)adminToken\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
        axios.defaults.headers.common['Authorization'] = token;
        this.signinCheck();
        // productModal = new bootstrap.Modal(document.querySelector("#productModal"));
        // delProductModal = new bootstrap.Modal(document.querySelector("#delProductModal"));
    }
});

app.mount("#app");