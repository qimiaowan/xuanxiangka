(() => {
	const oTabs_wrap = $(".tabs_wrap"),
			oList_wrap = $(".list_wrap");

	const j_html = $("#j_html").innerHTML;

	const dataGoods = data.goods; //数据

	const appendPad = (obj,key,html) => {
		var oUl = document.createElement("ul");
				obj[key].forEach(obj1 => {
					oUl.innerHTML += html.replace(/{{(.*?)}}/g, (node, key) => {
						return obj1[key];
					});
				})
		return oUl;
	}

	const appendElem = (elem, data,key) => {
		let fram = document.createDocumentFragment();
		data.forEach((obj,index) => {
			var oLi = document.createElement("li");
			switch (key) {
				case "foods":
					var oUl = appendPad(obj, key,j_html);
					oUl.dataset.num = index;
					oLi.appendChild(oUl);
					break;
				case "name":
					oLi.innerHTML = obj[key];
					break;
				default:
					break;
			}
			fram.appendChild(oLi);
		})
		elem.appendChild(fram);
	}

	const init = () => {
		return new Promise((resolve, reject) => {
			appendElem(oTabs_wrap, dataGoods,"name");
			appendElem(oList_wrap, dataGoods, "foods");
			resolve({oTabs_wrap,oList_wrap});
		})
	}

	window.init = init();
})();