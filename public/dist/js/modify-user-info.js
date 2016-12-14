$(document).ready(function () {
	$.get({
		url: '/user/modify-user-info/set-default-data',
		success :function (data) {
			setDefaultData(data);
		}
	});
	$('#basic-info-button').click(function (e) {
		$.post({
			url: '/user/modify-user-info/basic-info',
			data: $('#basic-info-form').serialize(),
			success: function (data) {
				if(data.status == 'success') {
					alert('个人信息修改成功');
					window.location = '/user/modify-user-info';
				} else {
					alert('个人信息修改失败');
				}
			}
		});
		e.preventDefault();
	});
	$('#secure-info-button').click(function (e) {
		var newPwd = $('#u_new_password').val();
		var repeatPwd = $('#u_repeat_password').val();
		if(newPwd == repeatPwd){
			$.post({
				url: '/user/modify-user-info/secure-info',
				data: $('#secure-info-form').serialize(),
				success: function (data) {
					if(data.status == 'success') {
						alert('密码修改成功');
						window.location = '/user/modify-user-info';
					} else {
						alert('密码错误');
					}
				}
			})
		} else {
			alert('新密码输入不一致')
		}
			e.preventDefault();
	})
})
function setDefaultData(data) {
	for(var key in data){
		$('#' + key).val(data[key]);
	}
}
