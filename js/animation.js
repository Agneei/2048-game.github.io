//通过动画显示数字
function showNumberMove(i,j,randNumber) {
    var numberCell=$('#number-cell-'+i+'-'+j);
    numberCell.css('background-color',getBgColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width:'100px',
        height:'100px',
        top:getPosTop(i,j),
        left:getPosLeft(i,j),
    },500);
}
//通过动画显示移动
function showNumKeyMove(fromX,fromY,toX,toY){
    var numberCell=$('#number-cell-'+fromX+'-'+fromY);
    numberCell.animate({
        top:getPosTop(toX,toY),
        left:getPosLeft(toX,toY),
    },200);
}