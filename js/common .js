//获取上边位置
function getPosTop(i,j) {
	return i*120+20;
}
//获取左边位置
function getPosLeft(i,j){
	return j*120+20;
}
//获取数字背景颜色方式
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
			return "pink";
		case 512:
			return "hotpink";
		case 1024:
			return " deeppink";
		case 2048:
			return "purple";
		case 4096:
			return "lightyellow";
		case 8192:
			return "yellow";
	}
}
//获取数字颜色方式
function getNumberColor() {
	if(nums<4){
		return "#fffff";
	}
}

//判断是否没有空间
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
//左移
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
//右移
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
//上移
function canMoveUp(nums) {
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(nums[i][j]!==0){
				if(nums[i-1][j]===0 || nums[i-1][j]===nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//下移
function canMoveDown(nums) {
	for(var j=0;j<4;j++){
		for(var i=0;i<3;i++){
			if(nums[i][j]!==0){
				if(nums[i+1][j]===0 || nums[i+1][j]===nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//判断水平方向上是否有障碍物
function noBlockH(row,col1,col2,nums) {
	for(var i=col1+1;i<col2;i++){
		if (nums[row][i]!==0){
			return false;
		}
	}
	return true;
}
//判断垂直方向上是否有障碍物
function noBlockV(col,row1,row2,nums) {
	for(var i=row1+1;i<row2;i++){
		if (nums[i][col]!==0){
			return false;
		}
	}
	return true;
}
//更新分数
function  updateScore(score) {
	$('#score').text(score);
}