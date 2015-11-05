$(document).ready(function(){
	validate('#question-form', {submitFunction:validationCall});
	validate('#consult-form3', {submitFunction:validationCall});
	validate('#consult-form2', {submitFunction:validationCall});
	validate('#consult-form1', {submitFunction:validationCall});
	inputNumber('.phone');
});