/**
 * Created by S3ViRGE on 22.06.2017.
 */
/*скрипт встраивается в станицу и выполняется при ее загрузке*/

// console.log("We on content script.");

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

$(".mLine").hide(); //global search
$(".mLine2").css("height", "1px");
$(".menu").remove();
$("#leftBlock, #_data").remove();
$("#files-tool-bar").css("height", "50%"); //размер окна загрузки файлов
$("#rightBlock").css("height", "100%"); //размер окна загрузки файлов
$("#breadcrumbs").remove();

function updateCSS() {
    $("#remont-main-form input[type='button']").css("padding", "8px 12px");
    $("#main-remont-form input[type='button']").css("padding", "8px 12px");
    $("#form-save-btn").css("color", "red");
    $(".changes-confirm:first").css("height", "20em");
    $(".block-content").css("font-size", "1.15em");
    $(".changes-confirm").css("font-size", "14px");
}

$(document).ready(updateCSS);

// just listen changes on #mydiv content
$("#rightBlock").bind("DOMSubtreeModified", updateCSS);

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
        else if (msg.notype == "separator"){
            $(':focus').append("------------------------------------------------------\n");
            // $("#form-save-btn").click();
        }
        else if (msg.message == "search") {
            $('.global-search input').attr("value", msg.number);
            $('.global-search form').submit();
        }
    }
);

function processDiagnosisMessage(message){

    switch(message){
        case "diagnostics_ErrorsOnHdd":
            $("#diag_rez_input, #rem_rez_input").append(" Программа проверки жесткого диска обнаружила ошибки. Жесткий диск необходимо заменить.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id141').click();	//замена hdd
            $(".prise-raboti form").submit();
            break;

        case "diagnostics_Cleaning":
            $("#diag_rez_input, #rem_rez_input").append(" Система охлаждения запылена. Необходима чистка.");
            $("#form-save-btn").click();
            $('#prise-id154').click();  //чистка
            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;
			
		case "diagnosticsInstallOs":
            $("#diag_rez_input, #rem_rez_input").append(" Необходима установка, насройка операционной системы.");
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
            $("#diag_rez_input, #rem_rez_input").append(" Неисправную матрицу необходимо заменить.");
            $("#form-save-btn").click();
            $('#prise-id117').click();	//разборка крышки
            $('#prise-id119').click();	//замена матрицы
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

        case "diagnosticsTest":
            $("#diag_rez_input, #rem_rez_input").append(" Программа стресс тест выполняется с ошибками.");
            $("#form-save-btn").click();
            break;

        case "diagnosticsTracesOfRepair":
            $("#diag_rez_input, #rem_rez_input").append(" На материнской плате следы предыдущего ремонта.");
            $("#form-save-btn").click();
            break;

        /* case "diagnosticsDamagedThermalPads":
            $("#diag_rez_input, #rem_rez_input").append(" Чипы охлаждаются через поврежденные термопрокладки.");
            $("#form-save-btn").click();
            break; */
		
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
            break;
    }
}

function processRepairMessage(message){
    switch(message){
        case "repairKeyboard":
            $("#diag_rez_input, #rem_rez_input").append(" Неисправная клавиатура заменена на новую.");
            $("#form-save-btn").click();
            break;

        case "repairCleaning":
            $("#diag_rez_input, #rem_rez_input").append(" Система охлаждения почищена, заменена термопаста на чипах.");
            $("#form-save-btn").click();
            $('#prise-id154').click();  //чистка
            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
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
    }
}
