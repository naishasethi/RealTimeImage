function setup() {
  canvas = createCanvas(200, 200);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet', modelloaded);
}
function draw() {
  image(video, 0, 0, 200, 200);
  classifier.classify(video, gotresult);
}
function modelloaded() {
  console.log("model is loaded");
}
var previous_result = "";
function gotresult(error, results) {
  if (error) {
    console.log(error);
  }
  else {
    if ((results[0].confidence > 0.5)&&(previous_result != results[0].label)) {
    console.log(results);
    previous_result=results[0].label;
    var synth = window.speechSynthesis;
    speakdata = "Object detected is  "+results[0].label;
    var utterthis = new SpeechSynthesisUtterance(speakdata);
    synth.speak(utterthis);
    document.getElementById("result_object_name").innerHTML=results[0].label;
    document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3);
    }
  }
}