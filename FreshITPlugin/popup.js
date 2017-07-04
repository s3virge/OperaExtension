function search() {
    var searchValue = document.getElementById("search").value;

	//отправить сообщение
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "search", "number" : searchValue});
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnSearch").addEventListener("click", search);
});
