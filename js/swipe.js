

var Swipe=function () {

    //页面滚动
    this.scrollTo=function (x,speed) {
        var dtd=$.Deferred();
        bgBox.animate({
                left: "-"+x+"px"
            },speed*1,"linear",
            function () {
                dtd.resolve();
            }
        );
        return dtd;
    }
    ///门打开(开灯)
    this.doorOpen=function () {
        var dtd=$.Deferred();
        var count=2;
        //开灯
        this.changeLampState();
        var complete=function () {
            count--;
            if(count===0)
                dtd.resolve();
        };
        $(".door_left").animate({
            left: "-50%"
        },1000, complete);
        $(".door_right").animate({
            left: "50%"
        },1000,complete);
        return dtd;
    }

    ///门关上(关灯)
    this.doorClose=function () {
        var dtd=$.Deferred();
        $(".door_left").animate({
            left: "0%"
        },1500);
        $(".door_right").animate({
            left: "0%"
        },1500,function () {
            //关灯
            $(".two_background").toggleClass("lamp-bright");
        });
        return dtd.resolve();
    }
    //开灯和关灯
    this.changeLampState=function () {
        var dtd=$.Deferred();
        $(".two_background").toggleClass("lamp-bright");
        return dtd.resolve();
    }
    //鸟飞
    this.birdFly=function () {
        var dtd=$.Deferred();
        $(".bird").addClass("birdFly");
        $(".bird").animate({
            right:900
        }, 10000 ,"linear");
        return dtd.resolve();
    }

    //飘雪花 //
    this.snowflake=function () {
        // 雪花容器
        var $flakeContainer = $('.snowflake');

        // 随机六张图
        function getImagesName() {
            return snowflakeURl[[Math.floor(Math.random() * 6)]];
        }
        // 创建一个雪花元素
        function createSnowBox() {
            var url = getImagesName();
            return $('<div class="snowbox" />').css({
                'width': 41,
                'height': 41,
                'position': 'absolute',
                'backgroundSize': 'cover',
                'zIndex': 100000,
                'top': '-41px',
                'backgroundImage': 'url(' + url + ')'
            }).addClass('snowRoll');
        }
    // 开始飘花
    setInterval(function() {
        var visualWidth=container.width();
        var visualHeight=container.height();
        // 运动的轨迹
        var startPositionLeft = Math.random() * visualWidth - 100,
            startOpacity    = 1,
            endPositionTop  = visualHeight - 40,
            endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
            duration        = visualHeight * 10 + Math.random() * 5000;

        // 随机透明度，不小于0.5
        var randomStart = Math.random();
        randomStart = randomStart < 0.5 ? startOpacity : randomStart;

        // 创建一个雪花
        var $flake = createSnowBox();

        // 设计起点位置
        $flake.css({
            left: startPositionLeft,
            opacity : randomStart
        });

        // 加入到容器
        $flakeContainer.append($flake);

        // 开始执行动画
        $flake.transition({
            top: endPositionTop,
            left: endPositionLeft,
            opacity: 0.7
        }, duration, 'ease-out', function() {
            $(this).remove() //结束后删除
        });

    }, 200);
}

}



