var MyAudio= function () {
    this.playAudio=function () {
        var audio = new Audio('music/happy.wav');   //创建一个音频对象并传入地址
        audio.autoPlay = true;
        audio.play();
        audio.addEventListener("ended",function () {
            audio.src='music/circulation.wav';
            audio.loop="loop";
            audio.play();
        });

    }

}