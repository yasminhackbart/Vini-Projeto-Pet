class cachorro
{
	constructor(x,y,width,height)
	{
		var options={
			isStatic:false,
			restitution:0,
			friction:0,
            frictionAir:0,
			density:2.2,
            frictionStatic:0

			
			}
		//this.x=x;
		//this.y=y;
		this.width=width;
        this.height=height;
		this.image=loadImage("caramelodir.png");
		this.body=Bodies.rectangle(x, y, this.width,this.height, options)
		World.add(world, this.body);

	}
	display()
	{
			
			var pos=this.body.position;		

			push()
            console.log(this.body)
			translate(pos.x, pos.y);
			rectMode(CENTER)
			//strokeWeight(4);
			fill(255,0,255)
			imageMode(CENTER);
			image(this.image, 0,0,this.width, this.height)
			//ellipse(0,0,this.r, this.r);
			pop()
			
	}

}