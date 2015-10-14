function cssReload(){
	var object={};
	var timer=0;

	// function that generates css links object map;
	initObject();
	function initObject(){

		//running through all css links to generate object map
		$($(document)[0].styleSheets).each(function(){

			//filtering style tag & links without href
			if (typeof this.href!='string') return;
			
			//generate random id for each object;
			var id='id'+Math.floor(Math.random()*(1-1000000)+1000000);

			//making dummie "a" object to get valid css link
			var a=document.createElement('a');
			a.href=this.href;

			//assign id to css link for future access

			$(this.ownerNode).attr('id',id);
			//generate new item in object map
			object[id]={
				link : a.pathname[0]=='/' ? a.pathname.substr(1) : a.pathname,
				lastupdate : 0,
			}
		})
	}

	// function that reloads css file depends on id
	function reloadfile(id){
		//generating random code
		var code=Math.random()+'1';
		code=code.substr(2);
		//making clone of current css link 
		var css=$('#'+id); 	
		var css2=css.clone();
		css2.attr('href','');
		css.after(css2);
		//adding new href with random code to prevent browser cache
		css2.attr('href',object[id].link+'?code='+code);
		//removing old css link wiht little timeout to prevent site from "blinking"
		setTimeout(function(){
			css.remove();
		},100)
	};
	//checking for file changes on server side
	setInterval(function(){
		$.ajax({
			url:'process.php?act=lastmodified',
			type : 'POST',
			data : {
				input : object
			},
			dataType : 'JSON',
			success : function(data){
				$(data).each(function(){
					// reload file if server modify time bigger than last client modify time.
					if (this.time>object[this.id].lastupdate){
						object[this.id].lastupdate=this.time;
						reloadfile(this.id);
					}
				})
			}
		})
	},300)
}
$(document).ready(function(){
	cssReload();
})