/**
 * Created by s3virge on 21.06.17.
 */
chrome.runtime.onInstalled.addListener(function () {


    CreateDiagnosticsMenu();

    chrome.contextMenus.create({
        title: "Вставить разделитель",
        type: "separator",
        id: "separator1",
        documentUrlPatterns: ["*://base.freshit.ua/*"]
    });


    CreateOtherMenu();

    chrome.contextMenus.create({
        title: "Вставить разделитель",
        type: "separator",
        id: "separator2",
        documentUrlPatterns: ["*://base.freshit.ua/*"]
    });

    CreateRepairMenu();
});

chrome.contextMenus.onClicked.addListener(function (info) {

    if (~info.menuItemId.indexOf("other")){
        menuSendMessage("other", info.menuItemId);
    }
	else if (~info.menuItemId.indexOf("diagnostics")){
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
            else if (messageType == "other"){
                chrome.tabs.sendMessage
                (
                    tabs[0].id,
                    {other: messageId}
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

function CreateOtherMenu() {
	menuCreateRootItem("Разное",        "otherRoot");

		menuCreateItem("3 Дня => Сложная диагностика!",       	"other_difficult",     	"otherRoot");
		menuCreateItem("Коэффицие́нт",       	"other_Coefficient",     	"otherRoot");
		menuCreateItem("Все добре",       	"other_all_is_well",     	"otherRoot");

		menuCreateItem("Не ...", 		"Root_otherNot", 			"otherRoot");
			menuCreateItem("Не ремонт", 	"other_NotRepair", 		"Root_otherNot");
			menuCreateItem("Нет схемы", 	"other_Not_Circuit", 		"Root_otherNot");

			menuCreateItem("Гарантия", 	"Root_other_NotAGuarantee", 	"Root_otherNot");
				menuCreateItem("Не гарантия", 			"other_NotAGuarantee", 	"Root_other_NotAGuarantee");
				menuCreateItem("Пломбы повреждены", 	"other_Seals_are_damaged", 	"Root_other_NotAGuarantee");

			menuCreateItem("ОС не восстановить", "other_OSDontRecovered",	"Root_otherNot");

			menuCreateItem("Не проявилась", "other_DontManifested",	"Root_otherNot");
			menuCreateItem("Не постоянно проявляется", "other_Not_constantly_manifested",	"Root_otherNot");
			menuCreateItem("Не деталь", 	"other_NotAPart", 		"Root_otherNot");
			menuCreateItem("Фатальные повреждения", 	"other_Fatal_Damage", 		"Root_otherNot");
			menuCreateItem("Неудачный конструктив", 	"other_NOT_a_good_design", 		"Root_otherNot");
}

function CreateDiagnosticsMenu() {
    menuCreateRootItem("Диагностика",        "diagnosticsRoot");

		menuCreateItem("Жесткий диск",       	"Root_diagnostics_Hdd",     	"diagnosticsRoot");
			menuCreateItem("С ошибками",	"diagnostics_Hdd_Errors",		"Root_diagnostics_Hdd");
			menuCreateItem("Без ошибок", 	"diagnostics_Hdd_No_Errors",	"Root_diagnostics_Hdd");
			menuCreateItem("Не определяется", 	"diagnostics_Hdd_Not_determined",	"Root_diagnostics_Hdd");
			menuCreateItem("Посторонние звуки", 	"diagnostics_Hdd_extraneous_sound",	"Root_diagnostics_Hdd");

		menuCreateItem("Охлада",             			"Root_diagnostics_Cleaning", 		"diagnosticsRoot");
			menuCreateItem("Чистка", 					"diagnostics_Cleaning", 			"Root_diagnostics_Cleaning");
			menuCreateItem("Термопрокладки повреждены", "diagnostics_DamagedThermalPads", 	"Root_diagnostics_Cleaning");
			menuCreateItem("Термопаста пересохла", 		"diagnostics_Thermal_Compaund",		"Root_diagnostics_Cleaning");
			menuCreateItem("Неисправна", 				"diagnostics_Cooling_system_Defective",		"Root_diagnostics_Cleaning");
			menuCreateItem("Вентилятор",         		"ROOT_diagnostics_Fan",             "Root_diagnostics_Cleaning");
				menuCreateItem("Не вращается",         	"diagnostics_Fan",             		"ROOT_diagnostics_Fan");
				menuCreateItem("Трещит",         		"diagnostics_Fan_Strange_Sounds",   "ROOT_diagnostics_Fan");

		menuCreateItem("Произвольно выключается",      		"diagnostics_abruptly_turns_off",             "diagnosticsRoot");

		menuCreateItem("Корпус",             	"Root_diagnostics_Body",       		"diagnosticsRoot");
			menuCreateItem("Крепление петель",  "diagnostics_Fastening_of_loops",   "Root_diagnostics_Body");
			/*DC Power Jack Socket Connector Charging Port*/
			menuCreateItem("Крепление гнезда",  "diagnostics_Power_Jack_Socket",   "Root_diagnostics_Body");
			menuCreateItem("Сломан",            "diagnosticsBrokenBody",       		"Root_diagnostics_Body");
			menuCreateItem("Петли",           		"Root_diagnostics_Matrix_Loops",       	"Root_diagnostics_Body");
				menuCreateItem("Замена", 	    	"diagnostics_Broken_Matrix_Loops_Replacement",		"Root_diagnostics_Matrix_Loops");
				menuCreateItem("Восстановление", 	"diagnostics_Broken_Matrix_Loops_Repair",		"Root_diagnostics_Matrix_Loops");
			menuCreateItem("Не восстановить",       "diagnostics_body_case_can_not_be_restored",       	"Root_diagnostics_Body");

		menuCreateItem("Клавиатура",         	"ROOT_diagnosticsKeyboard",         "diagnosticsRoot");
			menuCreateItem("Не все клавиши работают",       "diagnosticsKeyboard_do_not_work",         "ROOT_diagnosticsKeyboard");
			menuCreateItem("Сломаны клавиши",         	"diagnosticsKeyboard_Hacked_keys",         "ROOT_diagnosticsKeyboard");
			menuCreateItem("Клавиши нужно мыть",         	"diagnostics_Keyboard_needs_to_be_cleaned",         "ROOT_diagnosticsKeyboard");

		menuCreateItem("Тачпад",         		"Root_diagnosticsTachPad",         "diagnosticsRoot");
			menuCreateItem("Не работает",   	"diagnostics_TachPad_Does_not_Work", 		"Root_diagnosticsTachPad");
			menuCreateItem("Поврежден шлейф",   "diagnostics_TachPad_cable_broken", 		"Root_diagnosticsTachPad");
			menuCreateItem("Сломан разъём подключения",   "diagnostics_TachPad_jack_broken", 		"Root_diagnosticsTachPad");
			menuCreateItem("Не работают кнопки","diagnostics_TachPad_Btn_Does_not_Work", 	"Root_diagnosticsTachPad");

		menuCreateItem("Короткое замыкание", 	"diagnostics_ShortCircuit_ROOT",    "diagnosticsRoot");
		    menuCreateItem("В цепи 19 В", 	"diagnostics_ShortCircuit_19V",    "diagnostics_ShortCircuit_ROOT");
		    menuCreateItem("В цепи 5 В", 	"diagnostics_ShortCircuit_5V",    "diagnostics_ShortCircuit_ROOT");
		    menuCreateItem("В цепи 3.3 В", 	"diagnostics_ShortCircuit_3V",    "diagnostics_ShortCircuit_ROOT");

		menuCreateItem("BIOS",      			"ROOT_diagnostics_BIOS",             "diagnosticsRoot");
			menuCreateItem("Нужно шить",      		"diagnosticsBIOS",             "ROOT_diagnostics_BIOS");
			menuCreateItem("Флэшка не шъётся",      "diagnostics_flash_doesn_t_write",  "ROOT_diagnostics_BIOS");
			menuCreateItem("Батарейка села",      	"diagnostics_CMOS_Battery",    "ROOT_diagnostics_BIOS");

		menuCreateItem("Матрица",           	"Root_diagnosticsMatrix",       	"diagnosticsRoot");
            menuCreateItem("Разбита", 	    	"diagnostics_Broken_Matrix",		"Root_diagnosticsMatrix");
            menuCreateItem("Пятна", 	    	"diagnostics_Matrix_Spots",			"Root_diagnosticsMatrix");
            menuCreateItem("Кабель LVDS",		"diagnostics_Broken_SCREEN_CABLE",	"Root_diagnosticsMatrix");
				menuCreateItem("Замена",		"diagnostics_Broken_SCREEN_CABLE_change",	"diagnostics_Broken_SCREEN_CABLE");
				menuCreateItem("Восстановление","diagnostics_Broken_SCREEN_CABLE_repair",	"diagnostics_Broken_SCREEN_CABLE");
            menuCreateItem("Неисправна",    	"diagnosticsMatrix",            	"Root_diagnosticsMatrix");
            menuCreateItem("Искажения",    		"diagnostics_Matrix_Distortion",    "Root_diagnosticsMatrix");
            menuCreateItem("Нет подсветки",    	"diagnostics_Matrix_NoBacklight",   "Root_diagnosticsMatrix");

		menuCreateItem("WEb камера",           	"Root_diagnostics_WEb_camera",       	"diagnosticsRoot");
			menuCreateItem("Не определяется",   "diagnostics_WEb_camera_Not_determined",       	"Root_diagnostics_WEb_camera");
			menuCreateItem("Искажения",   		"diagnostics_WEb_camera_Distortions",       	"Root_diagnostics_WEb_camera");

		menuCreateItem("WiFi",           	"Root_diagnostics_WiFi",       	"diagnosticsRoot");
			menuCreateItem("Не определяется",   "diagnostics_WiFi_Not_determined",       	"Root_diagnostics_WiFi");
			menuCreateItem("Не включается",   	"diagnostics_WiFi_Does_Not_Turn_On",       	"Root_diagnostics_WiFi");

        menuCreateItem("USB",           	"Root_diagnostics_USB",       	"diagnosticsRoot");
            menuCreateItem("Сломан",           	"diagnostics_USB_broken",       	"Root_diagnostics_USB");

		menuCreateItem("Блок питания",    				"ROOT_diagnostics_Power_Supply",   "diagnosticsRoot");
			menuCreateItem("Не держит нагрузку",	"diagnostics_PS_Does_not_hold_the_load",   "ROOT_diagnostics_Power_Supply");
			menuCreateItem("Нет напряжения",					"diagnostics_PS_no_supply_voltage",   "ROOT_diagnostics_Power_Supply");
			menuCreateItem("Кабель поврежден",			"diagnostics_PS_cable",   "ROOT_diagnostics_Power_Supply");
				menuCreateItem("Замена",			"diagnostics_PS_cable_is_damaged_change",   "diagnostics_PS_cable");
				menuCreateItem("Восстановление",	"diagnostics_PS_cable_is_damaged_repair",   "diagnostics_PS_cable");

        menuCreateItem("Гнездо питания",        "root_diagnosticsPowerSupplyConnector", "diagnosticsRoot");
            menuCreateItem("замена",            "diagnosticsPowerSupplyConnector_replace",      "root_diagnosticsPowerSupplyConnector");
            menuCreateItem("восстановление",    "diagnosticsPowerSupplyConnector_recovery",      "root_diagnosticsPowerSupplyConnector");

		menuCreateItem("Аккумуляторная батарея",    "ROOT_diagnostics_Accumulator_Battery", 		"diagnosticsRoot");
			menuCreateItem("Не заряжается",    	"diagnostics_Accumulator_Battery_Do_not_Charge", 	"ROOT_diagnostics_Accumulator_Battery");
			menuCreateItem("Изношена",    		"diagnostics_Accumulator_Battery_Worn_out", 		"ROOT_diagnostics_Accumulator_Battery");
			menuCreateItem("Не определяется",   "diagnostics_battery_is_not_detected", 				"ROOT_diagnostics_Accumulator_Battery");

        menuCreateItem("Звук",      "Root_diagnostics_Audio", "diagnosticsRoot");
            menuCreateItem("Аудио гнездо сломано",  "diagnostics_Audio_Socket_Broken",  "Root_diagnostics_Audio");
            menuCreateItem("Динамики",  "Speakers",  "Root_diagnostics_Audio");
              menuCreateItem("Хрипят",   "diagnostics_speakers_wheeze",      "Speakers");
              menuCreateItem("Неисправны",   "diagnostics_Speakers_Broken",      "Speakers");
            menuCreateItem("Аудиокодек",            "diagnostics_Audio_Сodec",          "Root_diagnostics_Audio");

        menuCreateItem("Мульт", 				"Root_diagnostics_Mult", 			    "diagnosticsRoot");
            menuCreateItem("Замена мульта", 	"diagnostics_Mult_Replacing", 			"Root_diagnostics_Mult");
            menuCreateItem("Прошивка мульта", 	"diagnostics_Mult_Firmware_Recovery", 	"Root_diagnostics_Mult");

		menuCreateItem("BGA", 				"Root_diagnosticsBga", 			"diagnosticsRoot");
            menuCreateItem("видеочип", 	"diagnosticsBgaVga", 			"Root_diagnosticsBga");
            menuCreateItem("хаб", 		"diagnosticsBgaHUB", 			"Root_diagnosticsBga");
            menuCreateItem("север", 		"diagnosticsBgaNorthBridge", 	"Root_diagnosticsBga");
            menuCreateItem("юг", 		"diagnosticsBgaSouthBridge", 	"Root_diagnosticsBga");
            menuCreateItem("проц", 		"diagnosticsBgaCPU", 	        "Root_diagnosticsBga");
            menuCreateItem("Компаунд",      	"diagnostics_Compaund", 	    "Root_diagnosticsBga");
			menuCreateItem("VGA или UMA", 		"diagnostics_Vga_Or_UMA", 		"Root_diagnosticsBga");
			menuCreateItem("В UMA", 			"diagnostics_UMA", 				"Root_diagnosticsBga");

		menuCreateItem("ШИМ", 			"Root_diagnostics_QFN", 		"diagnosticsRoot");
			menuCreateItem("зарядник", 			"diagnostics_", 				"Root_diagnostics_QFN");
			menuCreateItem("дежурки", 			"diagnostics_Main_Power_Supply_Controller", 				"Root_diagnostics_QFN");
			menuCreateItem("проца", 			"diagnostics_CPU_PWC", 				"Root_diagnostics_QFN");
			menuCreateItem("видика", 			"diagnostics_VGA_PWC", 				"Root_diagnostics_QFN");
			menuCreateItem("память", 			"diagnostics_Mem_PWC", 				"Root_diagnostics_QFN");

		menuCreateItem("Следы", 			"Root_diagnosticsTraces", 		"diagnosticsRoot");
			menuCreateItem("Жидкости на мамке", 		"diagnosticsPour", 						"Root_diagnosticsTraces");
			menuCreateItem("Жидкости на мамке нет", 	"diagnostics_No_Pour", 						"Root_diagnosticsTraces");
			menuCreateItem("Жидкости в корпусе", 	"diagnosticsPour_Case", 				"Root_diagnosticsTraces");
			menuCreateItem("Ремонта мамки", 		"diagnosticsTracesOfRepair", 			"Root_diagnosticsTraces");
			menuCreateItem("Ремонта на корпусе", 	"diagnostics_Traces_Of_Case_Repair", 	"Root_diagnosticsTraces");
			menuCreateItem("Прусаки", 				"diagnostics_cockroach", 				"Root_diagnosticsTraces");

		menuCreateItem("Операционная система", "ROOT_diagnostics_Os", "diagnosticsRoot");
			menuCreateItem("Не загружается", 		"diagnostics_os_Not_loading", 	"ROOT_diagnostics_Os");
			menuCreateItem("Не активирована", 		"diagnostics_os_Not_Activated", 	"ROOT_diagnostics_Os");
			menuCreateItem("Не все драйвера", 		"diagnostics_Not_all_drivers", 	"ROOT_diagnostics_Os");
			menuCreateItem("Медленно загружается", 	"diagnostics_os_Slowly_loaded", "ROOT_diagnostics_Os");
			menuCreateItem("BSOD при загрузке", 			"diagnostics_Blue_Screen_on_load", 		"ROOT_diagnostics_Os");
			menuCreateItem("BSOD при работе", 			"diagnostics_Blue_Screen", 		"ROOT_diagnostics_Os");
			menuCreateItem("Необходима установка", 	"diagnostics_Install_Os", 		"ROOT_diagnostics_Os");

		menuCreateItem("Стресс тест", "Root_diagnosticsTest", 		"diagnosticsRoot");
		    menuCreateItem("с ошибками", "diagnostics_Test_Errors", 	"Root_diagnosticsTest");
		    menuCreateItem("без ошибок", "diagnostics_Test_No_Errors", 	"Root_diagnosticsTest");
		    menuCreateItem("вырубается", "diagnostics_accidentally_turned_off", 	"Root_diagnosticsTest");

        menuCreateItem("ОЗУ", "Root_diagnostics_MemTest",        "diagnosticsRoot");
            menuCreateItem("Тест с ошибками", "diagnostics_MemTest_Errors",      "Root_diagnostics_MemTest");
            menuCreateItem("Тест без ошибок", "diagnostics_MemTest_No_Errors",   "Root_diagnostics_MemTest");
            menuCreateItem("Не работает", 	"diagnostics_Mem_Does_not_work",   "Root_diagnostics_MemTest");

		menuCreateItem("Индикация на корпусе", 							"Root_DiagnosticsNoReaction", 		"diagnosticsRoot");
			menuCreateItem("Нет индикации, нет реакции", 				"diagnosticsNoReaction", 			"Root_DiagnosticsNoReaction");
			menuCreateItem("Есть индикация, нет реакции", 				"diagnostics_HaveLite_NoReaction", 	"Root_DiagnosticsNoReaction");
			menuCreateItem("Есть индикация, реакция, нет картинки ", 	"diagnostics_HaveLite_NoPicture", 	"Root_DiagnosticsNoReaction");
}

//////////////////////////////////////////////////////////////////////////////
function CreateRepairMenu() {
    menuCreateRootItem("Ремонт", "repairRoot");

        menuCreateItem("Жесткий диск",          "repairHDD",                    "repairRoot");

		menuCreateItem("Охлада",            	"Root_repairCleaning",			"repairRoot");
			menuCreateItem("Чистка",        	"repairCleaning",       		"Root_repairCleaning");
			menuCreateItem("Термопрокладки",    "repair_DamagedThermalPads",	"Root_repairCleaning");
			menuCreateItem("Заменена",    "repair_Cooling_system_Defective",	"Root_repairCleaning");

		menuCreateItem("Вентилятор ",		"ROOT_repair_Fan",           		"Root_repairCleaning");
			menuCreateItem("Смазан",         	"repair_Fan_is_oiled",          "ROOT_repair_Fan");
			menuCreateItem("Заменён",         	"repair_Fan",   				"ROOT_repair_Fan");

		menuCreateItem("Корпус",             	"Root_repair_Body",       		"repairRoot");
			menuCreateItem("Крепление петель",  "repair_Fastening_of_loops", 	"Root_repair_Body");
      menuCreateItem("Крепление гнезда",  "repair_Power_Jack_Socket",   "Root_repair_Body");
			menuCreateItem("Сломан",            "repairBrokenBody",             "Root_repair_Body");
			menuCreateItem("Петли",           		"Root_Repair_Matrix_Loops",       	"Root_repair_Body");
				menuCreateItem("Заменены", 	    	"repair_Broken_Matrix_Loops_Replacement",		"Root_Repair_Matrix_Loops");
				menuCreateItem("Восстановлены", 	"repair_Broken_Matrix_Loops_Repair",		"Root_Repair_Matrix_Loops");

		menuCreateItem("Клавиатура",            "root_repair_Keyboard",             "repairRoot");
			menuCreateItem("Заменена",          "repair_Keyboard",               	"root_repair_Keyboard");
			menuCreateItem("Клавиши помыты",    "repair_Keyboard_Keys_are_washed",  "root_repair_Keyboard");

        menuCreateItem("Короткое замыкание",    "repair_ShortCircuit",          "repairRoot");

        menuCreateItem("BIOS",         "ROOT_repairBIOS",                   "repairRoot");
			menuCreateItem("Прошита",         "repairBIOS",                   "ROOT_repairBIOS");
			menuCreateItem("Флешка заменена",         "repair_flash_doesn_t_write",                   "ROOT_repairBIOS");
			menuCreateItem("Заменена батарейка",      "repair_CMOS_Battery",             "ROOT_repairBIOS");
			menuCreateItem("System-on-a-chip",      "repair_CMOS_SoC",             "ROOT_repairBIOS");

		menuCreateItem("Матрица",               "ROOT_repairMatrix",         "repairRoot");
			menuCreateItem("Заменена",          "repairMatrix",         "ROOT_repairMatrix");
			menuCreateItem("Кабель LVDS",		"repair_Broken_SCREEN_CABLE",	"ROOT_repairMatrix");
				menuCreateItem("Заменён",		"repair_Broken_SCREEN_CABLE_change",	"repair_Broken_SCREEN_CABLE");
				menuCreateItem("Восстановлен","repair_Broken_SCREEN_CABLE_repair",	"repair_Broken_SCREEN_CABLE");

		menuCreateItem("WEb камера",           	"repair_WEb_camera",	"repairRoot");
        menuCreateItem("WiFi",           		"repair_WiFi",       	"repairRoot");

		menuCreateItem("Блок питания",    		"ROOT_repair_Power_Supply",   "repairRoot");
			menuCreateItem("Не держит нагрузку",	"repair_PS_Does_not_hold_the_load",   "ROOT_repair_Power_Supply");
			menuCreateItem("Кабель поврежден",	"repair_PS_cable",   "ROOT_repair_Power_Supply");
				menuCreateItem("Заменён",			"repair_PS_cable_is_damaged_change",   "repair_PS_cable");
				menuCreateItem("Восстановлен",	"repair_PS_cable_is_damaged_repair",   "repair_PS_cable");

		menuCreateItem("Гнездо питания",      "root_repairPowerSupplyConnector",        "repairRoot");
		    menuCreateItem("заменено",        "repairPowerSupplyConnector_replace",     "root_repairPowerSupplyConnector");
		    menuCreateItem("восстановлено",   "repairPowerSupplyConnector_recovery",   "root_repairPowerSupplyConnector");

		menuCreateItem("Аккумуляторная батарея",    "repair_Accumulator_Battery", 		"repairRoot");

	menuCreateItem("Звук",      "Root_repair_Audio", "repairRoot");
                menuCreateItem("Аудио гнездо заменено",  "repair_Audio_Socket_Broken",  "Root_repair_Audio");
                menuCreateItem("Динамики заменены",      "repairSpeakers",              "Root_repair_Audio");
                menuCreateItem("Аудиокодек заменён",     "repair_Audio_Сodec",          "Root_repair_Audio");

    menuCreateItem("Мульт", 				"Root_repair_Mult", 			    "repairRoot");
        menuCreateItem("Заменён", 	"repair_Mult_Replacing", 			"Root_repair_Mult");
        menuCreateItem("Прошит", 	"repair_Mult_Firmware_Recovery", 	"Root_repair_Mult");

    menuCreateItem("BGA", "Root_repairBga", "repairRoot");
            menuCreateItem("видеочип", 	"repair_BgaVga",			"Root_repairBga");
            menuCreateItem("хаб", 		"repair_BgaHUB", 		 	"Root_repairBga");
            menuCreateItem("север", 	"repair_BgaNorthBridge", 	"Root_repairBga");
            menuCreateItem("юг", 		"repair_BgaSouthBridge", 	"Root_repairBga");
            menuCreateItem("проц",      "repair_BgaCPU", 	        "Root_repairBga");
			menuCreateItem("Переделана в UMA", 		"repairUMA", 				"Root_repairBga");

	menuCreateItem("Следы залития", "repairPour", "repairRoot");
    menuCreateItem("Установка ОС", "repairInstallOs", "repairRoot");
    menuCreateItem("ОЗУ", "repairMemory",  "repairRoot");

}
