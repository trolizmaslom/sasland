<?
	define("__ROOT__",$_SERVER['DOCUMENT_ROOT']);
	function gTab($ii){
		$st='';
		for ($i=0;$i<$ii;$i++)
			$st.="\t";
		return $st;
	}
	function partial($param,$level=0,$first=true){
		if ($first) echo "\n\r";
		if (is_string($param)) $param=array($param);
		foreach($param as $key=>$item){
			if (is_int($key)) $filename=$item;
			else $filename=$key;
			if (@is_file(__ROOT__.'/partials/'.$filename.'.php'))
				include __ROOT__.'/partials/'.$filename.'.php';
			else{
				echo gTab($level).'<div class="'.$filename.' undefinedBlock">'."\n\r";
				if (is_array($item)) partial($item,$level+1,false);
				echo gTab($level).'</div><!--END OF '.$filename.'-->'."\n\r";
			}
		}
	};



	if (!isset($_REQUEST['act']) || $_REQUEST['act']==__ROOT__.'/') $act='none';
	else {
		$act=explode('/',$_REQUEST['act']);
		$act=$act[count($act)-1];
	}

	if ($act=='lastmodified'){
		$responce=array();
		$files=$_REQUEST['input'];
		foreach($files as $key=>$item){
			$lastmodified = filemtime ( __ROOT__.'/'.$item['link']);
			if (time()-$lastmodified<2) array_push($responce, array('id'=>$key,'time'=>$lastmodified));
		}
		echo json_encode($responce);
		exit();
	}

    include 'header.php';
	if ($act=='none') 
	include 'index.php';
	else include $act.'.php';
	include 'footer.php';

?>