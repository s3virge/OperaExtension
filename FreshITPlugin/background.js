/**
 * Created by s3virge on 21.06.17.
 */
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: "Вставить разделитель",
        contexts: ["editable"],
        id: "separator",
        documentUrlPatterns: ["*://base.freshit.ua/*"]
    });

    CreateDiagnosticsMenu();
    CreateRepairMenu();
});

chrome.contextMenus.onClicked.addListener(function (info) {
        switch (info.menuItemId) {
            case "separator":
                menuSendMessage("notype", "separator");
                break;

            //............... диагностка ...............
            case "diagnosticsKeyboard":
                menuSendMessage("diagnostics","diagnosticsKeyboard");
                break;

            case "errorsOnHdd":
                menuSendMessage("diagnostics","errorsOnHdd");
                break;

            case "сleaningIsNecessary":
                menuSendMessage("diagnostics","сleaningIsNecessary");
                break;

            case "DoesNotTurnOn":
                menuSendMessage("diagnostics","DoesNotTurnOn");
                break;

            case "diagnosticsPour":
                menuSendMessage("diagnostics","diagnosticsPour");
                break;

            case "diagnosticsBIOS":
                menuSendMessage("diagnostics","diagnosticsBIOS");
                break;

            case "diagnosticsMatrix":
                menuSendMessage("diagnostics","diagnosticsMatrix");
                break;

            case "diagnosticsPowerSupplyConnector":
                menuSendMessage("diagnostics","diagnosticsPowerSupplyConnector");
                break;

            case "diagnosticsTest":
                menuSendMessage("diagnostics","diagnosticsTest");
                break;

            case "diagnosticsTracesOfRepair":
                menuSendMessage("diagnostics","diagnosticsTracesOfRepair");
                break;

            case "diagnosticsDamagedThermalPads":
                menuSendMessage("diagnostics","diagnosticsDamagedThermalPads");
                break;

            //............ ремонт .....................
            case "repairHDD":
                menuSendMessage("repair","repairHDD");
                break;

            case "repairCleaning":
                menuSendMessage("repair","repairCleaning");
                break;

            case "repairKeyboard":
                menuSendMessage("repair","repairKeyboard");
                break;

            case "repairInstallOs":
                menuSendMessage("repair","repairInstallOs");
                break;

            case "repairBIOS":
                menuSendMessage("repair","repairBIOS");
                break;

            case "repairMatrix":
                menuSendMessage("repair", "repairMatrix");
                break;

            case "repairPowerSupplyConnector":
                menuSendMessage("repair","repairPowerSupplyConnector");
                break;

            case "repairPour":
                menuSendMessage("repair","repairPour");
                break;
        }
    }
);


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
    menuCreateRootItem("Диагностика", "diagnosticsRoot");
    menuCreateItem("Жесткий диск", "errorsOnHdd", "diagnosticsRoot");
    menuCreateItem("Чистка", "сleaningIsNecessary", "diagnosticsRoot");
    menuCreateItem("Клавиатура", "diagnosticsKeyboard", "diagnosticsRoot");
    menuCreateItem("Прошивка BIOS", "diagnosticsBIOS", "diagnosticsRoot");
    menuCreateItem("Матрица", "diagnosticsMatrix", "diagnosticsRoot");
    menuCreateItem("Гнездо питания", "diagnosticsPowerSupplyConnector", "diagnosticsRoot");
    menuCreateItem("Следы залития", "diagnosticsPour", "diagnosticsRoot");
    menuCreateItem("Стресс тест", "diagnosticsTest", "diagnosticsRoot");
    menuCreateItem("Следы ремонта", "diagnosticsTracesOfRepair", "diagnosticsRoot");
    menuCreateItem("Термопрокладки", "diagnosticsDamagedThermalPads", "diagnosticsRoot");
}

function CreateRepairMenu() {
    menuCreateRootItem("Ремонт", "repairRoot");
    menuCreateItem("Жесткий диск", "repairHDD", "repairRoot");
    menuCreateItem("Чистка", "repairCleaning", "repairRoot");
    menuCreateItem("Клавиатура", "repairKeyboard", "repairRoot");
    menuCreateItem("Прошивка BIOS", "repairBIOS", "repairRoot");
    menuCreateItem("Матрица", "repairMatrix", "repairRoot");
    menuCreateItem("Гнездо питания", "repairPowerSupplyConnector", "repairRoot");
    menuCreateItem("Следы залития", "repairPour", "repairRoot");
    menuCreateItem("Установка ОС", "repairInstallOs", "repairRoot");
}

