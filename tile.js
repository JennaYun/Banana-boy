class Tile {
    constructor(i, x, y, size, options) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.bgCol = color(255, 204, 99);
        this.imageList = options.list;
        this.isHazard = options.isHazard;
        this.isMinus = options.isMinus;
        this.isRight = options.isRight ;
        this.isBottom = options.isBottom ;
        
        this.isLeft = options.isLeft ;
        this.isFirst= options.isFirst ;
        this.isHeal= options.isHeal;
        
        this.imgNum = options.imageNumber;
        this.currentImgNum = 0;
        this.hover = false;
        this.cover = false;
        this.triggered = false;
        this.index = i;
    }

    update() {
        fill(this.bgCol);
        strokeWeight(1 + (2 * this.currentImgNum));
        stroke(255, 153, 153);
        

        rect(this.x, this.y, this.size, this.size);
        
        fill(0,0, 153);
        textSize(32);
        text("HP:" + ban.health, 600, 50);


        
        if(this.hover || this.cover || this.triggered)
        {
            image(this.imageList[1], this.x, this.y, this.size, this.size);
        }
        else 
        {        
            image(this.imageList[this.currentImgNum], this.x, this.y, this.size, this.size);
        }
        
    }

    /*
    nextImage() {
        this.currentImgNum++;
        if (this.currentImgNum === this.imageList.length) {
            this.currentImgNum = 0;
        }
    }
    */
    
    
    isActive() {
       return (this.currentImgNum === 1);
    }
    
    setTriggered(flag) 
    {
        this.triggered = flag;
    }
    
    setHover(flag) 
    {
        this.hover = flag;           
    }
    
    setCover(flag)
    {
        this.cover = flag;
    }
    
    toString() {
        return "Tile [" + this.index + "] at (" + this.x + ", " + this.y + "): [Hover: " + this.hover + "] [Image Number: " + this.imgNum + "].";
        
        // return `Tile [${this.index}] at (${this.x}, ${this.y}): [Hover: ${this.hover}] [Image Number: ${this.currentImgNum}]`;
    }
    
    checkWithin(x, y) {
        if (x >= this.x &&
            x < this.x + this.size &&
            y >= this.y &&
            y < this.y + this.size) 
        {
            return true;
        } else {
            return false;
        }
    }

}


