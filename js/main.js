var $boy;           ///小孩   DIV
var container;      ////最外面div
var bgBox;          ////UL
var insideHeight;   //小男孩缩放后的上内边距
var insideWidth;   //小男孩缩放后的上内边距
var scales;         ///动图的缩放比例

var snowflakeURl = [
    'http://img.mukewang.com/55adde120001d34e00410041.png',
    'http://img.mukewang.com/55adde2a0001a91d00410041.png',
    'http://img.mukewang.com/55adde5500013b2500400041.png',
    'http://img.mukewang.com/55adde62000161c100410041.png',
    'http://img.mukewang.com/55adde7f0001433000410041.png',
    'http://img.mukewang.com/55addee7000117b500400041.png'
]


// 获取元素高度和距离父元素高度
function getPath () {
    var $elem = $(".one_middle_bg");
    return {
        height: $elem.height(),
        top: $elem.position().top
    }
}
////入口函数
$(window).ready(function () {
    //初始化参数和状态
    container=$("#content");
    $boy=$(".boy");
    init();

    var swipe=new Swipe();
    var boy=new Boy();
    var girl=new Girl();
    var walkPath=new WalkPath();
    var myAudio=new MyAudio();
    myAudio.playAudio();

    // bgBox.css({
    //     left:"-"+container.width()+"px"
    // });

    //开始行走
    boy.startWalk();
    //开始动画, 使用Deferred  控制动画的执行then() 括号传入匿名函数
    $.when(boy.startMove(walkPath.one.x,walkPath.one.y,walkPath.one.time)).
    ///走到第二个页面中间,同时执行两个动画
    then(function () {
        swipe.scrollTo(container.width(),walkPath.two.time);
        return boy.startMove(walkPath.two.x,walkPath.two.y,walkPath.two.time);
    }).
    then(function () {              ///鸟飞
        return swipe.birdFly();
    }).
    then(function () {
        return boy.toggleWalk();      ///停止动画，等待开门
    }).
    then(function () {                   ///门打开(开灯)
        return swipe.doorOpen();
    }).
    then(function () {
        return boy.toggleWalk();      ///继续走动
    }).
    then(function () {          ///进商店
        return boy.inStore();
    }).
    then(function () {
        return boy.tekeFlower();
    }).
    then(function () {          ///出商店
        return boy.outStore();
    }).
    then(function () {                //门关上(关灯)
        return swipe.doorClose();
    }).
    then(function () {                  //走去第三个地方
        swipe.scrollTo(container.width()*2,walkPath.three.time);
        return boy.startMove(walkPath.three.x,walkPath.three.y,walkPath.three.time);
    }).
    then(function () {
        return boy.up2Bridge();                ///上桥
    }).
    then(function () {                  //走到女生身旁
        return boy.asideGirl();
    }).
    then(function () {
        //移除前两个动作,固定姿势
        $boy.removeClass('slowWalk slowFlolerWalk').addClass('boyOriginal');
        return boy.toggleWalk();          ///停止走动
    }).
    then(function () {
        girl.turnBack();                //转身
        return boy.turnBack();
    }).
    then(function () {
        return swipe.snowflake();   ///散花
    });




});




function init() {

    // 获取第一个子节点
    bgBox = container.find(":first");
    // li页面数量
    var slides = bgBox.find("li");
    // 获取容器尺寸
    var width = container.width();
    var height = container.height();
    // 设置li页面总宽度
    bgBox.css({
        width  : (slides.length * width) + 'px',
        height : height + 'px'
    });

    // 设置每一个页面li的宽度
    $.each(slides, function(index) {
        var slide = slides.eq(index); //获取到每一个li元素
        slide.width(width);
        slide.height(height);
    });
    //缩放比例
    scales=$(document).width()/2000;
    $boy.css({
        transform: "scale("+scales+")"
    });
    $(".could1,.could2,.sun,.bird,.girl").css({
        transform: "scale("+scales+")"
    });


    insideHeight=$boy.height()*(1-scales)*0.5;
    insideWidth=$boy.width()*(1-scales)*0.5;
    //让小男孩自适应高度
    var data = getPath();
    $boy.css({
        top: data.top + data.height / 2 - $boy.height()+insideHeight+10     //10是修正值
    });

}






