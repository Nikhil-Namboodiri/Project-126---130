peter_pan = "";
harry_potter = "";
lefttWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_left_wrist = 0;
score_right_wrist = 0;
song_play_left_wrist = "";
song_play_right_wrist = "";
function preload(){
    harry_potter = loadSound('music.mp3');
    peter_pan = loadSound('music2.mp3');
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('Posenet is initialized.');
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        score_left_wrist = results[0].pose.keypoints[9].score;
        score_right_wrist = results[0].pose.keypoints[10].score;
    }
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill('#FF0000');
    stroke('#FF0000');
    song_play_left_wrist = peter_pan.isPlaying();
    song_play_right_wrist = harry_potter.isPlaying;
    if(score_left_wrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        harry_potter.stop();
        if(song_play_left_wrist == false){
            peter_pan.play();
            document.getElementById('song').innerHTML = 'Song name: Harry Potter';
        }
    }
    if(score_right_wrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        peter_pan.stop();
        if(song_play_right_wrist == false){
            harry_potter.play();
            document.getElementById('song').innerHTML = 'Song name: Harry Potter';
        }
    }
}