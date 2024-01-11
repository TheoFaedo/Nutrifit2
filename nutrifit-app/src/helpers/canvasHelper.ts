export function drawPhotoSquare(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        const width = Number(canvas.getAttribute("width"));
        const height = Number(canvas.getAttribute("height"));
        
        const fillStyle = context.fillStyle;

        context.fillStyle = "rgba(0, 0, 0, 0.7)";
        const squareSize = height/2;
        context.fillRect((width-squareSize)/2, (height-squareSize)/2, squareSize, squareSize);
        context.clearRect((width-squareSize)/2+8, (height-squareSize)/2+8, squareSize-16, squareSize-16);
        context.clearRect((width-squareSize)/2+squareSize/4, (height-squareSize)/2, squareSize/2, squareSize);
        context.clearRect((width-squareSize)/2, (height-squareSize)/2+squareSize/4, squareSize, squareSize/2);
        
        context.fillStyle = fillStyle;
}