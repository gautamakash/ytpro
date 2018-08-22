let togglePro = document.getElementById('togglePro');
let updateOption = function(status){
  if(status == "enabled"){
    togglePro.checked = true;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.classList.add("youtube-pro");if(document.querySelector("#logo-icon-container h4"))document.querySelector("#logo-icon-container h4").remove();document.querySelector("#logo-icon-container").appendChild(function(){var h = document.createElement("h4"); h.innerHTML=" &nbsp;Pro"; return h;}());'});
    });
  }else{
    togglePro.checked = false;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.classList.remove("youtube-pro");if(document.querySelector("#logo-icon-container h4"))document.querySelector("#logo-icon-container h4").remove();'});
    });
  }
};
let toggleOption = function(){
  chrome.storage.sync.get('status', function(data) {
    let newStatus = (data.status == "enabled")?"disabled":"enabled";
    chrome.storage.sync.set({status: newStatus}, function() {
      updateOption(newStatus);
    });
  });
}
//let onDomLoad = function(){
  //document.getElementById('options').innerHTML="qoq";
  chrome.storage.sync.get('status', function(data) {
    updateOption(data.status);
  });
//}
togglePro.onclick = function(element) {
  toggleOption();
};
