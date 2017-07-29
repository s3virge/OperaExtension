/**
 * Created by s3virge on 21.06.17.
 */
chrome.runtime.onInstalled.addListener(function () {

    /* chrome.contextMenus.create({
        title: "Вставить разделитель",
        contexts: ["editable"],
        id: "separator",
        documentUrlPatterns: ["*://base.freshit.ua/*"]
    }); */

    CreateDiagnosticsMenu();
    CreateRepairMenu();
});

chrome.contextMenus.onClicked.addListener(function (info) {
	
	if (~info.menuItemId.indexOf("diagnostics")){
		menuSendMessage("diagnostics", info.menuItemId);
	}
	else if (~info.menuItemId.indexOf("repair")){
		menuSendMessage("repair", info.menuItemId);
	}
});


//принимаем сообщение от contentscript
//chrome.runtime.onMessage.addListener(
//  function(request, sender, sendResponse) {
//    console.log(sender.tab ?
//                "from a content script: " + sender.tab.url :
//                "from the extension");
//				alert("resive message from contentscript.js");
//    if (request.greeting == "hello")
//      sendResponse({farewell: "goodbye"});
//  });

//отправляем сообщение в contentscript.js
/*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
 chrome.tabs.sendMessage(tabs[0].id, {greeting: "cleaning"}, function( ) {
 alert("resive response from contentscript.js");
 });
 });
 */

function menuSendMessage(messageType, messageId) {
    chrome.tabs.query({active: true, currentWindow: true},
        function (tabs)
        {
            if (messageType == "repair"){
                chrome.tabs.sendMessage
                (
                    tabs[0].id,
                    {repair: messageId}
                );
            }
            else if (messageType == "diagnostics"){
                chrome.tabs.sendMessage
                (
                    tabs[0].id,
                    {diagnostics: messageId}
                );
            }
            else if (messageType == "notype"){
                chrome.tabs.sendMessage
                (
                    tabs[0].id,
                    {notype: messageId}
                );
            }
        }
    );
}

function menuCreateRootItem(rootTitle, rootId) {
    chrome.contextMenus.create({
        title: rootTitle,
        contexts: ["editable", "page"],
        id: rootId,
        documentUrlPatterns: ["*://base.freshit.ua/*"]
    });
}

function menuCreateItem(itemTitle, itemId, parentId) {
    chrome.contextMenus.create({
        title: itemTitle,
        contexts: ["editable", "page"],
        parentId: parentId,
        id: itemId,
        documentUrlPatterns: ["*://base.freshit.ua/*"]
    });
}

function CreateDiagnosticsMenu() {
    menuCreateRootItem("Диагностика",        "diagnosticsRoot");

		menuCreateItem("Жесткий диск",       "diagnostics_ErrorsOnHdd",     "diagnosticsRoot");
		menuCreateItem("Чистка",             "diagnostics_Cleaning",        "diagnosticsRoot");
		menuCreateItem("Вентилятор",         "diagnostics_Fan",             "diagnosticsRoot");
		menuCreateItem("Корпус",             "diagnosticsBrokenBody",       "diagnosticsRoot");
		menuCreateItem("Клавиатура",         "diagnosticsKeyboard",         "diagnosticsRoot");
		menuCreateItem("Короткое замыкание", "diagnostics_ShortCircuit",    "diagnosticsRoot");
		menuCreateItem("Прошивка BIOS",      "diagnosticsBIOS",             "diagnosticsRoot");
		menuCreateItem("Матрица",            "diagnosticsMatrix",           "diagnosticsRoot");
		menuCreateItem("Гнездо питания",     "diagnosticsPowerSupplyConnector", "diagnosticsRoot");

		menuCreateItem("BGA", 				"Root_diagnosticsBga", 			"diagnosticsRoot");
            menuCreateItem("BGA видеочип", 	"diagnosticsBgaVga", 			"Root_diagnosticsBga");
            menuCreateItem("BGA хаб", 		"diagnosticsBgaHUB", 			"Root_diagnosticsBga");
            menuCreateItem("BGA север", 	"diagnosticsBgaNorthBridge", 	"Root_diagnosticsBga");
            menuCreateItem("BGA юг", 		"diagnosticsBgaSouthBridge", 	"Root_diagnosticsBga");
            menuCreateItem("BGA проц", 		"diagnosticsBgaCPU", 	        "Root_diagnosticsBga");

		
		menuCreateItem("Следы ...", "Root_diagnosticsTraces", "diagnosticsRoot");
			menuCreateItem("Следы залития", "diagnosticsPour", "Root_diagnosticsTraces");
			menuCreateItem("Следы ремонта", "diagnosticsTracesOfRepair", "Root_diagnosticsTraces");
        
		menuCreateItem("Установка ОС", "diagnosticsInstallOs", "diagnosticsRoot");

		menuCreateItem("Стресс тест...", "Root_diagnosticsTest", "diagnosticsRoot");
		    menuCreateItem("с ошибками", "diagnostics_Test_Errors", "Root_diagnosticsTest");
		    menuCreateItem("без ошибок", "diagnostics_Test_No_Errors", "Root_diagnosticsTest");

		//menuCreateItem("Термопрокладки", "diagnosticsDamagedThermalPads", "diagnosticsRoot");

        
		menuCreateItem("Индикация на корпусе", "Root_DiagnosticsNoReaction", "diagnosticsRoot");
			menuCreateItem("Нет индикации, нет реакции", "diagnosticsNoReaction", "Root_DiagnosticsNoReaction");	
			menuCreateItem("Есть индикация, нет реакции", "diagnostics_HaveLite_NoReaction", "Root_DiagnosticsNoReaction");	
			menuCreateItem("Есть индикация, реакция, нет картинки ", "diagnostics_HaveLite_NoPicture", "Root_DiagnosticsNoReaction");	
		
		menuCreateItem("Не ...", "Root_diagnosticsNot", "diagnosticsRoot");
		menuCreateItem("Не ремонт", "diagnosticsNotRepair", "Root_diagnosticsNot");
		menuCreateItem("Не гарантия", "diagnostics_NotAGuarantee", "Root_diagnosticsNot");
		menuCreateItem("Не проявилась", "diagnostics_DontManifested", "Root_diagnosticsNot");
		menuCreateItem("Не деталь", "diagnostics_NotAPart", "Root_diagnosticsNot");
}

function CreateRepairMenu() {
    menuCreateRootItem("Ремонт", "repairRoot");

        menuCreateItem("Жесткий диск", "repairHDD",     "repairRoot");
        menuCreateItem("Чистка", "repairCleaning",      "repairRoot");
        menuCreateItem("Вентилятор",         "repair_Fan",             "repairRoot");
        menuCreateItem("Корпус", "repairBrokenBody", "repairRoot");
        menuCreateItem("Клавиатура", "repairKeyboard", "repairRoot");
        menuCreateItem("Короткое замыкание", "repair_ShortCircuit", "repairRoot");
        menuCreateItem("Прошивка BIOS", "repairBIOS", "repairRoot");
        menuCreateItem("Матрица", "repairMatrix", "repairRoot");
        menuCreateItem("Гнездо питания", "repairPowerSupplyConnector", "repairRoot");
    
	menuCreateItem("BGA", "Root_repairBga", "repairRoot");
            menuCreateItem("BGA видеочип", 	"repair_BgaVga",			"Root_repairBga");
            menuCreateItem("BGA хаб", 		"repair_BgaHUB", 		 	"Root_repairBga");
            menuCreateItem("BGA север", 	"repair_BgaNorthBridge", 	"Root_repairBga");
            menuCreateItem("BGA юг", 		"repair_BgaSouthBridge", 	"Root_repairBga");
            menuCreateItem("BGA проц",      "repair_BgaCPU", 	        "Root_repairBga");

	
	menuCreateItem("Следы залития", "repairPour", "repairRoot");
   
    menuCreateItem("Установка ОС", "repairInstallOs", "repairRoot");
    menuCreateItem("В UMA", "repairUMA", "repairRoot");
}

