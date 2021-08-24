import ProductOptions from "./ProductOptions.js";;
//더미 데이터 만들기
const dummyData = [
    {
        optionId: 1,
        optionName: '더미 데이터다!1',
        optionPrice: 10000,
        stock: 10
    },
    {
        optionId: 2,
        optionName: "더미 데이터다!2",
        optionPrice: 15000,
        stock: 10
    },
    {
        optionId: 3,
        optionName: "더미 데이터다!3",
        optionPrice: 10000,
        stock: 0
    }
]

const $target = document.querySelector("#app");

new ProductOptions({
    $target,
    initialState: dummyData,
    onSelect: (option) => {
        alert(option.optionName);
    }
})