$(function () {
    setMain();

    function setMain() {
        $.ajax({
            url: 'http://157.122.54.189:9090/api/getcategorytitle',
            success: function (data) {
                // console.log(data);
                var html = template('mainData', data);
                // console.log(html);
                $('#main .content').html(html);
                $('#main .content .main-title').click(function(){
                    var index = $(this).index();
                    // console.log(index);
                    var titleid = $(this).attr('data-id')
                    var thisTitle = $(this);
                    // console.log(titleid);
                    $.ajax({
                        url:'http://157.122.54.189:9090/api/getcategory',
                        data:{
                            titleid:titleid
                        },
                        success:function(data){
                            // console.log(data);
                            var html = template('tableData',data);
                            // console.log(html);
                        thisTitle.find('table').html(html);
                            
                        }
                    })
                    $('#main .content .main-body').attr('display','none');
                    $('#main .content .main-body').eq(index).toggle();

                    if($(this).find('i').attr('class') == 'glyphicon glyphicon-menu-down'){
                        $(this).find('i').attr('class','glyphicon glyphicon-menu-up');
                    }else if($(this).find('i').attr('class') == 'glyphicon glyphicon-menu-up'){
                        $(this).find('i').attr('class','glyphicon glyphicon-menu-down');
                    }
                    // console.log($(this).find('i').attr('class'));
                })
            }
        })
    }
})