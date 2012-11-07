<!DOCTYPE html>
<?php
	session_start();
	function themeRes($img){
		return "theme/" . "default" . "/" . $img;
	}
?>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<!--<link rel="stylesheet" href="css/main.css"/>-->
		<link rel="stylesheet" href="<?php echo themeRes("theme.css") ?>"/>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
		<script type="text/javascript" src="js/app.js"></script>
		<title>phpMCAdmin</title>
	</head>
	<body>
		<?php
		// put your code here
		?>
		<div id="sideWrapper">
			<div id="navSide">
				<img alt="phpMCAdmin" src="<?php echo themeRes("Logo.png") ?>" />
				<div id="nviwrapper">
					<div class="nvmenuItem">
						<img alt="" src="<?php echo themeRes("nav/console.png") ?>" />
						<span class="title">Console</span>
					</div>
					<div class="nvmenuItem selected">
						<img alt="" src="<?php echo themeRes("nav/plugin.png") ?>" />
						<span class="title">Plugins</span>
						<div class="expander">
							<div class="exItem">Test</div>
							<div class="exItem">Test</div>
						</div>
					</div>
				</div>
			</div>
			<div id="notifs">
				
			</div>
		</div>
		
		<div id="mojangStatus" class="status">
			<span jstt="Statuses of Minecraft services.<br/>Login: Required for the client to login to an account<br/>Session: Required for a client to log into a server.<br/>Skin: Provides skin textures. Not required.">Mojang Services:</span>
			<div class="pingobj" jstt="0.233 Seconds">
				<span class="pingstat green"></span>
				Login
			</div>
			<div class="pingobj" jstt="5 Seconds">
				<span class="pingstat yellow"></span>
				Session
			</div>
			<div class="pingobj" jstt="HTTP 503">
				<span class="pingstat red"></span>
				Skin
			</div>
		</div>
		
		<div id="info">
			<h1 id="pageID">Plugins</h1>
			<div id="serverinfo">
				phpMCAdmin 1.5 on <?php echo  $_SERVER['SERVER_NAME'] . ":" . $_SERVER['SERVER_PORT'] . " w/<br/>" . $_SERVER['SERVER_SOFTWARE'] ?><br/>
				<a href="http://creativecommons.org/licenses/by-sa/3.0/" target="_blank">CreativeCommons BY-SA 3.0</a>
			</div>
		</div>
		
		<div id="toolTip">
			<div id="tipcont">
				
			</div>
			<div id="tiparrow" style="position: relative">
				<div id="p1" style="border-left-style: solid; left: 6px; top:100%;"></div>
				<div id="p2" style="border-right-style: solid;"></div>
			</div>
		</div>
	</body>
</html>
