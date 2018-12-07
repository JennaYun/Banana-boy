class Dude {
    constructor(x, y, n, imgs, dudeMoved) {
        this.xLoc = x; // Window location of upper left corner of animation
        this.yLoc = y;
        this.nFrms = n; // Number of frames in animation & number of states in FSM
        this.anim = imgs; // Frames array for cells of animation
        this.curF = 0; // Current frame number in animation, also State variable for FSM
        this.isAnimating = true;
        
        if(dudeMoved != null) 
        {
            this.dudeMoved = dudeMoved; // Function to call, after moving the dude.   
        } 
        else
        {
            this.dudeMoved = function() { 
                console.log("Dude moved.");
            }
        }
        
        // State Transition table for FSM - Each row is a state (animation frame).
        // Columns represent input types (0 - LEFT, 1 - RIGHT, 2 - all other).
        // Contents of each each cell is the next state, given the current state
        // (row) and input type (column).  This is the table that results from the
        // state/transition diagram from BananaDudeFSM.pdf.
        // 4-frame sub-cycles are 0-1-2-7-0 (LEFT arrow, column 0)
        // and 3-4-5-6-3 (RIGHT arrow, column 1).  Column 2 represents the original
        // complete cycle, which is followed if neither the LEFT nor the RIGHT
        // arrow key is pressed.

        this.health = 5;
        
        this.transTab = [
            [1, 1, 1],
            [2, 2, 2],
            [7, 3, 3],
            [4, 4, 4],
            [5, 5, 5],
            [6, 6, 6],
            [7, 3, 7],
            [0, 0, 0]
          ];
    }

    // Transition current frame to next frame by mapping input to inType number
    // and then doing a table lookup in transTab with curFrm & inType
    transition() 
    {
        var inputType; // Look for LEFT (0) or RIGHT (1) arrow, 2 for all else

        if (keyIsDown(LEFT_ARROW)) {
            // Map input condition to inType
            inputType = 1;
            console.log("LEFT_ARROW")
        } else if (keyIsDown(RIGHT_ARROW)) {
            inputType = 0;
            console.log("RIGHT_ARROW")
        } else {
            // any other key or no keyPressed
            inputType = 2;
        }

        // Table lookup - No "if" statements needed!
        this.curF = this.transTab[this.curF][inputType]; // Transition to next state
    }

    display() // Display the current frame in the animation (corner mode)
    {
           image(anim[this.curF], this.xLoc, this.yLoc, 80, 80); // State variable is frame number
        //fill(0);
        //ellipse(this.xLoc, this.yLoc, 5, 5);  // Demonstrate image location (corner mode);
    }

    // Move to this location.
    move(xValue, yValue) 
    {
        this.moveX(xValue);
        this.moveY(yValue);
        if(xValue != 0 || yValue != 0) 
        {
            this.dudeMoved();
        }
    }
    
    // Move x by value amount.
    moveX(value) 
    {
        if(value != null)
        {
            this.xLoc += value;   
        }
    }
    
    // Move y by value amount.
    moveY(value)
    {
        // Checks if the value is null or undefined. If not null and not undefined, runs following code.
        if(value != null){
            // Adds value to yLoc.
            // this.yLoc = this.yLoc + value; // This is the same as below.
            this.yLoc += value;
        }
    }
    
    // Check for key input, and, move if possible.
    bananaDudeDanceFloor() {
        let dx = 0; // Change in x position.
        let dy = 0; // Change in y position.
        
        if(keyIsDown(65)) {
            console.log("A");
            if(this.xLoc > 0) {
                dx -= 80;
            }
        } else if (keyIsDown(83)) {
            console.log("S");
            if(this.yLoc < 700) {
                dy += 80;
            }
        }
        else if (keyIsDown(87)) {
            console.log("W");
            if(this.yLoc > 0) {
                dy -= 80;
            }
        }
        else if (keyIsDown(68)) {
            console.log("D");
            if(this.xLoc < 700) {
                dx += 80;
            }
        }
        
        this.move(dx, dy);
    }

    
    toString() {
        return `Banana Dude at (${this.xLoc}, ${this.yLoc})`;
    }
    
}