$(document).ready(function () {
		$('#submit').click(function() {
			$.post({
				url: '/user/adduser',
				data: $('#form').serialize(),
				success: function(data) {
					if(data == '200'){
						alert('添加成功');
					}
				}
			})
		})
})
