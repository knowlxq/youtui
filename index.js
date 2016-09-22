window.onload=function(){
	youtui.app.login();
	youtui.app.gosearch();
	youtui.app.navhover();
	youtui.app.getText();
	youtui.app.onMove();
	youtui.app.toBanner();
}
var youtui={};
youtui.tools={};
youtui.tools.getByClass=function(oParent,className){
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	for (var i = 0; i < aEle.length; i++) {
		var arr=aEle[i].className.split(/\s+/);
		for (var j = 0; j < arr.length; j++) {
			if (arr[j]==className) {
				aResult.push(aEle[i]);
				break;
			};
		};
	};
	return aResult;
}
youtui.tools.opacity=function(obj,speed,target,fn){
	if(obj){
		clearInterval(obj.hiddtime);
		speed=parseFloat(getByStyle(obj,'opacity'))>target?-speed:speed;
		obj.hiddtime=setInterval(function(){
			var value=parseFloat(getByStyle(obj,'opacity')*100)+speed;
			if(speed>0&&value>target||speed<0&&value<target){
				value=target;
			}
			obj.style.opacity=value/100;
			if(value==target){
				clearInterval(obj.hiddtime);
				fn&&fn();
			}
		},50)
	}
}
youtui.tools.doMove=function(obj,dir,target,attr,fn){                 //块移动,参数1.移动的对象 2.移动速度  3.总共移动距离  4.移动方向   
			if(obj){

				dir=parseFloat(getByStyle(obj,attr))<target?dir:-dir;
				clearInterval(obj.timer);
				obj.timer=setInterval(function(){

					var speed=parseFloat(getByStyle(obj,attr))+dir;
					
					if(dir>0&&speed>target||dir<0&&speed<target){
						speed=target;
						
					};
					if(attr=='opacity'){

						obj.style[attr]=speed;
					}
					else{

					obj.style[attr]=speed+'px';
					}
					if(speed==target){
						clearInterval(obj.timer);
						fn&&fn();
						
				    }
				},20)
			}
				
		}
function getByStyle(obj,attr){                   //获取属性值 切记  要获取的属性在样式表里是有写的
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
youtui.app={};
youtui.app.login=function(){
	var oTop=document.getElementById('top');
	var oLogin=youtui.tools.getByClass(oTop,'login')[0];
	var oForm=oTop.getElementsByTagName('form')[0];
	oLogin.onclick=function(){
		this.style.display='none';
		oForm.style.display='block';
	}
}
youtui.app.gosearch=function(){
	var oTop=document.getElementById('top');
	var oToptext1=youtui.tools.getByClass(oTop,'text1')[0];
	oToptext1.onclick=function(ev){
		var ev=ev||event;
		this.value='';
		ev.cancelBubble=true;

	}
	document.onclick=function(){
		oToptext1.value='请输入您想看的电影';
	}
}
youtui.app.navhover=function(){
	var oNav=document.getElementById('nav');
	var aDiv=oNav.getElementsByTagName('div');
	var aA=oNav.getElementsByTagName('a');
	for (var i = 0; i < aA.length; i++) {
		aA[i].index=i;
		aA[i].onmouseover=function(){
			youtui.tools.opacity(aDiv[this.index],12,100);
		}
		aA[i].onmouseout=function(){
			youtui.tools.opacity(aDiv[this.index],12,0);
		}
	};
}

youtui.app.getText=function(){
	var oMain=document.getElementById('main');
var aPic=youtui.tools.getByClass(oMain,'pic');
	for (var i = 0; i <aPic.length; i++) {
		aPic[i].index=i;
		var aUptext=youtui.tools.getByClass(aPic[i],'uptext');
		for (var j = 0; j < aUptext.length; j++) {

			var aH4=aUptext[j].getElementsByTagName('h4')[0];
			var aP=aUptext[j].getElementsByTagName('p')[0];
			var aSpan=aUptext[j].getElementsByTagName('span')[0];
			aH4.innerHTML=date[i].list[j].title;
			aP.innerHTML=date[i].list[j].intro;
			aSpan.innerHTML=date[i].list[j].actors;
		};
	};
}
youtui.app.onMove=function(){
	var oMain=document.getElementById('main');
    var aPic=youtui.tools.getByClass(oMain,'pic');
	for (var i = 0; i < aPic.length; i++) {
		var aLi=aPic[i].getElementsByTagName('li');
		for (var j= 0; j< aLi.length; j++) {
			
			aLi[j].onmousemove=function(){
				var oUp=youtui.tools.getByClass(this,'up')[0];
				var oUptext=youtui.tools.getByClass(this,'uptext')[0];
				youtui.tools.doMove(oUp,20,150,'top');
				youtui.tools.doMove(oUptext,20,150,'top');
			}
			aLi[j].onmouseout=function(){
				var oUp=youtui.tools.getByClass(this,'up')[0];
				var oUptext=youtui.tools.getByClass(this,'uptext')[0];
				youtui.tools.doMove(oUp,20,300,'top');
				youtui.tools.doMove(oUptext,20,300,'top');
			}
		};
	};
}
youtui.app.toBanner=function(){
	var oPicTab=document.getElementById('PicTab');
	var oUl=oPicTab.getElementsByTagName('ul')[0];
	var oPages=youtui.tools.getByClass(oPicTab,'pages')[0];
	var aA=oPages.getElementsByTagName('a');
	var n=0;
	var obj=aA[0];
	obj.style.background='#015792';
	oPicTab.timer=setInterval(function(){
		n++;
		if(n==8){
			n=0;
			oUl.style.left=0;
			aA[0].style.background='#015792';
		}
		obj.style.background='#fff';
		aA[n].style.background='#015792';
		obj=aA[n];
		youtui.tools.doMove(oUl,100,-n*oPicTab.offsetWidth,'left');
	},3000)
	for (var i = 0; i < aA.length; i++) {
		aA[i].index=i;
		aA[i].onclick=function(){
			oUl.style.left=-(this.index*oPicTab.offsetWidth)+'px';
			n=this.index;
			this.style.background='#015792';
			obj.style.background='#fff';
			obj=this;
		}
	};
}
