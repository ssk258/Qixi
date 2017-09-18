
var Girl= function () {
    //转身
    this.turnBack=function () {
        var dtd=$.Deferred();
        setTimeout(function () {
            $(".girl").addClass("girlTurnBack");
            setTimeout(function () {
                dtd.resolve();
            },1000);
        },2500);
        return dtd;
    }

}