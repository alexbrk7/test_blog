<?php
//symlink('/var/www/kinaio/app/storage/app/public', '/var/www/kinaio/kinai.com.ua');
//symlink('/banzai.devfabrika.ru/public_html/storage/app/public', '/banzai.devfabrika.ru/public_html');
//echo 'Ok';
$target =$_SERVER['DOCUMENT_ROOT'].'/storage/app/public';
$link = $_SERVER['DOCUMENT_ROOT'].'/public/storage';
echo $target;
echo $link; 
symlink($target, $link);
echo "Done";
?>
