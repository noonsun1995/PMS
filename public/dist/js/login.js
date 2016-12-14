$(document).ready(function () {
	ajax('post', '/user/login', '#login-button', '#login-form', function (data) {
		if(data.status == 'error') {
			alert('用户名或密码错误');
		} else {
			window.location = "/user/home";
		}
	})
	function ajax(action, url, buttonId, formId, callback) {
		$(buttonId).click(function(e) {
			$.ajax({
				method: action,
				url: url,
				data: $(formId).serialize(),
				success: function(data) {
					callback(data);
				}
			})
			e.preventDefault();
		})
	}
})
