/**
 * Created by S3ViRGE on 22.06.2017.
 */
/*скрипт встраивается в станицу и выполняется при ее загрузке*/

/*=============================================*/
//закоментить эту строку если нужно отображать левую колонку и вернюю полосу
//const PERFORM = "Закоментить";
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
    //$(".changes-confirm:first").css("height", "20em"); //размер окна не офф комментириев
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
        else if (msg.message == "search") {
            $('.global-search input').attr("value", msg.number);
            $('.global-search form').submit();
        }
    }
);

////////////  Диагностика  //////////////////
function processDiagnosisMessage(message){

    switch(message){
        case "diagnostics_Was_Opened":
            $("#diag_rez_input, #rem_rez_input").append(" Телефон вскрывался, отсутствуют пломбы производителя.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;
			
		case "diagnostics_Touchscreen_does_not_work":
            $("#diag_rez_input, #rem_rez_input").append(" Тачскрин не работает, необходима его замена.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;
			
		case "diagnostics_Charging_connector":
            $("#diag_rez_input, #rem_rez_input").append(" В процессе диагностики было выявлено механическое повреждение разьема зарядки. Выполнили работы по замене разьема зарядки .");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;
			
		case "diagnostics_Traces_of_fluid":
            $("#diag_rez_input, #rem_rez_input").append(" В процессе диагностики обнаружены следы попадания жидкости на материнскую плату. Для дальнейшей диагностики необходима отмывка и восстановленике материнской платы после залития.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;
			
		case "diagnostics_Battery":
            $("#diag_rez_input, #rem_rez_input").append(" В процессе диагностики не было выявлено отклонений по току потреблению, подозрение на выход из строя акб. Необходима замена акб.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;
		
		case "diagnostics_Short_circuit":
            $("#diag_rez_input, #rem_rez_input").append(" В процессе диагностики было выявлено короткое замыкание в цепях зарядки. Необходимо первоначально заменить разьем зарядки и восстановить цепь зарядки.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;
		
		case "diagnostics_Display":
            $("#diag_rez_input, #rem_rez_input").append(" Необходима замена дисплейного модуля или защитного стекла в дисплейном модуле.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;
		
		case "diagnostics_Battery_Critical_charge":
            $("#diag_rez_input, #rem_rez_input").append(" В процессе диагностики был выявлен критический низкий заряд аккумуляторной батареи.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;	
			
		case "diagnostics_Not_a_guarantee":
            $("#diag_rez_input, #rem_rez_input").append(" Согласно пункта 3.1 условий гарантийного обслуживания данный ремонт не является гарантийным.");
            $("#form-save-btn").click();
            $(".prise-raboti form").submit();
            break;			
    }
}

/////////// Ремонт ///////////////////////////
function processRepairMessage(message){
    switch(message){
        case "repair_Display":
            $("#diag_rez_input, #rem_rez_input").append(" Выполнили работы по замене дисплейного модуля.");
            $("#form-save-btn").click();
          
            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;
		
		case "repair_Traces_of_fluid":
            $("#diag_rez_input, #rem_rez_input").append(" Выполнили работы по отмывке и восстановлению материнской платы после залития.");
            $("#form-save-btn").click();
          
            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;
		
		case "repair_Touchscreen_does_not_work":
            $("#diag_rez_input, #rem_rez_input").append(" Выполнили работы по замене тачскрина.");
            $("#form-save-btn").click();
          
            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;
		
		case "repair_Charging_connector":
            $("#diag_rez_input, #rem_rez_input").append(" Выполнили работы по замене разъема зарядки.");
            $("#form-save-btn").click();
          
            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;
		
		case "repair_Glass":
            $("#diag_rez_input, #rem_rez_input").append(" Выполнили работы по замене защитного стекла в дисплейном модуле.");
            $("#form-save-btn").click();
          
            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;
		
		case "repair_Cable_Line":
            $("#diag_rez_input, #rem_rez_input").append(" Выполнили работу по замене шлейфа коннектора зарядки, микрофона, с компонентами.");
            $("#form-save-btn").click();
          
            $('#prise-id116').click();	//разборка
            $(".prise-raboti form").submit();
            break;		
    }
}
