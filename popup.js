function popup() {
    var searchValue = document.getElementById("search").value;

    //открыть новую вкладку
    /*chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tab) {
        chrome.tabs.create({
            "url": "https://base.freshit.ua/?page=myrem"
        });
    });*/
	
	//подождать пока она загрузится.
	

	//отправить сообщение
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "search", "number" : searchValue});
    });
}

/*
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // make sure the status is 'complete' and it's the right tab
    if (tab.url.indexOf('https://base.freshit.ua/?page=myrem') != -1 && changeInfo.status == 'complete') {
        alert("ku-ku");
		
		chrome.tabs.executeScript(null, { 
            code: "alert('hi');" 
        });
    }
})*/

/*
search.onblur = function() {
    if (isNaN(this.value)) { // введено не число
        // показать ошибку
        this.className = "error";
        error.innerHTML = 'Вы ввели не число. Исправьте, пожалуйста.';
    }
};

search.onfocus = function() {
    if (this.className == 'error') { // сбросить состояние "ошибка", если оно есть
        this.className = "";
        error.innerHTML = "";
    }
};*/

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnSearch").addEventListener("click", popup);
});