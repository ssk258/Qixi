
var Boy = function () {

    this.startWalk=function () {
        //动态添加行走类
        var dtd=$.Deferred();
        $boy.addClass("slowWalk");
        return dtd.resolve();
    }
    ///停止或继续行走
    this.toggleWalk=function () {
        var dtd= $.Deferred();
        $boy.toggleClass("pauseWalk");
        return dtd.resolve();
    }

    //开始移动
    this.startMove=function (x, y, time) {
        ///**************************减去缩放后的内边距
        y-=insideHeight;
        var dtd=$.Deferred();
        $boy.animate({
                left: x + "px",
                top: y + "px"
            }, time * 1, "linear",
            function () {
                dtd.resolve();
        });
        return dtd;

    }
    //上桥
    this.up2Bridge=function () {
        var dtd=$.Deferred();
        var tranx=0.11*$(document).width();
        var trany=$(".boy").offset().top-$(".girl").offset().top;
        $boy.transition({
                transform: "translate(" + tranx + ",-" + trany + ") scale("+scales+","+scales+")"
            },2000,"linear",function () {
            dtd.resolve();
            }
        )
        return dtd;
    }
    //走到女孩身边
    this.asideGirl=function () {
        var dtd=$.Deferred();
        var finalLeft=$(".girl").offset().left-2*($boy.width()-insideWidth);
        $boy.animate({
                left: finalLeft+"px"
            },2000,function () {
                dtd.resolve();
            }
        )
        return dtd;
    }
    //转身
    this.turnBack=function () {
        var dtd=$.Deferred();
        setTimeout(function () {
            $boy.addClass("boyTurnBack");
            setTimeout(function () {
                dtd.resolve();
            },1000);
        },2500);
        return dtd;
    }

    var tranx;  ///保持出来的坐标只能进店赋值一次

    ///进商店
    this.inStore=function () {
        var dtd=$.Deferred();
        tranx=($(".door_right").width()+$(".door").offset().left)-($boy.offset().left+$boy.width()*0.5);
        $boy.transition({
            ///操作transition需要使用transition，引入jquery-transit.js插件
            transform: 'translateX('+tranx+'px) scale(0.3,0.3)',
            opacity: 0.1                            //透明度
        }, 1000,"linear",function () {
            dtd.resolve();
        });
        return dtd;
    }
    ///拿花
    this.tekeFlower=function () {
        var dtd=$.Deferred();
        $boy.addClass("slowFlolerWalk");
        setTimeout(function () {
            dtd.resolve();
        },500);
        return dtd;
    }

    ///出商店
    this.outStore=function () {
        var dtd=$.Deferred();
        $boy.transition({
            transform: 'translateX('+tranx+'px) scale('+scales+','+scales+')',
            opacity: 1
        },1000,"linear",function () {
            dtd.resolve();
        });
        return dtd;
    }


};
