//rwd_check.js

(function($){
	const conBox = $('#conBox');


	//각 디바이스별 크기 기준 설정
	let mobile=480, tablet=768, laptop=1366, pc=1600;
	//기본 디바이스 명칭 설정
	let nowSize;
	const device = ['mobile','tablet','laptop','pc','pcfull'];
	let beforeW = $(window).outerWidth(true); //마진값까지 포함한 값

	//===== 각 디바이스 상황에 맞는 data 처리
	const DeviceData = function(wid){
		switch(wid){
			case device[0]:
			 conBox.load('./temp/main_mob.html');
			break;
			case device[1]:
			 conBox.load('./temp/main_tab.html');
			 $('body').append('<script src="../js/tab.js"></script>');
			break;
			case device[2]:
			// break;
			case device[3]:
			// break;
			case device[4]:
			 conBox.load('./temp/main_pc.html',function(){
			 	$('head').find('title').before('<link rel="stylesheet" href="../css/pc.css">');
			 	$('body').append('<script>console.log("pc");</script>');
			 });
			break;
		}
	};
	//=========================

	//디바이스 크기 체크
	const DeviceSet = function(winW){
	 if(winW <= mobile){
	 	nowSize = device[0];
	 }else if(winW > mobile && winW <= tablet){
	 	nowSize = device[1];
	 }else if(winW > tablet && winW <=laptop){
	 	nowSize = device[2];
	 }else if(winW > laptop && winW <= pc){
	 	nowSize = device[3];
	 }else{
	 	nowSize = device[4];}
	 return nowSize;
	}
	let beforeDevice = DeviceSet(beforeW);
  
  DeviceData(beforeDevice);

	console.log(navigator.userAgent); //인터넷브라우저 종류 검색
	//인터넷브라우저 종류를 검색해서 소문자로 나타내라
	let browser = navigator.userAgent.toLowerCase();
	//인터넷브라우저 종류에 firefox라는 단어가 나오지 않으면
	//파이어폭스인가 아닌가 판단 ================
	let nowb = null;

	if(browser.indexOf('firefox') !== -1){
		nowb = 'firefox';
	}else{
		nowb = 'other';
	}
	console.log(nowb);

	//사이즈 변경 체크
	$(window).on('resize',function(){
		let afterW = $(window).outerWidth(true);
		let afterDevice = DeviceSet(afterW);
		console.log(nowSize);
		if(beforeDevice !== afterDevice){
		if(nowb == 'firefox'){
			window.location = window.location; //강제 새로고침
		}else{
			location.reload();}
		}
	});
})(jQuery);