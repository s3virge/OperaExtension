/**
 * Created by s3virge on 21.06.17.
 */
chrome.runtime.onInstalled.addListener(function() 
{
	chrome.contextMenus.create({
	    title: "Вставить разделитель",
        contexts: ["editable"],
        id: "separator",
        documentUrlPatterns: ["*://base.freshit.ua/*"]
    });
	
    menuCreateRootItem("Диагностика", "diagnosticsRoot");
		menuCreateItem("Жесткий диск","errorsOnHdd","diagnosticsRoot");
		menuCreateItem("Чистка","сleaningIsNecessary","diagnosticsRoot");
		menuCreateItem("Клавиатура","diagnosticsKeyboard","diagnosticsRoot");
		menuCreateItem("Прошивка BIOS","diagnosticsBIOS","diagnosticsRoot");
		menuCreateItem("Не включается","DoesNotTurnOn","diagnosticsRoot");
		menuCreateItem("Следы залития","diagnosticsPour","diagnosticsRoot");

    ////////////////// работы //////////////////////////
    menuCreateRootItem("Добавить Работы", "AddWorks");
        menuCreateItem("Жесткий диск","workHDD","AddWorks");
        menuCreateItem("Чистка","workCleaning","AddWorks");
        menuCreateItem("Клавиатура","workKeyboard","AddWorks");
        menuCreateItem("Прошивка BIOS","workBIOS","AddWorks");
        menuCreateItem("BGA пайка","workBGA","AddWorks");

	////////////////// ремонт ////////////////////
    menuCreateRootItem("Ремонт", "repairRoot");
		menuCreateItem("Жесткий диск","repairHDD","repairRoot");
		menuCreateItem("Чистка","repairCleaning","repairRoot");
		menuCreateItem("Клавиатура","repairKeyboard","repairRoot");
		menuCreateItem("Прошивка BIOS","repairBIOS","repairRoot");
		menuCreateItem("Установка ОС","repairInstallOs","repairRoot");
});

chrome.contextMenus.onClicked.addListener
(
    function(info)
    {    
        switch(info.menuItemId){
			case "separator":
                menuSendMessage("separator");
            break;
			
			//............... диагностка ...............
			case "diagnosticsKeyboard":
                menuSendMessage("diagnosticsKeyboard");
            break;
			
			case "errorsOnHdd":
                menuSendMessage("errorsOnHdd");
            break;
			
			case "сleaningIsNecessary":
                menuSendMessage("сleaningIsNecessary");
            break;           
			
			case "DoesNotTurnOn":
                menuSendMessage("DoesNotTurnOn");
            break;
			
			case "diagnosticsPour":
                menuSendMessage("diagnosticsPour");
            break;
			
			case "diagnosticsBIOS":
                menuSendMessage("diagnosticsBIOS");
            break;
			
			//............ ремонт .....................
            case "repairHDD":
                menuSendMessage("repairHDD");
            break;
			
			case "repairCleaning":
                menuSendMessage("repairCleaning");
            break;
			
			case "repairKeyboard":
                menuSendMessage("repairKeyboard");
            break;
			
			case "repairInstallOs":
                menuSendMessage("repairInstallOs");
            break;

            case "repairBIOS":
                menuSendMessage("repairBIOS");
                break;
					
			
			//............... работы ...................
			case "workBGA":
                menuSendMessage("workBGA");
            break;
			
			case "workKeyboard":
                menuSendMessage("workKeyboard");
            break;		
			
			case "workHDD":
                menuSendMessage("workHDD");
            break;	
			
			case "workCleaning":
                menuSendMessage("workCleaning");
            break;

            case "workBIOS":
                menuSendMessage("workBIOS");
            break;
        }        

        /*if (info.menuItemId == "1")
        {
            //alert("info.menuItemId == 1");
            chrome.tabs.executeScript
            (
                {file: 'jquery-3.2.1.js'},
                function() 
                {
                    chrome.tabs.executeScript({file: 'myscript.js'});
                }
            )
        }
        else if (info.menuItemId == "2"){
            //alert("info.menuItemId == 2");
            chrome.tabs.executeScript({code: 'document.body.style.backgroundColor="#b3ffb3"'});
        }*/
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

function menuSendMessage(messageId){
    chrome.tabs.query
            (
                {active: true, currentWindow: true}, 
                function(tabs) 
                {
                    chrome.tabs.sendMessage
                    (
                        tabs[0].id, 
                        {"menuItem":messageId}
                    );
                }
            );
}

function menuCreateRootItem(rootTitle, rootId){
    chrome.contextMenus.create({
	    title: rootTitle,
        contexts: ["editable", "page"],
        id: rootId,
        documentUrlPatterns: ["*://base.freshit.ua/*"]
    });
}

function menuCreateItem(itemTitle, itemId, parentId){
    chrome.contextMenus.create({
	    title: itemTitle,
        contexts: ["editable", "page"],
        parentId: parentId,
        id: itemId,
        documentUrlPatterns: ["*://base.freshit.ua/*"]
    }); 
}
