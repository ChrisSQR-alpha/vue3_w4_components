// ProductModal 子元件製作流程
// 0. 在子元件架好預設匯出起手式，再去根元件外部匯入元件，然後在根元件區域註冊子元件 component：{ProductModal}
// 1. 在根元件的 html 結構觸發一個事件，目的是去呼叫內層的 openModal 方法 @click="openModal('',__)"
// 2. 在子元件渲染位置的 attribute，v-bind 內層 props 與外層 data 溝通的管道 :is-new="isNew"
//    :temp-data="tempData"
// 3. 在子元件註冊 props props:['isNew','tempData']
// 4. 把需要在 ProductModal 內部執行方法都搬進去子元件
// 5. 把 ProductModal 的 html 結構送進去子元件的 template，嘗試使用 x-template
// 6. 去 product.html 建立 id="productModal" 的 x-template，位置在 app 之後
// 7. 修整子元件的結構，加入 data()，讓需要 apiPath 和 apiUrl 的方法，可以重新動起來

// 8. 調整 updateProduct() 的內容，改用以 this.$emit 發送事件到外層去觸發 getProductsList()
// 9. 去子元件渲染位置的 attribue 建立內傳外的溝通管道 ＠renew="getProductsList"
// 10.把外根元件的 bootstrap modal 實例化語法拿進子元件 mounted，並新增 productModal 屬性到 data()
// 11.幫子元件渲染位置加上 attribute ref="pModal"
// 12.根元件上所有開啟 productModal 的方法，改成呼叫子元件內的開啟方法 this.$refs.pModal.openModal()

export default {
    props:['isNew', 'tempData'],
    data(){
        return{
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'chrissqr',
            productModal:null,
        }
    },
    methods:{
        createImages() {
            this.tempData.imagesUrl = [],
            this.tempData.imagesUrl.push('')
        },
        updateProduct() {
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            let http = "post";
            if (!this.isNew) {
                url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempData.id}`;
                http = "put";
            }
            axios[http](url, { data: this.tempData })
                .then((response) => {
                    alert(response.data.message);
                    //原本直接 getProductsList()即可
                    //但是現在這個方法在外層，所以要建立一個 emit 事件
                    this.hideModal();
                    this.$emit('renew');
                })
                .catch((error) => {
                    alert(error.response.data.message);
                })
        },
        openModal(){
            this.productModal.show();
        },
        hideModal() {
            this.productModal.hide();
        }
    },
    mounted(){
        // let productModal = null;
        this.productModal = new bootstrap.Modal(this.$refs.productModal);
    },
    template: '#productModal',
}