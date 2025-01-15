export const pagination = {
	clickable: true,
	renderBullet: function (index: number, className: string) {
		return '<span class="' + className + '"></span>';
	},
};

export const autoplay = {
	delay: 10000,
	disableOnInteraction: false,
};
