const $canvas = document.querySelector('canvas');
const ctx = $canvas.getContext('2d');
const $colors = document.querySelectorAll('ul>li');
const $range = document.querySelector('input[type=range]');
const $text = document.querySelector('input[type=text]');
const $button = document.querySelector('button');

$canvas.width = 800;
$canvas.height = 800;

let isPainting = false;
let picker; // colors
let stroke = 2; // strokeWidth


$text.addEventListener('input',(e)=>{
    if(e.target.value.length > 7){
        alert('6자리 이하로 입력해주세요');
        e.target.value = '';
    }
});

const h1 = document.createElement('h1');
document.body.appendChild(h1);


const $sample = document.querySelector('.sample');


$button.addEventListener('click',(e)=>{
    ctx.beginPath();
    picker = $text.value;
    console.log(picker);
    h1.textContent = $text.value;
    $text.value = '';


});

$range.addEventListener('input',(e)=>{
    ctx.beginPath();
    console.log(e.target.value/10);
    stroke = e.target.value / 10;
    ctx.lineWidth = stroke;
});



$colors.forEach((value,index)=>{
    value.addEventListener('click',colorPicker);
});

function colorPicker(event){
    ctx.beginPath();
    if(event.target === $colors[0]){
      picker = 'red';
    }else if(event.target === $colors[1]){
        picker = 'green';
    }else  if(event.target === $colors[2]){
        picker = 'blue';
    }
}

function onMove(event){
    // ctx.beginPath();
    let x = event.offsetX;
    let y = event.offsetY;
    if(isPainting){
        ctx.lineTo(x,y);
        ctx.strokeStyle = picker;
        $sample.style.background =picker;
        ctx.stroke();
        return;
    }
 
    ctx.moveTo(x,y);
}

function onMouseDown(){
    isPainting = true;
}

function onMouseUp(){
    isPainting = false;
}

$canvas.addEventListener('mousemove',onMove);
$canvas.addEventListener('mousedown',onMouseDown);
$canvas.addEventListener('mouseup',onMouseUp);