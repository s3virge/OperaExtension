/**
 * Created by S3ViRGE on 22.06.2017.
 */
/*скрипт встраивается в станицу и выполняется при ее загрузке*/

/*=============================================*/
//закоментить эту строку если нужно отображать левую колонку и вернюю полосу
const PERFORM = "Закоментить";
/*=============================================*/

//////////////////////////////////////////
// отключить все стили
//////////////////////////////////////////
//$('style,link[rel="stylesheet"]').remove();

var imgURL = chrome.extension.getURL("eco-friendly-green-background.jpg");
console.log(imgURL);
document.body.style.backgroundImage = imgURL;

//document.body.style.backgroundImage = url('chrome-extension://oidepbjanpjigicgphfafelkeglijphm/eco-friendly-green-background.jpg');

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

//убрать стиль у первого дочернего элемента div вложенного в div#auth
$("div#auth > div").attr("style", "");
//увеличить размер шрифта в поле ввода вложенном в .no-ajax
$(".no-ajax input").css("font-size","2em");

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

$("#files-tool-bar").css("height", "50%"); //размер окна загрузки файлов
$("#breadcrumbs").remove();
$(".line2").css("margin-bottom", "0");

/*updateCSS не вызывается когда меняется содержимое #rightBlock */
function updateCSS() {
	//задаем цвета вкладкам
	$("#tab-active").css("background-color", "#ea0000");
	$("#tab-diag").css("background-color", "#ea8200");
	$("#tab-inrem").css("background-color", "#209e01");
	
	$(".timer-btn").css("padding", "5px 50px");
	$(".timer-btn").css("font-size", "1.5em");
	$(".stop-action").css("background-color", "#dd0000");
	$(".start-action").css("background-color", "#006400");
	
    $("#remont-main-form input[type='button']").css("padding", "8px 12px");
    $("#main-remont-form input[type='button']").css("padding", "8px 12px");
    $("#form-save-btn").css("color", "red");
    
	$(".changes-confirm:first").css("height", "20em");
    
    $(".changes-confirm").css("font-size", "1.1em");
	$(".changes-confirm").css("color", "#474747");
	//$(".changes-confirm").css("min-width", "100%");
	$(".changes-confirm").css("width", ""); //убираем ширину = 80%
	
	$(".left-col-wrapper").css("font-size", "0.8em");
	
	$(".block-content").css("font-size", "1em");
	//$(".block-content").css("color", "#474747");
	$(".block-content").css("font-family", "Verdana, sans-serif");
	
    $(".footer").hide();
	
	$(".table_list td:first-of-type").css("font-size", "1.2em");
	$(".table_list td:first-of-type").css("background-color", "rgba(251, 175, 3, 0.16)");
	
    console.log("#rightBlock -> updateCss");
	
	$("i, em").css("font-style", "normal");
	$("em").css("text-align","center");
	
	updateHeigth();
}

function updateHeigth() {
	//alert( window.innerHeight ); // вся ширина окна
	//alert( document.documentElement.clientHeight ); // ширина минус прокрутка
	
	var height = document.documentElement.clientHeight - 63;
	console.log("clientHeight = " + height);
	$("#rightBlock").css('height', height);
}

//это вызывается когда изменяется содержимое блока #right-block-container
function updateStyles() {
	$(document).ready(updateCSS);
};

//это вызывается когда загружается страница
$(document).ready(updateCSS);

//$(window).resize(updateHeigth());

// just listen changes on #mydiv content
$("#right-block-container").bind("DOMSubtreeModified", updateStyles );

//посылаем сообщение из этого файла в background.js и получаем ответ
//chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//  console.log(response.farewell);
//});

//==================================================================================

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

function PushAddWorkBtn(){
	$(".prise-raboti form").submit();
    //когда использую submit() все работает...
    //когда click() работы дублируются.
	//$(".prise-raboti input[type='submit']").click();
	//$(".prise-raboti").find("input[type='submit']").click();
}

function processDiagnosisMessage(message){

    switch(message){
        case "diagnostics_Hdd_Errors":
            $("#diag_rez_input, #rem_rez_input").append(" Программа проверки жесткого диска обнаружила ошибки. Жесткий диск необходимо заменить.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id141').click();	//замена hdd            
            PushAddWorkBtn();
			break;
			
		case "diagnostics_Hdd_Not_determined":
            $("#diag_rez_input, #rem_rez_input").append(" Жесткий диск не определяется в системе. Необходима его замена.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id141').click();	//замена hdd            
            PushAddWorkBtn();
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
			
			PushAddWorkBtn();			
            break;
			
		case "diagnostics_DamagedThermalPads":
            $("#diag_rez_input, #rem_rez_input").append(" Термопрокладки повреждены.");
            $("#form-save-btn").click();
			break;
		
		case "diagnostics_Thermal_Compaund":
            $("#diag_rez_input, #rem_rez_input").append(" Термопаста на чипах пересохла.");
            $("#form-save-btn").click();
            break;
						
		case "diagnostics_Install_Os":
            $("#diag_rez_input, #rem_rez_input").append(" Необходима установка, настройка операционной системы.");
            $("#form-save-btn").click();
            $('#prise-id424').click();	//установка ос            
            PushAddWorkBtn();
			break;
			
		case "diagnostics_os_Not_loading":
            $("#diag_rez_input, #rem_rez_input").append(" Операционная система не загружается.");
            $("#form-save-btn").click();
            break;
		
		case "diagnostics_os_Slowly_loaded":
            $("#diag_rez_input, #rem_rez_input").append(" Операционная система загружается медленно.");
            $("#form-save-btn").click();
			break;
		
		case "diagnostics_Blue_Screen_on_load":
            $("#diag_rez_input, #rem_rez_input").append(" Появляется синий экран во время загрузки операционной системы.");
            $("#form-save-btn").click();
			break;
		
		case "diagnostics_Blue_Screen":
            $("#diag_rez_input, #rem_rez_input").append(" В операционной системе появляется сообщение о критической системной ошибке (синий экран).");
            $("#form-save-btn").click();
			break;
			
		case "diagnostics_Not_all_drivers":
            $("#diag_rez_input, #rem_rez_input").append(" Не на все устройства установлены драйвера в операционной системе.");
            $("#form-save-btn").click();
			break;

        case "diagnosticsKeyboard":
            $("#diag_rez_input, #rem_rez_input").append(" Не все клавиши на клавиатуре работают, необходима её замена.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id123').click();	//замена клавы            
            PushAddWorkBtn();
			break;

        case "diagnosticsPour":
            $("#diag_rez_input, #rem_rez_input").append(" На материнской плате следы попадания жидкости. Для дальнейшей диагностики необходимо устранить последствия попадания жидкости.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка
            $('#prise-id157').click();	//отмывка после залития
            $('#prise-id136').click();	//пайка смд компонентов
            //$('#prise-id123').click();	//замена клавы            
            PushAddWorkBtn();
			break;
		
		case "diagnostics_No_Pour":
            $("#diag_rez_input, #rem_rez_input").append(" Следов попадания жидкости на материнскую плату не обнаружено.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка       
            PushAddWorkBtn();
			break;
			
		case "diagnosticsPour_Case":
            $("#diag_rez_input, #rem_rez_input").append(" В корпусе ноутбука следы попадания жидкости.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка            
            PushAddWorkBtn();
			break;
		
		//тараканы
		case "diagnostics_cockroach":
            $("#diag_rez_input, #rem_rez_input").append(" В корпусе ноутбука обнаружены насекомые и следы их жизнедеятельности. ");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка            
            PushAddWorkBtn();
			break;

        case "diagnosticsBIOS":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходимо восстановление прошивки микросхемы флеш-памяти.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id162').click();	//Прошивка биос            
            PushAddWorkBtn();
			break;
			
		case "diagnostics_flash_doesn_t_write":
            $("#diag_rez_input, #rem_rez_input").append(" Микросхема флеш-памяти не прошивается. Для дальнейшей диагностики необходима её замена и прошивка.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id162').click();	//Прошивка биос            
            PushAddWorkBtn();
			break;

        case "diagnosticsMatrix":
            $("#diag_rez_input, #rem_rez_input").append(" Не работает матрица, необходима её замена.");
            $("#form-save-btn").click();
            $('#prise-id117').click();	//разборка крышки
            $('#prise-id119').click();	//замена матрицы            
            PushAddWorkBtn();
			break;

        case "diagnostics_Broken_Matrix":
            $("#diag_rez_input, #rem_rez_input").append(" Разбита матрица, необходима её замена.");
            $("#form-save-btn").click();
            $('#prise-id117').click();	//разборка крышки
            $('#prise-id119').click();	//замена матрицы            
            PushAddWorkBtn();
			break;
		
		case "diagnostics_Matrix_Spots":
            $("#diag_rez_input, #rem_rez_input").append(" На матрице пятна.");
            $("#form-save-btn").click();
            $('#prise-id117').click();	//разборка крышки
            $('#prise-id119').click();	//замена матрицы            
            PushAddWorkBtn();
			break;

        case "diagnostics_Broken_SCREEN_CABLE_change":
            $("#diag_rez_input, #rem_rez_input").append(" Поврежден кабель матрицы, необходима его замена.");
            $("#form-save-btn").click();
            $('#prise-id117').click();	//разборка крышки
            $('#prise-id122').click();	//замена шлейфа      
			$('#prise-id116').click();	//разборка			
            PushAddWorkBtn();
			break;
		
		case "diagnostics_Broken_SCREEN_CABLE_repair":
            $("#diag_rez_input, #rem_rez_input").append(" Поврежден кабель матрицы, необходима его восстановление.");
            $("#form-save-btn").click();
            $('#prise-id117').click();	//разборка крышки
            $('#prise-id121').click();	//восстановление шлейфа      
			$('#prise-id116').click();	//разборка			
            PushAddWorkBtn();
			break;
			
		case "diagnostics_Matrix_Distortion":
            $("#diag_rez_input, #rem_rez_input").append(" Изображение на матрице отображается с искажениями, необходима её замена.");
            $("#form-save-btn").click();
            $('#prise-id117').click();	//разборка крышки
            $('#prise-id119').click();	//замена матрицы            
            PushAddWorkBtn();
			break;
			
		case "diagnostics_Matrix_NoBacklight":
            $("#diag_rez_input, #rem_rez_input").append(" Изображение на матрицу выводится, но подсветка не работает.");
            $("#form-save-btn").click();
            $('#prise-id117').click();	//разборка крышки
            // $('#prise-id119').click();	//замена матрицы            
            PushAddWorkBtn();
			break;

        case "diagnosticsPowerSupplyConnector":
            $("#diag_rez_input, #rem_rez_input").append(" Сломано гнездо подключения блока питания." +
                " Необходима его замена.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id128').click();	//замена гнезда питания            
            PushAddWorkBtn();
			break;

        case "diagnostics_accidentally_turned_off":
            $("#diag_rez_input, #rem_rez_input").append(" Во время выполнения программы стресс теста ноутбук аварийно выключается.");
            $("#form-save-btn").click();
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
			
		case "diagnostics_Traces_Of_Case_Repair":
            $("#diag_rez_input, #rem_rez_input").append(" На корпусе следы предыдущего ремонта.");
            $("#form-save-btn").click();
			break;
		
		case "diagnosticsBgaVga":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходима замена видеочипа.");
            $("#form-save-btn").click();
			
			$('#prise-id116').click();	//разборка
			$('#prise-id534').click();	//снятие компаунда
			$('#prise-id133').click();	//пайка BGA    
			$('#prise-id154').click();  //чистка	
            PushAddWorkBtn();
			break;

        case "diagnosticsBgaHUB":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходима замена микросхемы контроллера платформы.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id534').click();	//снятие компаунда
            $('#prise-id133').click();	//пайка BGA
            $('#prise-id154').click();  //чистка            
            PushAddWorkBtn();
			break;

        case "diagnosticsBgaNorthBridge":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходима замена микросхемы северный мост.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id534').click();	//снятие компаунда
            $('#prise-id133').click();	//пайка BGA
            $('#prise-id154').click();  //чистка            
            PushAddWorkBtn();
			break;

        case "diagnosticsBgaSouthBridge":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходима замена микросхемы южный мост.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id534').click();	//снятие компаунда
            $('#prise-id133').click();	//пайка BGA
            $('#prise-id154').click();  //чистка            
            PushAddWorkBtn();
			break;

        case "diagnosticsBgaCPU":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходима замена процессора.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id534').click();	//снятие компаунда
            $('#prise-id133').click();	//пайка BGA
            $('#prise-id154').click();  //чистка            
            PushAddWorkBtn();
			break;
		
		case "diagnostics_Vga_Or_UMA":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходима замена видеочипа или переделка материнской платы для работы без дополнительной видеокарты.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id534').click();	//снятие компаунда
            $('#prise-id133').click();	//пайка BGA
            $('#prise-id154').click();  //чистка
			$('#prise-id136').click();	//пайка смд компонентов            
            PushAddWorkBtn();
			break;
			
		case "diagnosticsNoReaction":
            $("#diag_rez_input, #rem_rez_input").append(" При подключении блока питания индикация на корпусе ноутбука не включается. Реакции на кнопку включения нет.");
            $("#form-save-btn").click();
			$('#prise-id116').click();	//разборка            			
            PushAddWorkBtn();
			break;
			
		case "diagnostics_HaveLite_NoReaction":
            $("#diag_rez_input, #rem_rez_input").append(" При подключении блока питания индикация на корпусе ноутбука включается. Реакции на кнопку включения нет.");
            $("#form-save-btn").click();
			$('#prise-id116').click();	//разборка            			
            PushAddWorkBtn();
			break;
			
		case "diagnostics_HaveLite_NoPicture":
            $("#diag_rez_input, #rem_rez_input").append(" При подключении блока питания индикация на корпусе ноутбука включается. После нажатия на кнопку включения ноутбук включается, но изображение на экране не появляется.");
            $("#form-save-btn").click();
			$('#prise-id116').click();	//разборка            			
            PushAddWorkBtn();
			break;
		
		case "diagnosticsNotRepair":
            $("#diag_rez_input, #rem_rez_input").append(" Определить причину неисправности не удалось.");
            $("#form-save-btn").click();
			break;

        case "diagnostics_Fastening_of_loops":
            $("#diag_rez_input, #rem_rez_input").append(" Крепления петель матрицы сломаны. Для предотвращения дальнейшего разрушения корпуса необходимо их восстановление.");
            $("#form-save-btn").click();
			$('#prise-id116').click();	//разборка
			$('#prise-id140').click();	//Восстановление корпуса					
            PushAddWorkBtn();
			break;
			
		case "diagnosticsBrokenBody":
            $("#diag_rez_input, #rem_rez_input").append(" Корпус ноутбука поврежден, необходимо его восстановление.");
            $("#form-save-btn").click();
			$('#prise-id116').click();	//разборка
			$('#prise-id140').click();	//Восстановление корпуса					
            PushAddWorkBtn();
			break;
			
		case "diagnostics_Power_Jack_Socket":
            $("#diag_rez_input, #rem_rez_input").append(" Крепление гнезда питания в корпусе сломано, необходимо его восстановление.");
            $("#form-save-btn").click();
			$('#prise-id116').click();	//разборка
			$('#prise-id140').click();	//Восстановление корпуса					
            PushAddWorkBtn();
			break;
			
		case "diagnostics_Broken_Matrix_Loops_Replacement":
            $("#diag_rez_input, #rem_rez_input").append(" Петли матрицы сломаны, необходима их замена.");
            $("#form-save-btn").click();
			$('#prise-id116').click();	//разборка
			$('#prise-id117').click();	//разборка крышки
			$('#prise-id120').click();	//Замена петель					
            PushAddWorkBtn();
			break;
		
		case "diagnostics_Broken_Matrix_Loops_Repair":
            $("#diag_rez_input, #rem_rez_input").append(" Петли матрицы сломаны необходимо их восстановление.");
            $("#form-save-btn").click();
			$('#prise-id116').click();	//разборка
			$('#prise-id117').click();	//разборка крышки
			$('#prise-id555').click();	//восстановление петель				
            PushAddWorkBtn();
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
            $("#diag_rez_input, #rem_rez_input").append(" Блок питания при подключении к ноутбуку переключается в режим защиты от короткого замыкания. Для дальнейшей диагностики необходимо найти и устранить короткое замыкание на материнской плате.");
            $("#form-save-btn").click();			
			
            $('#prise-id116').click();	//разборка
            $('#prise-id137').click();	// Восстановление цепи питания материнской платы
            $('#prise-id154').click();  //чистка            
            PushAddWorkBtn();
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
            PushAddWorkBtn();
			break;
			
		case "diagnostics_Fan_Strange_Sounds":
            $("#diag_rez_input, #rem_rez_input").append(" Вентилятор системы охлаждения издает посторонние звуки во время работы. Необходима его замена.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка            
            PushAddWorkBtn();
			break;

        case "diagnostics_Mult_Replacing":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходима замена микросхемы мультиконтроллера.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка
            $('#prise-id135').click();  //пайка планарной микросхемы            
            PushAddWorkBtn();
			break;
			
		case "diagnostics_Mult_Firmware_Recovery":
            $("#diag_rez_input, #rem_rez_input").append(" Необходимо восстановление прошивки микросхемы мультиконтроллера.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка
            $('#prise-id688').click();  //Прошивка мульта            
            PushAddWorkBtn();
			break;

        case "diagnostics_MemTest_Errors":
            $("#diag_rez_input, #rem_rez_input").append(" Программа проверки оперативной памяти обнаружила ошибки. Необходима её замена.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id142').click();  //замена озу            
            PushAddWorkBtn();
			break;

        case "diagnostics_MemTest_No_Errors":
            $("#diag_rez_input, #rem_rez_input").append(" Программа проверки оперативной памяти ошибок не обнаружила.");
            $("#form-save-btn").click();
			break;
			
		case "diagnostics_Mem_Does_not_work":
            $("#diag_rez_input, #rem_rez_input").append(" Неисправен модуль оперативной памяти, необходима его замена.");
            $("#form-save-btn").click();
			$('#prise-id116').click();	//разборка
            $('#prise-id142').click();  //замена озу            
            PushAddWorkBtn();
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
            PushAddWorkBtn();
			break;

        case "diagnostics_Speakers_Broken":
            $("#diag_rez_input, #rem_rez_input").append(" Динамики не работают, необходима их замена.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id539').click();  //Замена динамиков            
            PushAddWorkBtn();
			break;

        case "diagnostics_Audio_Сodec":
            $("#diag_rez_input, #rem_rez_input").append(" Аудио система не работает. Для дальнейшей диагностики необходима замена микросхемы аудио кодека.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка
            $('#prise-id134').click();  //пайка qfn чипа            
            PushAddWorkBtn();
			break;
			
		case "diagnostics_Fatal_Damage":
            $("#diag_rez_input, #rem_rez_input").append(" На материнской плате фатальные повреждения не совместимые с дальнейшей эксплуатацией.");
            $("#form-save-btn").click();
			break;
			
		case "diagnostics_CMOS_Battery":
            $("#diag_rez_input, #rem_rez_input").append(" Батарейка cmos разряжена, необходима её замена.");
            $("#form-save-btn").click();			
			
            $('#prise-id116').click();	//разборка 
			$('#prise-id704').click();	//замена батарейки смос			
            PushAddWorkBtn();
			break;
			
		case "diagnostics_abruptly_turns_off":
            $("#diag_rez_input, #rem_rez_input").append(" Ноутбук произвольно выключается во время работы.");
            $("#form-save-btn").click();			
			
            $('#prise-id116').click();	//разборка 			
            PushAddWorkBtn();
			break;
			
		case "diagnostics_UMA":
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнейшей диагностики необходима переделка материнской платы для работы без дополнительной видеокарты.");
            $("#form-save-btn").click();			
			
            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка
			$('#prise-id136').click();	//пайка смд компонентов			
            PushAddWorkBtn();
			break;
			
		case "diagnostics_NOT_a_good_design":
            $("#diag_rez_input, #rem_rez_input").append(" В результате неудачного конструктивного решения в данной модели ноутбука...");
            $("#form-save-btn").click();
			break;
			
		case "diagnostics_PS_cable_is_damaged_change":
            $("#diag_rez_input, #rem_rez_input").append(" Поврежден кабель в блоке питания. Необходима его замена.");
            $("#form-save-btn").click();

            $('#prise-id439').click();	//разборка бп
            $('#prise-id381').click();  //замена кабеля						
            PushAddWorkBtn();
			break;
			
		case "diagnostics_PS_Does_not_hold_the_load":
            $("#diag_rez_input, #rem_rez_input").append(" Блок питания рабочее напряжение выдает, но нагрузку не держит.");
            $("#form-save-btn").click();

            $('#prise-id439').click();	//разборка бп				
            $('#prise-id514').click();	//Замена электролитических конденсаторов в зарядном устройстве		
            PushAddWorkBtn();
			break;	
			
		case "diagnostics_PS_cable_is_damaged_repair":
            $("#diag_rez_input, #rem_rez_input").append(" Поврежден кабель в блоке питания. Необходимо его восстановление.");
            $("#form-save-btn").click();

            $('#prise-id439').click();	//разборка бп
            $('#prise-id441').click();  //восстановление кабеля						
            PushAddWorkBtn();
			break;			
		
		case "diagnostics_PS_no_supply_voltage":
            $("#diag_rez_input, #rem_rez_input").append(" Блок питания неисправен. Необходимое для работы ноутбука напряжение не выдает.");
            $("#form-save-btn").click();

            $('#prise-id439').click();	//разборка бп				
            PushAddWorkBtn();
			break;			
		
		case "diagnostics_Accumulator_Battery_Do_not_Charge":
            $("#diag_rez_input, #rem_rez_input").append(" Аккумуляторная батарея в ноутбуке определяется, но не заряжается. Для дальнейшей диагностики необходима её замена.");
            $("#form-save-btn").click();
			break;			
			
		case "diagnostics_Accumulator_Battery_Worn_out":
            $("#diag_rez_input, #rem_rez_input").append(" Аккумуляторная батарея изношена, необходима её замена.");
            $("#form-save-btn").click();
			break;
		
		case "diagnostics_WEb_camera_Not_determined":
            $("#diag_rez_input, #rem_rez_input").append(" WEB камера не определяется как устройство в операционной системе. Для дальнешей диагностики необходима её замена.");
            $("#form-save-btn").click();
			
			//$('#prise-id116').click();	//разборка
            $('#prise-id117').click();	//разборка крышки						
            PushAddWorkBtn();
			break;
		
		case "diagnostics_WiFi_Not_determined":
            $("#diag_rez_input, #rem_rez_input").append(" Беспроводная сетевая карта не определяется как устройство в операционной системе. Для дальнешей диагностики необходима её замена.");
            $("#form-save-btn").click();
			
			$('#prise-id116').click();	//разборка
            $('#prise-id480').click();	//замена WiFI						
            PushAddWorkBtn();
			break;
		
		case "diagnostics_WiFi_Does_Not_Turn_On":
            $("#diag_rez_input, #rem_rez_input").append(" Беспроводная сетевая карта определяется как устройство в операционной системе, но не включается.");
            $("#diag_rez_input, #rem_rez_input").append(" Для дальнешей диагностики необходима её замена.");
            $("#form-save-btn").click();
			
			$('#prise-id116').click();	//разборка
            $('#prise-id480').click();	//замена WiFI						
            PushAddWorkBtn();
			break;
			
		case "diagnostics_TachPad_Does_not_Work":
            $("#diag_rez_input, #rem_rez_input").append(" Тачпад не работает.");
            $("#form-save-btn").click();
			
			$('#prise-id116').click();	//разборка
			PushAddWorkBtn();
			break;
			
		case "diagnostics_TachPad_cable_broken":
            $("#diag_rez_input, #rem_rez_input").append(" Шлейф подключения тачпада поврежден.");
            $("#form-save-btn").click();
			
			$('#prise-id116').click();	//разборка
			PushAddWorkBtn();
			break;
			
		case "diagnostics_TachPad_Btn_Does_not_Work":
            $("#diag_rez_input, #rem_rez_input").append(" Кнопки тачпада неисправны, необходима их замена.");
            $("#form-save-btn").click();
			
			$('#prise-id116').click();	//разборка
			PushAddWorkBtn();
			break;		
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function processRepairMessage(message){
    switch(message){
        case "repairKeyboard":
            $("#diag_rez_input, #rem_rez_input").append(" Неисправная клавиатура заменена на новую.");
            $("#form-save-btn").click();
            break;
			
		case "repair_Fastening_of_loops":
            $("#diag_rez_input, #rem_rez_input").append(" Крепления петель матрицы в корпусе восстановлены.");
            $("#form-save-btn").click();
            break;
			
		case "repairBrokenBody":
            $("#diag_rez_input, #rem_rez_input").append(" Выполнено восстановление корпуса.");
            $("#form-save-btn").click();
            break;
			
		case "repair_Broken_Matrix_Loops_Replacement":
            $("#diag_rez_input, #rem_rez_input").append(" Произведена замена петель матрицы.");
            $("#form-save-btn").click();
			// $('#prise-id116').click();	//разборка
			// $('#prise-id117').click();	//разборка крышки
			// $('#prise-id120').click();	//Замена петель					
            // PushAddWorkBtn();
			break;
		
		case "repair_Broken_Matrix_Loops_Repair":
            $("#diag_rez_input, #rem_rez_input").append(" Петли матрицы восстановлены.");
            $("#form-save-btn").click();
			$('#prise-id116').click();	//разборка
			$('#prise-id117').click();	//разборка крышки
			$('#prise-id555').click();	//восстановление петель				
            PushAddWorkBtn();
			break;

        case "repairCleaning":
            $("#diag_rez_input, #rem_rez_input").append(" Система охлаждения почищена, заменена термопаста на чипах.");
            $("#form-save-btn").click();
            $('#prise-id154').click();  //чистка
            $('#prise-id116').click();	//разборка
            PushAddWorkBtn();
			break;
			
		case "repair_DamagedThermalPads":
            $("#diag_rez_input, #rem_rez_input").append(" Термопрокладки заменены на новые.");
            $("#form-save-btn").click();
            break;
			
        case "repairInstallOs":
            $("#diag_rez_input, #rem_rez_input").append(" Установлена лицензионная операционная система с базовым набором программ.");
            $("#form-save-btn").click();
            $('#prise-id424').click();	//установка ос            
            PushAddWorkBtn();
			break;

        case "repairHDD":
            $("#diag_rez_input, #rem_rez_input").append(" Жесткий диск заменён на новый.");
            $("#form-save-btn").click();
            break;

        case "repairBIOS":
            $("#diag_rez_input, #rem_rez_input").append(" Выполнено восстановление прошивки микросхемы флеш-памяти на программаторе.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id162').click();	//Прошивка биос            
            PushAddWorkBtn();
			break;
			
		case "repair_flash_doesn_t_write":
            $("#diag_rez_input, #rem_rez_input").append(" Заменена микросхема флеш памяти. Выполнено восстановление её прошивки на программаторе.");
            $("#form-save-btn").click();
            $('#prise-id116').click();	//разборка
            $('#prise-id162').click();	//Прошивка биос            
            PushAddWorkBtn();
			break;

        case "repairMatrix":
            $("#diag_rez_input, #rem_rez_input").append(" Неисправная матрица заменена на новую.");
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
            $("#diag_rez_input, #rem_rez_input").append(" Устранено короткое замыкание на материнской плате.");
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
		
		case "repair_Fan_is_oiled":
            $("#diag_rez_input, #rem_rez_input").append(" Смазан вентилятор.");
            $("#form-save-btn").click();
            break;

        case "repair_Mult_Replacing":
            $("#diag_rez_input, #rem_rez_input").append(" На материнской плате заменена микросхема мультиконтроллер.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка
            $('#prise-id135').click();  //пайка планарной микросхемы            
            PushAddWorkBtn();
			break;

        case "repair_Mult_Firmware_Recovery":
            $("#diag_rez_input, #rem_rez_input").append(" Прошивка микросхемы мультиконтроллера восстановлена.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id154').click();  //чистка            
            PushAddWorkBtn();
			break;

        case "repairMemory":
            $("#diag_rez_input, #rem_rez_input").append(" Неисправный модуль оперативной памяти заменён на новый.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка
            $('#prise-id142').click();  //замена озу            
            PushAddWorkBtn();
			break;
			
		case "repair_CMOS_Battery":
            $("#diag_rez_input, #rem_rez_input").append(" Батарейка cmos заменена на новую.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка 
			$('#prise-id704').click();	//замена батарейки смос            
            PushAddWorkBtn();
			break;
			
		case "repair_CMOS_SoC":
            $("#diag_rez_input, #rem_rez_input").append(" В нуотбуке используется однокристальный процессор (System-on-a-Chip, SoC). Из-за сбоя микропрограммы ноутбук перестает запускаться. После отключения от материнской платы всех элементов питания материнская плата нормально включается, запускается, появляется изображение на матрице.");
            $("#form-save-btn").click();

            $('#prise-id116').click();	//разборка 
            PushAddWorkBtn();
			break;
			
		case "repair_PS_Does_not_hold_the_load":
            $("#diag_rez_input, #rem_rez_input").append(" Неисправные конденсаторы в блоке питания заменены на новые.");
            $("#form-save-btn").click();

            $('#prise-id439').click();	//разборка бп				
            $('#prise-id514').click();	//Замена электролитических конденсаторов в зарядном устройстве		
            PushAddWorkBtn();
			break;	
			
		case "repair_PS_cable_is_damaged_change":
            $("#diag_rez_input, #rem_rez_input").append(" Поврежденный кабель в блоке питания заменён на новый.");
            $("#form-save-btn").click();

            $('#prise-id439').click();	//разборка бп
            $('#prise-id381').click();  //замена кабеля
            PushAddWorkBtn();
			break;
			
		case "repair_PS_cable_is_damaged_repair":
            $("#diag_rez_input, #rem_rez_input").append(" Поврежденный кабель в блоке питания восстановлен.");
            $("#form-save-btn").click();

            $('#prise-id439').click();	//разборка бп
            $('#prise-id441').click();  //восстановление кабеля	
            PushAddWorkBtn();
			break;
			
		case "repair_Accumulator_Battery":
            $("#diag_rez_input, #rem_rez_input").append(" Аккумуляторная батарея заменена на новую.");
            $("#form-save-btn").click();		
            break;

		case "repair_WEb_camera":
            $("#diag_rez_input, #rem_rez_input").append(" Неисправная WEB камера заменена на новую.");
            $("#form-save-btn").click();
			
			//$('#prise-id116').click();	//разборка
            $('#prise-id117').click();	//разборка крышки						
            PushAddWorkBtn();
			break;	
			
		case "repair_WiFi":
            $("#diag_rez_input, #rem_rez_input").append(" Неисправный модуль WiFi заменён на новый.");
            $("#form-save-btn").click();
			
			$('#prise-id116').click();	//разборка
            $('#prise-id480').click();	//замена WiFI					
            PushAddWorkBtn();
			break;
			
		case "repair_Broken_SCREEN_CABLE_change":
            $("#diag_rez_input, #rem_rez_input").append(" Кабель подключения матрицы заменён на новый.");
            $("#form-save-btn").click();
            $('#prise-id117').click();	//разборка крышки
            $('#prise-id122').click();	//замена шлейфа      
			$('#prise-id116').click();	//разборка			
            PushAddWorkBtn();
			break;
		
		case "repair_Broken_SCREEN_CABLE_repair":
            $("#diag_rez_input, #rem_rez_input").append(" Повреждённый кабель матрицы восстановлен.");
            $("#form-save-btn").click();
            $('#prise-id117').click();	//разборка крышки
            $('#prise-id122').click();	//замена шлейфа      
			$('#prise-id116').click();	//разборка			
            PushAddWorkBtn();
			break;
    }
}
