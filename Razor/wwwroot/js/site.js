// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
//线程安全的ajax 
//线程池，控制同一时间内，不存在发送到同一页面的http请求 
//若是不同页面的请求则允许并发。 
//注：传统的js只支持串行运算。目前，扩展至并行运算的特性尚在初步阶段，并未推广普及。 
var Ajaxs = new Array(); 
///Ajax对象 
function Ajax(waitId) { 
    //创建对象 
    var aj = new Object(); 
    //属性初始化 
    aj.waitId = waitId ? document.getElementById(waitId) : null; //显示等待信息的页面元素句柄 
    aj.targetUrl = ''; //请求页面的目标路径 
    aj.sendString = ''; //发送的消息 
    aj.resultHandle = null; //返回结果处理函数的句柄 
    aj.loading = "<span class='wait'>Loading...</span>"; //等待中消息 
     
    //定义创建xmlHttpRequest对象的方法 
    aj.createXMLHttpRequest = function () { 
        var request = false; 
        if (window.XMLHttpRequest) { //对于 IE7+, Firefox, Chrome, Opera, Safari 
            request = new XMLHttpRequest(); 
            //针对某些特定版本的mozillar浏览器的BUG进行修正 
            if (request.overrideMimeType) 
                request.overrideMimeType('text/xml'); 
        } else if (window.ActiveXObject) { //对于IE5，IE5.5，IE6 
            //依次尝试可以创建XMLHttpRequest对象的控件 
            var versions = [ 
                'Microsoft.XMLHTTP', 
                'MSXML.XMLHTTP', 
                'Microsoft.XMLHTTP', 
                'Msxml2.XMLHTTP.7.0', 
                'Msxml2.XMLHTTP.6.0', 
                'Msxml2.XMLHTTP.5.0', 
                'Msxml2.XMLHTTP.4.0', 
                'MSXML2.XMLHTTP.3.0', 
                'MSXML2.XMLHTTP' 
            ]; 
            for (var i = 0; i < versions.length; i++) { 
                try { 
                    request = new ActiveXObject(versions[i]); 
                    if (request) 
                        return request; 
                } catch (e) { 
                    //alert(e.message);调试时可以查看异常 
                    alert("Your browser is not supported AJAX!"); //无法创建对象 
                } 
            } 
        } 
        return request; 
    } 
     
    aj.request = aj.createXMLHttpRequest(); //创建对象实例 
     
    //如果有显示等待状态的元素 
    if (aj.waitId) { 
        aj.waitId.orgdisplay = aj.waitId.style.display; //保存原有的是否可见状态 
        aj.waitId.style.display = ''; //设置为可见状态 
        aj.waitId.innerHTML = aj.loading; //设置为等待中 
    } 
     
    //定义线程控制方法 
    aj.processHandle = function () { 
        if (aj.request.readyState == 4 && aj.request.status == 200) { //返回一个正确的响应 
            for (k in Ajaxs) { //请求到该页面的线程置空 
                if (Ajaxs[k] == aj.targetUrl) 
                    Ajaxs[k] = null; 
            } 
            if (aj.waitId) { //若存在显示等待状态的元素句柄，则设置为处理结束的状态 
                aj.waitId.style.display = 'none'; //取消可见 
                aj.waitId.style.display = aj.waitId.orgdisplay; //恢复原来的可见状态 
            } 
            //以XML方式接收 
            //aj.resultHandle(aj.request.responseXML.lastChild.firstChild.nodeValue); 
            //以文本流方式接收 
            aj.resultHandle.innerHTML = aj.request.responseText; 
        } 
    } 
     
    //get方式发送消息 
    aj.get = function (targetUrl, resultHandle) { 
        //若队列中存在请求到该页面的线程，则拒绝新的操作，否则压入队列 
        for (k in Ajaxs) 
            if (k == targetUrl) 
                return false; 
        Ajaxs.push(targetUrl); 
        //设置请求的页面 
        aj.targetUrl = targetUrl; 
        //绑定回调函数 
        aj.request.onreadystatechange = aj.processHandle; 
        //绑定显示结果的方法 
        aj.resultHandle = resultHandle; 
        //发送消息 
        if (window.XMLHttpRequest) { 
            aj.request.open('GET', aj.targetUrl); 
            aj.request.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
            aj.request.send(null); 
        } else { 
            aj.request.open("GET", targetUrl, true); 
            aj.request.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
            aj.request.send(); 
        } 
    } 
     
    //post方式发送消息 
    aj.post = function (targetUrl, sendString, resultHandle) { 
        //设置要请求的页面 
        aj.targetUrl = targetUrl; 
        //设置发送的内容 
        aj.sendString = sendString; 
        //设置回调函数 
        aj.request.onreadystatechange = aj.processHandle; 
        //设置返回结果处理函数句柄 
        aj.resultHandle = resultHandle; 
        //开始发送消息 
        aj.request.open('POST', targetUrl); 
        //发送HTTP报头 
        aj.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
        aj.request.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
        //发送数据 
        aj.request.send(aj.sendString); 
    } 
    return aj; 
} 
  



$(window).ready(function () {
    var holidays = [
        "2018年1月01日",
        "2018年1月08日",
        "2018年2月11日",
        "2018年2月12日",
        "2018年3月21日",
        "2018年4月29日",
        "2018年4月30日",
        "2018年5月03日",
        "2018年5月04日",
        "2018年5月05日",
        "2018年7月16日",
        "2018年8月11日",
        "2018年9月17日",
        "2018年9月23日",
        "2018年9月24日",
        "2018年10月08日",
        "2018年11月03日",
        "2018年11月23日",
        "2018年12月23日",
        "2018年12月24日",
    ];
    // 时间范围
    $('#calender-container .date').datepicker({
        language: "ja", // 启用日语界面
        todayBtn: true, // 显示今天
        calendarWeeks: false, // 显示周
        todayHighlight: true, // 高亮显示今天
        immediateUpdates: true, // 切换年月时，即时更新
        autoclose: true, // 选择日期后，自动关闭
        daysOfWeekHighlighted: [0, 6], // 日曜日と土曜日
        format: 'yyyy年mm月dd日', // 日期格式
        beforeShowDay: function (date) {　// 处理祝日，休日
            var d = date;
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1; //Months are zero based
            var curr_year = d.getFullYear();
            var formattedDate = curr_year + "年" + curr_month + "月" + curr_date + "日";

            if ($.inArray(formattedDate, holidays) != -1) {
                return {
                    classes: 'holiday'
                };
            }
            return;
        }
    });

    var first_open = true;
    // 打开弹框时自动调整高度
    $('#myModal').on('show.bs.modal', function () {
       // $('.modal .modal-body').css('overflow-y', 'auto');
       // $('.modal .modal-body').css('max-height', $(window).height() * 0.7);
    }).on('shown.bs.modal', function () {
        if (first_open) {
            // 表格绑定
            $('#bank-list').bootstrapTable({
                url: '/api/Bank/List/',             //请求后台的URL（*）
                method: 'get',                      //请求方式（*）
                toolbar: '#toolbar',                //工具按钮用哪个容器
                striped: true,                      //是否显示行间隔色
                zIndexOffset: 2000,                 // 深度
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortable: true,                     //是否启用排序
                sortOrder: "asc",                   //排序方式
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1,                       //初始化加载第一页，默认第一页
                pageSize: 10,                       //每页的记录行数（*）
                pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
                search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                strictSearch: true,
                showColumns: true,                  //是否显示所有的列
                showRefresh: true,                  //是否显示刷新按钮
                minimumCountColumns: 2,             //最少允许的列数
                clickToSelect: true,                //是否启用点击选中行
                height: $(window).height() * 0.6,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: "id",                     //每一行的唯一标识，一般为主键列
                showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
                cardView: false,                    //是否显示详细视图
                detailView: false,                   //是否显示父子表
                locale: 'ja_JP',                     // 日语
                columns: [{                          // 表头
                    field: 'bankCode',
                    title: '金融機関コード',
                    sortable: true,
                    formatter: function (value, row, index) { // 我数据库里的金融机关号不够4位数
                        return ("0000" + value).substr(value.length); // 前面添加0
                    }
                }, {
                    field: 'name',
                    title: '金融機関名',
                }, {
                    field: 'furigana',
                    title: 'フリガナ'
                }],
                queryParams: function (params) { // params是bootstrap-table用的参数
                    var temp = { // temp是传给服务器的参数
                        rows: params.limit,                         //页面大小
                        page: (params.offset / params.limit) + 1,   //页码
                        sort: params.sort,                          //排序列名  
                        sortOrder: params.order,                    //排位命令（desc，asc）
                        search: params.search                       //搜索关键字
                    };
                    return temp;
                },
                onLoadError: function () {
                    showTips("読み込み失敗！");
                }
            }).on('click-row.bs.table', function (e, row, $element) { // 点击某一行时
                // 变色
                $('#bank-list .success').removeClass('success');
                $($element).addClass('success');
                // 数据填到输入框去
                $("#code").val(("0000" + row.bankCode).substr(row.bankCode.length));
                $("#name").val(row.name);
                $("#furigana").val(row.furigana);
            });
            first_open = false;
        }
       
    });

 
    // 五十音的按钮绑定
    [
        ["a", "ア"],
        ["ka", "カ"],
        ["sa", "サ"],
        ["ta", "タ"],
        ["na", "ナ"],
        ["ha", "ハ"],
        ["ma", "マ"],
        ["ya", "ヤ"],
        ["ra", "ラ"],
        ["wa", "ワ"],
    ].forEach(function (val, idx, arr) {
        $("#quick-" + val[0]).on("click", function (e) {
            $('#bank-list').bootstrapTable("resetSearch", val[1]+"行"); // ハ行。　表示搜索ha行，包括半浊音，浊音等。
        });                                                         
        // 默认在name和furigana里面检索，不仅开头文字。
        // 如需其它特殊搜索法，可以拓展这个地方。
    });

    $("#quick-all").on("click", function (e) { // 清空。服务器的Controller里对于search关键字为空时，默认返回全部数据。
        $('#bank-list').bootstrapTable("resetSearch", "");
    });


    $("#code").on("change keyup flur", function () {
        var code = $("#code").val();
        if (code.length < 4) {
            $("#bank-info").removeClass("has-error");
            return;
        }
        $.ajax({
            type: "get",
            url: "/api/Bank/Info/?code=" + code,
            dataType: "json"
        }).done(function (data) {
            if (typeof data === "undefined") {
                $("#bank-info").addClass("has-error");
                $("#name").val("");
                $("#furigana").val("");
            } else {
                $("#bank-info").removeClass("has-error");
                $("#name").val(data.name);
                $("#furigana").val(data.furigana);
            }
        });
    });
});
