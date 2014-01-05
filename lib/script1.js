/** 
* @license captureweb - v0.0.4
* (c) 2013 Julien VALERY https://github.com/darul75/starter-aws
* License: MIT 
**/
var page=require("webpage").create(),args=require("system").args,url=args[1],filename=args[2],viewportSize=args[3],viewportRect=args[4];viewportSize&&(page.viewportSize={width:viewportSize.split("x")[0],height:viewportSize.split("x")[1]}),viewportRect&&(page.clipRect={top:viewportRect.split(",")[0],left:viewportRect.split(",")[1],width:viewportRect.split(",")[2],height:viewportRect.split(",")[3]}),page.settings.userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36",page.open(url,function(a){if("success"!==a)throw"Unable to load";window.setTimeout(function(){},3e3)}),page.onConsoleMessage=function(){},page.onConfirm=function(){},page.onPrompt=function(){},page.onError=function(){},page.onLoadFinished=function(){window.setTimeout(function(){page.render(filename),phantom.exit()},3e3)};