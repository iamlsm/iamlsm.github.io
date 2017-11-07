$(function () {

    setData();

    function setData() {
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }

        //   console.log(getQueryString('id'));

        var categoryid = getQueryString('id');
        var pageId = getQueryString('page');
        // console.log(pageId)

        $.ajax({
            url: 'http://157.122.54.189:9090/api/getproductlist',
            data: {
                categoryid: categoryid,
                pageid: pageId
            },
            success: function (data) {
                // console.log(data);
                var html = template('productData', data)
                // console.log(html);
                $('#product-list ul').html(html);

                var page = Math.ceil(data.totalCount / data.pagesize);
                // console.log(page);
                var pageData = {};
                var pageNum = [];
                for (var i = 1; i <= page; i++) {
                    pageNum[i - 1] = i;
                }
                // console.log(pageNum);
                pageData.pageNum = pageNum;
                pageData.pageAll = page;
                pageData.categoryid = categoryid;
                pageData.pageId = pageId;
                pageData.pageJia = parseInt(pageId) + 1;

                // console.log(pageData);
                var selectHtml = template('pageData', pageData);
                // console.log(selectHtml);
                $('#page ul').html(selectHtml);



                $(document).ready(function () {　　　　
                    $('#pageData').change(function () {　　　　　　
                        //   alert($(this).children('option:selected').val());　　　　　　
                        var p1 = $(this).children('option:selected').val(); //这就是selected的值  
                        　　　　　　
                        window.location.href = "products.html?page=" + p1 + "&id=" + categoryid + ""; //页面跳转并传参  
                        　　　　
                    })
                })
            }
        })
    }
})