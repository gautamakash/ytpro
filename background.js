let updateOption = function(status){
  if(status == "enabled"){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'console.log("Youtube Pro is ","'+status+'");document.body.classList.add("youtube-pro");if(document.querySelector("#logo-icon-container h4"))document.querySelector("#logo-icon-container h4").remove();document.querySelector("#logo-icon-container").appendChild(function(){var h = document.createElement("h4"); h.innerHTML=" &nbsp;Pro"; return h;}());'});
    });
  }
};

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({status: 'enabled'}, function() {
      console.log('The color is green.');
    });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.youtube.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    console.log(changeInfo);
    console.log(tab);
    if(tab.url.indexOf("://www.youtube.com")>0){
      chrome.storage.sync.get('status', function(data) {
        updateOption(data.status);
      });
        /*chrome.tabs.executeScript(
        tabId,
        {code: 'document.body.classList.add("youtube-pro");'});*/
        console.log("Updating "+tab.url);
    }
  }
})
