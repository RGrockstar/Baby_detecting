baby_fine="";
Alert="";
objects=[];
status="";
function preload(){
Alert=loadSound("alarm_alarm_alarm.mp3");
baby_fine=loadSound("alarm_2.mp3");
}
function setup(){
canvas=createCanvas(380, 380);
canvas.center();
video=createCapture(VIDEO);
video.size(380, 380);
video.hide();
object_detecter=ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML="baby detecting";
}
function modelLoaded(){
 console.log("model_loaded");
 status=true;
}
function draw(){
image(video, 0,0, 480, 380);
if (status != ""){
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetecter.detect(video, gotResults);
    for(i=0; i<objects.length; i++){
    document.getElementById("status").innerHTML="baby detected";
    fill(r,g,b);
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+""+percent+"%", objects[i].x+ 15, objects[i].y+ 15);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    if(objects[i].label ="person"){
    document.getElementById("nob.num").innerHTML= "baby_found";
    baby_fine.play();
    }
    else{
    document.getElementById("nob.num").innerHTML= "baby not found";
    Alert.play();
    }
}
}
}
function gotResults(error, results){
    if(error){
    console.error(error);
    }
    else{
    console.log(results);
    objects=results;
    }
}