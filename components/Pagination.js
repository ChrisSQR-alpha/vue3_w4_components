// pagination 的製作步驟
// 先去 bootstrap 找一個合適的範例
// pages 接收外面傳進來的 pagination 物件，裡面有會使用到的屬性
// 依照前一頁、目前頁面、下一頁，分三塊來處理
// 前一頁按鈕的邏輯：
// 原則上可以點擊，但目前頁面為第一頁的時候，加上不可點擊的 class
// 後一頁的按鈕邏輯：
// 原則上可以點擊，但是目前頁面為最後一頁的時候，加上不可點擊的 class
// 中間頁的按鈕邏輯：
// 透過 v-for 把所有頁面的按鈕顯示出來
// 目前顯示哪一頁，那一頁的按鈕就亮起來，而且不可點擊
// 其他頁的按鈕都是 a 連結，但是要防止預設行為，改由觸發 $emit 事件到外層去呼叫取得產品列表的方法，重新渲染畫面
// emit 流程 :
// 1. 在template 寫上界面操作觸發事件，觸發內層的方法，同時要避免觸發預設行為(如果需要的話)
//    變更的資料狀態，從這步驟就要塞入
// 2. 在內層methods 寫一個方法包覆 this.emit 事件，發送一個自訂的事件名稱，還有要傳給外層的參數
// 3. 在 html 元件渲染位置的 attribute，寫入內傳外的溝通管道
// 4. 在外層methods 寫一個包含參數的方法，接收內層托球出來的內容

export default {
    props: ["pages"],
    methods: {
        emitPages(pageNum) {
            this.$emit("emit-pages", pageNum);
        },
    },
    template: `
<nav aria-label="Page navigation example">
      <ul class="pagination">
        <!-- 前一頁 -->
        <li class="page-item" :class="{'disabled': pages.current_page === 1}">
            <a class="page-link" href="#" aria-label="Previous" @click.prevent="emitPages(pages.current_page-1)">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <!-- 中間頁 -->
        <li v-for="(item, index) in pages.total_pages" :key="index" class="page-item"
            :class="{'active': item === pages.current_page}">
            <span class="page-link" v-if="item === pages.current_page">
                {{ item }}
            </span>
            <a class="page-link" href="#" v-else @click.prevent="emitPages(item)">
                {{ item }}
            </a>
        </li>
        <!-- 後一頁 -->
        <li class="page-item" :class="{'disabled': pages.current_page === pages.total_pages}">
            <a class="page-link" href="#" aria-label="Next" @click.prevent="emitPages(pages.current_page+1)">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>`,
};