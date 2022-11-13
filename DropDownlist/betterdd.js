


class DropDown {

    constructor(data){
        this.data = data;
        this.targets = []
    }

    filterData(filtersAsArray){
        return this.data.filter(r=> filtersAsArray.every((item,i) => item === r[i]));
    }

    getUniqueValues(dataAsArray,index){

        const uniqueOptions = new Set();
        dataAsArray.forEach(r => uniqueOptions.add(r[index])) 
        return [...uniqueOptions]
    }

    populateDropDown(el,listArray){
        el.innerHTML = "";
    
        listArray.forEach(item => {
            const option = document.createElement("option");
            option.textContent = item;
            el.appendChild(option)
        });
    }

    createPopulateDropDownFunction(el,elsDependsOn){
        return ()=>{
            const elsDependsOnValues = elsDependsOn.length === 0 ? null : elsDependsOn.map(depEl => depEl.value);
            const dataTouse = elsDependsOn.length === 0 ? this.data : this.filterData(elsDependsOnValues);
            const listTouse = this.getUniqueValues(dataTouse,elsDependsOn.length);
            this.populateDropDown(el,listTouse)
        }
    }


    add(options){
        // {target: "level1", dependsOn: []}
        const el = document.getElementById(options.target)
        const elsDependsOn = options.dependsOn.length === 0 ? [] : options.dependsOn.map(id => document.getElementById(id))
        const eventFunction = this.createPopulateDropDownFunction(el,elsDependsOn)
        const targetObject = {  el: el, elsDependsOn: elsDependsOn,func: eventFunction};
        targetObject.elsDependsOn.forEach(depEl => depEl.addEventListener("change",eventFunction))
        this.targets.push(targetObject)    
        return this;
    }

    initialize(){
        this.targets.forEach(t => t.func());
        return this;
    }

    eazyDropDown(arrOfIds){
        arrOfIds.forEach((item,i) => {
            const option = {target: item, dependsOn: arrOfIds.slice(0,i) };
            this.add(option);
        });
        this.initialize();
        return this;

    }


}





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

// var dd = new DropDown(Mydata)
// .add({target: "level1", dependsOn: []})
// .add({target: "level2", dependsOn: ["level1"]})
// .add({target: "level3", dependsOn: ["level1","level2"]})
// .initialize();

var dd = new DropDown(Mydata).eazyDropDown(["level1","level2","level3"]);


var schoolData =	[
    ["กรุงเทพ", "สพป", "เขต1", "โรงเรียนทดสอบ1"], 
    ["กรุงเทพ", "สพป", "เขต1", "โรงเรียนทดสอบ2"],
    ["กรุงเทพ", "สพป", "เขต2", "โรงเรียนทดสอบ3"], 
    ["กรุงเทพ", "สพป", "เขต3", "โรงเรียนทดสอบ4"], 
    ["กรุงเทพ", "สพม", "เขต2", "โรงเรียนทดสอบ5"], 
    ["กรุงเทพ", "สพม", "เขต2", "โรงเรียนทดสอบ6"], 
    ["สิงห์บุรี", "สพป", "เขต4", "โรงเรียนทดสอบ7"], 
    ["สิงห์บุรี", "สพป", "เขต1", "โรงเรียนทดสอบ8"], 
    ["สิงห์บุรี", "สพม", "เขต1", "โรงเรียนทดสอบ9"], 
    ["ขอนแก่น", "สพป", "เขต3", "โรงเรียนทดสอบ10"], 
    ["ขอนแก่น", "สพป", "เขต3", "โรงเรียนทดสอบ11"], 
    ["ขอนแก่น", "สพม", "เขต1", "โรงเรียนทดสอบ12"],
    ["ขอนแก่น", "สพม", "เขต2", "โรงเรียนทดสอบ13"],
    ["มหาสารคาม","สพม","เขต3","โรงเรียนทดสอบ14"], 
    ["มหาสารคาม", "สพม", "เขต4", "โรงเรียนทดสอบ15"],
    ["มหาสารคาม", "สพป", "เขต4", "โรงเรียนทดสอบ16"]
]

// var dd2 = new DropDown(schoolData);
// dd2.add({target: "t1", dependsOn: []})
// dd2.add({target: "t2", dependsOn: ["t1"]})
// dd2.add({target: "t3", dependsOn: ["t1","t2"]});
// dd2.add({target: "t4", dependsOn: ["t1","t2","t3"]});
// dd2.initialize()

var dd2 = new DropDown(Mydata).eazyDropDown(["t1","t2","t3","t4"]);