/*
IGME - 101
Jenna Yun
ICE 14a

*/


// let a, b, c, d, e, f, g, h;
let images = [];
let grid = [];
let size = 80;
let rows = 10;
let cols = 10;

var ban;              // Object that will handle the animation
var anim;
var nFrms = 8;        // Number of frames in the animation

//var theFirst = grid[i].isFirst;
//var theSecond = grid[getRandomInt( 0, grid.length-1)].imgNum;
//var theThird = theSecond;



function preload() {    
    /*pink 3,4,5 will give some hints. The tiles that they revealed will not disappear!!!*/
    
    
    images.push(loadImage("images/pink0.png")); /*blank image. front image*/
    images.push(loadImage("images/pink1.png"));
    /*if the banana dude is on this tile, it will have full HP. Basically, this
    tile heals the dude*/
    images.push(loadImage("images/pink2.png")); 
    /*If you click(mousePressed) this tile, it will swap the tile with another one. 
    1.Even if the banana dude gets pink 6 or 7 after you swap the tile, he will not get any penalty.
    For example, if he gets pink 7 after you swap, the animation will not stop.
    2. If he gets one of the arrow images, the arrow image will not give any hint. 
    3. Also, if the banana dude gets pink 1 which heals him, he will not heal him because 
    I am using this tile to give hints to showing tiles.*/
    images.push(loadImage("images/pink3.png")); /*it will show the tile's image that's
    left to the banana dude. If the banana dude is on the tile that's in the first column,
    the tile will not give you any hint*/
    images.push(loadImage("images/pink4.png")); 
    /*it will show the tile's image 
    that's right under the banana dude*/
    images.push(loadImage("images/pink5.png")); 
    /*it will show the tile's image that's right
    next to the banana dude.*/
    images.push(loadImage("images/pink6.png")); 
    /*Banana dude's health(HP) will 
    decrease if he is on this.*/ 
    images.push(loadImage("images/pink7.png")); 
    /*It will make bananadue's 
    animation stop and HP will decrease. Click any tiles on the canvas 
    and the animation will start*/
    
    
    
     anim = new Array(nFrms);
  
      for (var i = 0; i < nFrms; i++)
    {
      // Number in the file name matches the array offset & loop counter i
      anim[i] = loadImage ("Banana/Banana" + i + ".png");
    }
}



function setup() {
    createCanvas(800, 800);
    background(180);
    
    let indexNum = 0;    
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            grid.push(new Tile(indexNum, x * size, y * size, size, getRandomPair()));
            // grid.push(new Tile(x * size, y * size, size, getRandomPair(), indexNum));
            indexNum++;
        }
    }
    
    frameRate(8);        // Slow down, so we can see the animation.
    
    let dudeEvent = dudeMoved;
    ban = new Dude (0, 0, nFrms, anim, dudeEvent);  // Put animation near window center
    ban.dudeMoved(); // Initial check.

}

function draw() {
    background(130);


    
    for (let i = 0; i < grid.length; i++) {
        grid[i].update();
    }
    
    if(ban.isAnimating && ban.health > 0) 
    {
        ban.bananaDudeDanceFloor();
        ban.transition();    // Advance the animation to the next frame
    }
    else if (ban.health <= 0 ){
        text(50);
        text("You lose (‡▼益▼)", 400, 400);
    }
        ban.display();       // Display the frame
    
    if(ban.health >=1  && ban.xLoc >= 700 &&  ban.yLoc >=700){
     text(50);
        
     text("You win", 400, 400);
     ban.health = 5;
    }
    

    
    fill(0,0,0);
    rect(720, 720, 80, 80);
    fill(227, 249, 0);
    text(5);
    text("goal", 720, 770);

}

/*function mouseMoved() {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].checkWithin(mouseX, mouseY)) // if mouse is over tile.
        {
            grid[i].setHover(true); // set mouse flag to true.
            console.log("Hovering over: " + grid[i].toString()); // print.
        } 
        else
        {
            grid[i].setHover(false); // else, set to false.
        }
    }
}

*/

function dudeMoved() {
    console.log(ban.toString() + " Moved from sketch.js.");
    for (let i = 0; i < grid.length; i++) 
    {
        if (grid[i].checkWithin(ban.xLoc, ban.yLoc)) // if banana dude is over tile.
        {
            grid[i].setCover(true); // set cover flag to true.
            console.log("Banana Dude is over: " + grid[i].toString()); // print.
            
            ban.isAnimating = !grid[i].isHazard;
            if (grid[i].isMinus) {
                
                ban.health--;
                
            }
            
            if (grid[i].isHeal) {
                
                ban.health = 5;
            }
            
                  
            if(grid[i].isRight){
                let index = i + 10;
                if(index < grid.length) {
                    grid[index].setTriggered(true);
                }
            }
            
             if (grid[i].isBottom){
                let index = i + 1;
                if(index < grid.length) {
                    grid[index].setTriggered(true);
                }
            }
            
            if (grid[i].isLeft){
                let index = i - 10;
                if(index < grid.length && index >= 0 ) {
                    grid[index].setTriggered(true);
                }
            }
            
            if (grid[i].isHazard){

                ban.health = ban.health - 2;
            }
            
            
     
           if (ban.xLoc == 0 && ban.xLoc == 0){
               
                ban.health = 5; 
               // Banana dude can heal himself on the start point. 
               // This is a secret place for banana dude's health.
            }
             
            
            
           if (ban.xLoc >= 720 && ban.yLoc >= 720){
               
                ban.health = 5; 
                //One possibility: isMinus tile can be on the goal tile. If the banana dude's
               //health is 1 and if he gets on the goal tile, he loses. 
               //I just want to make sure he will win if he is on the goal tile.
               
            }
            
            
          if( i === grid.length-1) {
                

                grid[i].setTriggered(true); 
            }
          
            
            
        } 
        else
        { 
            if(!grid[i].triggered){
                grid[i].setCover(false);
            }
        }
        

    }
    
    
    
    
    

}

function mousePressed() {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].checkWithin(mouseX, mouseY)) {
               
     
            console.log("Pressing over: " + grid[i].toString());

            
            if(grid[i].isFirst)
            {
                let randomTile = grid[getRandomInt(0, grid.length-1)];
                let currentTile = grid[i];
                
                let temp = randomTile.imgNum;
                randomTile.imgNum = currentTile.imgNum;
                currentTile.imgNum = temp;
                
                
                randomTile.imageList[1] = images[randomTile.imgNum];
                currentTile.imageList[1] = images[currentTile.imgNum];
                
                currentTile.isFirst = (currentTile.imgNum === 2);
                randomTile.isFirst = (randomTile.imgNum === 2);
                
                
               // grid[i].imgNum =  grid[getRandomInt( 0, grid.length-1)].imgNum;
                //theSecond = grid[i].imgNum ;
                
           
                
                
                
                
            }
            
            
            
           // this.theFirst = this.theSecond;
            //this.theSecond= this.theThird;

            
            // Any tile, run banana transition if not animating.
            if(!ban.isAnimating) { ban.isAnimating = true; }
        }
    }
}

function getRandomPair()
{
    let results = {
        list: undefined,
        imageNumber: undefined,
        isHazard: undefined,
        isMinus: undefined,
        isRight: undefined,
        isBottom: undefined,
        isLeft: undefined,
        isFirst: undefined,
        isHeal: undefined
    };
    
    results.imageNumber = getRandomInt(1, 8);   
    results.list = [images[0], images[results.imageNumber]];
    results.isHazard = (results.imageNumber === 7);
    results.isMinus = (results.imageNumber === 6);
    results.isRight = (results.imageNumber === 5);
    results.isLeft = (results.imageNumber === 3);
    results.isBottom = (results.imageNumber === 4);
    results.isFirst = (results.imageNumber === 2);
    results.isHeal = (results.imageNumber === 1);
  
    
    
    return results;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}