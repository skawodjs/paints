const canvas=document.querySelector("#jsCanvas");
const colors=document.getElementsByClassName("jsColor")
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const save=document.getElementById("jsSave");
const ctx=canvas.getContext("2d");
const INITIAL_COLOR="black"
const CANVAS_SIZE=700;

canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

ctx.strokeStyle=INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth="2.5";

let painting =false;
let fill=false;

function stopPainting(){
    painting=false
}
function startPainting(e){
    painting=true;
}

function onMouseMove(e){
    const x=e.offsetX;
    const y=e.offsetY;
    // console.log(x,y);
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
        // ctx.closePath();
    }
}
function onMouseDown(e){
    console.log(e);
    painting=true;

}

function handleColorClick(e){
    const color=e.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}
function handleRangeChange(e){
    // console.log(e.target.value);
    const strokeSize=e.target.value;
    ctx.lineWidth=strokeSize;

}
function handleModeClick(){
    if(fill===true){
        fill=false;
        mode.innerText="FILL"
    }else{
        fill=true;
        mode.innerText="STROKE"
        
    }
}
function handleCanvasClick(){
    if(fill){
    ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE)
    }
}
function handleCtxClick(e){
    e.preventDefault();
}
function handleSaveClick(){
    // console.log();
    const image=canvas.toDataURL("image/png");
    const link=document.createElement("a");
    link.href=image;
    link.download="";
    // console.log(link);
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseLeave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCtxClick);
}

Array.from(colors).forEach(
    color=>color.addEventListener("click", handleColorClick)
    );

if(range){
    range.addEventListener("input", handleRangeChange);
}
if(mode){
    mode.addEventListener("click",handleModeClick);
}
if(save){
    save.addEventListener("click",handleSaveClick);
}