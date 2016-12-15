$(document).ready(function (){
	$('#edit-button').click(function (e) {
		$.post({
			url: '/user/overview/edit',
			data: $('#edit-form').serialize(),
			success: function (data) {
				if(data.status == 'success') {
					alert('修改信息成功');
					window.location = '/user/overview/users';
				} else {
					alert('修改信息失败');
				}
			}
		})
		e.preventDefault();
	})

})
