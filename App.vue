<script>
	import {
		mapMutations
	} from 'vuex';
	import Api from '@/common/api';
	export default {
		onLaunch: function() {
			// Check if the device is in landscape orientation
			const isLandscape = window.matchMedia('(orientation: landscape)').matches || (window.innerWidth > window.innerHeight);
			let ddd = window.orientation
			// Check if the current page is a mobile H5 page
			const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator
				.userAgent);
			// Check if the screen width is less than or equal to 768px
			const isScreenWidthLessThan768 = window.innerWidth >= 768;
			// debugger
			// If all conditions are true, add styles
			if (isLandscape && isMobile && isScreenWidthLessThan768) {
				const divElement = document.createElement('div');
				divElement.className = 'not-hn1';
				divElement.id = 'setheng';
				divElement.innerHTML = '请翻转屏幕';
				document.body.appendChild(divElement);
			}

			// Add event listener to detect orientation changes
			window.addEventListener('orientationchange', function() {
				const isLandscape = window.matchMedia('(orientation: landscape)').matches || (window.innerWidth > window.innerHeight);
				const isScreenWidthLessThan768 = window.innerWidth >= 768;
				if (isLandscape && isMobile && isScreenWidthLessThan768) {
					const divElement = document.createElement('div');
					divElement.className = 'not-hn1';
					divElement.id = 'setheng';
					divElement.innerHTML = '请翻转屏幕';
					document.body.appendChild(divElement);
					window.location.reload()
				} else {
					const divElement = document.getElementById('setheng');
					if (divElement) {
						divElement.remove();
					}
					window.location.reload()
				}
			});

		},
		onShow: function() {

		},
		onHide: function() {},
		data: {},
		methods: {

		}
	}
</script>
<style>
	page {
		width: 100vw;
		height: 100%;
	}
</style>
<style lang="scss">
	@import 'uview-ui/index.scss';
	@import 'static/style/index.scss';
	@import 'colorui/main.css';
	@import 'colorui/icon.css';
	@import 'components/u-parse/u-parse.css';

	.not-hn {
		display: none;
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0%;
		top: 0%;
		z-index: 999999;
	}

	.not-hn1 {
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0%;
		top: 0%;
		z-index: 999999;
		display: block !important;
		background: #999 !important;
	}
</style>