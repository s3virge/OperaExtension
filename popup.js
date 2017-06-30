function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "search", "number" : "123"});
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnSearch").addEventListener("click", popup);
});