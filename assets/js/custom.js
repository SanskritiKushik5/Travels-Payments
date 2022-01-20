$(document).ready(function () {
	
	var path = window.location.pathname;//WILL GET THE CURRENT URL
	var page = path.split("/").pop();//SPLIT THE / FROM THE URL AND GET THE PAGE NAME
	console.log( page );
	if(page=="index.php" || page==""){
		$(".hero-slider").slick({
		arrows: true,
		autoplay:true,
		autoplaySpeed: 3000,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	});
		getArtilePage(1,'');//THIS IS CALLED TO GET THE BLOG FROM THE WORDPRESS FOR HOME PAGE
	}
	else if(page=="travel.php"){
		$(".hero-slider").slick({
		arrows: true,
		infinite: true,
		autoplay:true,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		slidesToScroll: 1,
	});
		getArtilePage(1,2);//THIS IS CALLED TO GET THE BLOG FROM THE WORDPRESS FOR TRAVEL PAGE
	}
	else if(page=="payments.php"){
		getArtilePage(1,4);//THIS IS CALLED TO GET THE BLOG FROM THE WORDPRESS FOR PAYMENT EXPLAINER SECTION
		getArtilePage(1,6);//THIS IS CALLED TO GET THE BLOG FROM THE WORDPRESS FOR OPINION AND ATICLER SECTION
	}
});

//THIS IS THE FUNCTION CALLED WHEN BUTTON IN THE CONTACT FORM IS CLICKED
$("#btnSubmitContact").on("click",function(){
	if($.trim($("#txtName").val())==""){
		alert("Please Enter Name");
	}
	else if($.trim($("#txtEmail").val())==""){
		alert("Please Enter Email");
	}
	else if(ValidateEmail($.trim($("#txtEmail").val()))==false){
		alert("Please Enter Valid Email");
	}
	/*else if($.trim($("#txtPhone").val())==""){
		alert("Please Enter Phone");
	}*/
	else if($.trim($("#txtMessage").val())==""){
		alert("Please Enter Message");
	}
	else{
		$.ajax({
			type:"POST",
			url:"https://travelandpayments.com/sendMail.php",
			dataType:"json",
			data:{name:$.trim($("#txtName").val()),email:$.trim($("#txtEmail").val()),message:$.trim($("#txtMessage").val())},
			success:function(response){
				$("#txtName").val("");
				$("#txtEmail").val("");
				//$("#txtPhone").val("");
				$("#txtMessage").val("");
				if(response["success"]=="1"){
					
					alert(response["message"]);
				}
				else{
					alert(response["message"]);
				}
			}
		});
	}
});

//THIS IS THE FUNCTION IS TO CHECK WHETHER THE USER IS INPUTTING ONLY NUMBER
function isNumber(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}
//THIS IS THE FUNCTION IS TO VALIDATES EMAIL
function ValidateEmail(mail){
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
		return true;
	}
	else{
		return false;
	}
}
//THIS IS THE FUNCTION CALLED WHEN BUTTON IN THE NEWSLETTER FORM IS CLICKED
$("#btnSignUpNewsLetter").on("click",function(){
	if($.trim($("#txtNewsLetterSignup").val())==""){
		alert("Please Enter Email");
	}
	else if(ValidateEmail($.trim($("#txtNewsLetterSignup").val()))==false){
		alert("Please Enter Valid Email");
	}
	else{
		$.ajax({
			type:"POST",
			url:"https://travelandpayments.com/signUpNewsLetter.php",
			dataType:"json",
			data:{email:$.trim($("#txtNewsLetterSignup").val())},
			success:function(response){
				$("#txtNewsLetterSignup").val("");
				if(response["success"]=="1"){
					alert(response["message"]);
				}
				else{
					alert(response["message"]);
				}
			}
		});
	}
});
//THIS IS THE FUNCTION CALLED WHEN HOME PAGE AND TRAVEL PAGE IS loaded
//TWO PARAMETER PAGE NO AND CAT_ID-PAGE NO IS WHICH PAGE WE NEED WHEN CLICKED ON PAGINATION AND BY DEFAULT 1
//CAT_ID IS THE CATEGORY ID OF THE BLOG. 
function getArtilePage(pageno,cat_id){
	//Page Index - 0 is Index and Travel Page
	//1 is Payment Page
	console.log(cat_id);
	if(cat_id==2 || cat_id==""){
		//IN OUR CASE IT WILL ALWAYS BE ID OF TRAVEL BLOG AND CAN ALSO BE BLANK WHEN WE NEED TO FETCH ALL THE BLOG ON HOME PAGE
		$.ajax({
			type:"POST",
			url:"getArticlePageWise.php",
			data:{page_no:pageno,category_id:cat_id},
			success:function(response){
				console.log(response);
				$("#articleDiv").html(response);
			}
		});
	}
	else if(cat_id==4){
		//THIS IS TO FETCH ALL THE EXPLAINER BLOG
		$.ajax({
			type:"POST",
			url:"getArticlePaymentExplainer.php",
			data:{page_no:pageno,category_id:cat_id},
			success:function(response){
				console.log(response);
				$("#explainerDiv").html(response);
			}
		});
	}
	else{
		//THIS IS TO FETCH ALL THE ARTICLES AND OPINION BLOG
		$.ajax({
			type:"POST",
			url:"getArticlePaymentOpinion.php",
			data:{page_no:pageno,category_id:cat_id},
			success:function(response){
				console.log(response);
				$("#opinionDiv").html(response);
			}
		});
	}
	
}