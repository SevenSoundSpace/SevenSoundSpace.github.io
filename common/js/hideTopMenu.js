/*----------------------------------------------------------------------------*/
// スクロールすると出たり消えたりするTopMenu（Menuがfixedの時のみ）
// ついでにTopMenuが次要素に干渉しないよう、padding-topで調整する
// Copyright (c) 2016 七音@7sounD All Rights Reserved.
/*----------------------------------------------------------------------------*/
$(function(){
	var hideElement = "header";	// 隠す対象の要素名
	var hideMarginTop = parseInt($(hideElement).css('margin-top'), 10);	// margin-top取得
	var hidePaddingTop = parseInt($(hideElement).css('padding-top'), 10);	// padding-top取得
	var hidePaddingBottom = parseInt($(hideElement).css('padding-bottom'), 10);	// padding-bottom取得
	var hideHeight = $(hideElement).height() + hideMarginTop + hidePaddingTop + hidePaddingBottom;	// TopMenuの総高

	var startPos = hideHeight;	// 隠し始めるスクロール位置
	var currentPos = 0;	// 現在位置

	$("main, section").css("padding-top", hideHeight + "px");	// TopMenuの次要素の開始位置を調整する

	// スクロール時
	$(window).scroll(function(){
		if($(hideElement).css("position") == "fixed"){

			// 下向きスクロール
			if(currentPos < $(this).scrollTop()){
				currentPos = $(this).scrollTop();	// まずは現在位置を更新
				// 現在位置が、startPosを超えていたら隠す
				if(startPos < currentPos){
					if($(window).scrollTop() > 0){
						$(hideElement).css("top", "-" + hideHeight + "px");
					}
				}

			// スクロール値が前回と同じなら何もしない　※IE対策
			}else if(currentPos == $(this).scrollTop()){

			// 上向きスクロールでは、必ずメニューを表示
			}else{
				currentPos = $(this).scrollTop();
				$(hideElement).css("top", 0 + "px");
			}
		}
	});

	// レスポンシブデザインなどwindowリサイズ時にヘッダー高が変わる場合のケア
	// リサイズ操作が終わったときだけ処理する
	var timer = false;
	$(window).resize(function(){
		if(timer !== false){
			clearTimeout(timer);
		}
		timer = setTimeout(function(){
			// 実処理
			hideMarginTop = parseInt($(hideElement).css('margin-top'), 10);	// margin-top再取得
			hidePaddingTop = parseInt($(hideElement).css('padding-top'), 10);	// padding-top再取得
			hidePaddingBottom = parseInt($(hideElement).css('padding-bottom'), 10);	// padding-bottom再取得
			hideHeight = $(hideElement).height() + hideMarginTop + hidePaddingTop + hidePaddingBottom;	// 総高を再計算
			$("main, section").css("padding-top", hideHeight + "px");
		}, 500);	// 処理タイミングはリサイズ終了の500ms後
	});
});
