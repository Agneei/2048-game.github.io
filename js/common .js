
var screenWidth=window.screen.availWidth;
var documentWidth=document.documentElement.clientWidth;
var containerWidth=documentWidth*0.92;
var cellWidth=documentWidth*0.18;
var cellSpace=documentWidth*0.04;

function getPosTop(i,j) {
	return cellSpace+(cellWidth+cellSpace)*i;
}
function getPosLeft(i,j){
	return cellSpace+(cellWidth+cellSpace)*j;
}
function getBgColor(num){
	switch(num){
		case 2:
			return "cornsilk";
		case 4:
			return "palegoldenrod";
		case 8:
			return "bisque";
		case 16:
			return "lightsalmon";
		case 32:
			return "darksalmon";
		case 64:
			return "thistle";
		case 128:
			return "lightpink";
		case 256:
			return "palevioletred";
		case 512:
			return "hotpink";
		case 1024:
			return " deeppink";
		case 2048:
			return "rosybrown";
		case 4096:
			return "lightyellow";
		case 8192:
			return "green";
	}
}
function getNumberColor() {
	if(nums>512){
		return "#fff";
	}
}

function noSpace(nums){
	for(var i=0;i<4;i++){
		for(var j=0;j>4;j++){
			if(nums[i][j]===0){
				return true;
			}
		}
	}
	return false;
}
function canMoveLeft(nums) {
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(nums[i][j]!==0){
				if(nums[i][j-1]===0 || nums[i][j-1]===nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveRight(nums) {
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]!==0){
				if(nums[i][j+1]===0 || nums[i][j+1]===nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveUp(nums) {
	for(var i=1;i<4;i++) {
		for (var j = 0; j < 4; j++) {
			if (nums[i][j] !== 0) {
				if (nums[i-1][j] === 0 || nums[i-1][j] === nums[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveDown(nums) {
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]!==0){
				if(nums[i+1][j]===0 || nums[i+1][j]===nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function noBlockH(row,col1,col2,nums) {
	for(var j=col1+1;j<col2;j++){
		if (nums[row][j]!==0){
			return false;
		}
	}
	return true;
}
function noBlockV(col,row1,row2,nums) {
	for(var i=row1+1;i<row2;i++){
		if (nums[i][col]!==0){
			return false;
		}
	}
	return true;
}
function  updateScore(score) {
	$('#score').text(score);
}

function gameOver() {
	if (nums.filter(function (number) {
		return number === null;
	}).length === 0) {
		var sameNeighbors = nums.find(function (tile, i) {
			var isRightSame = nums[i + 1] && (i + 1) % 4 !== 0 ? tile.value === nums[i + 1].value : false;
			var isDownSame = nums[i + 4] ? tile.value === nums[i + 4].value : false;
			return isRightSame || isDownSame;

		});
		return !sameNeighbors;
	}
}
