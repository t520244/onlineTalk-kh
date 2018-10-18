var app = new Vue({
    el: '#app',
    data: {
        text: '六角學院',
        data: [], // 沒有預先定義變數
        currentPage: 0, // 目前頁數
        locations: [],
        currentLocation: ''
    },
    methods: {
        getUniqueList() { // 取得唯一數值
            const locations = new Set(); // 陣列內容不得重複
            const vm = this;
            vm.data.forEach((item, i) => {
                locations.add(item.Zone)
            })
            console.log(locations)
            vm.locations = Array.from(locations);
        }
    },
    // => 箭頭函式是es6的一個方法
    // 在 Vue 的應用程式下 ，第一層的所有方法都不要使用箭頭函式，this指向的目標是不同的。

    // 一般函式
    computed: {
        filterData() { //  二維陣列
            const vm = this
                // 先過濾
            let items = []; //  宣告空陣列
            if (vm.currentLocation !== '') {
                items = vm.data.filter((item, i) => {
                    console.log(item)
                    return item.Zone == vm.currentLocation //  回傳為true 的值
                })
            } else {
                items = vm.data
            }
            //  有幾頁
            //  每頁的資料內容
            // newData = [[1..(0)],[2...(1)],[3...(2)]]
            // currentPage = 0
            console.log(vm.currentLocation)
            const newData = []
            items.forEach((item, i) => {
                if (i % 10 === 0) { //  %  取餘數
                    newData.push([])
                }
                const page = parseInt(i / 10) //  確保整數的頁數
                newData[page].push(item)
            })
            console.log(newData)
            return newData
        }
    },

    // 箭頭函式
    created() {
        // this
        const vm = this;
        axios.get('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97')
            .then((response) => {
                // handle success
                console.log(response);
                // console.log(this);
                vm.data = response.data.result.records
                console.log(vm.data)
                vm.getUniqueList()
            })
            .catch(function(error) {
                // handle error
                console.log(error);
            })
    }
})