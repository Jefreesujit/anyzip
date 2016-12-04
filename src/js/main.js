var globalData;

function uploadFile() {
  var length = document.getElementById("file_input").files.length;
  if (length > 0) {
    document.getElementById("save_btn").disabled = true;
    document.getElementById("status_section").innerHTML = "Processing... Please Wait.. ";
    var zip = new JSZip();
    var i = 0;
    processFile(i,length, zip);
  }
  else {
    document.getElementById("status_section").innerHTML = "Please choose some files for Zipping";
  }
 }

function processFile(i , max , zip) {
  if ( i < max ) {
    base64gen(i);
    setTimeout(function(){
      create_zip(i , zip)
    } ,1000); 
    setTimeout(function(){
      i=i+1; 
      processFile(i, max , zip)
    } ,1000);    
  }
  else {
    var fileName = document.getElementById("file_name").value || "Download";
    document.getElementById("status_section").innerHTML = "Generating ZIP..."; 
    var content = zip.generate({type:"blob"});
    alert("Zip file created, Click ok to download ");
    saveAs(content, fileName+".zip");
    document.getElementById("status_section").innerHTML = "";
    document.getElementById("save_btn").disabled = false;
    document.getElementById("file_input").value=""; 
  }
}

function base64gen(i) {
  var file = document.getElementById("file_input").files[i], data,
  reader  = new FileReader();
  if (file) {
    reader.readAsDataURL(file);
  }
  reader.onloadend = function () {
    var txt = reader.result,
    index = txt.indexOf(",");
    txt = txt.slice(index+1);
    globalData = txt;
  }
}

function create_zip(i , zip) {
  fileis = document.getElementById("file_input").files[i].name;
  document.getElementById("status_section").innerHTML = "Zipping Files .. " + fileis;
  var data = globalData;
  zip.file( fileis , data ,{base64: true});
}
