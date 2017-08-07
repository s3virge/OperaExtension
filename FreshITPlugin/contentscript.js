/**
 * Created by S3ViRGE on 22.06.2017.
 */
/*скрипт встраивается в станицу и выполняется при ее загрузке*/

/*=============================================*/
//закоментить эту строку если нужно отображать левую колонку и вернюю полосу
const PERFORM = "Закоментить";
/*=============================================*/

document.body.style.backgroundColor = "#ccffcc";

var loginBug = document.getElementsByClassName("login-bug");

if (loginBug.length != 0) {
    loginBug[0].style.visibility = "hidden";
}

var remontNumber = document.getElementById("global-caption");

if (remontNumber != null) {
    remontNumber.style.fontSize = "24px";
}

$(".login-header img").remove();

var Perfom = true;
//если PERFORM не определено
if (typeof(PERFORM) == "undefined"){
    //то не выполнять блок
    Perfom = false;
}

if (Perfom){
    $(".mLine").hide(); //global search
    $(".mLine2").css("height", "1px");
    $(".menu").remove();
    $("#leftBlock, #_data").remove();
}
/*-------------------------------------------*/

$("#files-tool-bar").css("height", "50%"); //размер окна загрузки файлов
$("#breadcrumbs").remove();
$(".line2").css("margin-bottom", "0");
// $("#rightBlock").css("height", "598px");

/*updateCSS не вызывается когда меняется содержимое #rightBlock */
function updateCSS() {
    $("#remont-main-form input[type='button']").css("padding", "8px 12px");
    $("#main-remont-form input[type='button']").css("padding", "8px 12px");
    $("#form-save-btn").css("color", "red");
    $(".changes-confirm:first").css("height", "20em");
    $(".block-content").css("font-size", "1.15em");
    $(".changes-confirm").css("font-size", "14px");

    $(".footer").hide();

    //$("#rightBlock").css("height", "598px");
    // $("#right-block-container").css("height", "598px");
    // $("#loader").css("height", "598px");

    console.log("#rightBlock -> updateCss");
}

$(document).ready(updateCSS);

// just listen changes on #mydiv content
// $("#rightBlock").bind("DOMSubtreeModified", updateCSS );
$("#right-block-container").bind("DOMSubtreeModified", updateCSS );
//$("#loader").bind("DOMSubtreeModified", updateCSS );

//посылаем сообщение из этого файла в background.js и получаем ответ
//chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//  console.log(response.farewell);
//});

//принимаем сообщение из background.js
chrome.runtime.onMessage.addListener(
    function (msg, sender, sendResponse) {

        //console.log(sender.tab ? "from a content script: " + sender.tab.url : "from the extension");

        if (msg.diagnostics){
            processDiagnosisMessage(msg.diagnostics);
        }
        else if (msg.repair){
            processRepairMessage(msg.repair);
        }
        /*else if (msg.notype == "separator"){
            $(':focus').append("------------------------------------------------------\n");
            // $("#form-save-btn").click();
        }*/
        else if (msg.message == "search") {
            $('.global-search input').attr("value", msg.number);
            $('.global-search form').submit();
        }
    }
);

function processDiagnosisMessage(message){

    switch(message){
        case "diagnostics_Hdd_Errors":
            $("#diag_rez_input, #rem_rez_input").append(" Программа проверки жесткого диска обнаружила ошибки. Жесткий диск необходимо заменить.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id141').click();	//замена hdd
            $(".prise-raboti form").submit();
            break;
		
		case "diagnostics_Hdd_No_Errors":
            $("#diag_rez_input, #rem_rez_input").append(" Программа проверки жесткого диска ошибок не обнаружила.");
            $("#form-save-btn").click();
            break;

        case "diagnostics_Cleaning":
            $("#diag_rez_input, #rem_rez_input").append(" Система охлаждения запылена. Необходима чистка.");
            $("#form-save-btn").click();
            $('#prise-id154').click();  //чистка
            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;
			
		case "diagnostics_DamagedThermalPads":
            $("#diag_rez_input, #rem_rez_input").append(" Термопрокладки повреждены.");
            $("#form-save-btn").click();
            break;
		
		case "diagnostics_Thermal_Compaund":
            $("#diag_rez_input, #rem_rez_input").append(" Термопаста пересохла.");
            $("#form-save-btn").click();
            break;
						
		case "diagnosticsInstallOs":
            $("#diag_rez_input, #rem_rez_input").append(" Необходима установка, настройка операционной системы.");
            $("#form-save-btn").click();
            $('#prise-id424').click();	//установка ос
            $(".prise-raboti form").submit();
            break;

        case "diagnosticsKeyboard":
            $("#diag_rez_input, #rem_rez_input").append(" Не все клавиши на клавиатуре работают, необходима её замена.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id123').click();	//замена клавы
            $(".prise-raboti form").submit();
            break;

        case "diagnosticsPour":
            $("#diag_rez_input, #rem_rez_input").append(" На материнской плате следы попадания жидкости. Для дальнейшей диагностики необходимо устранить последствия попадания жидкости.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка
            $('#prise-id157').click();	//отмывка после залития
            //$('#prise-id123').click();	//замена клавы
            $(".prise-raboti form").submit();
            break;

        case "diagnosticsBIOS":
            $("#diag_rez_input, #rem_rez_input").append(" Необходимо восстановление прошивки BIOS.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id162').click();	//Прошивка биос
            $(".prise-raboti form").submit();
            break;

        case "diagnosticsMatrix":
            $("#diag_rez_input, #rem_rez_input").append(" Не работает матрица, необходима её замена.");
            $("#form-save-btn").click();
            $('#prise-id117').click();	//разборка крышки
            $('#prise-id119').click();	//замена матрицы
            $(".prise-raboti form").submit();
            break;

        case "diagnostics_Broken_Matrix":
            $("#diag_rez_input, #rem_rez_input").append(" Разбита матрица, необходима её замена.");
            $("#form-save-btn").click();
            $('#prise-id117').click();	//разборка крышки
            $('#prise-id119').click();	//замена матрицы
            $(".prise-raboti form").submit();
            break;

        case "diagnostics_Broken_SCREEN_CABLE":
            $("#diag_rez_input, #rem_rez_input").append(" Поврежден кабель матрицы, необходима его замена.");
            $("#form-save-btn").click();
            $('#prise-id117').click();	//разборка крышки
            $('#prise-id122').click();	//замена шлейфа
            $(".prise-raboti form").submit();
            break;

        case "diagnosticsPowerSupplyConnector":
            $("#diag_rez_input, #rem_rez_input").append(" Сломанно гнездо подключения блока питания." +
                " Необходима его замена.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id128').click();	//замена гнезда питания
            $(".prise-raboti form").submit();
            break;

        case "diagnostics_Test_Errors":
            $("#diag_rez_input, #rem_rez_input").append(" Программа стресс тест выполняется с ошибками.");
            $("#form-save-btn").click();
            break;

        case "diagnostics_Test_No_Errors":
            $("#diag_rez_input, #rem_rez_input").append(" Программа стресс тест выполняется без ошибок.");
            $("#form-save-btn").click();
            break;

        case "diagnosticsTracesOfRepair":
            $("#diag_rez_input, #rem_rez_input").append(" На материнской плате следы предыдущего ремонта.");
            $("#form-save-btn").click();
            break;
		
		case "diagnosticsBgaVga":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходима замена видеочипа.");
            $("#form-save-btn").click();
			
			$('#prise-id116').click();	//разборка
			$('#prise-id534').click();	//снятие компаунда
			$('#prise-id133').click();	//пайка BGA    
			$('#prise-id154').click();  //чистка	
            $(".prise-raboti form").submit();			
            break;

        case "diagnosticsBgaHUB":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходима замена микросхемы контроллера платформы.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id534').click();	//снятие компаунда
            $('#prise-id133').click();	//пайка BGA
            $('#prise-id154').click();  //чистка
            $(".prise-raboti form").submit();
            break;

        case "diagnosticsBgaNorthBridge":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходима замена микросхемы северный мост.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id534').click();	//снятие компаунда
            $('#prise-id133').click();	//пайка BGA
            $('#prise-id154').click();  //чистка
            $(".prise-raboti form").submit();
            break;

        case "diagnosticsBgaSouthBridge":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходима замена микросхемы южный мост.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id534').click();	//снятие компаунда
            $('#prise-id133').click();	//пайка BGA
            $('#prise-id154').click();  //чистка
            $(".prise-raboti form").submit();
            break;

        case "diagnosticsBgaCPU":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходима замена процессора.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id534').click();	//снятие компаунда
            $('#prise-id133').click();	//пайка BGA
            $('#prise-id154').click();  //чистка
            $(".prise-raboti form").submit();
            break;
			
		case "diagnosticsNoReaction":
            $("#diag_rez_input, #rem_rez_input").append(" При подключении блока питания индикация на корпусе ноутбука не включается. Реакции на кнопку включения нет.");
            $("#form-save-btn").click();
			$('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();			
            break;
			
		case "diagnostics_HaveLite_NoReaction":
            $("#diag_rez_input, #rem_rez_input").append(" При подключении блока питания индикация на корпусе ноутбука включается. Реакции на кнопку включения нет.");
            $("#form-save-btn").click();
			$('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();			
            break;
			
		case "diagnostics_HaveLite_NoPicture":
            $("#diag_rez_input, #rem_rez_input").append(" При подключении блока питания индикация на корпусе ноутбука включается. После нажатия на кнопку включения ноутбук включается, но изображение на экране не появляется.");
            $("#form-save-btn").click();
			$('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();			
            break;
		
		case "diagnosticsNotRepair":
            $("#diag_rez_input, #rem_rez_input").append(" Определить причину неисправности не удалось.");
            $("#form-save-btn").click();	
            break;

        case "diagnosticsBrokenBody":
            $("#diag_rez_input, #rem_rez_input").append(" Крепления петель матрицы сломаны, необходимо их восстановление.");
            $("#form-save-btn").click();
			$('#prise-id116').click();	//разборка
			$('#prise-id140').click();	//Восстановление корпуса
			$(".prise-raboti form").submit();		
            break;
			
		case "diagnostics_NotAGuarantee":
            $("#diag_rez_input, #rem_rez_input").append(" Согласно пункта 3.1 условий гарантийного обслуживания данный ремонт не является гарантийным.");
            $("#form-save-btn").click();
            break;
			
		case "diagnostics_DontManifested":
            $("#diag_rez_input, #rem_rez_input").append(" В процессе диагностики указанная неисправность не проявилась.");
            $("#form-save-btn").click();
            break;
		
        case "diagnostics_ShortCircuit":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходимо найти и устранить короткое замыкание на материнской плате.");
            $("#form-save-btn").click();			
			
            $('#prise-id116').click();	//разборка
            $('#prise-id137').click();	// Восстановление цепи питания материнской платы
            $('#prise-id154').click();  //чистка
            $(".prise-raboti form").submit();
            break;

            //не деталь
        case "diagnostics_NotAPart":
            $("#diag_rez_input, #rem_rez_input").append(" Данная деталь снята с производства. Заменить её на новую нельзя.");
            $("#form-save-btn").click();
            break;

        case "diagnostics_Fan":
            $("#diag_rez_input, #rem_rez_input").append(" Вентилятор системы охлаждения неисправен, необходима его замена.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка
            $(".prise-raboti form").submit();
            break;

        case "diagnostics_Mult_Replacing":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходима замена микросхемы мультиконтроллера.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка
            $('#prise-id135').click();  //пайка планарной микросхемы

            $(".prise-raboti form").submit();
            break;

        case "diagnostics_MemTest_Errors":
            $("#diag_rez_input, #rem_rez_input").append(" Программа проверки оперативной памяти обнаружила ошибки. Необходима её замена.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id142').click();  //замена озу
            $(".prise-raboti form").submit();
            break;

        case "diagnostics_MemTest_No_Errors":
            $("#diag_rez_input, #rem_rez_input").append(" Программа проверки оперативной памяти ошибок не обнаружила.");
            $("#form-save-btn").click();
            break;
			
		case "diagnostics_Compaund":
            $("#diag_rez_input, #rem_rez_input").append(" Чипы на материнской плате зафиксированы с помощью компаунда не размягчающегося при нагревании. При демонтаже микросхемы возможно повреждение токопроводящих дорожек.");
            $("#form-save-btn").click();
            break;

        case "diagnostics_Audio_Socket_Broken":
            $("#diag_rez_input, #rem_rez_input").append(" Гнездо подключения наушников сломано. Необходима его замена.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка
            $('#prise-id127').click();  //Замена аудио
            $(".prise-raboti form").submit();
            break;

        case "diagnostics_Speakers_Broken":
            $("#diag_rez_input, #rem_rez_input").append(" Динамики не работают, необходима их замена.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id539').click();  //Замена динамиков
            $(".prise-raboti form").submit();
            break;

        case "diagnostics_Audio_Сodec":
            $("#diag_rez_input, #rem_rez_input").append(" Аудио система не работает. Для дальнейшей диагностики необходима замена микросхемы аудио кодека.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка
            $('#prise-id134').click();  //пайка qfn чипа

            $(".prise-raboti form").submit();
            break;

    }
}

function processRepairMessage(message){
    switch(message){
        case "repairKeyboard":
            $("#diag_rez_input, #rem_rez_input").append(" Неисправная клавиатура заменена на новую.");
            $("#form-save-btn").click();
            break;
			
		case "repairBrokenBody":
            $("#diag_rez_input, #rem_rez_input").append(" Корпус восстановлен.");
            $("#form-save-btn").click();
            break;

        case "repairCleaning":
            $("#diag_rez_input, #rem_rez_input").append(" Система охлаждения почищена, заменена термопаста на чипах.");
            $("#form-save-btn").click();
            $('#prise-id154').click();  //чистка
            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;
			
		case "repair_DamagedThermalPads":
            $("#diag_rez_input, #rem_rez_input").append(" Термопрокладки заменены на новые.");
            $("#form-save-btn").click();
            break;
			
        case "repairInstallOs":
            $("#diag_rez_input, #rem_rez_input").append(" Установлена лицензионная операционная система с базовым набором программ.");
            $("#form-save-btn").click();
            $('#prise-id424').click();	//установка ос
            $(".prise-raboti form").submit();
            break;

        case "repairHDD":
            $("#diag_rez_input, #rem_rez_input").append(" Установлен новый жесткий диск.");
            $("#form-save-btn").click();
            break;

        case "repairBIOS":
            $("#diag_rez_input, #rem_rez_input").append(" Выполнено восстановление прошивки BIOS на программаторе.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id162').click();	//Прошивка биос
            $(".prise-raboti form").submit();
            break;

        case "repairMatrix":
            $("#diag_rez_input, #rem_rez_input").append(" Выполнена замена неисправной матрицы.");
            $("#form-save-btn").click();
            break;

        case "repairPowerSupplyConnector":
            $("#diag_rez_input, #rem_rez_input").append(" Сломанное гнездо подключения блока питания заменено.");
            $("#form-save-btn").click();
            break;

        case "repairPour":
            $("#diag_rez_input, #rem_rez_input").append(" Материнская плата помыта. Удалены окислы с деталей.");
            $("#form-save-btn").click();
            break;
			
		case "repairUMA":
            $("#diag_rez_input, #rem_rez_input").append(" Материнская плата переделана для работы без дополнительной видеокарты.");
            $("#form-save-btn").click();
            break;
		
		case "repair_ShortCircuit":
            $("#diag_rez_input, #rem_rez_input").append(" Устранено короткое замыкание на материнсой плате.");
            $("#form-save-btn").click();
            break;
			
		case "repair_BgaVga":
            $("#diag_rez_input, #rem_rez_input").append(" На материнской плате выполнена замена видеочипа.");
            $("#form-save-btn").click();
            break;
			
		case "repair_BgaHUB":
            $("#diag_rez_input, #rem_rez_input").append(" На материнской плате выполнена замена микросхемы контроллера платформы.");
            $("#form-save-btn").click();
            break;
		
		case "repair_BgaNorthBridge":
            $("#diag_rez_input, #rem_rez_input").append(" На материнской плате выполнена замена микросхемы северный мост.");
            $("#form-save-btn").click();
            break;
		
		case "repair_BgaSouthBridge":
            $("#diag_rez_input, #rem_rez_input").append(" На материнской плате выполнена замена микросхемы южный мост.");
            $("#form-save-btn").click();
            break;

        case "repair_BgaCPU":
            $("#diag_rez_input, #rem_rez_input").append(" На материнской плате выполнена замена процессора.");
            $("#form-save-btn").click();
            break;

        case "repair_Fan":
            $("#diag_rez_input, #rem_rez_input").append(" Вентилятор системы охлаждения заменён на новый.");
            $("#form-save-btn").click();
            break;

        case "repair_Mult_Replacing":
            $("#diag_rez_input, #rem_rez_input").append(" На материнской плате заменеа микросхема мультиконтроллер.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка
            $('#prise-id135').click();  //пайка планарной микросхемы
            $(".prise-raboti form").submit();
            break;

        case "repair_Mult_Firmware_Recovery":
            $("#diag_rez_input, #rem_rez_input").append(" Прошивка микросхемы мультиконтроллера восстановлена.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка

            $(".prise-raboti form").submit();
            break;

        case "repairMemory":
            $("#diag_rez_input, #rem_rez_input").append(" Неисправный модуль оперативной памяти заменён на новый.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id142').click();  //замена озу
            $(".prise-raboti form").submit();
            break;
    }
}
