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
                 $(".table").width("64%");
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
     $('#submit_adj').click(function(){
         var remain_balance = document.getElementById("remain_balance").innerHTML;
         var journal_num = 'B003453';
         var transaction_date = $("#transaction_date").val();
         var reason = $("#reason").val();
         $('#budget').find('.table').append('<tr><td>'+journal_num+'</td><td>'+transaction_date+'</td><td>'+reason+'</td><td> '+ remain_balance +'</td><td><button type="button" class="btn btn-success">Complete</button></td></tr>');
         $(".my_cost_tab").removeClass('active');
         $(".badge_adj_tab").addClass('active');
         $('.budget_row').focus();
     });
     $('#save_draft').click(function(){
         var remain_balance = document.getElementById("remain_balance").innerHTML;
         var journal_num = 'B003453';
         var transaction_date = $("#transaction_date").val();
         var reason = $("#reason").val();
         $('#budget').find('.table').append('<tr><td></td><td>'+transaction_date+'</td><td>'+reason+'</td><td> '+ remain_balance +'</td><td><button type="button" class="btn btn-warning">Draft</button></td></tr>');
         $(".my_cost_tab").removeClass('active');
         $(".badge_adj_tab").addClass('active');


     });

     $('#right_bar').click(function(){
         $('#wrapper').removeClass('toggled');
         $('.table').width('100%');
     });

     $('#left_bar').click(function(){
         $('#wrapper-filter').removeClass('toggled');
         $('.table').width('100%').removeClass('marginLEFT');
     });


     //---- Text-Box Enable And Disable Code Starts Here ----
     // $("body").delegate(".fromamount", "click", function(){
     //     $(this).closest('.amount-div').find('.toamount').attr('readonly', true);
     //     $(this).attr('readonly', false);
     // });
     // $("body").delegate(".toamount", "click", function(){
     //     $(this).closest('.amount-div').find('.fromamount').attr('readonly', true);
     //     $(this).attr('readonly', false);
     // });

     // function enable() {        //$('#toamount').setAttribute('readonly',false);
     //     document.getElementById( 'from' ).removeAttribute('readonly');
     //     document.getElementById( 'toamount' ).setAttribute('readonly',true);    }
     // function enableto() {        //$('#from').setAttribute('readonly',false);
     //     document.getElementById( 'toamount' ).removeAttribute('readonly');
     //     document.getElementById( 'from' ).setAttribute('readonly',true);    }


     /* add jquery for budget dynamic */
     $('#fromaccount').on('change',function () {
         if($('#fromaccount_one').val() != '') {
             $('.step-two-account-one').html('');
         }
     });
     $('.fromaccount_second').on('change',function () {
         if($('#fromaccount_second').val() != '') {
             $('.step-two-account-two').html('');
         }
     });
     $('.fromamount').on('change',function () {
         if($('.fromamount').val() != '') {
             $('.step-two-amount-one').html('');
         }
     });
     $('.toamount').on('change',function () {
         if($('.toamount').val() != '') {
             $('.step-two-amount-one').html('');
         }
     });

     $("#second_next").click(function(){
         var flag_two = 0;
         if($(".fromaccount_one").val() == '' ) {
             flag_two = 1;
             $('.step-two-account-one').html('This Field Is Required').css({'color': 'red'});
         }
         if($(".fromamount").val() == '' && $(".toamount").val() == ''){
             flag_two = 1;
             $('.step-two-amount-one').html('This Field Is Required').css({'color': 'red'});
         }
         if($(".fromaccount_second").val() == '' ) {
             flag_two = 1;
             $('.step-two-account-two').html('This Field Is Required').css({'color': 'red'});
         }
         if($(".fromaccountloop").val() == '' ) {
             flag_two = 1;
             $('.step-two-account-loop').html('This Field Is Required').css({'color': 'red'});
         }

         if(flag_two == 1)
         {
             return false;
         }
         else {
             var fromaccount1 = $("#fromaccount").val();
             var fromamount1 = $(".fromamount").val();
             if (fromamount1 != '') {
                 $(".first_account").html(fromaccount1);
                 $(".first_amount").html("$" + fromamount1);
                 $(".total_bal").html("$" + fromamount1);
                 $(".first_to_account").html($(".fromaccount_second").val());
                 $(".first_to_amount").html("$" + $("#toamount_second").val());
                 $(".total_to_bal").html("$" + fromamount1);
                 $(".fromaccountloop").each(function () {
                     var amount_value = "$" + $("#toamount_second").val();
                     var amount_name = $(this).val();
                     var html_for_add = "<div class='from-cost-center'><p class='second_to_account'>" + amount_name + "</p><b><p class='second_to_amount'>" + amount_value + "</p></b></div>";
                     $('#append_name_value').append(html_for_add);
                 });
             }

             var toamount1 = $(".toamount").val();
             var toamount2 = $("#fromamount_second").val();
             if (toamount1 != '') {
                 $(".first_to_account").html(fromaccount1);
                 $(".first_to_amount").html("$" + toamount1);
                 $(".total_to_bal").html("$" + toamount1);
                 $(".first_account").html($(".fromaccount_second").val());
                 $(".first_amount").html("$" + toamount2);
                 $(".total_bal").html("$" + toamount1);

                 $(".fromaccountloop").each(function () {
                     var amount_value = "$" + $("#fromamount_second").val();
                     var amount_name = $(this).val();
                     var html_for_add = "<div class='from-cost-center'><p class='first_from_amount'>" + amount_name + "</p><b><p class='first_from_account'>" + amount_value + "</p></b></div>";
                     $('#append_name_value_from').append(html_for_add);
                 });

             }
         }
     });
     /* On First Click Code Starts Here */
     $('#datetimepicker').on('change',function () {
         if($('#transaction_date').val() != '') {
             $('.step-one-date').html('');
         }
     });
     $('#initiator').on('keyup',function () {
         if($('#initiator').val() != '') {
             $('.step-one-initiator').html('');
         }
     });
     $('#reason').on('keyup',function () {
         if($('#reason').val() != '') {
             $('.step-one-reason').html('');
         }
     });
     $("#first_next").click(function () {
         var flag = 0;
         if(($("#transaction_date").val() == ''))
         {
             flag = 1;
             $('.step-one-date').html('Please Select Date').css({'color': 'red'});
         }
         if(($("#initiator").val() == ''))
         {
             flag = 1;
             $('.step-one-initiator').html('This Field Is Required').css({'color' : 'red'});
         }
         if(($("#reason").val() == ''))
         {
             flag = 1;
             $('.step-one-reason').html('This Field Is Required').css({'color' : 'red'});
         }
         if(flag ==1)
         {
             return false;
         }
         else {
             $(".transcation_date_text").html($("#transaction_date").val());
             $(".initiator_text").html($("#initiator").val());
             var reason  = $("#reason").val();
             if(reason == ''){
                 $(".reason_label").hide();
             }
             else{
                 $(".reason_text").html($("#reason").val());
             }

         }
     });

     /*  START add for disable enable from and to */
     $( "#from" ).focus(function() {
         $('#fromamount_second').prop('disabled', true);
         $('#toamount').prop('disabled',true);
         $('.total_to_text').hide();
         $(".fromamountloop").prop('disabled',true);
     });
     $("#toamount").focus(function(){
         $('#toamount_second').prop('disabled', true);
         $('#from').prop('disabled',true);
         $('.total_from_text').hide();
         $(".toamountloop").prop('disabled',true);
          $(".total_to_text").css({ "float": "none"});
     });
     /*  End budget dynamic */

 });
