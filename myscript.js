
//$(":focus").append(" Система охлаждения почищена, заменена термопаста на чипах.");

//отмечаем галочкой чистку системы охлаждения.
$('#prise-id154').click();
$('#prise-id116').click();

//$('.prise-raboti input[type="submit"]:nth-child(1)').trigger('click');//selects the first one
//$('input[type="submit"]:nth-child(1)').trigger('click');//selects the first one
$(".prise-raboti form").submit();

//-------------------------------------------------------------------------------------
//$("#diag_rez_input, #rem_rez_input").append(" Система охлаждения почищена, заменена термопаста на чипах.");
