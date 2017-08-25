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

	menuCreateItem("Дисплей", 	"diagnostics_Display",	"diagnosticsRoot");
	menuCreateItem("Следы жидкости", 	"diagnostics_Traces_of_fluid",	"diagnosticsRoot");
	menuCreateItem("Тачскрин не работает",	"diagnostics_Touchscreen_does_not_work",		"diagnosticsRoot");
	menuCreateItem("Повреждение разьема зарядки", 	"diagnostics_Charging_connector",	"diagnosticsRoot");
	menuCreateItem("Выскрывался",       	"diagnostics_Was_Opened",     	"diagnosticsRoot");
	menuCreateItem("Акб", 	"ROOT_diagnostics_Battery",	"diagnosticsRoot");
	menuCreateItem("Не работает", 	"diagnostics_Battery",	"ROOT_diagnostics_Battery");
	menuCreateItem("Критический заряд", 	"diagnostics_Battery_Critical_charge",	"ROOT_diagnostics_Battery");
	menuCreateItem("Короткое замыкание", 	"diagnostics_Short_circuit",	"diagnosticsRoot");	
	menuCreateItem("Не гарантия", 	"diagnostics_Not_a_guarantee",	"diagnosticsRoot");	
}

function CreateRepairMenu() {
    menuCreateRootItem("Ремонт", "repairRoot");

    menuCreateItem("Дисплей", 	"repair_Display",	"repairRoot");
	menuCreateItem("Следы жидкости", 	"repair_Traces_of_fluid",	"repairRoot");
	menuCreateItem("Тачскрин не работает",	"repair_Touchscreen_does_not_work",		"repairRoot");
	menuCreateItem("Повреждение разьема зарядки", 	"repair_Charging_connector",	"repairRoot");
	menuCreateItem("Стекло", 	"repair_Glass",	"repairRoot");
	menuCreateItem("Шлейф", 	"repair_Cable_Line",	"repairRoot");
	
}

