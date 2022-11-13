var Mydata = [
    ["Honda","Civic","4dr"],
    ["Honda","Civic","2dr"],
    ["Honda","Accord","4dr"],
    ["Honda","Accord","Hybrid"],
    ["Toyota","Corolla","Regular"],
    ["Toyota","Corolla","Hybrid"],
    ["Toyota","Corolla","Hatchback"],
    ["Toyota","Camry","Hybrid"],
    ["Toyota","Camry","Regular"],
    ["Mercedes","C Class","C300"],
    ["Mercedes","E Class","E350"],
    ["Mercedes","E Class","E550"],
    ["Mercedes","S Class","S550"],
    ["Mercedes","S Class","S550"],
    ["Ford","Mustang","1020"],
    ["Ford","Mustang","1000"],
    ["Ford","Colorado","950 4wd"],
    ["BMW","M Class","M3"],
    ["Ford","M Class","M5"],

];

function makeDroptDown(data,filtersAsArray,targetElement){

    const filterdArray = filterArray(data,filtersAsArray);  //กรองค่าเฉพาะที่ตรงกับตัวเลือกที่ 1
    const uniquelist = getUniqueValues(filterdArray,filtersAsArray.length)
    populateDropDown(targetElement,uniquelist);
}

//เก็บค่าจาก option 1 แล้วนำไปรันในฟังก์ชั่น makeDropdown
function applyDropDown(){
    const selectLevel1Value = document.getElementById("level1").value
    const selectLevel2 = document.getElementById("level2")
    makeDroptDown(Mydata,[selectLevel1Value],selectLevel2);
    applyDropDown2()

}

//เก็บค่าจาก option 1 แล้วนำไปรันในฟังก์ชั่น makeDropdown
function applyDropDown2(){
    const selectLevel1Value = document.getElementById("level1").value
    const selectLevel2Value = document.getElementById("level2").value
    const selectLevel3 = document.getElementById("level3")
    makeDroptDown(Mydata,[selectLevel1Value,selectLevel2Value],selectLevel3);

}

function afterDocumentLoads(){
    populateFirstLevelDropDown();
    applyDropDown();
}

function getUniqueValues(data,index){

    const uniqueOptions = new Set();
    data.forEach(r => uniqueOptions.add(r[index])) 
    return [...uniqueOptions]
}

function populateFirstLevelDropDown(){
    const uniqueList = getUniqueValues(Mydata,0)
    const el = document.getElementById("level1")
    populateDropDown(el,uniqueList);

}

function populateDropDown(el,listArray){
    el.innerHTML = "";

    listArray.forEach(item => {
        const option = document.createElement("option");
        option.textContent = item;
        el.appendChild(option)
    });
}

function filterArray(data,filtersAsArray){

    return data.filter(r=> filtersAsArray.every((item,i) => item === r[i]));

}


document.getElementById("level1").addEventListener("change",applyDropDown)
document.getElementById("level2").addEventListener("change",applyDropDown2)
document.addEventListener("DOMContentLoaded",afterDocumentLoads)






