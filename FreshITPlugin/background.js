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
            /* else if (messageType == "notype"){
                chrome.tabs.sendMessage
                (
                    tabs[0].id,
                    {notype: messageId}
                );
            } */
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

		menuCreateItem("Жесткий диск",       	"Root_diagnostics_Hdd",     	"diagnosticsRoot");
			menuCreateItem("Тест с ошибками",	"diagnostics_Hdd_Errors",		"Root_diagnostics_Hdd");
			menuCreateItem("Тест без ошибок", 	"diagnostics_Hdd_No_Errors",	"Root_diagnostics_Hdd");		
			menuCreateItem("Не определяется", 	"diagnostics_Hdd_Not_determined",	"Root_diagnostics_Hdd");		
		
		menuCreateItem("Охлада",             			"Root_diagnostics_Cleaning", 		"diagnosticsRoot");
			menuCreateItem("Чистка", 					"diagnostics_Cleaning", 			"Root_diagnostics_Cleaning");
			menuCreateItem("Термопрокладки повреждены", "diagnostics_DamagedThermalPads", 	"Root_diagnostics_Cleaning");
			menuCreateItem("Термопаста пересохла", 		"diagnostics_Thermal_Compaund",		"Root_diagnostics_Cleaning");
			menuCreateItem("Вентилятор",         		"ROOT_diagnostics_Fan",             "Root_diagnostics_Cleaning");
				menuCreateItem("Не вращается",         	"diagnostics_Fan",             		"ROOT_diagnostics_Fan");
				menuCreateItem("Трещит",         		"diagnostics_Fan_Strange_Sounds",   "ROOT_diagnostics_Fan");
		
		menuCreateItem("Вырубается",      		"diagnostics_abruptly_turns_off",             "diagnosticsRoot");
				
		menuCreateItem("Корпус",             	"Root_diagnostics_Body",       		"diagnosticsRoot");
			menuCreateItem("Крепление петель",  "diagnostics_Fastening_of_loops",   "Root_diagnostics_Body");
			menuCreateItem("Сломан",            "diagnosticsBrokenBody",       		"Root_diagnostics_Body");
			menuCreateItem("Петли",           		"Root_diagnostics_Matrix_Loops",       	"Root_diagnostics_Body");
				menuCreateItem("Замена", 	    	"diagnostics_Broken_Matrix_Loops_Replacement",		"Root_diagnostics_Matrix_Loops");
				menuCreateItem("Восстановление", 	"diagnostics_Broken_Matrix_Loops_Repair",		"Root_diagnostics_Matrix_Loops");
				
		menuCreateItem("Клавиатура",         	"diagnosticsKeyboard",         "diagnosticsRoot");
		menuCreateItem("Короткое замыкание", 	"diagnostics_ShortCircuit",    "diagnosticsRoot");
		menuCreateItem("BIOS",      			"diagnosticsBIOS",             "diagnosticsRoot");
		menuCreateItem("Батарейка CMOS",      	"diagnostics_CMOS_Battery",             "diagnosticsRoot");
		
		menuCreateItem("Матрица",           	"Root_diagnosticsMatrix",       	"diagnosticsRoot");
            menuCreateItem("Разбита", 	    	"diagnostics_Broken_Matrix",		"Root_diagnosticsMatrix");
            menuCreateItem("Поврежден кабель",	"diagnostics_Broken_SCREEN_CABLE",	"Root_diagnosticsMatrix");
            menuCreateItem("Неисправна",    	"diagnosticsMatrix",            	"Root_diagnosticsMatrix");
            menuCreateItem("Искажения",    		"diagnostics_Matrix_Distortion",    "Root_diagnosticsMatrix");
            menuCreateItem("Нет подсветки",    	"diagnostics_Matrix_NoBacklight",   "Root_diagnosticsMatrix");
		
		menuCreateItem("WEb камера",           	"Root_diagnostics_WEb_camera",       	"diagnosticsRoot");
			menuCreateItem("Не определяется",   "diagnostics_WEb_camera_Not_determined",       	"Root_diagnostics_WEb_camera");
        			
		menuCreateItem("WiFi",           	"Root_diagnostics_WiFi",       	"diagnosticsRoot");
			menuCreateItem("Не определяется",   "diagnostics_WiFi_Not_determined",       	"Root_diagnostics_WiFi");
			menuCreateItem("Не включается",   	"diagnostics_WiFi_Does_Not_Turn_On",       	"Root_diagnostics_WiFi");
        			
		menuCreateItem("Блок питания",    		"ROOT_diagnostics_Power_Supply",   "diagnosticsRoot");
			menuCreateItem("Кабель поврежден",	"diagnostics_PS_cable_is_damaged",   "ROOT_diagnostics_Power_Supply");
				
        menuCreateItem("Гнездо питания",    "diagnosticsPowerSupplyConnector", "diagnosticsRoot");
        
		menuCreateItem("Аккумуляторная батарея",    "ROOT_diagnostics_Accumulator_Battery", 		"diagnosticsRoot");
			menuCreateItem("Не заряжается",    	"diagnostics_Accumulator_Battery_Do_not_Charge", 	"ROOT_diagnostics_Accumulator_Battery");
			menuCreateItem("Изношена",    		"diagnostics_Accumulator_Battery_Worn_out", 		"ROOT_diagnostics_Accumulator_Battery");

        menuCreateItem("Звук",      "Root_diagnostics_Audio", "diagnosticsRoot");
            menuCreateItem("Аудио гнездо сломано",  "diagnostics_Audio_Socket_Broken",  "Root_diagnostics_Audio");
            menuCreateItem("Не работаю динамики",   "diagnostics_Speakers_Broken",      "Root_diagnostics_Audio");
            menuCreateItem("Аудиокодек",            "diagnostics_Audio_Сodec",          "Root_diagnostics_Audio");

        menuCreateItem("Мульт", 				"Root_diagnostics_Mult", 			    "diagnosticsRoot");
            menuCreateItem("Замена мульта", 	"diagnostics_Mult_Replacing", 			"Root_diagnostics_Mult");
            menuCreateItem("Прошивка мульта", 	"diagnostics_Mult_Firmware_Recovery", 	"Root_diagnostics_Mult");

		menuCreateItem("BGA", 				"Root_diagnosticsBga", 			"diagnosticsRoot");
            menuCreateItem("Замена видеочип", 	"diagnosticsBgaVga", 			"Root_diagnosticsBga");
            menuCreateItem("Замена хаб", 		"diagnosticsBgaHUB", 			"Root_diagnosticsBga");
            menuCreateItem("Замена север", 		"diagnosticsBgaNorthBridge", 	"Root_diagnosticsBga");
            menuCreateItem("Замена юг", 		"diagnosticsBgaSouthBridge", 	"Root_diagnosticsBga");
            menuCreateItem("Замена проц", 		"diagnosticsBgaCPU", 	        "Root_diagnosticsBga");
            menuCreateItem("Компаунд",      	"diagnostics_Compaund", 	    "Root_diagnosticsBga");
			menuCreateItem("VGA или UMA", 		"diagnostics_Vga_Or_UMA", 		"Root_diagnosticsBga");
			
		menuCreateItem("В UMA", 		"diagnostics_UMA", 				"diagnosticsRoot");
			
		menuCreateItem("Следы", 			"Root_diagnosticsTraces", 		"diagnosticsRoot");
			menuCreateItem("Жидкости на мамке", 		"diagnosticsPour", 						"Root_diagnosticsTraces");
			menuCreateItem("Жидкости в корпусе", 	"diagnosticsPour_Case", 				"Root_diagnosticsTraces");
			menuCreateItem("Ремонта мамки", 		"diagnosticsTracesOfRepair", 			"Root_diagnosticsTraces");
			menuCreateItem("Ремонта на корпусе", 	"diagnostics_Traces_Of_Case_Repair", 	"Root_diagnosticsTraces");
			menuCreateItem("Прусаки", 				"diagnostics_cockroach", 				"Root_diagnosticsTraces");
			        
		menuCreateItem("Операционная система", "ROOT_diagnostics_Os", "diagnosticsRoot");
			menuCreateItem("Не загружается", 		"diagnostics_os_Not_loading", 	"ROOT_diagnostics_Os");
			menuCreateItem("Медленно загружается", 	"diagnostics_os_Slowly_loaded", "ROOT_diagnostics_Os");
			menuCreateItem("Необходима установка", 	"diagnostics_Install_Os", 		"ROOT_diagnostics_Os");
			menuCreateItem("Синий экран", 			"diagnostics_Blue_Screen", 		"ROOT_diagnostics_Os");
			menuCreateItem("Не все драйвера", 		"diagnostics_Not_all_drivers", 	"ROOT_diagnostics_Os");

		menuCreateItem("Стресс тест", "Root_diagnosticsTest", 		"diagnosticsRoot");
		    menuCreateItem("с ошибками", "diagnostics_Test_Errors", 	"Root_diagnosticsTest");
		    menuCreateItem("без ошибок", "diagnostics_Test_No_Errors", 	"Root_diagnosticsTest");

        menuCreateItem("ОЗУ", "Root_diagnostics_MemTest",        "diagnosticsRoot");
            menuCreateItem("Тест с ошибками", "diagnostics_MemTest_Errors",      "Root_diagnostics_MemTest");
            menuCreateItem("Тест без ошибок", "diagnostics_MemTest_No_Errors",   "Root_diagnostics_MemTest");
            menuCreateItem("Не работает", 	"diagnostics_Mem_Does_not_work",   "Root_diagnostics_MemTest");
		
		menuCreateItem("Индикация на корпусе", 							"Root_DiagnosticsNoReaction", 		"diagnosticsRoot");
			menuCreateItem("Нет индикации, нет реакции", 				"diagnosticsNoReaction", 			"Root_DiagnosticsNoReaction");	
			menuCreateItem("Есть индикация, нет реакции", 				"diagnostics_HaveLite_NoReaction", 	"Root_DiagnosticsNoReaction");	
			menuCreateItem("Есть индикация, реакция, нет картинки ", 	"diagnostics_HaveLite_NoPicture", 	"Root_DiagnosticsNoReaction");	
		
		menuCreateItem("Не ...", 		"Root_diagnosticsNot", 			"diagnosticsRoot");
		menuCreateItem("Не ремонт", 	"diagnosticsNotRepair", 		"Root_diagnosticsNot");
		menuCreateItem("Не гарантия", 	"diagnostics_NotAGuarantee", 	"Root_diagnosticsNot");
		menuCreateItem("Не проявилась", "diagnostics_DontManifested",	"Root_diagnosticsNot");
		menuCreateItem("Не деталь", 	"diagnostics_NotAPart", 		"Root_diagnosticsNot");
		menuCreateItem("Фатальные повреждения", 	"diagnostics_Fatal_Damage", 		"Root_diagnosticsNot");
		menuCreateItem("Неудачный конструктив", 	"diagnostics_NOT_a_good_design", 		"Root_diagnosticsNot");
}

//////////////////////////////////////////////////////////////////////////////
function CreateRepairMenu() {
    menuCreateRootItem("Ремонт", "repairRoot");

        menuCreateItem("Жесткий диск",          "repairHDD",                    "repairRoot");
        
		menuCreateItem("Охлада",            	"Root_repairCleaning",			"repairRoot");
			menuCreateItem("Чистка",        	"repairCleaning",       		"Root_repairCleaning");
			menuCreateItem("Термопрокладки",    "repair_DamagedThermalPads",	"Root_repairCleaning");
			
		menuCreateItem("Вентилятор ",		"ROOT_repair_Fan",           		"Root_repairCleaning");
			menuCreateItem("Смазан",         	"repair_Fan_is_oiled",          "ROOT_repair_Fan");
			menuCreateItem("Заменён",         	"repair_Fan",   				"ROOT_repair_Fan");
			
		menuCreateItem("Корпус",             	"Root_repair_Body",       		"repairRoot");
			menuCreateItem("Крепление петель",  "repair_Fastening_of_loops", 	"Root_repair_Body");
			menuCreateItem("Сломан",            "repairBrokenBody",             "Root_repair_Body");
			menuCreateItem("Петли",           		"Root_Repair_Matrix_Loops",       	"Root_repair_Body");
				menuCreateItem("Заменены", 	    	"Repair_Broken_Matrix_Loops_Replacement",		"Root_Repair_Matrix_Loops");
				menuCreateItem("Восстановлены", 	"Repair_Broken_Matrix_Loops_Repair",		"Root_Repair_Matrix_Loops");
        
		menuCreateItem("Клавиатура",            "repairKeyboard",               "repairRoot");
        menuCreateItem("Короткое замыкание",    "repair_ShortCircuit",          "repairRoot");
        menuCreateItem("BIOS",         "repairBIOS",                   "repairRoot");
		menuCreateItem("Батарейка CMOS",      "repair_CMOS_Battery",             "repairRoot");
        
		menuCreateItem("Матрица",               "repairMatrix",         "repairRoot");
        menuCreateItem("WEb камера",           	"repair_WEb_camera",	"repairRoot");
        menuCreateItem("WiFi",           		"repair_WiFi",       	"repairRoot");
		
		menuCreateItem("Блок питания",    		"ROOT_repair_Power_Supply",   "repairRoot");
			menuCreateItem("Кабель поврежден",	"repair_PS_cable_is_damaged",   "ROOT_repair_Power_Supply");
				
		menuCreateItem("Гнездо питания",        "repairPowerSupplyConnector",   "repairRoot");

		menuCreateItem("Аккумуляторная батарея",    "repair_Accumulator_Battery", 		"repairRoot");
				
    menuCreateItem("Мульт", 				"Root_repair_Mult", 			    "repairRoot");
        menuCreateItem("Замена мульта", 	"repair_Mult_Replacing", 			"Root_repair_Mult");
        menuCreateItem("Прошивка мульта", 	"repair_Mult_Firmware_Recovery", 	"Root_repair_Mult");

    menuCreateItem("BGA", "Root_repairBga", "repairRoot");
            menuCreateItem("BGA видеочип", 	"repair_BgaVga",			"Root_repairBga");
            menuCreateItem("BGA хаб", 		"repair_BgaHUB", 		 	"Root_repairBga");
            menuCreateItem("BGA север", 	"repair_BgaNorthBridge", 	"Root_repairBga");
            menuCreateItem("BGA юг", 		"repair_BgaSouthBridge", 	"Root_repairBga");
            menuCreateItem("BGA проц",      "repair_BgaCPU", 	        "Root_repairBga");
			
	menuCreateItem("В UMA", "repairUMA", "repairRoot");
	
	menuCreateItem("Следы залития", "repairPour", "repairRoot");   
    menuCreateItem("Установка ОС", "repairInstallOs", "repairRoot");
    menuCreateItem("ОЗУ", "repairMemory",  "repairRoot");
    
}

