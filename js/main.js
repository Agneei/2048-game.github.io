var nums =[];
var score=0;
var hasConflicted=[];           //是否叠加，用来解决单元格重复叠加的问题
$(document).ready(function () {
	newgame();
});
//start new game
function newgame() {
	if(documentWidth>500){
		containerWidth=500;
		cellWidth=100;
		cellSpace=20;
	}
	else{
		//设置移动端
		settingForMobile();
	}

	init();
	//在随机的两个单元格中生成数字
	generateOneNumber();
	generateOneNumber();
}
//移动端
function settingForMobile() {
	$('#header').css('width',containerWidth);

	$('#grid-container').css('width',containerWidth-cellSpace*2);
	$('#grid-container').css('height',containerWidth-cellSpace*2);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',containerWidth*0.02);

	$('.grid-cell').css('width',cellWidth);
	$('.grid-cell').css('height',cellWidth);
	$('.grid-cell').css('border-radius',cellWidth*0.06);
}
//initialize
function init() {
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			var gridCell = $('#grid-cell-' + i + '-' + j);
			gridCell.css('top', getPosTop(i, j));
			gridCell.css('left', getPosLeft(i, j));
		}
	}
	//初始化数组
	for(var k=0;k<4;k++){
		nums[k]=[];
		hasConflicted[k]=[];
		for(var l=0;l<4;l++){
			nums[k][l]=0;
			hasConflicted[k][l]=false;
		}
	}
	
	//动态创建上层单元并初始化
	updateView();

	score=0;
	updateScore(score);
}
function updateView() {
	//把上层单元格清空
	$('.number-cell').remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');

			var numberCell=$('#number-cell-'+i+'-'+j);
			if(nums[i][j]===0){
				numberCell.css('width','0px');
				numberCell.css('height','0px');
				numberCell.css('top',getPosTop(i,j)+cellWidth*0.5);
				numberCell.css('left',getPosLeft(i,j)+cellWidth*0.5);
			}
			else{
				numberCell.css('width',cellWidth);
				numberCell.css('height',cellWidth);
				numberCell.css('top',getPosTop(i,j));
				numberCell.css('left',getPosLeft(i,j));
				numberCell.css('background-color',getBgColor(nums[i][j]));
				numberCell.text(nums[i][j]);
			}
			hasConflicted[i][j]=false;

			$('.number-cell').css('border-radius',cellWidth*0.06);
			$('.number-cell').css('font-size',cellWidth*0.5);
			$('.number-cell').css('line-height',cellWidth+'px');
		}
	}
}

/*
在随机的单元格中生成一个随机数；
——1.在空余的单元格中随便找一个
——2.随机生成一个2或4
*/
function generateOneNumber() {
	//判断是否还有空间，如果没有则直接返回
	if(noSpace(nums)){
		return;
	}
	//随机一个位置
	var count=0;
	var temp=[];
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]===0){
				temp[count] = i*4+j;
				count++;
			}
		}
	}
	var pos=Math.floor(Math.random()*count);//[0,1] *6 =[0,5]
	var randX=Math.floor(temp[pos]/4);
	var randY=Math.floor(temp[pos]%4);
	//随机一个数字
	var randNum=Math.random()<0.7?2:4;
	//在随机位置上显示随机数字
	nums[randX][randY]=randNum;
	showNumberMove(randX,randY,randNum);
}

//实现键盘响应
$(document).keydown(function (event) {
	switch (event.keyCode) {
		case 37:
			if (canMoveLeft(nums)){
				moveLeft();
				setTimeout('generateOneNumber()',200);
			}
			break;
		case 38:
			if (canMoveUp(nums)){
				moveUp();
				setTimeout('generateOneNumber()',200);
			}
			break;
		case 39:
			if (canMoveRight(nums)){
				moveRight();
				setTimeout('generateOneNumber()',200);
			}
			break;
		case 40:
			if (canMoveDown(nums)) {
				moveDown();
				setTimeout('generateOneNumber()',200);
			}
			break;
		default:
			break;
	}
	nums = nums.map(function (tile, index) {
		if (tile) {
			return _extends({}, tile, {
				index: index
			});
		} else {
			return null;
		}
	});
	updateView();
	if (gameOver()) {
		setTimeout(function () {
			endDiv.classList.add('active');
		}, 800);
	}
});


//实现触摸滑动响应
document.addEventListener('touchstart',function (event) {
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
});

document.addEventListener('touchend',function (event) {
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;

	//判断滑动方向
	var deltax=endx-startx;
	var deltay=endy-starty;

	//判断滑动的距离小于移动临界值时不做任何操作
	if(Math.abs(deltax)<documentWidth*0.05&&Math.abs(deltay)<documentWidth*0.05){
		return;
	}

	if(Math.abs(deltax)>=Math.abs(deltay)){//水平方向
		if(deltax>0){//向右
			if (canMoveRight(nums)){
				moveRight();
				setTimeout('generateOneNumber()',200);
			}
		}
		else{//向左
			if (canMoveLeft(nums)){
				moveLeft();
				setTimeout('generateOneNumber()',200);
			}
		}
	}
	else{//垂直方向
		if(deltay<0){//向上
			if (canMoveUp(nums)){
				moveUp();
				setTimeout('generateOneNumber()',200);
			}
		}
		else{//向下
			if (canMoveDown(nums)) {
				moveDown();
				setTimeout('generateOneNumber()',200);
			}
		}
	}
});
/*
	向左移动
    需要对每一个数字的左边进行判断：
    	1.落脚点没有数字，并且移动的路径中没有障碍物；
    	2.落脚点的数字和自己相同，并且移动路径中没有障碍物。
*/
function moveLeft() {
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]!==0){
				for(var k=0;k<j;k++){
					if(nums[i][k]===0&&noBlockH(i,k,j,nums)){//第i行的第k-j列之间是否有障碍物
						//移动操作
						showNumKeyMove(i,j,i,k);
						nums[i][k]=nums[i][j];
						nums[i][j]=0;
						break;
					}
					else if(nums[i][k]===nums[i][j] && noBlockH(i,k,j,nums) && !hasConflicted[i][k]){
						showNumKeyMove(i,j,i,k);
						nums[i][k]+=nums[i][j];
						nums[i][j]=0;
						//统计分数
						score+=nums[i][k];
						updateScore(score);
						hasConflicted[i][k]=true;//已经叠加
						break;
					}
				}
			}
		}
	}
	setTimeout('updateView()',200);
}
function moveRight() {
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(nums[i][j]!==0){
				for(var k=3;k>j;k--){
					if(nums[i][k]===0 && noBlockH(i,j,k,nums)){//第i行的第j-k列之间是否有障碍物
						//移动操作
						showNumKeyMove(i,j,i,k);
						nums[i][k]=nums[i][j];
						nums[i][j]=0;
						break;
					}
					else if(nums[i][k]===nums[i][j] && noBlockH(i,j,k,nums) && !hasConflicted[i][k]){
						showNumKeyMove(i,j,i,k);
						nums[i][k]+=nums[i][j];
						nums[i][j]=0;
						//统计分数
						score+=nums[i][k];
						updateScore(score);
						hasConflicted[i][k]=true;//已经叠加
						break;
					}
				}
			}
		}
	}
	setTimeout('updateView()',200);
}
function moveUp() {
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(nums[i][j]!==0){
				for(var g=0;g<i;g++){
					if(nums[g][j] === 0 && noBlockV(j,g,i,nums)){
						showNumKeyMove(i,j,g,j);
						nums[g][j]=nums[i][j];
						nums[i][j]=0;
						break;
					}
					else if(nums[g][j]===nums[i][j] && noBlockV(j,g,i,nums) && !hasConflicted[g][j]){
						showNumKeyMove(i,j,g,j);
						setTimeout(nums[g][j]+=nums[i][j],500);
						nums[i][j]=0;
						//统计分数
						score+=nums[g][j];
						updateScore(score);
						hasConflicted[g][j]=true;//已经叠加
						break;
					}
				}
			}
		}
	}
	setTimeout('updateView()',200);
}
function moveDown() {
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(nums[i][j]!==0){
				for(var g=3;g>i;g--){
					if(nums[g][j] === 0 && noBlockV(j,i,g,nums)){
						showNumKeyMove(i,j,g,j);
						nums[g][j]=nums[i][j];
						nums[i][j]=0;
						break;
					}
					else if(nums[g][j]===nums[i][j] && noBlockV(j,i,g,nums) && !hasConflicted[g][j]){
						showNumKeyMove(i,j,g,j);
						setTimeout(nums[g][j]+=nums[i][j],500);
						nums[i][j]=0;
						//统计分数
						score+=nums[g][j];
						updateScore(score);
						hasConflicted[g][j]=true;//已经叠加
						break;
					}
				}
			}
		}
	}
	setTimeout('updateView()',200);
}
