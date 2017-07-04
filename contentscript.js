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

// $(".login-header img").css("display", "none");
$(".login-header img").hide();
$("#leftBlock, .mLine, #_data").hide();

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
            $("#form-save-btn").click();

        }
        else if (msg.message == "search") {
            $('.global-search input').attr("value", msg.number);
            $('.global-search form').submit();
        }
    }
);

function processDiagnosisMessage(message){
    switch(message){
        case "errorsOnHdd":
            $("#diag_rez_input, #rem_rez_input").append(" Программа проверки жесткого диска обнаружила ошибки. Жесткий диск необходимо заменить.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id141').click();	//замена hdd
            $(".prise-raboti form").submit();
            break;

        case "сleaningIsNecessary":
            $("#diag_rez_input, #rem_rez_input").append(" Система охлаждения запылена. Необходима чистка.");
            $("#form-save-btn").click();
            $('#prise-id154').click();  //чистка
            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;

        case "DoesNotTurnOn":
            $("#diag_rez_input, #rem_rez_input").append(" При нажатии на кнопку включения индикация на корпусе не включается, изображение на матрице не появляется.");
            $("#form-save-btn").click();
            $('#prise-id154').click();  //чистка
            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;

        case "diagnosticsKeyboard":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходима замена клавиатуры.");
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
                "Необходима его замена.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id128').click();	//замена гнезда питания
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

        case "repairCleaning":
            $("#diag_rez_input, #rem_rez_input").append(" Система охлаждения почищена, заменена термопаста на чипах.");
            $("#form-save-btn").click();

            $("#form-save-btn").click();
            $('#prise-id154').click();  //чистка
            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;

        case "repairInstallOs":
            $("#diag_rez_input, #rem_rez_input").append(" Установлена лицензионная операционная система с базовым набором программ.");
            $("#form-save-btn").click();
            break;

        case "repairHDD":
            $("#diag_rez_input, #rem_rez_input").append(" Неисправные жесткий диск заменён на новый.");
            $("#form-save-btn").click();
            break;

        case "repairBIOS":
            $("#diag_rez_input, #rem_rez_input").append(" Выполнено восстановление прошивки BIOS на программаторе.");
            $("#form-save-btn").click();
            break;

        case "repairMatrix":
            $("#diag_rez_input, #rem_rez_input").append(" Выполнена замена неисправной матрицы.");
            $("#form-save-btn").click();
            break;

        case "repairPowerSupplyConnector":
            $("#diag_rez_input, #rem_rez_input").append(" Сломанное гнездо подключения блока питания заменено.");
            $("#form-save-btn").click();
            break;
    }
}
