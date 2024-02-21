// DeleteProductModal 子元件建立流程
// 0. 拆元件的重點是什麼？是不要拆元件！所以還沒有拆之前，先確認可以執行
// 1. export default, import DeleteProductModal from './components.DeleteProductsModal.js'
// 2. 區域註冊 components:{DeleteProductModal}
// 3. 在子元件要渲染的地方寫上元件標籤 <delete-product-modal></delete-product-modal>
// 4. 練習卡老師的方法：html 結構從 products.js 剪下來，到子元件 template 勇敢貼上去
// 5. 執行起來去看 chrome 裡面的錯誤，找出 props 有哪些：tempData
// 6. 寫好 props 和 內外層 v-bind 溝通管道
// 7. 現在 deleteProductModal 可以打開，但是無法確認，所以要處理這個問題，
//    處理方法是將開啟和關閉 modal 的方法都交給子元件來做
// 8. 建立子元件 data() 並加上 deleteProductModal 屬性，建立 mounted 生命週期，呼叫 BS5 modal 實例化方法
//    注意這裡使用的 $refs 對應的位置是 template 的 ref (deleteProductModal)，有變要修正
// 9. 在子元件 methods 裡面建立開啟和關閉 deleteProcutModal 的方法
// 10.我的目的是讓根元件呼叫子元件的開啟和關閉 modal 方法，所以要先在子元件渲染位置寫上識別他的 ref 就叫 dpModal
// 11.product.js 內，原本方法 delProductModal.show()，都要改成 this.$refs.dpModal.openModal()
// 12.處理按下確認按鈕之後會發生的事情：
//    呼叫 deleteProduct() 戳 api 刪除對應資料，但 deleteProduct()是根元件的方法
//    所以 template 按鈕事件按下之後要觸發一個子元件方法 pursueDelete()
//    pursueDete() 包了 emit 事件
//    去 deleteProductModal 渲染的位置寫上 v-on emit 事件的溝通管道，觸發根元件方法 deleteProduct()
//    deleteProduct() 會去戳 api 刪掉資料
//    接著呼叫 getProductsList()
//    再呼叫子元件方法 this.$refs.dpModal.closeModal();

export default {
    props:['tempData'],
    data(){
        return{
            deletProductModal: null,
        }
    },
    methods:{
        openModal(){
            this.deleteProductModal.show();
        },
        closeModal(){
            this.deleteProductModal.hide();
        },
        pursueDelete(){
            this.$emit('deleteItem');
        }
    },
    mounted(){
        this.deleteProductModal = new bootstrap.Modal(this.$refs.deleteProductModal); 
    },
    template:`<div id="deleteProductModal" ref="deleteProductModal" class="modal fade" tabindex="-1"
    aria-labelledby="deleteProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 id="deleteProductModalLabel" class="modal-title">
                    <span>刪除產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                是否刪除
                <strong class="text-danger">{{ this.tempData.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    取消
                </button>
                <button type="button" class="btn btn-danger" @click="pursueDelete">
                    確認刪除
                </button>
            </div>
        </div>
    </div>
</div>` 
}