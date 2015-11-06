var scroller=jQuery.browser.webkit ? "body": "html";

/* modernize */
function modernize() {
	// placeholder
	if(!Modernizr.input.placeholder){
		$('[placeholder]').each(function() {
			$(this).watermark($(this).attr('placeholder'));
		});
	}
}


/* input only Number  */
function inputNumber(block) {
    $('input', block).focus(function(){
        if($(this).val() == 0){
            $(this).val('');
        }
    });
    $('input', block).blur(function(){
        if($(this).val()==''){
            $(this).val(0);
        }
    });
	$('input', block).keypress(function(e) {
		if (e.which >= 47 && e.which <= 57 ){}
		else return false;
	});

	$('input', block).keyup(function() {
		$inputNum = $(this);
		if ($inputNum.val == '' || $inputNum.val() == 0) {
			$inputNum.val('');
		}
	});
}


/* u_tabs */
function u_tabs(link, block) {
	$(link).click(function(e) {
		var $currentTab = $(this);
		var tabId = $currentTab.data('utab');

		$(link).removeClass('active');
		$currentTab.addClass('active');

		$(block).hide().removeClass('active');
		$(block+'[data-utab="' + tabId + '"]').show().addClass('active');
		if($(link).is('a')){
			e.preventDefault();
		}
	});
	$(link).eq(0).click();
}

/* scrollUp */
function scrollUp(block,targetBlock) {

	$(block).click(function(e){
		var target = $(targetBlock).offset().top;

		$(scroller).animate({scrollTop:target},800);
		return false;

		e.preventDefault();
	});
}


function initScrollpane(){
	$('.scroll-pane').jScrollPane();
}


function oneHeightItems(){

	function oneHeight(block){
		var height=0;
		block.removeAttr('style');
		block.each(function(){
			if($(this).height()>height){
				height=$(this).height();
			}
		});
		block.css('height', height);
	}

	oneHeight($('.oneHeight'));
}

function validate(form, options){
    var setings = {
        errorFunction:null,
        submitFunction:null
    }
    $.extend(setings, options);

    var $form = $(form);

    if ($form.length && $form.attr('novalidate') === undefined) {
        $form.on('submit', function(e) {
            e.preventDefault();
        });

        $form.validate({
            errorClass : 'errorText',
            focusCleanup : true,
            focusInvalid : false,
            invalidHandler: function(event, validator) {
                if(typeof(setings.errorFunction) === 'function'){
                    setings.errorFunction();
                }
            },
            errorPlacement: function(error, element) {
                error.appendTo( element.closest('.form_input'));
            },
            highlight: function(element, errorClass, validClass) {
                $(element).addClass('error');
                $(element).closest('.form_row').addClass('error');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
                $(element).closest('.form_row').removeClass('error');
            },
            submitHandler: function(form) {
                if( typeof(setings.submitFunction) === 'function' ) {
                    setings.submitFunction();
                } else {
                    form.submit();
                }
            }
        });

        $('[required]',$form).each(function(){
            $(this).rules( "add", {
                required: true,
                messages: {
                    required: "Вы пропустили"
                }
            });
        });

        if($('[type="email"]',$form).length) {
            $('[type="email"]',$form).rules( "add",
            {
                messages: {
                    email: "Невалидный email"
                 }
            });
        }

        if($('.tel-mask[required]',$form).length){
            $('.tel-mask[required]',$form).rules("add",
            {
                messages:{
                    required:"Введите номер мобильного телефона."
                }
            });
        }
    }
}

function validationCall(form){

  var thisForm = $(form);
  var formSur = thisForm.serialize();

    $.ajax({
        url : thisForm.attr('action'),
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim()!='true') {
                thisForm.trigger("reset");
                popNext();
            }
            else {
               $(this).trigger('reset');
            }

        }
    });

    function popNext(){
        $.fancybox.open("#call_success",{
            padding:0,
            fitToView:false,
            wrapCSS:"popup-class",
            autoSize:true,
            afterClose: function(){
                $('form').trigger("reset");
                clearTimeout(timer);
            }
        });
        var timer = null;

        timer = setTimeout(function(){
            $('form').trigger("reset");
            $.fancybox.close("#call_success");
        },2000);

    }
}

function animationBlock(item){

    $(window).scroll(function(){
        checkForAnimate();
    });

    function checkForAnimate(){
        var bottomCheck = $(window).height()+$(window).scrollTop();
        var windowTop = $(window).scrollTop()+($(window).height()/1.5);
        item.each(function(){
           if(windowTop>$(this).offset().top || bottomCheck > $('body').height()*0.98){

              var itemSect = $(this);
              var point = 0;
              itemSect.find('.animate-it').addClass('animated');

              var timer = setInterval(function(){
                 itemSect.find('.animate-delay').eq(point).addClass('animated');
                 point++;
                 if(itemSect.find('.animate-delay').length == point){
                     clearInterval(timer);
                 }
              },200);


           }
        });
    }
    checkForAnimate();
}

function calcForm(){

    $('.calc-form').submit(function(){

        var serializeItem = $(this).serializeArray();

        var sumValue = parseInt($(this).find('.sum-input').val());
        var fondValue = parseInt($(this).find('.fond-input').val());
        var costValue = parseInt($(this).find('.cost-input').val());

        var sumPerc = parseInt($('.calc-form-table-wrap tr').eq(2).find('td:nth-child(2)').text())/100;
        var sumPercCrim = parseInt($('.calc-form-table-wrap tr').eq(2).find('td:nth-child(3)').text())/100;

        var costPerc = parseInt($('.calc-form-table-wrap tr').eq(4).find('td:nth-child(2)').text())/100;

        var fondPerc = parseInt($('.calc-form-table-wrap tr').eq(6).find('td:nth-child(2)').text())/100;
        var fondPercCrim = parseInt($('.calc-form-table-wrap tr').eq(6).find('td:nth-child(3)').text())/100;

        $('.calc-form-table-wrap tr').eq(1).find('td:nth-child(2), td:nth-child(3)').text(sumValue);
        $('.calc-form-table-wrap tr').eq(3).find('td:nth-child(1)').text(parseInt(sumValue*sumPerc));
        $('.calc-form-table-wrap tr').eq(3).find('td:nth-child(2)').text(parseInt(sumValue*sumPercCrim));
        $('.calc-form-table-wrap tr').eq(3).find('td:nth-child(3)').text(parseInt(sumValue*sumPerc) - parseInt(sumValue*sumPercCrim));

        $('.calc-form-table-wrap tr').eq(5).find('td:nth-child(1)').text(parseInt(costValue*costPerc));
        $('.calc-form-table-wrap tr').eq(5).find('td:nth-child(2)').text((parseInt(costValue*costPerc)) - parseInt($('.calc-form-table-wrap tr').eq(4).find('td:nth-child(3)').text()));

        $('.calc-form-table-wrap tr').eq(7).find('td:nth-child(2)').text(parseInt(fondValue * fondPerc));
        $('.calc-form-table-wrap tr').eq(7).find('td:nth-child(3)').text(parseInt(fondValue * fondPercCrim));
        $('.calc-form-table-wrap tr').eq(7).find('td:nth-child(4)').text(parseInt(fondValue * fondPerc) - parseInt(fondValue * fondPercCrim));

        var sumCalc = parseInt(sumValue*sumPerc) + parseInt(costValue*costPerc) + parseInt(fondValue * fondPerc)+$('.first-table-input-field input').val() + $('.second-table-input-field input').val();
        var sumCalcCrim = parseInt(sumValue*sumPercCrim) + parseInt($('.calc-form-table-wrap tr').eq(4).find('td:nth-child(3)').text()) + parseInt(fondValue * fondPercCrim);
        var sumCalcDif = sumCalc - sumCalcCrim;

        $('.calc-form-table-wrap tr:last-child td:nth-child(2) span').text(sumCalc);
        $('.calc-form-table-wrap tr:last-child td:nth-child(3) span').text(sumCalcCrim);
        $('.calc-form-table-wrap tr:last-child td:nth-child(4) span').text(sumCalcDif);


        // here gona be ajax fucntion

        return false;

    });

    $('.calc-form-table-wrap .num-field input').keyup(function(){
        var inpValue = $(this).val();
        var parent = $(this).parents('tr');
        parent.find('td:nth-child(4) span').text(inpValue);
    });

};

function valueShow(){
    $('.timer-wrap').each(function() {
        if($(this).is('.animated:not(.timered)')){
            $(this).addClass('timered');

            var timer = $(this).find('.timer');
            var timerValue = timer.data('value');
            var pointValue = 1;
            if(timerValue>=100 && timerValue<250){
                pointValue = 2;
            }
            else if(timerValue>=250 && timerValue<1000){
                pointValue = 5;
            }
            else if(timerValue>=1000 && timerValue<2000){
                pointValue = 6;
            }
            else if(timerValue>=2000 && timerValue<3000){
                pointValue = 7;
            }
            else if(timerValue>=3000){
                pointValue = 9;
            }
            var dataIntervalTime = 2000/timerValue;
            var point = 0;
            var timerId = setInterval(function(){
                point += pointValue;
                if(point>=timerValue){
                    point = timerValue;
                }
                timer.text(point);
                if(point==timerValue){
                    clearInterval(timerId);
                }
            }, dataIntervalTime);
        }
    });
}

function fancyInit(){

    $('.fancybox').fancybox({
        fitToView:true,
        autosize:true,
        wrapCSS:'popup-class',
        padding:0
    });

}

/* DOCUMENT READY  */
$(document).ready(function() {
	modernize();
	$('.footer_placeholder').height($('.footer').outerHeight());

	oneHeightItems();
});

$(window).load(function(){

    animationBlock($('.animate-section'));

    inputNumber('.calc-form-input');
    inputNumber('.telefone-field');
    inputNumber('.num-field');
    calcForm();
    valueShow();

    fancyInit();
    validate('.call-form-main',{submitFunction:validationCall});

});

$(window).resize(function() {

    $('.footer_placeholder').height($('.footer').outerHeight());
});

$(window).scroll(function(){

    valueShow();

});