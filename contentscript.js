/**
 * Created by S3ViRGE on 22.06.2017.
 */
/*скрипт встраивается в станицу и выполняется при ее загрузке*/

console.log("We on content script.");

document.body.style.backgroundColor="#ccffcc";

var loginBug = document.getElementsByClassName("login-bug");

if (loginBug.length != 0){
    loginBug[0].style.visibility = "hidden";
}

var remontNumber = document.getElementById("global-caption");

if (remontNumber != null){
	remontNumber.style.fontSize = "24px";
}

$(".login-header img").css("display","none");
$("#leftBlock, .mLine, #_data").css("display","none");

function updateCSS() {
	$("#remont-main-form input[type='button']").css("padding", "8px 12px");
	$("#main-remont-form input[type='button']").css("padding", "8px 12px");
	$("#form-save-btn").css("color", "red");
	$(".changes-confirm:first").css("height","20em");
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
  function(msg, sender, sendResponse) {
    
    //console.log(sender.tab ? "from a content script: " + sender.tab.url : "from the extension");

    switch (msg){
		
        case "separator":
            $(':focus').append("\n------------------------------------------------------\n");
			break;
		
		case "hddIsChanched":
            $("#diag_rez_input, #rem_rez_input").append(" Неисправный жесткий диск заменён на новый.");
			break;

        case "errorsOnHdd":
            $("#diag_rez_input, #rem_rez_input").append(" Программа проверки жесткого диска обнаружила ошибки. Жесткий диск необходимо заменить.");
			break;

        case "сleaningIsNecessary":
            $("#diag_rez_input, #rem_rez_input").append(" Система охлаждения сильно запылена. Необходима чистка.");
			break;

        case "сleaned":
            $("#diag_rez_input, #rem_rez_input").append(" Система охлаждения почищена, заменена термопаста на чипах.");
			break;
		
		case "DoesNotTurnOn":
            $("#diag_rez_input, #rem_rez_input").append(" При нажатии на кнопку включения индикация на корпусе не включается, изображение на матрице не появляется.");
			break;
		
		case "workCleaning":
            $('#prise-id154').click();  //чистка
			$('#prise-id116').click();	//разборка
			$(".prise-raboti form").submit();
			break;		
			
		case "workBGA":
			$('#prise-id154').click();  //чистка
			$('#prise-id116').click();	//разборка
			$('#prise-id534').click();	//снятие компаунда
			$('#prise-id133').click();	//пайка BGA
			$(".prise-raboti form").submit();
			break;
	}    
	
	$("#form-save-btn").click();
  }
);








