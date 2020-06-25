(() => {
	init.then(({ oTabs_wrap, oList_wrap }) => {

		const shopTabs = Array.from(oTabs_wrap.children);
		const shopList = Array.from(oList_wrap.children);

		let timer = null;

		const getRect = (elem, style) => elem.getBoundingClientRect()[style]

		const index = (find) => find.indexOf($(".active"))

		const showActive = (elem, firstIndex, lastIndex) => {
			elem[firstIndex].classList.remove("active");
			elem[lastIndex].classList.add("active");
		}

		const moveHeight = (() => {
			let num = 0;
			return shopList.reduce((prev, elem) => {
				prev.push(num);
				num += (getRect(elem, "height") + 18);
				return prev;
			}, [])
		})();

		const cssAdd = (elem, obj) => {
			Object.entries(obj).reduce((prev, [key, value]) => {
				prev.style[key] = value;
				return prev;
			}, elem)
		}

		const getStyle = (elem,style)=>getComputedStyle(elem).getPropertyValue(style)

		const movePos = (elem) => Math.round(parseFloat(getStyle(elem,'transform').substring(7).split(',')[5])) || 0;

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

		//默认第一个 显示active
		showActive(shopTabs, 0, 0);

		//tab的点击事件

		const tabsClick = (tar) => {
			clearInterval(timer);
			let firstIndex = index(shopTabs);
			let tarIndex = shopTabs.indexOf(tar);
			showActive(shopTabs, firstIndex, tarIndex)

			let num = moveHeight[tarIndex];
			cssAdd(oList_wrap, {
				'transition': 'transform .3s linear',
				'transform': `translate3D(0, -${num}px,0)`,
			})
		}

		oTabs_wrap.onclick = function (ev) {
			let e = ev || window.event,
				tar = e.target || e.srcElement,
				tagName = tar.tagName.toLowerCase();

			if (!tagName == "li") {
				return
			}

			tabsClick(tar);
		}

	//事件 滚动条
		$(".shop_list").ontouchstart = function (e) {
			e.preventDefault();

			clearInterval(timer);

			var offsetY = movePos(oList_wrap);
			var pointY = e.touches[0].pageY;
			var startY = offsetY;
			var startTime = new Date().getTime();

			cssAdd(oList_wrap, {
				'transition': 'none',
				'transform': `translate3D(0, ${offsetY}px,0)`,
			})

		this.ontouchmove = function (e) {
			e.preventDefault();

			const deltaY = e.touches[0].pageY - pointY;
			offsetY = Math.round(startY + deltaY);
			if (offsetY >= 0) {
				offsetY = 0;
			} else if (offsetY <= Math.round(-(moveHeight[shopList.length - 1]))) {
				offsetY = -(moveHeight[shopList.length - 1]);
			}

			let idx = moveActive(offsetY);
			let firstIndex = index(shopTabs);
			showActive(shopTabs, firstIndex, idx);

			cssAdd(oList_wrap, {
				'transition':'none',
				'transform': `translate3D(0, ${offsetY}px,0)`,
			})
		}

		$(".shop_list").ontouchend = function (e) {
			e.preventDefault();

			const duration = new Date().getTime() - startTime;
			const deceleration = 0.003;
			const distance = offsetY - startY;
			const speed = 2 * Math.abs(distance) / duration;
			let destination = offsetY + speed / deceleration * (distance < 0 ? -1 : 1);

			if (destination >= 0) {
				destination = 0;
			} else if (destination <= Math.round(-(moveHeight[shopList.length - 1]))) {
				destination = -(moveHeight[shopList.length - 1]);
			}

			let pos = movePos(oList_wrap);

			if (pos==destination) {
				return;
			}

			cssAdd(oList_wrap, {
				'transition':'transform 2s cubic-bezier(0.17, 0.89, 0.45, 1)',
				'transform': `translate3D(0, ${destination}px,0)`,
			})



			clearInterval(timer);
			timer = setInterval(() => {
				var pos = movePos(oList_wrap);
				let firstIndex = index(shopTabs);
				if (pos >= 0) {
					pos = 0;
				} else if (pos <= Math.round(-(moveHeight[shopList.length - 1]))) {
					pos = -(moveHeight[shopList.length - 1]);
				}

				let idx = moveActive(pos);

				//确实 不相等 我在进行 换class
				if (firstIndex != idx) {
					showActive(shopTabs, firstIndex, idx);
				}

				if (Math.round(Math.abs(pos)) == Math.round(Math.abs(destination))) {
					clearInterval(timer);
					console.log('end!');
				}
			}, 0);

		}

	}

})

})();