function search() {
    var searchValue = document.getElementById("search").value;

    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tab) {
        chrome.tabs.create({
            "url": "https://www.google.com.ua/search?q=" + searchValue + "+site:vlab.su&gws_rd=ssl"
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnSearch").addEventListener("click", search);
});
