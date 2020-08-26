// 그리기
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const BASE_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;  // 픽셀 기본 설정
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"; // 초기 색깔 설정
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.lienWidth = 2.5; // 초기 셋팅
ctx.strokeStyle = BASE_COLOR;
ctx.fillStyle = BASE_COLOR;

let painting = false;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(painting){
        ctx.lineTo(x, y); 
        ctx.stroke();
    }else{
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}

function startPainting(event){
    painting = true;
}

function stopPainting(event){
    painting = false;
}

function handleCanvasClick(event){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault(); // 우클릭으로 이미지 다운로드 방지!
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("click", handleCanvasClick);
canvas.addEventListener("contextmenu", handleCM);
// 색깔 변경
const colors = document.getElementsByClassName("jsColors");

function handleColor(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColor))

// 두께 바꾸기
const range = document.getElementById("jsRange");

function handleRange(event){
    ctx.lineWidth = event.target.value;
}

range.addEventListener("input", handleRange);

// fill / paint 
let filling = false;
const mode = document.getElementById("jsMode");
function handleModeClick(event){
    if(filling){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

mode.addEventListener("click", handleModeClick);

// 이미지 저장하기
const saveBtn = document.getElementById("jsSave");

function handleSaveClick(event){
    // canvas의 데이터를 image 데이터로 전환
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT].jpeg";
    link.click();
}

saveBtn.addEventListener("click", handleSaveClick);