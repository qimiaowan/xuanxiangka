(() => {
	const oTabs = $(".tabs"),
  oPg = $(".pg"),
  oMain = $(".main"),
  oCor = $(".cor");

const tabItem = Array.from(oTabs.children);

const cssAdd = (elem, obj) => {
	Object.entries(obj).reduce((prev,[key,value]) => {
		prev.style[key] = value;
		return prev;
	},elem)
}

const reset = node => node.style = ''

const index = (find) => find.indexOf($(".tab_active"))

const getRect = (elem,style) => elem.getBoundingClientRect()[style]

const showActive = (elem,firstIndex,lastIndex) => {
	elem[firstIndex].classList.remove("tab_active");
	elem[lastIndex].classList.add("tab_active");
}

const itemsClick = (tar) => {
	let firstIndex = index(tabItem);
	let tarIndex = tabItem.indexOf(tar);

	showActive(tabItem,firstIndex,tarIndex);

	cssAdd(oPg, {
		"left": getRect(oPg, "width") * tarIndex + "px"
	});

	cssAdd(oCor, {
		"left": -(getRect(oMain, "width") * tarIndex) + "px"
	});

}

oTabs.onclick = function (ev) {
	let e = ev || window.event,
			tar = e.target || e.srcElement;
	if (!tar.classList.contains("tab_item")) {
		return
	}
	itemsClick(tar);
}

})();