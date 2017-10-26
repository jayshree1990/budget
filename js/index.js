 $(function () {
   var bindDatePicker = function() {
		$(".date").datetimepicker({
        format:'YYYY-MM-DD',
			icons: {
				time: "fa fa-clock-o",
				date: "fa fa-calendar",
				up: "fa fa-arrow-up",
				down: "fa fa-arrow-down"
			}
		}).find('input:first').on("blur",function () {
			// check if the date is correct. We can accept dd-mm-yyyy and yyyy-mm-dd.
			// update the format if it's yyyy-mm-dd
			var date = parseDate($(this).val());

			if (! isValidDate(date)) {
				//create date based on momentjs (we have that)
				date = moment().format('YYYY-MM-DD');
			}

			$(this).val(date);
		});
	}
   
   var isValidDate = function(value, format) {
		format = format || false;
		// lets parse the date to the best of our knowledge
		if (format) {
			value = parseDate(value);
		}

		var timestamp = Date.parse(value);

		return isNaN(timestamp) == false;
   }
   
   var parseDate = function(value) {
		var m = value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);
		if (m)
			value = m[5] + '-' + ("00" + m[3]).slice(-2) + '-' + ("00" + m[1]).slice(-2);

		return value;
   }
   
   bindDatePicker();

     //--menu toggle script----//
     $(".menu-toggle").click(function(e) {
         e.preventDefault();
         $(".table").width("100%").removeClass('marginLEFT');
         $("#wrapper-filter").removeClass("toggled");
         $("#wrapper").toggleClass("toggled");
         if($('#wrapper').hasClass("toggled")==true){
             var bsContainerWidth =$( window ).width();
             if (bsContainerWidth == '1440')
                 $(".table").width("69.4%");
             else if(bsContainerWidth == '1520')
                 $(".table").width("74%");
             else {
                 $(".table").width("62%");
             }
             $(".right-sidebar").width("100%");
         }else {
             $(".table").width("100%");
         }
     });

     $("#filter-button").click(function(e) {
         e.preventDefault();
         $("#wrapper").removeClass('toggled');
         $("#wrapper-filter").toggleClass("toggled");
         if($('#wrapper-filter').hasClass("toggled")==true){
             var bsContainerWidth =$( window ).width();
             if (bsContainerWidth == '1440')
                 $(".table").width("68%").addClass('marginLEFT');
             else if(bsContainerWidth == '1520')
                 $(".table").width("70%").addClass('marginLEFT');
             else {
                 $(".table").width("65%").addClass('marginLEFT');
             }
             $(".left-sidebar").width("100%");
         }else {
             $(".table").width("100%").removeClass('marginLEFT');
         }
     });

     //---- Text-Box Enable And Disable Code Starts Here ----
     $("body").delegate(".fromamount", "click", function(){
         $(this).closest('.amount-div').find('.toamount').attr('readonly', true);
         $(this).attr('readonly', false);
     });
     $("body").delegate(".toamount", "click", function(){
         $(this).closest('.amount-div').find('.fromamount').attr('readonly', true);
         $(this).attr('readonly', false);
     });

     function enable() {        //$('#toamount').setAttribute('readonly',false);
         document.getElementById( 'from' ).removeAttribute('readonly');
         document.getElementById( 'toamount' ).setAttribute('readonly',true);    }
     function enableto() {        //$('#from').setAttribute('readonly',false);
         document.getElementById( 'toamount' ).removeAttribute('readonly');
         document.getElementById( 'from' ).setAttribute('readonly',true);    }


 });

