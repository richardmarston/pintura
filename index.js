var onMouseMove = function(){
}
var onMouseOver = function(evt){
    let id = evt.currentTarget.id.slice(0,-5);
    let txt = document.getElementById(id+"-txt0");
    txt.classList.add("svglabel-high");
}
var onMouseLeave = function(evt){
    let id = evt.currentTarget.id.slice(0,-5);
    let txt = document.getElementById(id+"-txt0");
    txt.classList.remove("svglabel-high");
}
var showContainer = function(container, icon, hide="false"){
    var x = document.getElementById(container);
    var y = document.getElementById(icon);
    if ((hide == "true") || (x.style.display == "block")) {
        x.style.display = "none";
        if (y != undefined) {
            y.innerHTML = '&nbsp;&crarr;';
        }
    } else {
        x.style.display = "block";
        if (y != undefined) {
            y.innerHTML = '&nbsp;&darr;';
        }
    }
}
function doSearch(inputId, textareaId) {
    var searchStr=document.getElementById(inputId).value;
    var box=document.getElementById(textareaId);
    var index=box.value.indexOf(searchStr);
    var length=box.value.length*1.0;
    var startIndexStr=index;
    var endIndexStr=index+searchStr.length;
    console.log(startIndexStr, endIndexStr);
    
    box.setSelectionRange(index, index);
    //box.setSelectionRange(startIndexStr, endIndexStr);//searchStr.length);
    box.blur();
    box.focus();
    box.setSelectionRange(startIndexStr, endIndexStr);//searchStr.length);
    //box.scrollTop=(index/length)*100;
}
                    function readFile(e) {
                        var files = e.target.files;
                        if (files) {
                            cimsvg.setFileCount(files.length);
                            for (var i=0, f; f=files[i]; i++) {
                                if (!f) {
                                    return;
                                }
                                var reader = new FileReader();
                                reader.onload = function(e) {
                                    var contents = e.target.result;
                                    loadContents(contents);
                                };
                                reader.readAsText(f);
                            }
                        }
                    };
                    function loadContents(contents) {
                        cimsvg.loadFile(contents);
                    };
                    document.getElementById("fileinput").addEventListener('change', readFile, false);

