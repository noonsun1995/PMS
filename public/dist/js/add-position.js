$(document).ready(function () {
	ajax('post', '/user/admin/add-position', '#add-position-button', '#add-position-form', function (data) {
		if(data.status == 'success') {
			alert('添加成功');
			window.location = "/user/admin/add-position";
		} else {
			alert('添加失败');
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
