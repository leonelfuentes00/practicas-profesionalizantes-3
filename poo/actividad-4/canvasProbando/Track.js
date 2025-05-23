export function loadTrackImage(src, callback) {
    const img = new Image();
    img.onload = () => callback(img);
    img.src = src;
}


export function drawTrack(ctx, image) {
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
}