function search() {
    var searchValue = document.getElementById("search").value;
	
	//отправить сообщение
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
		//chrome.tabs.duplicate(activeTab.id);
        chrome.tabs.sendMessage(activeTab.id, {"message": "search", "number" : searchValue});
    });
}

function openUserInfo(){
	//открыть новую вкладку 
	var newURL = "https://base.freshit.ua/user/user/info";
    chrome.tabs.create({ url: newURL });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnSearch").addEventListener("click", search);
	document.getElementById("btnUserInfo").addEventListener("click", openUserInfo);
});
