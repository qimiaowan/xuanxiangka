(() => {
	/**
	 * 这个是用自带的滚动条  必须要设置延迟体验太差
	 */

init.then(({ oTabs_wrap, oList_wrap }) => {
	const shopTabs = Array.from(oTabs_wrap.children);
	const shopList = Array.from(oList_wrap.children);

	shopTabs[0].classList.add("active");

	const getRect = (elem,style) => elem.getBoundingClientRect()[style]
	const index = (find) => find.indexOf($(".active"));

	const showActive = (elem,firstIndex,lastIndex) => {
		elem[firstIndex].classList.remove("active");
		elem[lastIndex].classList.add("active");
	}

	const getStyle = (elem,style)=>getComputedStyle(elem).getPropertyValue(style)


	const moveHeight = (() => {
		let num = 0;
		return shopList.reduce((prev, elem) => {
			prev.push(num);
			num += (getRect(elem, "height") + 18);
			return prev;
		}, [])
	})();

	const moveActive = (pos) => {
		var j = Math.abs(pos),
			idx = 0;
		for (var k = 0; k <= moveHeight.length; k++) {
				if (Math.max(j, moveHeight[k]) != j) {
					idx = k-1;
					break;
				}
		}
		return idx;
	}

	const ScrollTop = (elem,number = 0, time) => {
    if (!time) {
			elem.scrollTop = number;
			return number;
		}
    const spacingTime = 8; // 设置循环的间隔时间  值越小消耗性能越高
    let spacingInex = time / spacingTime; // 计算循环的次数
		let nowTop = elem.scrollTop; // 获取当前滚动条位置
    let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
    let scrollTimer = setInterval(() => {
        if (spacingInex > 0) {
            spacingInex--;
            ScrollTop(elem,nowTop += everTop);
        } else {
            clearInterval(scrollTimer); // 清除计时器
        }
    }, spacingTime);
};

	oTabs_wrap.onclick = function (ev) {
		let e = ev || window.event,
			tar = e.target || e.srcElement,
			tagName = tar.tagName.toLowerCase();
			if (!tagName=="li") {
				return
		}
		$(".shop_list").onscroll = null;
		let firstIndex = index(shopTabs);
		let tarIndex = shopTabs.indexOf(tar);

		var num = 0;
		for (var i = 0; i < tarIndex; i++){
			num+=(getRect(shopList[i],"height")+18)
		}

		showActive(shopTabs, firstIndex, tarIndex);
		ScrollTop($('.shop_list'),num,200)
	}

	$(".shop_list").ontouchstart = function () {
		$(".shop_list").onscroll = function () {
			var pos = Math.round(getRect(oList_wrap, "top") - 78);
			let firstIndex = index(shopTabs);
			if (pos >= 0) {
				pos = 0;
			} else if (pos - Math.round(-(moveHeight[shopList.length - 1])) < 10) {
				pos = -(moveHeight[shopList.length - 1]);
			}

			let idx = moveActive(pos);
			if (firstIndex != idx) {
				showActive(shopTabs, firstIndex, idx);
			}
	}
}


	//事件 滚动条
	// var timer = null;
// 	$(".shop_list").ontouchstart = function (e) {

// 		clearInterval(timer);

// 		var offsetY = Math.round(getRect(oList_wrap,"top"));


// 	this.ontouchmove = function (e) {
// 		offsetY = Math.round(getRect(oList_wrap,"top")-78);
// 		let idx = moveActive(offsetY);


// 		let firstIndex = index(shopTabs);
// 		if (offsetY - Math.round(-(moveHeight[shopList.length - 1])) < 10) {
// 			idx = shopList.length - 1;
// 		}
// 		showActive(shopTabs, firstIndex, idx);
// 	}

// 	$(".shop_list").ontouchend = function (e) {
// 		clearInterval(timer);

// 		var endPos = Math.round(getRect(oList_wrap, "top") - 78);
// 		// timer = setInterval(() => {
// 		// 	var pos = Math.round(getRect(oList_wrap, "top") - 78);

// 		// 	let firstIndex = index(shopTabs);
// 		// 	if (pos >= 0) {
// 		// 		pos = 0;
// 		// 	} else if (pos - Math.round(-(moveHeight[shopList.length - 1])) < 10) {
// 		// 		pos = -(moveHeight[shopList.length - 1]);
// 		// 	}

// 		// 	let idx = moveActive(pos);

// 		// 	//确实 不相等 我在进行 换class
// 		// 	if (firstIndex != idx) {
// 		// 		showActive(shopTabs, firstIndex, idx);
// 		// 	}

// 		// 	if (Math.round(Math.abs(pos)) == Math.round(Math.abs(endPos))) {
// 		// 		clearInterval(timer);
// 		// 		console.log('end!');
// 		// 	}
// 		// 	endPos = Math.round(getRect(oList_wrap, "top") - 78);
// 		// }, 100);

// 	}
// }


})

})();